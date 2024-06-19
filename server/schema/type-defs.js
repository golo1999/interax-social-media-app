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
    topLevelParentId: ID
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

  input AddUserCoverPhotoInput {
    ownerId: ID!
    url: String!
    visibility: Permission!
  }

  input AddUserPhotoInput {
    ownerId: ID!
    url: String!
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

  input AddUserProfilePhotoInput {
    ownerId: ID!
    url: String!
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

  input ChangeUserCoverPhotoInput {
    url: String!
    userId: ID!
  }

  input ChangeUserProfilePhotoInput {
    url: String!
    userId: ID!
  }

  input CommentRepliesInput {
    after: String
    commentId: ID!
    first: Int
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

  input FriendsPostsByOwnerIdInput {
    after: String
    first: Int
    ownerId: ID!
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
    authenticatedUserId: ID
    returnUserIfBlocked: Boolean
    userId: ID!
  }

  input GetUserByUsernameInput {
    authenticatedUserId: ID
    username: String!
  }

  input HidePostInput {
    postId: ID!
    userId: ID!
  }

  input PostCommentsInput {
    after: String
    first: Int
    postId: ID!
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

  input SharePostInput {
    ownerId: ID!
    postId: ID!
    receiverId: ID!
    visibility: Permission!
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

  input UserFriendsByIdInput {
    after: String
    first: Int
    id: ID!
  }

  input UserPostsByIdInput {
    after: String
    before: String
    first: Int
    last: Int
    userId: ID!
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
    topLevelParentId: ID
  }

  type CommentsEdge {
    node: Comment!
    cursor: String!
  }

  type CommentsResult {
    edges: [CommentsEdge!]!
    pageInfo: PageInfo!
    totalCount: Int!
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

  type FriendsPostsByOwnerIdResult {
    edges: [PostsEdge!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type HidePostResult {
    id: ID!
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

  type PageInfo {
    endCursor: String
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
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
    topLevelCommentsCount: Int!
    video: String
    visibility: Permission!
  }

  type PostsEdge {
    node: Post!
    cursor: String!
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
    id: ID!
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
    blockedUsers: [User!]!
    coverPhoto: CoverPhoto
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
    photos: [UserPhoto!]!
    placesHistory: [Place!]!
    posts: [Post!]!
    profilePhoto: ProfilePhoto
    profilePhotos: [ProfilePhoto!]!
    relationshipStatus: RelationshipStatus
    savedPosts: [Post!]!
    username: String!
    workHistory: [Work!]!
  }

  type UserError {
    message: String!
  }

  type UserPhoto {
    id: ID!
    comments: [Comment!]!
    dateTime: String!
    description: String
    ownerId: ID!
    reactions: [Reaction!]!
    shares: [Share!]!
    url: String!
    visibility: Permission!
  }

  type UserPostsByIdResult {
    edges: [PostsEdge!]!
    pageInfo: PageInfo!
    totalCount: Int!
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
    comment(id: ID!): Comment
    commentReactions(commentId: ID!): [Reaction!]
    commentReplies(input: CommentRepliesInput!): CommentsResult!
    comments: [Comment!]
    conversationBetween(input: GetConversationBetweenInput!): Conversation
    friendshipSuggestionsById(id: ID!): [User!]
    friendsPostsByOwnerId(
      input: FriendsPostsByOwnerIdInput!
    ): FriendsPostsByOwnerIdResult!
    messagesBetween(input: GetMessagesBetweenInput!): [Message!]!
    post(id: ID!): Post
    postComments(input: PostCommentsInput!): CommentsResult!
    posts: [Post!]
    postsByOwnerId(ownerId: ID!): [Post!]
    userBlockedList(id: ID!): [User!]
    userById(input: GetUserByIdInput!): UserByIdResult
    userByUsername(input: GetUserByUsernameInput!): UserByUsernameResult
    userFriendsById(input: UserFriendsByIdInput!): [User!]!
    userFriendsByUsername(username: String!): [User!]
    userPostsById(input: UserPostsByIdInput!): UserPostsByIdResult!
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
    addUserCoverPhoto(input: AddUserCoverPhotoInput!): CoverPhoto
    addUserFriend(input: AddUserFriendInput!): Friendship
    addUserHighSchoolEducation(
      input: AddUserHighSchoolEducationInput!
    ): HighSchoolEducation
    addUserPhoto(input: AddUserPhotoInput!): UserPhoto
    addUserPlace(input: AddUserPlaceInput!): Place
    addUserProfilePhoto(input: AddUserProfilePhotoInput!): ProfilePhoto
    addUserRelationshipStatus(
      input: AddUserRelationshipStatusInput!
    ): RelationshipStatus
    addUserWorkplace(input: AddUserWorkplaceInput!): Work
    blockUser(input: BlockUserInput!): BlockUserResult
    changeUserCoverPhoto(input: ChangeUserCoverPhotoInput!): CoverPhoto
    changeUserProfilePhoto(input: ChangeUserProfilePhotoInput!): ProfilePhoto
    createPost(input: CreatePostInput!): Post
    followUser(input: FollowUserInput!): FollowRelationship
    hidePost(input: HidePostInput!): HidePostResult
    removeComment(id: ID!): Comment
    removeCommentReaction(input: RemoveCommentReactionInput!): CommentReaction
    removeCommentReplies(id: ID!): [Comment!]
    removePost(id: ID!): ID
    removePostReaction(input: RemovePostReactionInput!): PostReaction
    removePostShares(id: ID!): [Post!]
    removeUserFriend(input: AddUserFriendInput!): Friendship
    removeUserFriendshipRequest(
      input: RemoveUserFriendshipRequestInput!
    ): FriendshipRequest
    savePost(input: SavePostInput!): SavedPost
    sendUserFriendshipRequest(
      input: SendUserFriendshipRequestInput!
    ): FriendshipRequest
    sharePost(input: SharePostInput!): Post
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
