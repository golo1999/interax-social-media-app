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

  input AddMessageInput {
    emoji: Emoji
    parentId: ID
    receiverId: ID!
    senderId: ID!
    text: String
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
    from: String!
    graduated: Boolean
    school: String!
    to: String
    userId: ID!
    visibility: Permission!
  }

  input AddUserFriendInput {
    first: ID!
    second: ID!
  }

  input AddUserHighSchoolEducationInput {
    from: String!
    graduated: Boolean
    school: String!
    to: String
    userId: ID!
    visibility: Permission!
  }

  input AddUserPlaceInput {
    city: String!
    from: String!
    isCurrent: Boolean
    to: String
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
    from: String!
    isCurrent: Boolean
    position: String!
    to: String
    userId: ID!
    visibility: Permission!
  }

  input CreatePostInput {
    parentId: ID
    receiverId: ID!
    text: String!
    userId: ID!
    visibility: Permission!
  }

  input GetConversationBetweenInput {
    first: ID!
    second: ID!
  }

  input GetMessagesBetweenInput {
    first: ID!
    second: ID!
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

  input RemoveUserFriendshipRequestInput {
    receiver: ID!
    sender: ID!
  }

  input SavePostInput {
    postId: ID!
    userId: ID!
  }

  input SendUserFriendshipRequestInput {
    receiver: ID!
    sender: ID!
  }

  input UpdateCommentReactionInput {
    commentId: ID!
    ownerId: ID!
    postId: ID!
    reactionType: ReactionType!
  }

  input UpdateConversationEmojiInput {
    emoji: Emoji!
    first: ID!
    second: ID!
  }

  input UpdateConversationNicknameInput {
    nickname: String
    userId: ID!
  }

  input UpdateConversationThemeInput {
    first: ID!
    second: ID!
    theme: ConversationTheme!
  }

  input UpdatePostReactionInput {
    ownerId: ID!
    postId: ID!
    reactionType: ReactionType!
  }

  input UpdateUserPlaceInput {
    city: String!
    from: String!
    isCurrent: Boolean
    placeId: ID!
    to: String
    userId: ID!
    visibility: Permission!
  }

  type Comment {
    id: ID!
    dateTime: String!
    owner: User!
    ownerId: ID!
    postId: ID!
    reactions: [Reaction!]
    replies: [Comment!]
    text: String!
  }

  type Conversation {
    emoji: Emoji!
    files: [File!]
    first: ID!
    firstNickname: String
    media: [Media!]
    second: ID!
    secondNickname: String
    theme: ConversationTheme!
  }

  type CoverPhoto {
    id: ID!
    comments: [Comment!]
    dateTime: String!
    description: String
    isCurrent: Boolean
    ownerId: ID!
    reactions: [Reaction!]
    shares: [Share!]
    url: String!
    visibility: Permission!
  }

  type Education {
    id: ID!
    degree: String
    from: String!
    graduated: Boolean
    level: EducationLevel!
    school: String!
    to: String
    visibility: Permission!
  }

  type File {
    id: ID!
    name: String!
    size: Int!
  }

  type Friendship {
    first: ID!
    second: ID!
  }

  type FriendshipRequest {
    receiver: ID!
    sender: ID!
  }

  type Media {
    type: MediaType!
    url: String!
  }

  type Message {
    id: ID!
    dateTime: String!
    emoji: Emoji
    parentId: ID
    reactions: [Reaction!]
    receiverId: ID!
    replies: [Message!]
    senderId: ID!
    text: String
  }

  type Place {
    id: ID!
    city: String!
    from: String!
    isCurrent: Boolean
    to: String
    visibility: Permission!
  }

  type Post {
    id: ID!
    canComment: Permission!
    canReact: Permission!
    canShare: Permission!
    comments: [Comment!]
    dateTime: String!
    owner: User!
    ownerId: ID!
    parentId: ID
    photos: [PostPhoto!]
    reactions: [Reaction!]
    receiverId: ID!
    shares: [Share!]
    text: String
    video: String
    visibility: Permission!
  }

  type PostPhoto {
    id: ID!
    comments: [Comment!]
    ownerId: ID!
    postId: ID!
    reactions: [Reaction!]
    shares: [Share!]
    text: String
    url: String!
  }

  type ProfilePhoto {
    id: ID!
    comments: [Comment!]
    dateTime: String!
    description: String
    isCurrent: Boolean
    ownerId: ID!
    reactions: [Reaction!]
    shares: [Share!]
    url: String!
    visibility: Permission!
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

  type SavedPost {
    postId: ID!
    userId: ID!
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
    coverPhotos: [CoverPhoto!]
    educationHistory: [Education!]
    email: String!
    firstName: String!
    friends: [User!]
    friendshipRequests: [FriendshipRequest!]
    lastName: String!
    messages: [Message!]
    placesHistory: [Place!]
    posts: [Post!]
    profilePhotos: [ProfilePhoto!]
    relationshipStatus: RelationshipStatus
    username: String!
    workHistory: [Work!]
  }

  type Work {
    id: ID!
    company: String!
    from: String!
    isCurrent: Boolean
    position: String!
    to: String
    visibility: Permission!
  }

  type Query {
    authenticatedUser: User
    comment(id: ID!): Comment
    comments: [Comment!]
    commentReactions(commentId: ID!): [Reaction!]
    commentReplies(commentId: ID!): [Comment!]
    conversationBetween(input: GetConversationBetweenInput!): Conversation
    friendsPostsByOwnerId(ownerId: ID!): [Post!]
    friendshipSuggestionsById(id: ID!): [User!]
    messagesBetween(input: GetMessagesBetweenInput!): [Message!]
    postComments(postId: ID!): [Comment!]
    post(id: ID!): Post
    posts: [Post!]
    postsByOwnerId(ownerId: ID!): [Post!]
    userById(id: ID!): User
    userByUsername(username: String!): User
    userFriendsById(id: ID!): [User!]
    userFriendsByUsername(username: String!): [User!]
    userPostReaction(input: GetUserPostReactionInput!): Reaction
    userSavedPosts(id: ID!): [Post!]
    users: [User!]
  }

  type Mutation {
    addCommentReaction(input: AddCommentReactionInput!): Reaction
    addCommentReply(input: AddCommentReplyInput!): Comment
    addMessage(input: AddMessageInput!): Message
    addPostComment(input: AddPostCommentInput!): Comment
    addPostReaction(input: AddPostReactionInput!): Reaction
    addUserCollegeEducation(input: AddUserCollegeEducationInput!): Education
    addUserFriend(input: AddUserFriendInput!): Friendship
    addUserHighSchoolEducation(
      input: AddUserHighSchoolEducationInput!
    ): Education
    addUserPlace(input: AddUserPlaceInput!): Place
    addUserRelationshipStatus(
      input: AddUserRelationshipStatusInput!
    ): RelationshipStatus
    addUserWorkplace(input: AddUserWorkplaceInput!): Work
    createPost(input: CreatePostInput!): Post
    removeComment(id: ID!): Comment
    removeCommentReaction(input: RemoveCommentReactionInput!): Reaction
    removeCommentReply(input: RemoveCommentReplyInput!): Comment
    removePostComment(input: RemovePostCommentInput!): Comment
    removePostReaction(input: RemovePostReactionInput!): Reaction
    removeUserFriendshipRequest(
      input: RemoveUserFriendshipRequestInput!
    ): FriendshipRequest
    savePost(input: SavePostInput!): String
    sendUserFriendshipRequest(
      input: SendUserFriendshipRequestInput!
    ): FriendshipRequest
    unsavePost(input: SavePostInput!): String
    updateCommentReaction(input: UpdateCommentReactionInput): Reaction
    updateConversationEmoji(input: UpdateConversationEmojiInput!): Conversation
    updateConversationNickname(
      input: UpdateConversationNicknameInput!
    ): Conversation
    updateConversationTheme(input: UpdateConversationThemeInput!): Conversation
    updatePostReaction(input: UpdatePostReactionInput!): Reaction!
    updateUserPlace(input: UpdateUserPlaceInput!): Place
  }

  enum ConversationTheme {
    BLOOD
    CHINESE_YELLOW
    DEFAULT
    INDIGO
    MAXIMUM_BLUE_PURPLE
    OCEAN_BLUE
    PURPLE_PIZZAZZ
    RED
    SUNSET_ORANGE
    SWEET_BROWN
    VERY_LIGH_BLUE
    VIVID_MALACHITE
  }

  enum EducationLevel {
    COLLEGE
    HIGH_SCHOOL
  }

  enum Emoji {
    LIKE
    LOVE
  }

  enum MediaType {
    PHOTO
    VIDEO
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
