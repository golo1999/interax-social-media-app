const { gql } = require("apollo-server-express");

const typeDefs = gql`
  input AddCommentReactionInput {
    commentId: ID!
    reactionType: ReactionType!
    userId: ID!
  }

  input AddMessageInput {
    emoji: Emoji
    parentId: ID
    receiverId: ID!
    senderId: ID!
    text: String
  }

  input AddCommentInput {
    commentOwnerId: ID!
    parentId: ID
    postId: ID!
    text: String!
  }

  input AddPostReactionInput {
    postId: ID!
    reactionType: ReactionType!
    userId: ID!
  }

  input AddUserCollegeEducationInput {
    degree: String!
    from: String!
    graduated: Boolean!
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
    graduated: Boolean!
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

  input BlockUserInput {
    blockedUserId: ID!
    userId: ID!
  }

  input CreatePostInput {
    ownerId: ID!
    parentId: ID
    receiverId: ID!
    text: String!
    visibility: Permission!
  }

  input FollowUserInput {
    followingUserId: ID!
    userId: ID!
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

  input GetUserByIdInput {
    id: ID!
    returnUserIfBlocked: Boolean
  }

  input HidePostInput {
    postId: ID!
    userId: ID!
  }

  input RemoveCommentReactionInput {
    commentId: ID!
    userId: ID!
  }

  input RemovePostReactionInput {
    postId: ID!
    userId: ID!
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

  input UpdateConversationEmojiInput {
    emoji: Emoji!
    first: ID!
    second: ID!
  }

  input UpdateConversationNicknameInput {
    first: ID!
    nickname: String
    second: ID!
    userId: ID!
  }

  input UpdateConversationThemeInput {
    first: ID!
    second: ID!
    theme: ConversationTheme!
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

  type BlockUserResult {
    blockedUserId: ID!
    userId: ID!
  }

  type CollegeEducation {
    id: ID!
    degree: String
    from: String!
    graduated: Boolean!
    level: EducationLevel!
    school: String!
    to: String
    userId: ID!
    visibility: Permission!
  }

  type Comment {
    id: ID!
    dateTime: String!
    owner: User!
    ownerId: ID!
    parentId: ID
    post: Post!
    postId: ID!
    reactions: [CommentReaction!]!
    replies: [Comment!]!
    repliesCount: Int!
    text: String!
  }

  type CommentReaction {
    id: ID!
    commentId: ID!
    dateTime: String!
    reactionType: ReactionType!
    userId: ID!
  }

  type Conversation {
    emoji: Emoji!
    files: [File!]!
    first: ID!
    firstNickname: String
    id: String!
    media: [Media!]!
    second: ID!
    secondNickname: String
    theme: ConversationTheme!
  }

  type CoverPhoto {
    id: ID!
    comments: [Comment!]!
    dateTime: String!
    description: String
    isCurrent: Boolean
    ownerId: ID!
    reactions: [Reaction!]!
    shares: [Share!]!
    url: String!
    visibility: Permission!
  }

  type File {
    id: ID!
    name: String!
    size: Int!
  }

  type FollowRelationship {
    followingUserId: ID!
    userId: ID!
  }

  type Friendship {
    first: ID!
    second: ID!
  }

  type FriendshipRequest {
    receiver: ID!
    sender: ID!
  }

  type HidePostResult {
    postId: ID!
    userId: ID!
  }

  type HighSchoolEducation {
    id: ID!
    from: String!
    graduated: Boolean!
    level: EducationLevel!
    school: String!
    to: String
    userId: ID!
    visibility: Permission!
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
    reactions: [Reaction!]!
    receiverId: ID!
    replies: [Message!]!
    senderId: ID!
    text: String
  }

  type Place {
    id: ID!
    city: String!
    from: String!
    isCurrent: Boolean
    to: String
    userId: ID!
    visibility: Permission!
  }

  type Post {
    id: ID!
    canComment: Permission!
    canReact: Permission!
    canShare: Permission!
    comments: [Comment!]!
    commentsCount: Int!
    dateTime: String!
    owner: User!
    ownerId: ID!
    parentId: ID
    photos: [PostPhoto!]!
    reactions: [PostReaction!]!
    receiver: User!
    receiverId: ID!
    shares: [Share!]!
    text: String
    video: String
    visibility: Permission!
  }

  type PostPhoto {
    id: ID!
    comments: [Comment!]!
    ownerId: ID!
    postId: ID!
    reactions: [Reaction!]!
    shares: [Share!]!
    text: String
    url: String!
  }

  type PostReaction {
    id: ID!
    dateTime: String!
    postId: ID!
    reactionType: ReactionType!
    userId: ID!
  }

  type ProfilePhoto {
    id: ID!
    comments: [Comment!]!
    dateTime: String!
    description: String
    isCurrent: Boolean
    ownerId: ID!
    reactions: [Reaction!]!
    shares: [Share!]!
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
    userId: ID!
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
    coverPhotos: [CoverPhoto!]!
    educationHistory: [EducationResult!]!
    email: String!
    firstName: String!
    followingUsers: [User!]!
    friends: [User!]!
    friendshipRequests: [FriendshipRequest!]!
    hiddenPosts: [Post!]!
    lastName: String!
    messages: [Message!]!
    placesHistory: [Place!]!
    posts: [Post!]!
    profilePhotos: [ProfilePhoto!]!
    relationshipStatus: RelationshipStatus
    savedPosts: [Post!]!
    username: String!
    workHistory: [Work!]!
  }

  type UserError {
    message: String!
  }

  type UserWithMessage {
    message: String!
    user: User!
  }

  union EducationResult = CollegeEducation | HighSchoolEducation

  union UserByIdResult = User | UserError | UserWithMessage

  union UserByUsernameResult = User | UserError

  type Users {
    users: [User!]
  }

  type UsersError {
    message: String!
  }

  type Work {
    id: ID!
    company: String!
    from: String!
    isCurrent: Boolean!
    position: String!
    to: String
    userId: ID!
    visibility: Permission!
  }

  type Query {
    authenticatedUser: User
    comment(id: ID!): Comment
    commentReactions(commentId: ID!): [Reaction!]
    commentReplies(commentId: ID!): [Comment!]
    comments: [Comment!]
    conversationBetween(input: GetConversationBetweenInput!): Conversation
    friendshipSuggestionsById(id: ID!): [User!]
    friendsPostsByOwnerId(ownerId: ID!): [Post!]
    messagesBetween(input: GetMessagesBetweenInput!): [Message!]!
    post(id: ID!): Post
    postComments(postId: ID!): [Comment!]
    posts: [Post!]
    postsByOwnerId(ownerId: ID!): [Post!]
    userBlockedList(id: ID!): [User!]
    userById(input: GetUserByIdInput!): UserByIdResult
    userByUsername(username: String!): UserByUsernameResult
    userFriendsById(id: ID!): [User!]
    userFriendsByUsername(username: String!): [User!]
    userPostReaction(input: GetUserPostReactionInput!): PostReaction
    users: [User!]
  }

  type Mutation {
    addComment(input: AddCommentInput!): Comment
    addCommentReaction(input: AddCommentReactionInput!): CommentReaction
    addMessage(input: AddMessageInput!): Message
    addPostReaction(input: AddPostReactionInput!): PostReaction
    addUserCollegeEducation(
      input: AddUserCollegeEducationInput!
    ): CollegeEducation
    addUserFriend(input: AddUserFriendInput!): Friendship
    addUserHighSchoolEducation(
      input: AddUserHighSchoolEducationInput!
    ): HighSchoolEducation
    addUserPlace(input: AddUserPlaceInput!): Place
    addUserRelationshipStatus(
      input: AddUserRelationshipStatusInput!
    ): RelationshipStatus
    addUserWorkplace(input: AddUserWorkplaceInput!): Work
    blockUser(input: BlockUserInput!): BlockUserResult
    createPost(input: CreatePostInput!): Post
    followUser(input: FollowUserInput!): FollowRelationship
    hidePost(input: HidePostInput!): HidePostResult
    removeComment(id: ID!): Comment
    removeCommentReaction(input: RemoveCommentReactionInput!): CommentReaction
    removePost(id: ID!): Post
    removePostReaction(input: RemovePostReactionInput!): PostReaction
    removeUserFriend(input: AddUserFriendInput!): Friendship
    removeUserFriendshipRequest(
      input: RemoveUserFriendshipRequestInput!
    ): FriendshipRequest
    savePost(input: SavePostInput!): SavedPost
    sendUserFriendshipRequest(
      input: SendUserFriendshipRequestInput!
    ): FriendshipRequest
    unblockUser(input: BlockUserInput!): BlockUserResult
    unfollowUser(input: FollowUserInput!): FollowRelationship
    unsavePost(input: SavePostInput!): SavedPost
    updateConversationEmoji(input: UpdateConversationEmojiInput!): Conversation
    updateConversationNickname(
      input: UpdateConversationNicknameInput!
    ): Conversation
    updateConversationTheme(input: UpdateConversationThemeInput!): Conversation
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
