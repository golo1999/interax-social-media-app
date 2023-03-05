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

  input AddUserCollegeEducationInput {
    degree: String!
    fromDay: Int!
    fromMonth: Int!
    fromYear: Int!
    graduated: Boolean
    school: String!
    toDay: Int
    toMonth: Int
    toYear: Int
    userId: ID!
    visibility: Permission!
  }

  input AddUserHighSchoolEducationInput {
    fromDay: Int!
    fromMonth: Int!
    fromYear: Int!
    graduated: Boolean
    school: String!
    toDay: Int
    toMonth: Int
    toYear: Int
    userId: ID!
    visibility: Permission!
  }

  input AddUserPlaceInput {
    city: String!
    fromDay: Int!
    fromMonth: Int!
    fromYear: Int!
    isCurrent: Boolean
    toDay: Int
    toMonth: Int
    toYear: Int
    userId: ID!
    visibility: Permission!
  }

  input AddUserRelationshipStatusInput {
    status: RelationshipStatusType!
    userId: ID!
    visibility: Permission!
  }

  input AddUserWorkplaceInput {
    company: String!
    fromDay: Int!
    fromMonth: Int!
    fromYear: Int!
    isCurrent: Boolean
    position: String!
    toDay: Int
    toMonth: Int
    toYear: Int
    userId: ID!
    visibility: Permission!
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

  input UpdateUserPlaceInput {
    city: String!
    fromDay: Int!
    fromMonth: Int!
    fromYear: Int!
    isCurrent: Boolean
    placeId: ID!
    toDay: Int
    toMonth: Int
    toYear: Int
    userId: ID!
    visibility: Permission!
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

  type Date {
    day: Int!
    month: Int!
    year: Int!
  }

  type Education {
    id: ID!
    degree: String
    from: Date!
    graduated: Boolean
    level: EducationLevel!
    school: String!
    to: Date
    visibility: Permission!
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

  type Place {
    id: ID!
    city: String!
    from: Date!
    isCurrent: Boolean
    to: Date
    visibility: Permission!
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

  type RelationshipStatus {
    status: RelationshipStatusType!
    visibility: Permission!
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
    educationHistory: [Education!]
    email: String!
    firstName: String!
    friends: [User!]
    lastName: String!
    placesHistory: [Place!]
    posts: [Post!]
    relationshipStatus: RelationshipStatus
    username: String!
    workHistory: [Work!]
  }

  type Work {
    id: ID!
    company: String!
    from: Date!
    isCurrent: Boolean
    position: String!
    to: Date
    visibility: Permission!
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
    addUserCollegeEducation(input: AddUserCollegeEducationInput!): Education
    addUserHighSchoolEducation(
      input: AddUserHighSchoolEducationInput!
    ): Education
    addUserPlace(input: AddUserPlaceInput!): Place
    addUserRelationshipStatus(
      input: AddUserRelationshipStatusInput!
    ): RelationshipStatus
    addUserWorkplace(input: AddUserWorkplaceInput!): Work
    removeComment(id: ID!): Comment
    removeCommentReaction(input: RemoveCommentReactionInput!): Reaction
    removeCommentReply(input: RemoveCommentReplyInput!): Comment
    removePostComment(input: RemovePostCommentInput!): Comment
    removePostReaction(input: RemovePostReactionInput!): Reaction
    updateCommentReaction(input: UpdateCommentReactionInput): Reaction
    updatePostReaction(input: UpdatePostReactionInput!): Reaction!
    updateUserPlace(input: UpdateUserPlaceInput!): Place
  }

  enum EducationLevel {
    COLLEGE
    HIGH_SCHOOL
  }

  enum Permission {
    FRIENDS
    ONLY_ME
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

  enum RelationshipStatusType {
    SINGLE
    IN_A_RELATIONSHIP
    ENGAGED
    MARRIED
    IN_A_CIVIL_UNION
    IN_A_DOMESTIC_PARTNERSHIP
    IN_AN_OPEN_RELATIONSHIP
    IT_IS_COMPLICATED
    SEPARATED
    DIVORCED
    WIDOWED
  }
`;

module.exports = { typeDefs };
