const crypto = require("crypto");
const { Filter, FieldValue } = require("firebase-admin/firestore");
const _ = require("lodash");

const { firestore } = require("../db");

const EducationLevel = { COLLEGE: "COLLEGE", HIGH_SCHOOL: "HIGH_SCHOOL" };

// TODO: This should be converted to TS and moved to a "helpers" file
function findMatchedComment(comments, commentId) {
  if (!comments) {
    return undefined;
  }

  for (let index = 0; index < comments.length; ++index) {
    const comment = comments[index];

    if (comment.id === commentId) {
      return comment;
    } else if (comment.replies) {
      const found = findMatchedComment(comment.replies, commentId);

      if (found) {
        return found;
      }
    }
  }
}

// TODO: This should be converted to TS and moved to a "helpers" file
function getUserFriends(userId) {
  const userFriends = [];

  _.forEach(FRIENDS_LIST, (friendship) => {
    const friendshipValues = Object.values(friendship);

    if (friendshipValues.includes(userId)) {
      const friendId = _.find(friendshipValues, (value) => value !== userId);
      const friend = _.find(USERS_LIST, (user) => user.id === friendId);

      if (friend) {
        userFriends.push(friend);
      }
    }
  });

  return userFriends;
}

const {
  AUTHENTICATED_USER_ID,
  BLOCKED_USERS_LIST,
  ConversationTheme,
  Emoji,
  FRIEND_REQUESTS_LIST,
  FRIENDS_LIST,
  HIDDEN_POSTS_LIST,
  POST_PHOTOS_LIST,
  POSTS_LIST,
  USERS_LIST,
} = require("../MockedData");

