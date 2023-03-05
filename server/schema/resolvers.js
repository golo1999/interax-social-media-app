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

const {
  AUTHENTICATED_USER_ID,
  COMMENTS_LIST,
  POSTS_LIST,
  USERS_LIST,
  POST_PHOTOS_LIST,
} = require("../MockedData");

const resolvers = {
  Post: {
    comments: ({ id }) => {
      const comments = _.filter(
        COMMENTS_LIST,
        (comment) => comment.postId === id
      );

      return comments;
    },
    photos: ({ id }) => {
      const photos = _.filter(POST_PHOTOS_LIST, (photo) => photo.postId === id);

      return photos;
    },
  },
  User: {
    posts: ({ username }) => {
      const posts = _.filter(
        POSTS_LIST,
        (post) => post.owner.username === username
      );

      return posts;
    },
  },
  Query: {
    authenticatedUser: () => {
      const matchedUser = _.find(USERS_LIST, {
        id: AUTHENTICATED_USER_ID,
      });

      return matchedUser;
    },
    comment: (parent, { id }) => {
      const matchedComment = findMatchedComment(COMMENTS_LIST, id);

      if (!matchedComment) {
        return null;
      }

      return matchedComment;
    },
    comments: () => {
      return COMMENTS_LIST;
    },
    commentReactions: (parent, { commentId }) => {
      const matchedComment = findMatchedComment(COMMENTS_LIST, commentId);

      if (!matchedComment) {
        return null;
      }

      return matchedComment.reactions;
    },
    commentReplies: (parent, { commentId }) => {
      const matchedComment = findMatchedComment(COMMENTS_LIST, commentId);

      if (!matchedComment) {
        return null;
      }

      return matchedComment.replies;
    },
    friendsPostsByOwnerId: (parent, { ownerId }) => {
      const ownerFriendsList = _.filter(USERS_LIST, (user) =>
        _.some(user.friends, (friend) => friend.id === ownerId)
      );
      const friendsPostsList = _.filter(POSTS_LIST, (post) =>
        _.some(ownerFriendsList, (friend) => friend.id === post.owner.id)
      );

      return friendsPostsList.length > 0 ? friendsPostsList : null;
    },
    post: (parent, { id }) => {
      const matchedPost = _.find(POSTS_LIST, (post) => post.id === id);

      if (!matchedPost) {
        return null;
      }

      return matchedPost;
    },
    posts: () => {
      return POSTS_LIST;
    },
    postsByOwnerId: (parent, { ownerId }) => {
      const posts = _.filter(POSTS_LIST, (post) => post.owner.id === ownerId);

      return posts.length > 0 ? posts : null;
    },
    userById: (parent, { id }) => {
      const user = _.find(USERS_LIST, { id });

      return user;
    },
    userByUsername: (parent, { username }) => {
      const matchedUser = _.find(
        USERS_LIST,
        (user) => user.username === username
      );

      return matchedUser;
    },
    userFriendsById: (parent, { id }) => {
      const matchedUser = _.find(USERS_LIST, (user) => user.id === id);
      return matchedUser.friends;
    },
    userFriendsByUsername: (parent, { username }) => {
      const matchedUser = _.find(
        USERS_LIST,
        (user) => user.username === username
      );
      return matchedUser.friends;
    },
    userPostReaction: (parent, { input: { postId, userId } }) => {
      const matchedPost = _.find(POSTS_LIST, (post) => post.id === postId);
      const matchedReaction = _.find(
        matchedPost.reactions,
        (reaction) => reaction.owner.id === userId
      );

      return matchedReaction;
    },
    users: () => {
      return USERS_LIST;
    },
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
        id: null,
        dateTime: new Date().toUTCString(),
        owner: newReactionOwner,
        type: reactionType,
      };

      if (!matchedComment.reactions) {
        matchedComment.reactions = [];
      }

      newReaction.id = `${commentId}-reaction-${crypto.randomUUID()}`;
      matchedComment.reactions.push(newReaction);

      return newReaction;
    },
    addCommentReply: (parent, { input: { commentId, ownerId, text } }) => {
      const matchedComment = findMatchedComment(COMMENTS_LIST, commentId);

      if (!matchedComment) {
        return null;
      }

      const matchedOwner = _.find(USERS_LIST, (user) => user.id === ownerId);
      const postId = matchedComment.postId;
      const newComment = {
        id: null,
        dateTime: new Date().toUTCString(),
        owner: {
          id: matchedOwner.id,
          email: matchedOwner.email,
          firstName: matchedOwner.firstName,
          lastName: matchedOwner.lastName,
          username: matchedOwner.username,
        },
        postId,
        reactions: null,
        replies: null,
        text,
      };

      if (!matchedComment.replies) {
        matchedComment.replies = [];
      }

      newComment.id = `${postId}-comment-${crypto.randomUUID()}`;
      matchedComment.replies.push(newComment);

      return newComment;
    },
    addPostComment: (parent, { input: { commentOwnerId, postId, text } }) => {
      const matchedOwner = _.find(
        USERS_LIST,
        (user) => user.id === commentOwnerId
      );
      const newComment = {
        id: null,
        dateTime: new Date().toUTCString(),
        owner: {
          id: matchedOwner.id,
          email: matchedOwner.email,
          firstName: matchedOwner.firstName,
          lastName: matchedOwner.lastName,
          username: matchedOwner.username,
        },
        postId,
        reactions: null,
        replies: null,
        text,
      };

      if (!COMMENTS_LIST) {
        COMMENTS_LIST = [];
      }

      newComment.id = `${postId}-comment-${crypto.randomUUID()}`;
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
        id: null,
        owner: newReactionOwner,
        type: reactionType,
      };

      if (!matchedPost.reactions) {
        matchedPost.reactions = [];
      }

      newReaction.id = `${postId}-reaction-${crypto.randomUUID()}`;
      matchedPost.reactions.push(newReaction);

      return newReaction;
    },
    addUserCollegeEducation: (
      parent,
      {
        input: {
          degree,
          fromDay,
          fromMonth,
          fromYear,
          graduated,
          school,
          toDay,
          toMonth,
          toYear,
          userId,
          visibility,
        },
      }
    ) => {
      const matchedUser = _.find(USERS_LIST, (user) => user.id === userId);
      const newEducation = {
        id: null,
        degree,
        from: { day: fromDay, month: fromMonth, year: fromYear },
        graduated: graduated || undefined,
        level: EducationLevel.COLLEGE,
        school,
        to:
          toDay && toMonth && toYear
            ? { day: toDay, month: toMonth, year: toYear }
            : undefined,
        visibility,
      };

      if (!matchedUser.educationHistory) {
        matchedUser.educationHistory = [];
      }

      newEducation.id = `education-${crypto.randomUUID()}`;
      matchedUser.educationHistory.push(newEducation);

      return newEducation;
    },
    addUserHighSchoolEducation: (
      parent,
      {
        input: {
          fromDay,
          fromMonth,
          fromYear,
          graduated,
          school,
          toDay,
          toMonth,
          toYear,
          userId,
          visibility,
        },
      }
    ) => {
      const matchedUser = _.find(USERS_LIST, (user) => user.id === userId);
      const newEducation = {
        id: null,
        from: { day: fromDay, month: fromMonth, year: fromYear },
        graduated: graduated || undefined,
        level: EducationLevel.HIGH_SCHOOL,
        school,
        to:
          toDay && toMonth && toYear
            ? { day: toDay, month: toMonth, year: toYear }
            : undefined,
        visibility,
      };

      if (!matchedUser.educationHistory) {
        matchedUser.educationHistory = [];
      }

      newEducation.id = `education-${crypto.randomUUID()}`;
      matchedUser.educationHistory.push(newEducation);

      return newEducation;
    },
    addUserPlace: (
      parent,
      {
        input: {
          city,
          fromDay,
          fromMonth,
          fromYear,
          isCurrent,
          toDay,
          toMonth,
          toYear,
          userId,
          visibility,
        },
      }
    ) => {
      const matchedUser = _.find(USERS_LIST, (user) => user.id === userId);
      const newPlace = {
        id: null,
        city,
        from: { day: fromDay, month: fromMonth, year: fromYear },
        isCurrent: isCurrent || undefined,
        to:
          toDay && toMonth && toYear
            ? { day: toDay, month: toMonth, year: toYear }
            : undefined,
        visibility,
      };

      if (!matchedUser.placesHistory) {
        matchedUser.placesHistory = [];
      }

      newPlace.id = `place-${crypto.randomUUID()}`;
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
      {
        input: {
          company,
          fromDay,
          fromMonth,
          fromYear,
          isCurrent,
          position,
          toDay,
          toMonth,
          toYear,
          userId,
          visibility,
        },
      }
    ) => {
      const matchedUser = _.find(USERS_LIST, (user) => user.id === userId);
      const newWorkplace = {
        id: null,
        company,
        from: { day: fromDay, month: fromMonth, year: fromYear },
        isCurrent: isCurrent || undefined,
        position,
        to:
          toDay && toMonth && toYear
            ? { day: toDay, month: toMonth, year: toYear }
            : undefined,
        visibility,
      };

      if (!matchedUser.workHistory) {
        matchedUser.workHistory = [];
      }

      newWorkplace.id = `work-${crypto.randomUUID()}`;
      matchedUser.workHistory.push(newWorkplace);

      return newWorkplace;
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
      matchedReaction.type = reactionType;

      return matchedReaction;
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
      {
        input: {
          city,
          fromDay,
          fromMonth,
          fromYear,
          isCurrent,
          placeId,
          toDay,
          toMonth,
          toYear,
          userId,
          visibility,
        },
      }
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
      matchedPlace.from = { day: fromDay, month: fromMonth, year: fromYear };
      matchedPlace.isCurrent = isCurrent || undefined;
      matchedPlace.to =
        toDay && toMonth && toYear
          ? { day: toDay, month: toMonth, year: toYear }
          : undefined;
      matchedPlace.visibility = visibility;

      return matchedPlace;
    },
  },
};

module.exports = { resolvers };
