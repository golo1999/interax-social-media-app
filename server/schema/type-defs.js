const { gql } = require("apollo-server");

const typeDefs = gql`
  input AddCommentReactionInput {
    commentId: ID!
    reactionOwnerId: ID!
    reactionType: ReactionType!
  }

  input AddCommentReplyInput {
    commentId: ID!
    ownerId: ID!
    text: String!
  }

  input AddPostCommentInput {
    commentOwnerId: ID!
    postId: ID!
    text: String!
  }

  input AddPostReactionInput {
    postId: ID!
    reactionOwnerId: ID!
    reactionType: ReactionType!
  }

  input GetUserPostReactionInput {
    postId: ID!
    userId: ID!
  }

  input RemoveCommentReactionInput {
    commentId: ID!
    reactionOwnerId: ID!
  }

  input RemoveCommentReplyInput {
    commentId: ID!
    replyId: ID!
  }

  input RemovePostCommentInput {
    commentId: ID!
  }

  input RemovePostReactionInput {
    ownerId: ID!
    postId: ID!
  }

  input UpdateCommentReactionInput {
    commentId: ID!
    ownerId: ID!
    postId: ID!
    reactionType: ReactionType!
  }

  input UpdatePostReactionInput {
    ownerId: ID!
    postId: ID!
    reactionType: ReactionType!
  }

  type Comment {
    id: ID!
    dateTime: String!
    owner: User!
    postId: ID!
    reactions: [Reaction!]
    replies: [Comment!]
    text: String!
  }

  type Photo {
    id: ID!
    comments: [Comment!]
    ownerId: ID!
    postId: ID!
    reactions: [Reaction!]
    shares: [Share!]
    text: String
    url: String!
  }

  type Post {
    id: ID!
    canComment: Permission!
    canReact: Permission!
    canShare: Permission!
    canView: Permission!
    comments: [Comment!]
    dateTime: String!
    owner: User!
    parentId: ID
    photos: [Photo!]
    reactions: [Reaction!]
    shares: [Share!]
    text: String
    video: String
  }

  type Reaction {
    id: ID!
    dateTime: String!
    owner: User!
    type: ReactionType!
  }

  type Share {
    id: ID!
    dateTime: String!
    owner: User!
  }

  type User {
    id: ID!
    biography: String
    birthDate: String
    email: String!
    firstName: String!
    friends: [User!]
    lastName: String!
    posts: [Post!]
    username: String!
  }

  type Query {
    authenticatedUser: User
    comment(id: ID!): Comment
    comments: [Comment!]
    commentReactions(commentId: ID!): [Reaction!]
    commentReplies(commentId: ID!): [Comment!]
    friendsPostsByOwnerId(ownerId: ID!): [Post!]
    postComments(postId: ID!): [Comment!]
    post(id: ID!): Post
    posts: [Post!]
    postsByOwnerId(ownerId: ID!): [Post!]
    userById(id: ID!): User
    userByUsername(username: String!): User
    userFriendsById(id: ID!): [User!]
    userFriendsByUsername(username: String!): [User!]
    userPostReaction(input: GetUserPostReactionInput!): Reaction
    users: [User!]
  }

  type Mutation {
    addCommentReaction(input: AddCommentReactionInput!): Reaction
    addCommentReply(input: AddCommentReplyInput!): Comment
    addPostComment(input: AddPostCommentInput!): Comment!
    addPostReaction(input: AddPostReactionInput!): Reaction
    removeComment(id: ID!): Comment
    removeCommentReaction(input: RemoveCommentReactionInput!): Reaction
    removeCommentReply(input: RemoveCommentReplyInput!): Comment
    removePostComment(input: RemovePostCommentInput!): Comment
    removePostReaction(input: RemovePostReactionInput!): Reaction
    updateCommentReaction(input: UpdateCommentReactionInput): Reaction
    updatePostReaction(input: UpdatePostReactionInput!): Reaction!
  }

  enum Permission {
    FRIENDS
    PERSONAL
    PUBLIC
  }

  enum ReactionType {
    ANGRY
    CARE
    HAHA
    LIKE
    LOVE
    SAD
    WOW
  }
`;

module.exports = { typeDefs };
