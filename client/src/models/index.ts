import { IconType } from "react-icons";

import { CollegeEducation, HighSchoolEducation } from "./Education";
import { Message } from "./Message";
import { Place } from "./Place";

import {
  ConversationTheme,
  Emoji,
  MediaType,
  Permission,
  ReactionType,
  RelationshipStatusType,
} from "enums";
import { NotificationType } from "types";

export type BlockUserResult = { blockedUserId: string; userId: string };

export type Comment = {
  __typename?: "Comment";
  id: string;
  dateTime: string;
  owner: User;
  ownerId: string;
  parentId: string | null;
  post: Post;
  postId: string;
  reactions: CommentReaction[];
  replies: Comment[];
  repliesCount: number;
  text: string;
  topLevelParentId: string | null;
};

export type CommentReaction = {
  __typename?: "CommentReaction";
  id: string;
  commentId: string;
  dateTime: string;
  reactionType: ReactionType;
  userId: string;
};

export type Conversation = {
  emoji: Emoji;
  files: File[];
  first: string;
  firstNickname: string | null;
  id: string;
  media: Media[];
  second: string;
  secondNickname: string | null;
  theme: ConversationTheme;
};

export type CoverPhoto = {
  __typename?: "CoverPhoto";
  id: string;
  comments: Comment[];
  dateTime: string;
  description: string | null;
  isCurrent: boolean | null;
  ownerId: string;
  reactions: Reaction[];
  shares: Share[];
  url: string;
  visibility: Permission;
};

export type Date = {
  __typename?: "Date";
  day: string;
  month: string;
  year: string;
};

export type DropdownItem = {
  key: string;
  value: string;
};

export type File = {
  __typename?: "File";
  id: string;
  name: string;
  size: number;
};

export type FollowRelationship = {
  __typename?: "FollowRelationship";
  followingUserId: string;
  userId: string;
};

export type Friendship = {
  first: string;
  second: string;
};

export type FriendshipRequest = {
  receiver: string;
  sender: string;
};

export type HidePostResult = { id: string; postId: string; userId: string };

export type Media = {
  __typename?: "Media";
  type: MediaType;
  url: string;
};

export type NavigationItem = {
  endIcon?: IconType;
  name: string;
  startIcon: IconType;
  onClick?: () => void;
};

export type Notification = {
  dateTime: string;
  eventProducerId: string;
  isRead: boolean;
  type: NotificationType;
};

export type Post = {
  __typename?: "Post";
  id: string;
  canComment: Permission;
  canReact: Permission;
  canShare: Permission;
  comments: Comment[];
  commentsCount: number;
  dateTime: string;
  owner: User;
  ownerId: string;
  parentId: string | null;
  photos: PostPhoto[];
  reactions: PostReaction[];
  receiver: User;
  receiverId: string;
  shares: Share[];
  text: string | null;
  topLevelCommentsCount: number;
  video: string | null;
  visibility: Permission;
};

export type PostPhoto = {
  __typename?: "PostPhoto";
  id: string;
  comments: Comment[];
  ownerId: string;
  postId: string;
  reactions: Reaction[];
  shares: Share[];
  text: string | null;
  url: string;
};

export type PostReaction = {
  __typename?: "PostReaction";
  id: string;
  dateTime: string;
  postId: string;
  reactionType: ReactionType;
  userId: string;
};

export type ProfilePhoto = {
  __typename?: "ProfilePhoto";
  id: string;
  comments: Comment[];
  dateTime: string;
  description: string | null;
  isCurrent: boolean | null;
  ownerId: string;
  reactions: Reaction[];
  shares: Share[];
  url: string;
  visibility: Permission;
};

export type Reaction = {
  __typename?: "Reaction";
  dateTime: string;
  id: string;
  owner: User;
  type: ReactionType;
};

export type RelationshipStatus = {
  __typename?: "RelationshipStatus";
  status: RelationshipStatusType;
  visibility: Permission;
};

export type SavedPost = {
  __typename?: "SavedPost";
  id: string;
  postId: string;
  userId: string;
};

export type Share = {
  __typename?: "Share";
  id: string;
  dateTime: string;
  owner: User;
};

export type Time = {
  __typename?: "Time";
  hour: string;
  minute: string;
  second: string;
};

export type User = {
  __typename?: "User";
  id: string;
  biography: string | null;
  birthDate: string | null;
  blockedUsers: User[];
  coverPhoto: CoverPhoto | null;
  coverPhotos: CoverPhoto[];
  educationHistory: (CollegeEducation | HighSchoolEducation)[];
  email: string;
  firstName: string;
  followingUsers: User[];
  friends: User[];
  friendshipRequests: FriendshipRequest[];
  hiddenPosts: Post[];
  lastName: string;
  messages: Message[];
  photos: UserPhoto[];
  placesHistory: Place[];
  posts: Post[];
  profilePhoto: ProfilePhoto | null;
  profilePhotos: ProfilePhoto[];
  relationshipStatus: RelationshipStatus | null;
  savedPosts: Post[];
  username: string;
  workHistory: Work[];
};

export type UserError = {
  __typename?: "UserError";
  message: string;
};

export type UserPhoto = {
  __typename?: "UserPhoto";
  id: string;
  comments: Comment[];
  dateTime: string;
  description: string | null;
  ownerId: string;
  reactions: Reaction[];
  shares: Share[];
  url: string;
  visibility: Permission;
};

export type UserWithMessage = {
  __typename?: "UserWithMessage";
  message: string;
  user: User;
};

type WorkCommonTypes = {
  __typename?: "Work";
  id: string;
  company: string;
  from: string;
  position: string;
  visibility: Permission;
};

type WorkConditionalTypes =
  | { isCurrent: true; to?: never }
  | { isCurrent: false; to: string };

export type Work = WorkCommonTypes & WorkConditionalTypes;

/*

type Comment {
    id: ID!
    dateTime: String!
    owner: User!
    reactions: [Reaction!]
    replies: [Comment!]
    text: String!
  }

  type Reaction {
    id: ID!
    owner: User!
    type: ReactionType!
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
    photos: [Photo!]
    reactions: [Reaction!]
    shares: [Share!]
    text: String
    video: String
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
    username: String!
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

  */

export * from "./Education";
export * from "./Message";
export * from "./Place";
