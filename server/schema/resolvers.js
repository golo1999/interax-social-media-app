const crypto = require("crypto");
const _ = require("lodash");

const { AUTHENTICATED_USER, PostsList, UsersList } = require("../MockedData");

const resolvers = {
  Query: {
    authenticatedUser: () => {
      const matchedUser = _.find(UsersList, {
        id: AUTHENTICATED_USER.id,
      });

      return matchedUser;
    },
    friendsPostsByOwnerId: (parent, args) => {
      const { ownerId } = args;
      const ownerFriendsList = _.filter(UsersList, (user) =>
        _.some(user.friends, (friend) => friend.id === ownerId)
      );
      const friendsPostsList = _.filter(PostsList, (post) =>
        _.some(ownerFriendsList, (friend) => friend.id === post.owner.id)
      );

      return friendsPostsList.length > 0 ? friendsPostsList : null;
    },
    posts: () => {
      return PostsList;
    },
    postsByOwnerId: (parent, args) => {
      const { ownerId } = args;
      const posts = _.filter(PostsList, (post) => post.owner.id === ownerId);

      return posts.length > 0 ? posts : null;
    },
    userById: (parent, args) => {
      const { id } = args;
      const user = _.find(UsersList, { id });

      return user;
    },
    userByUsername: (parent, args) => {
      const { username } = args;
      const matchedUser = _.find(
        UsersList,
        (user) => user.username === username
      );

      return matchedUser;
    },
    userFriendsById: (parent, args) => {
      const { id } = args;
      const matchedUser = _.find(UsersList, (user) => user.id === id);
      return matchedUser.friends;
    },
    userFriendsByUsername: (parent, args) => {
      const { username } = args;
      const matchedUser = _.find(
        UsersList,
        (user) => user.username === username
      );
      return matchedUser.friends;
    },
    userPostReaction: (parent, args) => {
      const { postId, userId } = args.input;
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
    addCommentReaction: (parent, args) => {
      const { commentId, reactionOwnerId, reactionType } = args.input;
      const matchedPost = _.find(PostsList, (post) =>
        _.some(post.comments, (comment) => comment.id === commentId)
      );
      const matchedComment = _.find(
        matchedPost.comments,
        (comment) => comment.id === commentId
      );
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

      if (!matchedComment.reactions) {
        matchedComment.reactions = [];
      }

      newReaction.id = `${
        matchedPost.id
      }-${commentId}-reaction-${crypto.randomUUID()}`;
      matchedComment.reactions.push(newReaction);

      return newReaction;
    },
    addPostComment: (parent, args) => {
      const { commentOwnerId, postId, text } = args.input;
      const matchedPost = _.find(PostsList, (post) => post.id === postId);
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
        reactions: null,
        replies: null,
        text,
      };

      if (!matchedPost.comments) {
        matchedPost.comments = [];
      }

      newComment.id = `${postId}-comment-${crypto.randomUUID()}`;
      matchedPost.comments.push(newComment);

      return newComment;
    },
    addPostReaction: (parent, args) => {
      const { postId, reactionOwnerId, reactionType } = args.input;
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
    removeCommentReaction: (parent, args) => {
      const { commentId, reactionOwnerId } = args.input;
      let removedReaction;
      const matchedPost = _.find(PostsList, (post) =>
        _.some(post.comments, (comment) => comment.id === commentId)
      );
      const matchedComment = _.find(
        matchedPost.comments,
        (comment) => comment.id === commentId
      );

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
    removePostComment: (parent, args) => {
      const { commentId, postId } = args.input;
      let removedComment;
      const matchedPost = _.find(PostsList, (post) => post.id === postId);
      const matchedComment = _.find(
        matchedPost.comments,
        (comment) => comment.id === commentId
      );

      _.remove(matchedPost.comments, (comment) => {
        if (comment.id === matchedComment.id) {
          removedComment = comment;
        }

        if (matchedPost.comments.length === 0) {
          matchedPost.comments = null;
        }

        return comment.id === matchedComment.id;
      });

      return removedComment;
    },
    removePostReaction: (parent, args) => {
      const { ownerId, postId } = args.input;
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
    updateCommentReaction: (parent, args) => {
      const { commentId, ownerId, reactionType } = args.input;
      const matchedPost = _.find(PostsList, (post) =>
        _.some(post.comments, (comment) => comment.id === commentId)
      );
      const matchedComment = _.find(
        matchedPost.comments,
        (comment) => comment.id === commentId
      );
      const matchedReaction = _.find(
        matchedComment.reactions,
        (reaction) => reaction.owner.id === ownerId
      );
      matchedReaction.type = reactionType;

      return matchedReaction;
    },
    updatePostReaction: (parent, args) => {
      const { ownerId, postId, reactionType } = args.input;
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
