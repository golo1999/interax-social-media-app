const crypto = require("crypto");
const _ = require("lodash");

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
  COMMENTS_LIST,
  CONVERSATIONS_LIST,
  ConversationTheme,
  Emoji,
  FRIEND_REQUESTS_LIST,
  FRIENDS_LIST,
  MESSAGES_LIST,
  POST_PHOTOS_LIST,
  POSTS_LIST,
  SAVED_POSTS_LIST,
  USERS_LIST,
} = require("../MockedData");

const resolvers = {
  Comment: {
    owner: ({ ownerId }) => {
      return _.find(USERS_LIST, (user) => user.id === ownerId);
    },
  },
  Post: {
    comments: ({ id }) => {
      return _.filter(COMMENTS_LIST, (comment) => comment.postId === id);
    },
    owner: (parent) => {
      return _.find(USERS_LIST, (user) => user.id === parent.ownerId);
    },
    photos: ({ id }) => {
      return _.filter(POST_PHOTOS_LIST, (photo) => photo.postId === id);
    },
  },
  User: {
    friends: ({ id: userId }) => {
      const friends = [];

      _.forEach(FRIENDS_LIST, (friendship) => {
        const friendshipValues = Object.values(friendship);

        if (friendshipValues.includes(userId)) {
          const friendId = _.find(
            friendshipValues,
            (value) => value !== userId
          );
          const friend = _.find(USERS_LIST, (user) => user.id === friendId);

          if (friend) {
            friends.push(friend);
          }
        }
      });

      return friends.length > 0 ? friends : null;
    },
    friendshipRequests: ({ id: userId }) => {
      return _.filter(
        FRIEND_REQUESTS_LIST,
        (request) => request.receiver === userId || request.sender === userId
      );
    },
    messages: ({ id }) => {
      const messages = _.filter(
        MESSAGES_LIST,
        (message) => message.receiverId === id || message.senderId === id
      );

      return messages.length > 0 ? messages : null;
    },
    posts: ({ id }) => {
      return _.filter(
        POSTS_LIST,
        (post) => post.ownerId === id || post.receiverId === id
      ).sort(
        (p1, p2) =>
          +new Date(Number(p2.dateTime) - +new Date(Number(p1.dateTime)))
      );
    },
  },
  Query: {
    authenticatedUser: () => {
      return _.find(USERS_LIST, {
        id: AUTHENTICATED_USER_ID,
      });
    },
    comment: (parent, { id }) => {
      return findMatchedComment(COMMENTS_LIST, id) || null;
    },
    comments: () => {
      return COMMENTS_LIST;
    },
    commentReactions: (parent, { commentId }) => {
      return findMatchedComment(COMMENTS_LIST, commentId).reactions || null;
    },
    commentReplies: (parent, { commentId }) => {
      return findMatchedComment(COMMENTS_LIST, commentId).replies || null;
    },
    conversationBetween: (parent, { input: { first, second } }) => {
      const conversation = _.find(
        CONVERSATIONS_LIST,
        (conversation) =>
          (conversation.first === first && conversation.second === second) ||
          (conversation.first === second && conversation.second === first)
      );
      const defaultConversation = {
        emoji: Emoji.LIKE,
        first,
        firstNickname: null,
        second,
        secondNickname: null,
        theme: ConversationTheme.DEFAULT,
      };

      return conversation || defaultConversation;
    },
    friendsPostsByOwnerId: (parent, { ownerId }) => {
      const friendsPostsList = [];
      const ownerFriendsList = [];

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

      _.forEach(POSTS_LIST, (post) => {
        _.forEach(ownerFriendsList, (ownerFriend) => {
          if (post.owner.id === ownerFriend.id) {
            friendsPostsList.push(post);
          }
        });
      });

      return friendsPostsList.length > 0
        ? friendsPostsList.sort(
            (p1, p2) =>
              +new Date(Number(p2.dateTime) - +new Date(Number(p1.dateTime)))
          )
        : null;
    },
    friendshipSuggestionsById: (parent, { id }) => {
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
    messagesBetween: (parent, { input: { first, second } }) => {
      return _.filter(
        MESSAGES_LIST,
        (message) =>
          (message.receiverId === first && message.senderId === second) ||
          (message.senderId === first && message.receiverId === second)
      );
    },
    post: (parent, { id }) => {
      return _.find(POSTS_LIST, (post) => post.id === id) || null;
    },
    posts: () => {
      return POSTS_LIST;
    },
    postsByOwnerId: (parent, { ownerId }) => {
      const posts = _.filter(POSTS_LIST, (post) => post.owner.id === ownerId);

      return posts.length > 0 ? posts : null;
    },
    userById: (parent, { id }) => {
      return _.find(USERS_LIST, { id });
    },
    userByUsername: (parent, { username }) => {
      return _.find(USERS_LIST, (user) => user.username === username);
    },
    userFriendsById: (parent, { id }) => {
      return _.find(USERS_LIST, (user) => user.id === id).friends;
    },
    userFriendsByUsername: (parent, { username }) => {
      return _.find(USERS_LIST, (user) => user.username === username).friends;
    },
    userPostReaction: (parent, { input: { postId, userId } }) => {
      const matchedPost = _.find(POSTS_LIST, (post) => post.id === postId);
      const matchedReaction = _.find(
        matchedPost.reactions,
        (reaction) => reaction.owner.id === userId
      );

      return matchedReaction;
    },
    userSavedPosts: (parent, { id }) => {
      const userSavedPosts = _.find(
        SAVED_POSTS_LIST,
        (savedPost) => savedPost.userId === id
      );

      if (!userSavedPosts) {
        return null;
      }

      const list = [];

      userSavedPosts.savedPosts.forEach((postId) => {
        const matchedPost = _.find(POSTS_LIST, (p) => p.id === postId);

        if (matchedPost) {
          list.push(matchedPost);
        }
      });

      return list;
    },
    users: () => USERS_LIST,
  },
  Mutation: {
    addCommentReaction: (
      parent,
      { input: { commentId, reactionOwnerId, reactionType } }
    ) => {
      const matchedComment = findMatchedComment(COMMENTS_LIST, commentId);

      if (!matchedComment) {
        return null;
      }

      const matchedOwner = _.find(
        USERS_LIST,
        (user) => user.id === reactionOwnerId
      );
      const newReactionOwner = {
        email: matchedOwner.email,
        firstName: matchedOwner.firstName,
        id: matchedOwner.id,
        lastName: matchedOwner.lastName,
        username: matchedOwner.username,
      };
      const newReaction = {
        id: `${commentId}-reaction-${crypto.randomUUID()}`,
        dateTime: new Date().getTime().toString(),
        owner: newReactionOwner,
        type: reactionType,
      };

      if (!matchedComment.reactions) {
        matchedComment.reactions = [];
      }

      matchedComment.reactions.push(newReaction);

      return newReaction;
    },
    addCommentReply: (parent, { input: { commentId, ownerId, text } }) => {
      const matchedComment = findMatchedComment(COMMENTS_LIST, commentId);

      if (!matchedComment) {
        return null;
      }

      const postId = matchedComment.postId;
      const newComment = {
        id: `${postId}-comment-${crypto.randomUUID()}`,
        dateTime: new Date().getTime().toString(),
        ownerId,
        postId,
        reactions: null,
        replies: null,
        text,
      };

      if (!matchedComment.replies) {
        matchedComment.replies = [];
      }

      matchedComment.replies.push(newComment);

      return newComment;
    },
    addMessage: (
      parent,
      { input: { emoji, parentId, receiverId, senderId, text } }
    ) => {
      const newMessage = {
        id: `message-${crypto.randomUUID()}`,
        dateTime: new Date().getTime().toString(),
        emoji: emoji || undefined,
        parentId,
        reactions: null,
        receiverId,
        replies: null,
        senderId,
        text: text || undefined,
      };

      if (!MESSAGES_LIST) {
        MESSAGES_LIST = [];
      }

      MESSAGES_LIST.push(newMessage);

      return newMessage;
    },
    addPostComment: (parent, { input: { commentOwnerId, postId, text } }) => {
      const newComment = {
        id: `${postId}-comment-${crypto.randomUUID()}`,
        dateTime: new Date().getTime().toString(),
        ownerId: commentOwnerId,
        postId,
        reactions: null,
        replies: null,
        text,
      };

      if (!COMMENTS_LIST) {
        COMMENTS_LIST = [];
      }

      COMMENTS_LIST.push(newComment);

      return newComment;
    },
    addPostReaction: (
      parent,
      { input: { postId, reactionOwnerId, reactionType } }
    ) => {
      const matchedPost = _.find(POSTS_LIST, (post) => post.id === postId);
      const matchedOwner = _.find(
        USERS_LIST,
        (user) => user.id === reactionOwnerId
      );
      const newReactionOwner = {
        email: matchedOwner.email,
        firstName: matchedOwner.firstName,
        id: matchedOwner.id,
        lastName: matchedOwner.lastName,
        username: matchedOwner.username,
      };
      const newReaction = {
        id: `${postId}-reaction-${crypto.randomUUID()}`,
        owner: newReactionOwner,
        type: reactionType,
      };

      if (!matchedPost.reactions) {
        matchedPost.reactions = [];
      }

      matchedPost.reactions.push(newReaction);

      return newReaction;
    },
    addUserCollegeEducation: (
      parent,
      { input: { degree, from, graduated, school, to, userId, visibility } }
    ) => {
      const matchedUser = _.find(USERS_LIST, (user) => user.id === userId);
      const newEducation = {
        id: `education-${crypto.randomUUID()}`,
        degree,
        from: new Date(Number(from)).getTime().toString(),
        graduated: graduated || undefined,
        level: EducationLevel.COLLEGE,
        school,
        to: to ? new Date(Number(to)).getTime().toString() : undefined,
        visibility,
      };

      if (!matchedUser.educationHistory) {
        matchedUser.educationHistory = [];
      }

      matchedUser.educationHistory.push(newEducation);

      return newEducation;
    },
    addUserFriend: (parent, { input: { first, second } }) => {
      const matchedFriendship = _.find(
        FRIENDS_LIST,
        (friendship) =>
          (friendship.first === first && friendship.second === second) ||
          (friendship.first === second && friendship.second === first)
      );
      const newFriendship = { first, second };

      if (matchedFriendship) {
        return null;
      }

      FRIENDS_LIST.push(newFriendship);

      return newFriendship;
    },
    addUserHighSchoolEducation: (
      parent,
      { input: { from, graduated, school, to, userId, visibility } }
    ) => {
      const matchedUser = _.find(USERS_LIST, (user) => user.id === userId);
      const newEducation = {
        id: `education-${crypto.randomUUID()}`,
        from: new Date(Number(from)).getTime().toString(),
        graduated: graduated || undefined,
        level: EducationLevel.HIGH_SCHOOL,
        school,
        to: to ? new Date(Number(to)).getTime().toString() : undefined,
        visibility,
      };

      if (!matchedUser.educationHistory) {
        matchedUser.educationHistory = [];
      }

      matchedUser.educationHistory.push(newEducation);

      return newEducation;
    },
    addUserPlace: (
      parent,
      { input: { city, from, isCurrent, to, userId, visibility } }
    ) => {
      const matchedUser = _.find(USERS_LIST, (user) => user.id === userId);
      const newPlace = {
        id: `place-${crypto.randomUUID()}`,
        city,
        from: new Date(Number(from)).getTime().toString(),
        isCurrent: isCurrent || undefined,
        to: to ? new Date(Number(to)).getTime().toString() : undefined,
        visibility,
      };

      if (!matchedUser.placesHistory) {
        matchedUser.placesHistory = [];
      }

      matchedUser.placesHistory.push(newPlace);

      return newPlace;
    },
    addUserRelationshipStatus: (
      parent,
      { input: { status, userId, visibility } }
    ) => {
      const matchedUser = _.find(USERS_LIST, (user) => user.id === userId);

      if (!matchedUser.relationshipStatus) {
        const newRelationshipStatus = { status, visibility };
        matchedUser.relationshipStatus = newRelationshipStatus;
        return newRelationshipStatus;
      }

      return null;
    },
    addUserWorkplace: (
      parent,
      { input: { company, from, isCurrent, position, to, userId, visibility } }
    ) => {
      const matchedUser = _.find(USERS_LIST, (user) => user.id === userId);
      const newWorkplace = {
        id: `work-${crypto.randomUUID()}`,
        company,
        from: new Date(Number(from)).getTime().toString(),
        isCurrent: isCurrent || undefined,
        position,
        to: to ? new Date(Number(to)).getTime().toString() : undefined,
        visibility,
      };

      if (!matchedUser.workHistory) {
        matchedUser.workHistory = [];
      }

      matchedUser.workHistory.push(newWorkplace);

      return newWorkplace;
    },
    createPost: (
      parent,
      { input: { parentId, receiverId, text, userId, visibility } }
    ) => {
      const matchedUser = _.find(USERS_LIST, (user) => user.id === userId);
      const newPost = {
        id: `post-${crypto.randomUUID()}`,
        canComment: visibility,
        canReact: visibility,
        canShare: visibility,
        comments: null,
        dateTime: new Date().getTime().toString(),
        owner: matchedUser,
        ownerId: userId,
        parentId,
        photos: null,
        reactions: null,
        receiverId,
        shares: null,
        text,
        video: null,
        visibility,
      };

      if (!POSTS_LIST) {
        POSTS_LIST = [];
      }

      POSTS_LIST.push(newPost);

      return newPost;
    },
    removeComment: (parent, { id }) => {
      let removedComment;
      const matchedComment = _.find(
        COMMENTS_LIST,
        (comment) => comment.id === id
      );

      if (!matchedComment) {
        return null;
      }

      _.remove(COMMENTS_LIST, (comment) => {
        if (comment.id === id) {
          removedComment = comment;
        }
        return comment.id === id;
      });

      if (COMMENTS_LIST.length === 0) {
        COMMENTS_LIST = null;
      }

      return removedComment;
    },
    removeCommentReaction: (
      parent,
      { input: { commentId, reactionOwnerId } }
    ) => {
      let removedReaction;
      const matchedComment = findMatchedComment(COMMENTS_LIST, commentId);

      if (!matchedComment) {
        return null;
      }

      _.remove(matchedComment.reactions, (reaction) => {
        if (reaction.owner.id === reactionOwnerId) {
          removedReaction = reaction;
        }
        return reaction.owner.id === reactionOwnerId;
      });

      if (matchedComment.reactions.length === 0) {
        matchedComment.reactions = null;
      }

      return removedReaction;
    },
    removeCommentReply: (parent, { input: { commentId, replyId } }) => {
      let removedReply;
      const matchedComment = findMatchedComment(COMMENTS_LIST, commentId);

      if (!matchedComment) {
        return null;
      }

      _.remove(matchedComment.replies, (reply) => {
        if (reply.id === replyId) {
          removedReply = reply;
        }

        return reply.id === replyId;
      });

      if (matchedComment.replies.length === 0) {
        matchedComment.replies = null;
      }

      return removedReply;
    },
    removePostComment: (parent, { input: { commentId } }) => {
      let removedComment;
      const matchedComment = findMatchedComment(COMMENTS_LIST, commentId);

      if (!matchedComment) {
        return null;
      }

      _.remove(COMMENTS_LIST, (comment) => {
        if (comment.id === matchedComment.id) {
          removedComment = comment;
        }

        if (COMMENTS_LIST.length === 0) {
          COMMENTS_LIST = null;
        }

        return comment.id === matchedComment.id;
      });

      return removedComment;
    },
    removePostReaction: (parent, { input: { ownerId, postId } }) => {
      let removedReaction;
      const matchedPost = _.find(POSTS_LIST, (post) => post.id === postId);
      const matchedReaction = _.find(
        matchedPost.reactions,
        (reaction) => reaction.owner.id === ownerId
      );

      _.remove(matchedPost.reactions, (reaction) => {
        if (reaction.id === matchedReaction.id) {
          removedReaction = reaction;
        }
        return reaction.id === matchedReaction.id;
      });

      if (matchedPost.reactions.length === 0) {
        matchedPost.reactions = null;
      }

      return removedReaction;
    },
    removeUserFriendshipRequest: (parent, { input: { receiver, sender } }) => {
      const matchedFriendshipRequest = _.find(
        FRIEND_REQUESTS_LIST,
        (request) =>
          (request.receiver === receiver && request.sender === sender) ||
          (request.receiver === sender && request.sender === receiver)
      );

      if (!matchedFriendshipRequest) {
        return null;
      }

      _.remove(FRIEND_REQUESTS_LIST, (request) => {
        return request === matchedFriendshipRequest;
      });

      return matchedFriendshipRequest;
    },
    savePost: (parent, { input: { postId, userId } }) => {
      const userSavedPosts = _.find(
        SAVED_POSTS_LIST,
        (savedPost) => savedPost.userId === userId
      );

      if (!userSavedPosts) {
        SAVED_POSTS_LIST.push({ savedPosts: [postId], userId });
        return postId;
      }

      if (_.includes(userSavedPosts.savedPosts, postId)) {
        return null;
      }

      userSavedPosts.savedPosts.push(postId);

      return postId;
    },
    sendUserFriendshipRequest: (parent, { input: { receiver, sender } }) => {
      const newFriendshipRequest = { receiver, sender };
      const matchedReceiver = _.find(
        USERS_LIST,
        (user) => user.id === receiver
      );

      if (
        !matchedReceiver ||
        _.find(matchedReceiver.friends, (friend) => friend.id === sender) ||
        _.find(
          FRIEND_REQUESTS_LIST,
          (request) =>
            request.receiver === receiver && request.sender === sender
        )
      ) {
        return null;
      }

      FRIEND_REQUESTS_LIST.push(newFriendshipRequest);

      return newFriendshipRequest;
    },
    unsavePost: (parent, { input: { postId, userId } }) => {
      const userSavedPosts = _.find(
        SAVED_POSTS_LIST,
        (savedPost) => savedPost.userId === userId
      );

      if (!userSavedPosts || !userSavedPosts.savedPosts.includes(postId)) {
        return null;
      }

      _.remove(userSavedPosts.savedPosts, (savedPost) => savedPost === postId);

      return postId;
    },
    updateCommentReaction: (
      parent,
      { input: { commentId, ownerId, postId, reactionType } }
    ) => {
      const matchedComment = findMatchedComment(COMMENTS_LIST, commentId);

      if (!matchedComment) {
        return null;
      }

      const matchedReaction = _.find(
        matchedComment.reactions,
        (reaction) => reaction.owner.id === ownerId
      );

      if (!matchedReaction) {
        return null;
      }

      matchedReaction.type = reactionType;

      return matchedReaction;
    },
    updateConversationEmoji: (parent, { input: { emoji, first, second } }) => {
      const matchedConversation = _.find(
        CONVERSATIONS_LIST,
        (conversation) =>
          (conversation.first === first && conversation.second === second) ||
          (conversation.first === second && conversation.second === first)
      );

      if (!matchedConversation) {
        const defaultConversation = {
          emoji,
          first,
          firstNickname: null,
          second,
          secondNickname: null,
          theme: ConversationTheme.DEFAULT,
        };
        CONVERSATIONS_LIST.push(defaultConversation);

        return defaultConversation;
      }

      matchedConversation.emoji = emoji;

      return matchedConversation;
    },
    updateConversationNickname: (parent, { input: { nickname, userId } }) => {
      const matchedConversation = _.find(
        CONVERSATIONS_LIST,
        (conversation) =>
          conversation.first === userId || conversation.second === userId
      );

      if (!matchedConversation) {
        const defaultConversation = {
          emoji: Emoji.LIKE,
          first,
          firstNickname: null,
          second,
          secondNickname: null,
          theme: ConversationTheme.DEFAULT,
        };
        CONVERSATIONS_LIST.push(defaultConversation);

        return defaultConversation;
      }

      if (matchedConversation.first === userId) {
        matchedConversation.firstNickname = nickname;
      } else {
        matchedConversation.secondNickname = nickname;
      }

      return matchedConversation;
    },
    updateConversationTheme: (parent, { input: { first, second, theme } }) => {
      const matchedConversation = _.find(
        CONVERSATIONS_LIST,
        (conversation) =>
          (conversation.first === first && conversation.second === second) ||
          (conversation.first === second && conversation.second === first)
      );

      if (!matchedConversation) {
        const defaultConversation = {
          emoji: Emoji.LIKE,
          first,
          firstNickname: null,
          second,
          secondNickname: null,
          theme,
        };
        CONVERSATIONS_LIST.push(defaultConversation);

        return defaultConversation;
      }

      matchedConversation.theme = theme;

      return matchedConversation;
    },
    updatePostReaction: (
      parent,
      { input: { ownerId, postId, reactionType } }
    ) => {
      const matchedPost = _.find(POSTS_LIST, (post) => post.id === postId);
      const matchedReaction = _.find(
        matchedPost.reactions,
        (reaction) => reaction.owner.id === ownerId
      );
      matchedReaction.type = reactionType;

      return matchedReaction;
    },
    updateUserPlace: (
      parent,
      { input: { city, from, isCurrent, placeId, to, userId, visibility } }
    ) => {
      const matchedUser = _.find(USERS_LIST, (user) => user.id === userId);
      const matchedPlace = _.find(
        matchedUser.placesHistory,
        (place) => place.id === placeId
      );

      if (!matchedPlace) {
        return null;
      }

      matchedPlace.city = city;
      matchedPlace.from = new Date(Number(from)).getTime().toString();
      matchedPlace.isCurrent = isCurrent || undefined;
      matchedPlace.to = to
        ? new Date(Number(to)).getTime().toString()
        : undefined;
      matchedPlace.visibility = visibility;

      return matchedPlace;
    },
  },
};

module.exports = { resolvers };
