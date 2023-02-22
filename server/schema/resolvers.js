const crypto = require("crypto");
const _ = require("lodash");

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
  AUTHENTICATED_USER,
  CommentsList,
  PostsList,
  UsersList,
  PostPhotosList,
} = require("../MockedData");

const resolvers = {
  Post: {
    comments: ({ id }) => {
      const comments = _.filter(
        CommentsList,
        (comment) => comment.postId === id
      );

      return comments;
    },
    photos: ({ id }) => {
      const photos = _.filter(PostPhotosList, (photo) => photo.postId === id);

      return photos;
    },
  },
  Query: {
    authenticatedUser: () => {
      const matchedUser = _.find(UsersList, {
        id: AUTHENTICATED_USER.id,
      });

      return matchedUser;
    },
    comment: (parent, { id }) => {
      const matchedComment = findMatchedComment(CommentsList, id);

      if (!matchedComment) {
        return null;
      }

      return matchedComment;
    },
    comments: () => {
      return CommentsList;
    },
    commentReactions: (parent, { commentId }) => {
      const matchedComment = findMatchedComment(CommentsList, commentId);

      if (!matchedComment) {
        return null;
      }

      return matchedComment.reactions;
    },
    commentReplies: (parent, { commentId }) => {
      const matchedComment = findMatchedComment(CommentsList, commentId);

      if (!matchedComment) {
        return null;
      }

      return matchedComment.replies;
    },
    friendsPostsByOwnerId: (parent, { ownerId }) => {
      const ownerFriendsList = _.filter(UsersList, (user) =>
        _.some(user.friends, (friend) => friend.id === ownerId)
      );
      const friendsPostsList = _.filter(PostsList, (post) =>
        _.some(ownerFriendsList, (friend) => friend.id === post.owner.id)
      );

      return friendsPostsList.length > 0 ? friendsPostsList : null;
    },
    post: (parent, { id }) => {
      const matchedPost = _.find(PostsList, (post) => post.id === id);

      if (!matchedPost) {
        return null;
      }

      return matchedPost;
    },
    posts: () => {
      return PostsList;
    },
    postsByOwnerId: (parent, { ownerId }) => {
      const posts = _.filter(PostsList, (post) => post.owner.id === ownerId);

      return posts.length > 0 ? posts : null;
    },
    userById: (parent, { id }) => {
      const user = _.find(UsersList, { id });

      return user;
    },
    userByUsername: (parent, { username }) => {
      const matchedUser = _.find(
        UsersList,
        (user) => user.username === username
      );

      return matchedUser;
    },
    userFriendsById: (parent, { id }) => {
      const matchedUser = _.find(UsersList, (user) => user.id === id);
      return matchedUser.friends;
    },
    userFriendsByUsername: (parent, { username }) => {
      const matchedUser = _.find(
        UsersList,
        (user) => user.username === username
      );
      return matchedUser.friends;
    },
    userPostReaction: (parent, { input: { postId, userId } }) => {
      const matchedPost = _.find(PostsList, (post) => post.id === postId);
      const matchedReaction = _.find(
        matchedPost.reactions,
        (reaction) => reaction.owner.id === userId
      );

      return matchedReaction;
    },
    users: () => {
      return UsersList;
    },
  },
  Mutation: {
    addCommentReaction: (
      parent,
      { input: { commentId, reactionOwnerId, reactionType } }
    ) => {
      const matchedComment = findMatchedComment(CommentsList, commentId);

      if (!matchedComment) {
        return null;
      }

      const matchedOwner = _.find(
        UsersList,
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
      const matchedComment = findMatchedComment(CommentsList, commentId);

      if (!matchedComment) {
        return null;
      }

      const matchedOwner = _.find(UsersList, (user) => user.id === ownerId);
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
        UsersList,
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

      if (!CommentsList) {
        CommentsList = [];
      }

      newComment.id = `${postId}-comment-${crypto.randomUUID()}`;
      CommentsList.push(newComment);

      return newComment;
    },
    addPostReaction: (
      parent,
      { input: { postId, reactionOwnerId, reactionType } }
    ) => {
      const matchedPost = _.find(PostsList, (post) => post.id === postId);
      const matchedOwner = _.find(
        UsersList,
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
    removeComment: (parent, { id }) => {
      let removedComment;
      const matchedComment = _.find(
        CommentsList,
        (comment) => comment.id === id
      );

      if (!matchedComment) {
        return null;
      }

      _.remove(CommentsList, (comment) => {
        if (comment.id === id) {
          removedComment = comment;
        }
        return comment.id === id;
      });

      if (CommentsList.length === 0) {
        CommentsList = null;
      }

      return removedComment;
    },
    removeCommentReaction: (
      parent,
      { input: { commentId, reactionOwnerId } }
    ) => {
      let removedReaction;
      const matchedComment = findMatchedComment(CommentsList, commentId);

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
      const matchedComment = findMatchedComment(CommentsList, commentId);

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
      const matchedComment = findMatchedComment(CommentsList, commentId);

      if (!matchedComment) {
        return null;
      }

      _.remove(CommentsList, (comment) => {
        if (comment.id === matchedComment.id) {
          removedComment = comment;
        }

        if (CommentsList.length === 0) {
          CommentsList = null;
        }

        return comment.id === matchedComment.id;
      });

      return removedComment;
    },
    removePostReaction: (parent, { input: { ownerId, postId } }) => {
      let removedReaction;
      const matchedPost = _.find(PostsList, (post) => post.id === postId);
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
      const matchedComment = findMatchedComment(CommentsList, commentId);

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
      const matchedPost = _.find(PostsList, (post) => post.id === postId);
      const matchedReaction = _.find(
        matchedPost.reactions,
        (reaction) => reaction.owner.id === ownerId
      );
      matchedReaction.type = reactionType;

      return matchedReaction;
    },
  },
};

module.exports = { resolvers };
