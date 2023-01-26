const { gql } = require("apollo-server");

const typeDefs = gql`
  input AddCommentReactionInput {
    commentId: ID!
    reactionOwnerId: ID!
    reactionType: ReactionType!
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

  type Comment {
    id: ID!
    dateTime: String!
    owner: User!
    reactions: [Reaction!]
    replies: [CommentReply!]
    text: String!
  }

  type CommentReply {
    id: ID!
    dateTime: String!
    owner: User!
    reactions: [Reaction!]
    replies: [CommentReply!]
    text: String!
  }

  input GetUserPostReactionInput {
    postId: ID!
    userId: ID!
  }

  type Reaction {
    id: ID!
    owner: User!
    type: ReactionType!
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
    photo: String
    reactions: [Reaction!]
    shares: [Share!]
    text: String
    video: String
  }

  input RemoveCommentReactionInput {
    commentId: ID!
    reactionOwnerId: ID!
  }

  input RemovePostCommentInput {
    commentId: ID!
    postId: ID!
  }

  input RemovePostReactionInput {
    ownerId: ID!
    postId: ID!
  }

  input UpdatePostReactionInput {
    ownerId: ID!
    postId: ID!
    reactionType: ReactionType!
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
    friends: [User!]!
    lastName: String!
    username: String!
  }

  type Query {
    authenticatedUser: User
    friendsPostsByOwnerId(ownerId: ID!): [Post!]
    posts: [Post!]
    postsByOwnerId(ownerId: ID!): [Post!]
    user(id: ID!): User
    userPostReaction(input: GetUserPostReactionInput!): Reaction
    users: [User!]
  }

  type Mutation {
    addCommentReaction(input: AddCommentReactionInput!): Reaction
    addPostComment(input: AddPostCommentInput!): Comment!
    addPostReaction(input: AddPostReactionInput!): Reaction
    removeCommentReaction(input: RemoveCommentReactionInput!): Reaction
    removePostComment(input: RemovePostCommentInput!): Comment
    removePostReaction(input: RemovePostReactionInput!): Reaction
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