const resolvers = {
  Comment: {
    owner: async ({ ownerId }) => {
      const ownerSnapshot = await firestore
        .collection("users")
        .where("id", "==", ownerId)
        .get();

      if (ownerSnapshot.empty) {
        return null;
      }

      return ownerSnapshot.docs[0].data();
    },
    post: async ({ postId }) => {
      const postSnapshot = await firestore
        .collection("posts")
        .where("id", "==", postId)
        .get();

      if (postSnapshot.empty) {
        return null;
      }

      return postSnapshot.docs[0].data();
    },
    reactions: async ({ id }) => {
      const reactionsSnapshot = await firestore
        .collection("commentReactions")
        .where("commentId", "==", id)
        .get();
      const reactions = [];

      reactionsSnapshot.docs.forEach((doc) => reactions.push(doc.data()));

      return reactions;
    },
    replies: async ({ id }) => {
      const repliesSnapshot = await firestore
        .collection("postComments")
        .where("parentId", "==", id)
        .get();
      const replies = [];

      repliesSnapshot.docs.forEach((doc) => replies.push(doc.data()));

      return replies;
    },
    repliesCount: async ({ id }) => {
      async function getRepliesCount(comment, currentCount) {
        const repliesSnapshot = await firestore
          .collection("postComments")
          .where("parentId", "==", comment.id)
          .get();

        if (repliesSnapshot.empty) {
          return currentCount;
        }

        for (const doc of repliesSnapshot.docs) {
          const newCount = await getRepliesCount(doc.data(), currentCount);
          return currentCount + newCount;
        }
      }

      const repliesSnapshot = await firestore
        .collection("postComments")
        .where("parentId", "==", id)
        .get();
      let repliesCount = repliesSnapshot.docs.length;

      if (repliesCount > 0) {
        for (const doc of repliesSnapshot.docs) {
          const reply = doc.data();
          const { id: replyId } = reply;
          const replySnapshot = await firestore
            .collection("postComments")
            .where("parentId", "==", replyId)
            .get();

          if (!replySnapshot.empty) {
            const count = await getRepliesCount(reply, repliesCount);
            repliesCount = count;
          }
        }
      }

      return repliesCount;
    },
  },
  EducationResult: {
    __resolveType(obj) {
      if (obj.degree && obj.level === EducationLevel.COLLEGE) {
        return "CollegeEducation";
      }

      return "HighSchoolEducation";
    },
  },
  Message: {
    reactions: async () => {
      return [];
    },
    replies: async () => {
      return [];
    },
  },
  Post: {
    comments: async ({ id }) => {
      const postCommentsSnapshot = await firestore
        .collection("postComments")
        .where(
          Filter.and(
            Filter.where("parentId", "==", null),
            Filter.where("postId", "==", id)
          )
        )
        .get();
      const comments = [];

      postCommentsSnapshot.docs.forEach((doc) => comments.push(doc.data()));

      return comments.sort(
        (post1, post2) =>
          +new Date(Number(post2.dateTime) - +new Date(Number(post1.dateTime)))
      );
    },
    commentsCount: async ({ id }) => {
      const postCommentsSnapshot = await firestore
        .collection("postComments")
        .where("postId", "==", id)
        .get();
      return postCommentsSnapshot.docs.length;
    },
    owner: async ({ ownerId }) => {
      const postOwnerSnapshot = await firestore
        .collection("users")
        .where("id", "==", ownerId)
        .get();

      if (postOwnerSnapshot.empty) {
        return null;
      }

      return postOwnerSnapshot.docs[0].data();
    },
    photos: ({ id }) => {
      return _.filter(POST_PHOTOS_LIST, (photo) => photo.postId === id);
    },
    reactions: async ({ id }) => {
      const reactionsSnapshot = await firestore
        .collection("postReactions")
        .where("postId", "==", id)
        .get();
      const reactions = [];

      reactionsSnapshot.docs.forEach((doc) => reactions.push(doc.data()));

      return reactions;
    },
    receiver: async ({ receiverId }) => {
      const postReceiverSnapshot = await firestore
        .collection("users")
        .where("id", "==", receiverId)
        .get();

      if (postReceiverSnapshot.empty) {
        return null;
      }

      return postReceiverSnapshot.docs[0].data();
    },
    // TODO: To be tested
    shares: async ({ id }) => {
      const sharesSnapshot = await firestore
        .collection("posts")
        .where("parentId", "==", id)
        .get();
      const shares = [];

      sharesSnapshot.docs.forEach((doc) => shares.push(doc.data()));

      return shares;
    },
  },
  User: {
    // TODO: To be tested
    coverPhotos: async ({ id: userId }) => {
      const coverPhotosSnapshot = await firestore
        .collection("coverPhotos")
        .where("userId", "==", userId)
        .get();
      const coverPhotos = [];

      coverPhotosSnapshot.docs.forEach((doc) => coverPhotos.push(doc.data()));

      return coverPhotos;
    },
    educationHistory: async ({ id: userId }) => {
      const educationHistorySnapshot = await firestore
        .collection("educationHistory")
        .where("userId", "==", userId)
        .get();
      const educationHistory = [];

      educationHistorySnapshot.docs.forEach((doc) =>
        educationHistory.push(doc.data())
      );

      return educationHistory;
    },
    followingUsers: async ({ id: userId }) => {
      const followingUsersSnapshot = await firestore
        .collection("follows")
        .where("userId", "==", userId)
        .get();
      const followingUsers = [];

      for (const doc of followingUsersSnapshot.docs) {
        const { followingUserId } = doc.data();
        const followingUserSnapshot = await firestore
          .collection("users")
          .where("id", "==", followingUserId)
          .get();

        if (!followingUserSnapshot.empty) {
          const followingUserData = followingUserSnapshot.docs[0].data();
          followingUsers.push(followingUserData);
        }
      }

      return followingUsers;
    },
    friends: async ({ id: userId }) => {
      const matchedFriendshipsSnapshot = await firestore
        .collection("friendships")
        .where(
          Filter.or(
            Filter.where("first", "==", userId),
            Filter.where("second", "==", userId)
          )
        )
        .get();

      const friends = [];
      // forEach doesn't await callbacks => using a "for ... of" loop instead
      // https://stackoverflow.com/questions/66429234/async-function-not-waiting-long-enough-to-push-firestore-docs-into-an-array
      for (const doc of matchedFriendshipsSnapshot.docs) {
        const { first, second } = doc.data();
        const friendId = first !== userId ? first : second;
        const friendDataSnapshot = await firestore
          .collection("users")
          .where("id", "==", friendId)
          .get();

        if (!friendDataSnapshot.empty) {
          const friendData = friendDataSnapshot.docs[0].data();
          friends.push(friendData);
        }
      }

      return friends;
    },
    friendshipRequests: async ({ id: userId }) => {
      const matchedFriendshipRequestsSnapshot = await firestore
        .collection("friendshipRequests")
        .where(
          Filter.or(
            Filter.where("receiver", "==", userId),
            Filter.where("sender", "==", userId)
          )
        )
        .get();

      const friendshipRequests = [];

      matchedFriendshipRequestsSnapshot.docs.forEach((doc) =>
        friendshipRequests.push(doc.data())
      );

      return friendshipRequests;
    },
    hiddenPosts: async ({ id: userId }) => {
      const hiddenPostsSnapshot = await firestore
        .collection("hiddenPosts")
        .where("userId", "==", userId)
        .get();
      const hiddenPosts = [];

      for (const doc of hiddenPostsSnapshot.docs) {
        const { postId } = doc.data();
        const postSnapshot = await firestore
          .collection("posts")
          .where("id", "==", postId)
          .get();

        if (!postSnapshot.empty) {
          const postData = postSnapshot.docs[0].data();
          hiddenPosts.push(postData);
        }
      }

      return hiddenPosts;
    },
    messages: async ({ id: userId }) => {
      const messagesSnapshot = await firestore
        .collection("messages")
        .where(
          Filter.or(
            Filter.where("receiverId", "==", userId),
            Filter.where("senderId", "==", userId)
          )
        )
        .get();
      const messages = [];

      messagesSnapshot.docs.forEach((doc) => messages.push(doc.data()));

      return messages;
    },
    placesHistory: async ({ id: userId }) => {
      const placesHistorySnapshot = await firestore
        .collection("placesHistory")
        .where("userId", "==", userId)
        .get();
      const placesHistory = [];

      placesHistorySnapshot.docs.forEach((doc) =>
        placesHistory.push(doc.data())
      );

      return placesHistory;
    },
    posts: async ({ id: userId }) => {
      const postsSnapshot = await firestore
        .collection("posts")
        .where(
          Filter.or(
            Filter.where("ownerId", "==", userId),
            Filter.where("receiverId", "==", userId)
          )
        )
        .get();
      const posts = [];

      // Checking if the post is hidden by the user
      for (const doc of postsSnapshot.docs) {
        const { id: postId } = doc.data();
        const hiddenPostsSnapshot = await firestore
          .collection("hiddenPosts")
          .where(
            Filter.and(
              Filter.where("postId", "==", postId),
              Filter.where("userId", "==", userId)
            )
          )
          .get();

        if (hiddenPostsSnapshot.empty) {
          posts.push(doc.data());
        }
      }

      return posts.sort(
        (post1, post2) =>
          +new Date(Number(post2.dateTime) - +new Date(Number(post1.dateTime)))
      );
    },
    // TODO: To be tested
    profilePhotos: async ({ id: userId }) => {
      const profilePhotosSnapshot = await firestore
        .collection("profilePhotos")
        .where("userId", "==", userId)
        .get();
      const profilePhotos = [];

      profilePhotosSnapshot.docs.forEach((doc) =>
        profilePhotos.push(doc.data())
      );

      return profilePhotos;
    },
    relationshipStatus: async ({ id: userId }) => {
      const relationshipStatusSnapshot = await firestore
        .collection("relationshipStatus")
        .where("userId", "==", userId)
        .get();

      if (relationshipStatusSnapshot.empty) {
        return null;
      }

      return relationshipStatusSnapshot.docs[0].data();
    },
    savedPosts: async ({ id: userId }) => {
      const savedPostsSnapshot = await firestore
        .collection("savedPosts")
        .where("userId", "==", userId)
        .get();
      const savedPosts = [];

      for (const doc of savedPostsSnapshot.docs) {
        const { postId } = doc.data();
        const postSnapshot = await firestore
          .collection("posts")
          .where("id", "==", postId)
          .get();

        if (!postSnapshot.empty) {
          const postData = postSnapshot.docs[0].data();
          savedPosts.push(postData);
        }
      }

      return savedPosts;
    },
    workHistory: async ({ id: userId }) => {
      const workHistorySnapshot = await firestore
        .collection("workHistory")
        .where("userId", "==", userId)
        .get();
      const workHistory = [];

      workHistorySnapshot.docs.forEach((doc) => workHistory.push(doc.data()));

      return workHistory;
    },
  },
  UserByIdResult: {
    __resolveType(obj) {
      if (obj.id) {
        return "User";
      }
      if (obj.message) {
        return obj.user ? "UserWithMessage" : "UserError";
      }

      return null;
    },
  },
  UserByUsernameResult: {
    __resolveType(obj) {
      if (obj.id) {
        return "User";
      }
      if (obj.message) {
        return "UserError";
      }

      return null;
    },
  },
  Query: {
    authenticatedUser: () => {
      return _.find(USERS_LIST, {
        id: AUTHENTICATED_USER_ID,
      });
    },
    comment: async (_parent, { id }) => {
      const commentSnapshot = await firestore
        .collection("postComments")
        .where("id", "==", id)
        .get();

      if (commentSnapshot.empty) {
        return null;
      }

      return commentSnapshot.docs[0].data();
    },
    comments: async () => {
      const commentsSnapshot = await firestore.collection("postComments").get();
      const comments = [];

      commentsSnapshot.forEach((doc) => comments.push(doc.data()));

      return comments;
    },
    commentReactions: async (_parent, { commentId }) => {
      const reactionsSnapshot = await firestore
        .collection("commentReactions")
        .where("commentId", "==", commentId)
        .get();
      const reactions = [];

      reactionsSnapshot.docs.forEach((doc) => reactions.push(doc.data()));

      return reactions;
    },
    commentReplies: async (_parent, { commentId }) => {
      const repliesSnapshot = await firestore
        .collection("postComments")
        .where("parentId", "==", commentId)
        .get();
      const replies = [];

      repliesSnapshot.docs.forEach((doc) => replies.push(doc.data()));

      return replies;
    },
    conversationBetween: async (_parent, { input: { first, second } }) => {
      const conversationSnapshot = await firestore
        .collection("conversations")
        .where(
          Filter.or(
            Filter.and(
              Filter.where("first", "==", first),
              Filter.where("second", "==", second)
            ),
            Filter.and(
              Filter.where("first", "==", second),
              Filter.where("second", "==", first)
            )
          )
        )
        .get();

      if (conversationSnapshot.empty) {
        return {
          emoji: Emoji.LIKE,
          first,
          firstNickname: null,
          second,
          secondNickname,
          theme: ConversationTheme.DEFAULT,
        };
      }

      return conversationSnapshot.docs[0].data();
    },
    friendsPostsByOwnerId: (_parent, { ownerId }) => {
      // const ownerFriendsList = _.filter(USERS_LIST, (user) =>
      //   _.some(user.friends, (friend) => friend.id === ownerId)
      // );
      const friendsPostsList = [];
      const ownerFriendsList = [];
      const authenticatedUserHiddenPosts = _.find(
        HIDDEN_POSTS_LIST,
        (hiddenPost) => hiddenPost.userId === AUTHENTICATED_USER_ID
      );

      _.forEach(FRIENDS_LIST, (friendship) => {
        const friendshipValues = Object.values(friendship);

        if (friendshipValues.includes(ownerId)) {
          const friendId = _.find(
            friendshipValues,
            (value) => value !== ownerId
          );
          const friend = _.find(USERS_LIST, (user) => user.id === friendId);

          if (friend) {
            ownerFriendsList.push(friend);
          }
        }
      });

      // const ownerFriendsList = _.find(
      //   USERS_LIST,
      //   (user) => user.id === ownerId
      // ).friends;
      // const friendsPostsList = _.filter(POSTS_LIST, (post) =>
      //   _.some(ownerFriendsList, (friend) => friend.id === post.owner.id)
      // );

      if (authenticatedUserHiddenPosts) {
        _.forEach(POSTS_LIST, (post) => {
          // Pushing into the list if authenticated user's hidden posts don't include the current one
          if (
            !authenticatedUserHiddenPosts.hiddenPosts.some(
              (hiddenPostId) => hiddenPostId === post.id
            )
          ) {
            _.forEach(ownerFriendsList, (ownerFriend) => {
              if (post.owner.id === ownerFriend.id) {
                friendsPostsList.push(post);
              }
            });
          }
        });
      } else {
        _.forEach(POSTS_LIST, (post) => {
          _.forEach(ownerFriendsList, (ownerFriend) => {
            if (post.owner.id === ownerFriend.id) {
              friendsPostsList.push(post);
            }
          });
        });
      }

      return friendsPostsList.length > 0
        ? friendsPostsList.sort(
            (p1, p2) =>
              +new Date(Number(p2.dateTime) - +new Date(Number(p1.dateTime)))
          )
        : null;
    },
    friendshipSuggestionsById: (_parent, { id }) => {
      const matchedUserFriends = getUserFriends(id);
      const matchedUserFriendshipRequests = _.filter(
        FRIEND_REQUESTS_LIST,
        (request) => request.receiver === id || request.sender === id
      );

      return USERS_LIST.filter((user) => {
        const { id: userId } = user;
        const isMatchedUser = userId === id;
        const isMatchedUserFriend = matchedUserFriends.find(
          (matchedUserFriend) => matchedUserFriend.id === userId
        );
        const usersHaveFriendshipRequest = matchedUserFriendshipRequests.find(
          (request) =>
            (request.receiver === id && request.sender === userId) ||
            (request.receiver === userId && request.sender === id)
        );

        return (
          !isMatchedUser && !isMatchedUserFriend && !usersHaveFriendshipRequest
        );
      });
    },
    messagesBetween: async (_parent, { input: { first, second } }) => {
      const messagesSnapshot = await firestore
        .collection("messages")
        .where(
          Filter.or(
            Filter.and(
              Filter.where("receiverId", "==", first),
              Filter.where("senderId", "==", second)
            ),
            Filter.and(
              Filter.where("receiverId", "==", second),
              Filter.where("senderId", "==", first)
            )
          )
        )
        .get();
      const messages = [];

      messagesSnapshot.docs.forEach((doc) => messages.push(doc.data()));

      return messages;
    },
    post: async (_parent, { id }) => {
      const postSnapshot = await firestore
        .collection("posts")
        .where("id", "==", id)
        .get();

      if (postSnapshot.empty) {
        return null;
      }

      return postSnapshot.docs[0].data();
    },
    posts: async () => {
      const postsSnapshot = await firestore.collection("posts").get();
      const posts = [];

      postsSnapshot.forEach(({ data }) => posts.push(data()));

      return posts;
    },
    postsByOwnerId: async (_parent, { ownerId }) => {
      const postsSnapshot = await firestore
        .collection("posts")
        .where("ownerId", "==", ownerId)
        .get();
      const posts = [];

      postsSnapshot.docs.forEach((doc) => posts.push(doc.data()));

      return posts;
    },
    userById: async (
      _parent,
      { input: { id, returnUserIfBlocked = false } }
    ) => {
      const userSnapshot = firestore.collection("users").doc(id);
      const userData = await userSnapshot.get();
      const matchedUser = userData.data();

      if (!matchedUser) {
        return { message: "NOT_FOUND" };
      }

      // Authenticated user's blocked users
      const blockedUsers = _.find(
        BLOCKED_USERS_LIST,
        (blockedUser) => blockedUser.userId === AUTHENTICATED_USER_ID
      );

      // Checking if the authenticated user has blocked the user
      if (blockedUsers) {
        const isBlocked = !!_.find(
          blockedUsers.blockedUsers,
          (userId) => userId === matchedUser.id
        );

        if (isBlocked) {
          return returnUserIfBlocked
            ? { message: "BLOCKED", user: matchedUser }
            : { message: "BLOCKED" };
        }
      }

      return matchedUser;
    },
    userByUsername: async (_parent, { username }) => {
      const userSnapshot = firestore
        .collection("users")
        .where("username", "==", username);
      const userData = await userSnapshot.get();
      const matchedUser = userData.docs[0].data();

      if (!matchedUser) {
        return { message: "NOT_FOUND" };
      }

      // Authenticated user's blocked users
      const blockedUsers = _.find(
        BLOCKED_USERS_LIST,
        (blockedUser) => blockedUser.userId === AUTHENTICATED_USER_ID
      );

      // Checking if the authenticated user has blocked the user
      if (blockedUsers) {
        const isBlocked = !!_.find(
          blockedUsers.blockedUsers,
          (userId) => userId === matchedUser.id
        );

        if (isBlocked) {
          return { message: "BLOCKED" };
        }
      }

      return matchedUser;
    },
    userFriendsById: (_parent, { id }) => {
      console.log(_.find(USERS_LIST, (user) => user.id === id));

      return _.find(USERS_LIST, (user) => user.id === id).friends;
    },
    userFriendsByUsername: (_parent, { username }) => {
      return _.find(USERS_LIST, (user) => user.username === username).friends;
    },
    userPostReaction: async (_parent, { input: { postId, userId } }) => {
      // Checking if the user exists
      const userSnapshot = await firestore
        .collection("users")
        .where("id", "==", userId)
        .get();

      if (userSnapshot.empty) {
        return null;
      }

      // Checking if the post exists
      const postSnapshot = await firestore
        .collection("posts")
        .where("id", "==", postId)
        .get();

      if (postSnapshot.empty) {
        return null;
      }

      // Searching user's reaction
      const postReactionSnapshot = await firestore
        .collection("postReactions")
        .where(
          Filter.and(
            Filter.where("postId", "==", postId),
            Filter.where("userId", "==", userId)
          )
        )
        .get();

      if (postReactionSnapshot.empty) {
        return null;
      }

      return postReactionSnapshot.docs[0].data();

      // const matchedPost = _.find(POSTS_LIST, (post) => post.id === postId);
      // const matchedReaction = _.find(
      //   matchedPost.reactions,
      //   (reaction) => reaction.owner.id === userId
      // );
      // return matchedReaction;
    },
    userBlockedList: async (_parent, { id: userId }) => {
      // Checking if the user exists
      const userSnapshot = await firestore
        .collection("users")
        .where("id", "==", userId)
        .get();

      if (userSnapshot.empty) {
        return null;
      }

      const blockedUsersSnapshot = await firestore
        .collection("blockedUsers")
        .where("userId", "==", userId)
        .get();
      const blockedUsers = [];

      blockedUsersSnapshot.docs.forEach((doc) => blockedUsers.push(doc.data()));

      return blockedUsers;
    },
    users: async () => {
      const usersSnapshot = await firestore.collection("users").get();
      const users = [];

      usersSnapshot.forEach((doc) => users.push(doc.data()));

      return users;
    },
  },
  Mutation: {
    addComment: async (
      _parent,
      { input: { commentOwnerId, parentId, postId, text } }
    ) => {
      // Checking if the user exists
      const commentOwnerSnapshot = await firestore
        .collection("users")
        .where("id", "==", commentOwnerId)
        .get();

      if (commentOwnerSnapshot.empty) {
        return null;
      }

      // Checking if the post exists
      const postSnapshot = await firestore
        .collection("posts")
        .where("id", "==", postId)
        .get();

      if (postSnapshot.empty) {
        return null;
      }

      const newComment = {
        dateTime: new Date().getTime().toString(),
        ownerId: commentOwnerId,
        parentId,
        postId,
        text,
      };

      const { id } = await firestore.collection("postComments").add(newComment);
      await firestore.collection("postComments").doc(id).update({ id });

      return { ...newComment, id };
    },
    addCommentReaction: async (
      _parent,
      { input: { commentId, reactionType, userId } }
    ) => {
      // Checking if the user exists
      const userSnapshot = await firestore
        .collection("users")
        .where("id", "==", userId)
        .get();

      if (userSnapshot.empty) {
        return null;
      }

      // Checking if the comment exists
      const commentSnapshot = await firestore
        .collection("postComments")
        .where("id", "==", commentId)
        .get();

      if (commentSnapshot.empty) {
        return null;
      }

      // Checking if the user already reacted to the comment
      const commentReactionSnapshot = await firestore
        .collection("commentReactions")
        .where(
          Filter.and(
            Filter.where("commentId", "==", commentId),
            Filter.where("userId", "==", userId)
          )
        )
        .get();

      if (!commentReactionSnapshot.empty) {
        const commentReaction = commentReactionSnapshot.docs[0].data();
        const { id } = commentReaction;
        const updatedDateTime = new Date().getTime().toString();

        await firestore
          .collection("commentReactions")
          .doc(id)
          .update({ dateTime: updatedDateTime, reactionType });

        return { ...commentReaction, dateTime: updatedDateTime, reactionType };
      }

      const newCommentReaction = {
        commentId,
        dateTime: new Date().getTime().toString(),
        reactionType,
        userId,
      };

      const { id } = await firestore
        .collection("commentReactions")
        .add(newCommentReaction);
      await firestore.collection("commentReactions").doc(id).update({ id });

      return { ...newCommentReaction, id };
    },
    addMessage: async (
      _parent,
      { input: { emoji, parentId, receiverId, senderId, text } }
    ) => {
      // Checking if the users exist
      const usersSnapshot = await firestore
        .collection("users")
        .where(
          Filter.or(
            Filter.where("id", "==", receiverId),
            Filter.where("id", "==", senderId)
          )
        )
        .get();

      if (usersSnapshot.docs.length < 2) {
        return null;
      }

      const newMessage = {
        dateTime: new Date().getTime().toString(),
        emoji: emoji || null,
        parentId,
        receiverId,
        senderId,
        text: text || null,
      };
      const { id } = await firestore.collection("messages").add(newMessage);
      await firestore.collection("messages").doc(id).update({ id });

      return { ...newMessage, id };
    },
    addPostReaction: async (
      _parent,
      { input: { postId, reactionType, userId } }
    ) => {
      // Checking if the user exists
      const userSnapshot = await firestore
        .collection("users")
        .where("id", "==", userId)
        .get();

      if (userSnapshot.empty) {
        return null;
      }

      // Checking if the post exists
      const postSnapshot = await firestore
        .collection("posts")
        .where("id", "==", postId)
        .get();

      if (postSnapshot.empty) {
        return null;
      }

      // Checking if the user already reacted to the post
      const postReactionSnapshot = await firestore
        .collection("postReactions")
        .where(
          Filter.and(
            Filter.where("postId", "==", postId),
            Filter.where("userId", "==", userId)
          )
        )
        .get();

      if (!postReactionSnapshot.empty) {
        const postReaction = postReactionSnapshot.docs[0].data();
        const { id } = postReaction;
        const updatedDateTime = new Date().getTime().toString();

        await firestore
          .collection("postReactions")
          .doc(id)
          .update({ dateTime: updatedDateTime, reactionType });

        return { ...postReaction, dateTime: updatedDateTime, reactionType };
      }

      const newPostReaction = {
        dateTime: new Date().getTime().toString(),
        postId,
        reactionType,
        userId,
      };

      const { id } = await firestore
        .collection("postReactions")
        .add(newPostReaction);
      await firestore.collection("postReactions").doc(id).update({ id });

      return { ...newPostReaction, id };
    },
    addUserCollegeEducation: async (
      _parent,
      { input: { degree, from, graduated, school, to, userId, visibility } }
    ) => {
      // Checking if the user exists
      const userSnapshot = await firestore
        .collection("users")
        .where("id", "==", userId)
        .get();

      if (userSnapshot.empty) {
        return null;
      }

      const newEducation = {
        degree,
        from: new Date(Number(from)).getTime().toString(),
        graduated,
        level: EducationLevel.COLLEGE,
        school,
        to: to ? new Date(Number(to)).getTime().toString() : null,
        userId,
        visibility,
      };
      const { id } = await firestore
        .collection("educationHistory")
        .add(newEducation);
      await firestore.collection("educationHistory").doc(id).update({ id });

      return { ...newEducation, id };
    },
    addUserFriend: async (_parent, { input: { first, second } }) => {
      // Checking if the users exist
      const userSnapshot = await firestore
        .collection("users")
        .where(
          Filter.or(
            Filter.where("id", "==", first),
            Filter.where("id", "==", second)
          )
        )
        .get();

      if (userSnapshot.docs.length < 2) {
        return null;
      }

      const matchedFriendshipSnapshot = await firestore
        .collection("friendships")
        .where(
          Filter.or(
            Filter.and(
              Filter.where("first", "==", first),
              Filter.where("second", "==", second)
            ),
            Filter.and(
              Filter.where("first", "==", second),
              Filter.where("second", "==", first)
            )
          )
        )
        .get();

      if (!matchedFriendshipSnapshot.empty) {
        return null;
      }

      const newFriendship = { first, second };

      const { id } = await firestore
        .collection("friendships")
        .add(newFriendship);
      firestore.collection("friendships").doc(id).update({ id });

      return { ...newFriendship, id };
    },
    addUserHighSchoolEducation: async (
      _parent,
      { input: { from, graduated, school, to, userId, visibility } }
    ) => {
      // Checking if the user exists
      const userSnapshot = await firestore
        .collection("users")
        .where("id", "==", userId)
        .get();

      if (userSnapshot.empty) {
        return null;
      }

      const newEducation = {
        from: new Date(Number(from)).getTime().toString(),
        graduated,
        level: EducationLevel.HIGH_SCHOOL,
        school,
        to: to ? new Date(Number(to)).getTime().toString() : null,
        userId,
        visibility,
      };
      const { id } = await firestore
        .collection("educationHistory")
        .add(newEducation);
      await firestore.collection("educationHistory").doc(id).update({ id });

      return { ...newEducation, id };
    },
    addUserPlace: async (
      _parent,
      { input: { city, from, isCurrent, to, userId, visibility } }
    ) => {
      // Checking if the user exists
      const userSnapshot = await firestore
        .collection("users")
        .where("id", "==", userId)
        .get();

      if (userSnapshot.empty) {
        return null;
      }

      const newPlace = {
        city,
        from: new Date(Number(from)).getTime().toString(),
        isCurrent,
        to: to ? new Date(Number(to)).getTime().toString() : null,
        userId,
        visibility,
      };
      const { id } = await firestore.collection("placesHistory").add(newPlace);
      await firestore.collection("placesHistory").doc(id).update({ id });

      return { ...newPlace, id };
    },
    addUserRelationshipStatus: async (
      _parent,
      { input: { status, userId, visibility } }
    ) => {
      // Checking if the user exists
      const userSnapshot = await firestore
        .collection("users")
        .where("id", "==", userId)
        .get();

      if (userSnapshot.empty) {
        return null;
      }

      const relationshipStatusSnapshot = await firestore
        .collection("relationshipStatus")
        .where("userId", "==", userId)
        .get();

      // Updating the document reference if a relationship status was found
      if (!relationshipStatusSnapshot.empty) {
        const firstDocument = relationshipStatusSnapshot.docs[0];

        firstDocument.ref.update({ status, visibility });
        return {
          ...firstDocument.data(),
          status,
          visibility,
        };
      }

      const newRelationshipStatus = { status, userId, visibility };
      const { id } = await firestore
        .collection("relationshipStatus")
        .add(newRelationshipStatus);
      await firestore.collection("relationshipStatus").doc(id).update({ id });

      return { ...newRelationshipStatus, id };
    },
    addUserWorkplace: async (
      _parent,
      { input: { company, from, isCurrent, position, to, userId, visibility } }
    ) => {
      // Checking if the user exists
      const userSnapshot = await firestore
        .collection("users")
        .where("id", "==", userId)
        .get();

      if (userSnapshot.empty) {
        return null;
      }

      const newWorkplace = {
        company,
        from: new Date(Number(from)).getTime().toString(),
        isCurrent,
        position,
        to: to ? new Date(Number(to)).getTime().toString() : null,
        userId,
        visibility,
      };
      const { id } = await firestore
        .collection("workHistory")
        .add(newWorkplace);
      await firestore.collection("workHistory").doc(id).update({ id });

      return { ...newWorkplace, id };
    },
    blockUser: async (_parent, { input: { blockedUserId, userId } }) => {
      // Checking if the user wants to block himself/herself
      if (blockedUserId === userId) {
        return null;
      }

      // Checking if the users exist
      const usersSnapshot = await firestore
        .collection("users")
        .where(
          Filter.or(
            Filter.where("id", "==", blockedUserId),
            Filter.where("id", "==", userId)
          )
        )
        .get();

      if (usersSnapshot.docs.length < 2) {
        return null;
      }

      // Checking if the user to be blocked is already blocked
      const blockedUsersSnapshot = await firestore
        .collection("blockedUsers")
        .where(
          Filter.and(
            Filter.where("blockedUserId", "==", blockedUserId),
            Filter.where("userId", "==", userId)
          )
        )
        .get();

      if (!blockedUsersSnapshot.empty) {
        return null;
      }

      const newBlockRelationship = { blockedUserId, userId };

      const { id } = await firestore
        .collection("blockedUsers")
        .add(newBlockRelationship);
      await firestore.collection("blockedUsers").doc(id).update({ id });

      return { ...newBlockRelationship, id };
    },
    createPost: async (
      _parent,
      { input: { ownerId, parentId, receiverId, text, visibility } }
    ) => {
      // Checking if the users exist
      const userSnapshot = await firestore
        .collection("users")
        .where(
          Filter.or(
            Filter.where("id", "==", ownerId),
            Filter.where("id", "==", receiverId)
          )
        )
        .get();

      if (userSnapshot.docs.length < 2) {
        return null;
      }

      const newPost = {
        canComment: visibility,
        canReact: visibility,
        canShare: visibility,
        dateTime: new Date().getTime().toString(),
        ownerId,
        parentId,
        receiverId,
        text,
        video: null,
        visibility,
      };

      const { id } = await firestore.collection("posts").add(newPost);
      await firestore.collection("posts").doc(id).update({ id });

      return { ...newPost, id };
    },
    followUser: async (_parent, { input: { followingUserId, userId } }) => {
      // Checking if the user wants to follow himself/herself
      if (userId === followingUserId) {
        return null;
      }

      // Checking if the users exist
      const usersSnapshot = await firestore
        .collection("users")
        .where(
          Filter.or(
            Filter.where("id", "==", followingUserId),
            Filter.where("id", "==", userId)
          )
        )
        .get();

      if (usersSnapshot.docs.length < 2) {
        return null;
      }

      // Checking if the user is already following the second user
      const followRelationshipSnapshot = await firestore
        .collection("follows")
        .where(
          Filter.and(
            Filter.where("userId", "==", userId),
            Filter.where("followingUserId", "==", followingUserId)
          )
        )
        .get();

      if (!followRelationshipSnapshot.empty) {
        return null;
      }

      const newFollowRelationship = { userId, followingUserId };

      const { id } = await firestore
        .collection("follows")
        .add(newFollowRelationship);
      await firestore.collection("follows").doc(id).update({ id });

      return { ...newFollowRelationship, id };
    },
    hidePost: async (_parent, { input: { postId, userId } }) => {
      // Checking if the user exists
      const userSnapshot = await firestore
        .collection("users")
        .where("id", "==", userId)
        .get();

      if (userSnapshot.empty) {
        return null;
      }

      // Checking if the post exists
      const postSnapshot = await firestore
        .collection("posts")
        .where("id", "==", postId)
        .get();

      if (postSnapshot.empty) {
        return null;
      }

      // Checking if the user already hid the post
      const hiddenPostsSnapshot = await firestore
        .collection("hiddenPosts")
        .where(
          Filter.and(
            Filter.where("userId", "==", userId),
            Filter.where("postId", "==", postId)
          )
        )
        .get();

      if (!hiddenPostsSnapshot.empty) {
        return null;
      }

      const newHiddenPost = { postId, userId };

      const { id } = await firestore
        .collection("hiddenPosts")
        .add(newHiddenPost);
      await firestore.collection("hiddenPosts").doc(id).update({ id });

      return { ...newHiddenPost, id };
    },
    removeComment: async (_parent, { id }) => {
      // Checking if the comment exists
      const commentSnapshot = await firestore
        .collection("postComments")
        .where("id", "==", id)
        .get();

      if (commentSnapshot.empty) {
        return null;
      }

      const removedComment = commentSnapshot.docs[0].data();
      await firestore.collection("postComments").doc(id).delete();

      return removedComment;
    },
    removeCommentReaction: async (
      _parent,
      { input: { commentId, userId } }
    ) => {
      // Checking if the user exists
      const userSnapshot = await firestore
        .collection("users")
        .where("id", "==", userId)
        .get();

      if (userSnapshot.empty) {
        return null;
      }

      // Checking if the comment exists
      const commentSnapshot = await firestore
        .collection("postComments")
        .where("id", "==", commentId)
        .get();

      if (commentSnapshot.empty) {
        return null;
      }

      // Checking if the user reacted to the comment
      const commentReactionSnapshot = await firestore
        .collection("commentReactions")
        .where(
          Filter.and(
            Filter.where("commentId", "==", commentId),
            Filter.where("userId", "==", userId)
          )
        )
        .get();

      if (commentReactionSnapshot.empty) {
        return null;
      }

      const removedCommentReaction = commentReactionSnapshot.docs[0].data();
      const { id } = removedCommentReaction;
      await firestore.collection("commentReactions").doc(id).delete();

      return removedCommentReaction;
    },
    removePost: async (_parent, { id }) => {
      // Checking if the post exists
      const postSnapshot = await firestore
        .collection("posts")
        .where("id", "==", id)
        .get();

      if (postSnapshot.empty) {
        return null;
      }

      const removedPost = postSnapshot.docs[0].data();
      await firestore.collection("posts").doc(id).delete();

      return removedPost;
    },
    removePostReaction: async (_parent, { input: { postId, userId } }) => {
      // Checking if the user exists
      const userSnapshot = await firestore
        .collection("users")
        .where("id", "==", userId)
        .get();

      if (userSnapshot.empty) {
        return null;
      }

      // Checking if the post exists
      const postSnapshot = await firestore
        .collection("posts")
        .where("id", "==", postId)
        .get();

      if (postSnapshot.empty) {
        return null;
      }

      // Checking if the user reacted to the post
      const postReactionSnapshot = await firestore
        .collection("postReactions")
        .where(
          Filter.and(
            Filter.where("postId", "==", postId),
            Filter.where("userId", "==", userId)
          )
        )
        .get();

      if (postReactionSnapshot.empty) {
        return null;
      }

      const removedPostReaction = postReactionSnapshot.docs[0].data();
      const { id } = removedPostReaction;
      await firestore.collection("postReactions").doc(id).delete();

      return removedPostReaction;
    },
    removeUserFriend: async (_parent, { input: { first, second } }) => {
      if (first === second) {
        return null;
      }

      // Checking if the users exist
      const usersSnapshot = await firestore
        .collection("users")
        .where(
          Filter.or(
            Filter.where("id", "==", first),
            Filter.where("id", "==", second)
          )
        )
        .get();

      if (usersSnapshot.docs.length < 2) {
        return null;
      }

      // Checking if the users are friends
      const friendshipSnapshot = await firestore
        .collection("friendships")
        .where(
          Filter.or(
            Filter.and(
              Filter.where("first", "==", first),
              Filter.where("second", "==", second)
            ),
            Filter.and(
              Filter.where("first", "==", second),
              Filter.where("second", "==", first)
            )
          )
        )
        .get();

      if (friendshipSnapshot.empty) {
        return null;
      }

      const friendship = friendshipSnapshot.docs[0].data();
      const friendshipId = friendshipSnapshot.docs[0].id;

      await firestore.collection("friendships").doc(friendshipId).delete();

      return friendship;
    },
    removeUserFriendshipRequest: async (
      _parent,
      { input: { receiver, sender } }
    ) => {
      // Checking if the users exist
      const usersSnapshot = await firestore
        .collection("users")
        .where(
          Filter.or(
            Filter.where("id", "==", receiver),
            Filter.where("id", "==", sender)
          )
        )
        .get();

      if (usersSnapshot.docs.length < 2) {
        return null;
      }

      // Checking if a friendship request exists
      const matchedFriendshipRequestsSnapshot = await firestore
        .collection("friendshipRequests")
        .where(
          Filter.or(
            Filter.and(
              Filter.where("receiver", "==", receiver),
              Filter.where("sender", "==", sender)
            ),
            Filter.and(
              Filter.where("receiver", "==", sender),
              Filter.where("sender", "==", receiver)
            )
          )
        )
        .get();

      if (matchedFriendshipRequestsSnapshot.empty) {
        return null;
      }

      const request = matchedFriendshipRequestsSnapshot.docs[0].data();
      const requestId = matchedFriendshipRequestsSnapshot.docs[0].id;

      await firestore.collection("friendshipRequests").doc(requestId).delete();

      return request;
    },
    savePost: async (_parent, { input: { postId, userId } }) => {
      // Checking if the user exists
      const userSnapshot = await firestore
        .collection("users")
        .where("id", "==", userId)
        .get();

      if (userSnapshot.empty) {
        return null;
      }

      // Checking if the post exists
      const postSnapshot = await firestore
        .collection("posts")
        .where("id", "==", postId)
        .get();

      if (postSnapshot.empty) {
        return null;
      }

      // Checking if the user already saved the post
      const savedPostsSnapshot = await firestore
        .collection("savedPosts")
        .where(
          Filter.and(
            Filter.where("userId", "==", userId),
            Filter.where("postId", "==", postId)
          )
        )
        .get();

      if (!savedPostsSnapshot.empty) {
        return null;
      }

      const newSavedPost = { postId, userId };

      const { id } = await firestore.collection("savedPosts").add(newSavedPost);
      await firestore.collection("savedPosts").doc(id).update({ id });

      return { ...newSavedPost, id };
    },
    sendUserFriendshipRequest: async (
      _parent,
      { input: { receiver, sender } }
    ) => {
      // Checking if the user wants to send himself/herself a friendship request
      if (receiver === sender) {
        return null;
      }

      // Checking if the users exist
      const usersSnapshot = await firestore
        .collection("users")
        .where(
          Filter.or(
            Filter.where("id", "==", receiver),
            Filter.where("id", "==", sender)
          )
        )
        .get();

      if (usersSnapshot.docs.length < 2) {
        return null;
      }

      // Checking if a friendship between users already exists
      const friendshipsSnapshot = await firestore
        .collection("friendships")
        .where(
          Filter.or(
            Filter.and(
              Filter.where("first", "==", receiver),
              Filter.where("second", "==", sender)
            ),
            Filter.and(
              Filter.where("first", "==", sender),
              Filter.where("second", "==", receiver)
            )
          )
        )
        .get();

      if (!friendshipsSnapshot.empty) {
        return null;
      }

      // Checking if a friendship request is already sent
      const matchedFriendshipRequestsSnapshot = await firestore
        .collection("friendshipRequests")
        .where(
          Filter.or(
            Filter.where("receiver", "==", receiver),
            Filter.where("sender", "==", sender)
          )
        )
        .get();

      if (!matchedFriendshipRequestsSnapshot.empty) {
        return null;
      }

      const newFriendshipRequest = { receiver, sender };

      const { id } = await firestore
        .collection("friendshipRequests")
        .add(newFriendshipRequest);
      await firestore.collection("friendshipRequests").doc(id).update({ id });

      return { ...newFriendshipRequest, id };
    },
    unblockUser: async (_parent, { input: { blockedUserId, userId } }) => {
      // Checking if the user wants to unblock himself/herself
      if (blockedUserId === userId) {
        return null;
      }

      // Checking if the users exist
      const usersSnapshot = await firestore
        .collection("users")
        .where(
          Filter.or(
            Filter.where("id", "==", blockedUserId),
            Filter.where("id", "==", userId)
          )
        )
        .get();

      if (usersSnapshot.docs.length < 2) {
        return null;
      }

      // Checking if the blockedUser is blocked by the user
      const blockedUsersSnapshot = await firestore
        .collection("blockedUsers")
        .where(
          Filter.and(
            Filter.where("blockedUserId", "==", blockedUserId),
            Filter.where("userId", "==", userId)
          )
        )
        .get();

      if (blockedUsersSnapshot.empty) {
        return null;
      }

      const blockRelationship = blockedUsersSnapshot.docs[0].data();
      const blockRelationshipId = blockedUsersSnapshot.docs[0].id;

      await firestore
        .collection("blockedUsers")
        .doc(blockRelationshipId)
        .delete();

      return blockRelationship;
    },
    unfollowUser: async (_parent, { input: { followingUserId, userId } }) => {
      // Checking if the user wants to unfollow himself/herself
      if (userId === followingUserId) {
        return null;
      }

      // Checking if the users exist
      const usersSnapshot = await firestore
        .collection("users")
        .where(
          Filter.or(
            Filter.where("id", "==", followingUserId),
            Filter.where("id", "==", userId)
          )
        )
        .get();

      if (usersSnapshot.docs.length < 2) {
        return null;
      }

      // Checking if the user is following the second user
      const followRelationshipSnapshot = await firestore
        .collection("follows")
        .where(
          Filter.and(
            Filter.where("userId", "==", userId),
            Filter.where("followingUserId", "==", followingUserId)
          )
        )
        .get();

      if (followRelationshipSnapshot.empty) {
        return null;
      }

      const followRelationship = followRelationshipSnapshot.docs[0].data();
      const followRelationshipId = followRelationshipSnapshot.docs[0].id;

      await firestore.collection("follows").doc(followRelationshipId).delete();

      return followRelationship;
    },
    unsavePost: async (_parent, { input: { postId, userId } }) => {
      // Checking if the user exists
      const userSnapshot = await firestore
        .collection("users")
        .where("id", "==", userId)
        .get();

      if (userSnapshot.empty) {
        return null;
      }

      // Checking if the post exists
      const postSnapshot = await firestore
        .collection("posts")
        .where("id", "==", postId)
        .get();

      if (postSnapshot.empty) {
        return null;
      }

      // Checking if the user saved the post
      const savedPostsSnapshot = await firestore
        .collection("savedPosts")
        .where(
          Filter.and(
            Filter.where("userId", "==", userId),
            Filter.where("postId", "==", postId)
          )
        )
        .get();

      if (savedPostsSnapshot.empty) {
        return null;
      }

      const savePostRelationship = savedPostsSnapshot.docs[0].data();
      const savePostRelationshipId = savedPostsSnapshot.docs[0].id;

      await firestore
        .collection("savedPosts")
        .doc(savePostRelationshipId)
        .delete();

      return savePostRelationship;
    },
    updateConversationEmoji: async (
      _parent,
      { input: { emoji, first, second } }
    ) => {
      // Checking if the users exist
      const usersSnapshot = await firestore
        .collection("users")
        .where(
          Filter.or(
            Filter.where("id", "==", first),
            Filter.where("id", "==", second)
          )
        )
        .get();

      if (usersSnapshot.docs.length < 2) {
        return null;
      }

      // Checking if their conversation emoji is default (it doesn't exist)
      const conversationDetailsSnapshot = await firestore
        .collection("conversationDetails")
        .where(
          Filter.or(
            Filter.and(
              Filter.where("first", "==", first),
              Filter.where("second", "==", second)
            ),
            Filter.and(
              Filter.where("first", "==", second),
              Filter.where("second", "==", first)
            )
          )
        )
        .get();

      if (conversationDetailsSnapshot.empty) {
        // Adding conversation's emoji
        const newConversationDetails = { emoji, first, second };

        const { id } = await firestore
          .collection("conversationDetails")
          .add(newConversationDetails);
        await firestore
          .collection("conversationDetails")
          .doc(id)
          .update({ id });

        return { ...newConversationDetails, id };
      }

      // Updating conversation's emoji
      const conversationDetails = conversationDetailsSnapshot.docs[0].data();
      const { id } = conversationDetails;

      await firestore
        .collection("conversationDetails")
        .doc(id)
        .update({ emoji });

      return {
        ...conversationDetails,
        emoji,
      };
    },
    updateConversationNickname: async (
      _parent,
      { input: { first, nickname, second, userId } }
    ) => {
      // Checking the "userId" is either the first or the second user
      if (userId !== first && userId !== second) {
        return null;
      }

      // Checking if the users exist
      const userSnapshot = await firestore
        .collection("users")
        .where(
          Filter.or(
            Filter.where("id", "==", first),
            Filter.where("id", "==", second)
          )
        )
        .get();

      if (userSnapshot.docs.length < 2) {
        return null;
      }

      // Checking if their conversation details exist
      const conversationDetailsSnapshot = await firestore
        .collection("conversationDetails")
        .where(
          Filter.or(
            Filter.and(
              Filter.where("first", "==", first),
              Filter.where("second", "==", second)
            ),
            Filter.and(
              Filter.where("first", "==", second),
              Filter.where("second", "==", first)
            )
          )
        )
        .get();

      if (conversationDetailsSnapshot.empty) {
        if (!nickname) {
          return null;
        }

        // Adding
        const isFirstUserNicknameUpdated = userId === first;
        let newConversationDetails = { first, second };

        if (isFirstUserNicknameUpdated) {
          newConversationDetails = {
            ...newConversationDetails,
            firstNickname: nickname,
          };
        } else {
          newConversationDetails = {
            ...newConversationDetails,
            secondNickname: nickname,
          };
        }

        const { id } = await firestore
          .collection("conversationDetails")
          .add(newConversationDetails);
        await firestore
          .collection("conversationDetails")
          .doc(id)
          .update({ id });

        return { ...newConversationDetails, id };
      }

      // Updating
      let conversationDetails = conversationDetailsSnapshot.docs[0].data();
      const {
        first: databaseFirst,
        id,
        second: databaseSecond,
      } = conversationDetails;
      const isFirstUserNicknameUpdated = userId === databaseFirst;

      if (isFirstUserNicknameUpdated) {
        if (!nickname) {
          await firestore
            .collection("conversationDetails")
            .doc(id)
            .update({ firstNickname: FieldValue.delete() });
          delete conversationDetails["firstNickname"];

          return conversationDetails;
        }

        const firstNickname = nickname;

        conversationDetails = {
          ...conversationDetails,
          firstNickname,
        };
        await firestore
          .collection("conversationDetails")
          .doc(id)
          .update({ firstNickname });

        return {
          ...conversationDetails,
          firstNickname,
        };
      } else {
        if (!nickname) {
          await firestore
            .collection("conversationDetails")
            .doc(id)
            .update({ secondNickname: FieldValue.delete() });
          delete conversationDetails["secondNickname"];

          return conversationDetails;
        }

        const secondNickname = nickname;

        conversationDetails = {
          ...conversationDetails,
          secondNickname,
        };
        await firestore
          .collection("conversationDetails")
          .doc(id)
          .update({ secondNickname });

        return {
          ...conversationDetails,
          secondNickname,
        };
      }
    },
    updateConversationTheme: async (
      _parent,
      { input: { first, second, theme } }
    ) => {
      // Checking if the users exist
      const usersSnapshot = await firestore
        .collection("users")
        .where(
          Filter.or(
            Filter.where("id", "==", first),
            Filter.where("id", "==", second)
          )
        )
        .get();

      if (usersSnapshot.docs.length < 2) {
        return null;
      }

      // Checking if their conversation theme is default (it doesn't exist)
      const conversationDetailsSnapshot = await firestore
        .collection("conversationDetails")
        .where(
          Filter.or(
            Filter.and(
              Filter.where("first", "==", first),
              Filter.where("second", "==", second)
            ),
            Filter.and(
              Filter.where("first", "==", second),
              Filter.where("second", "==", first)
            )
          )
        )
        .get();

      if (conversationDetailsSnapshot.empty) {
        // Adding conversation's theme
        const newConversationDetails = { first, second, theme };

        const { id } = await firestore
          .collection("conversationDetails")
          .add(newConversationDetails);
        await firestore
          .collection("conversationDetails")
          .doc(id)
          .update({ id });

        return { ...newConversationDetails, id };
      }

      // Updating conversation's theme
      const conversationDetails = conversationDetailsSnapshot.docs[0].data();
      const { id } = conversationDetails;

      await firestore
        .collection("conversationDetails")
        .doc(id)
        .update({ theme });

      return {
        ...conversationDetails,
        theme,
      };
    },
    updateUserPlace: async (
      _parent,
      { input: { city, from, isCurrent, placeId, to, userId, visibility } }
    ) => {
      // Checking if the user exists
      const userSnapshot = await firestore
        .collection("users")
        .where("id", "==", userId)
        .get();

      if (userSnapshot.empty) {
        return null;
      }

      // Checking if the living place exists
      const livingPlaceSnapshot = await firestore
        .collection("placesHistory")
        .where("id", "==", placeId)
        .get();

      if (livingPlaceSnapshot.empty) {
        return null;
      }

      let updatedPlace = livingPlaceSnapshot.docs[0].data();

      // Checking if the place belongs to the user
      if (updatedPlace.userId !== userId) {
        return null;
      }

      if (
        typeof city !== "undefined" &&
        !!city &&
        city.trim().length > 0 &&
        city !== updatedPlace.city
      ) {
        updatedPlace = { ...updatedPlace, city };
      }

      if (
        typeof from !== "undefined" &&
        !!from &&
        from.trim().length > 0 &&
        from !== updatedPlace.from
      ) {
        updatedPlace = { ...updatedPlace, from };
      }

      // Updating "isCurrent" and "to" if both are valid -> if one of them is not, skip update
      // If "isCurrent" parameter is null -> skip update
      // If "isCurrent" parameter is true and "to" from database is not null -> update fields
      // If "isCurrent" parameter is false and "to" parameter is valid -> update fields
      if (
        typeof isCurrent !== "undefined" &&
        isCurrent !== null &&
        isCurrent !== updatedPlace.isCurrent
      ) {
        if (isCurrent) {
          if (!!updatedPlace.to) {
            updatedPlace = { ...updatedPlace, isCurrent, to: null };
          }
        } else if (typeof to !== "undefined" && !!to && to.trim().length > 0) {
          updatedPlace = { ...updatedPlace, isCurrent, to };
        }
      }

      if (
        typeof visibility !== "undefined" &&
        visibility.trim().length > 0 &&
        visibility !== updatedPlace.visibility
      ) {
        updatedPlace = { ...updatedPlace, visibility };
      }

      await firestore
        .collection("placesHistory")
        .doc(updatedPlace.id)
        .update({ ...updatedPlace });

      return updatedPlace;
    },
  },
};

module.exports = { resolvers };
