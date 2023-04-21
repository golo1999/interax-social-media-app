import { IconType } from "react-icons";

export enum ConversationTheme {
  BLOOD = "BLOOD",
  CHINESE_YELLOW = "CHINESE_YELLOW",
  DEFAULT = "DEFAULT",
  INDIGO = "INDIGO",
  MAXIMUM_BLUE_PURPLE = "MAXIMUM_BLUE_PURPLE",
  OCEAN_BLUE = "OCEAN_BLUE",
  PURPLE_PIZZAZZ = "PURPLE_PIZZAZZ",
  RED = "RED",
  SUNSET_ORANGE = "SUNSET_ORANGE",
  SWEET_BROWN = "SWEET_BROWN",
  VERY_LIGH_BLUE = "VERY_LIGH_BLUE",
  VIVID_MALACHITE = "VIVID_MALACHITE",
}

export enum EducationLevel {
  COLLEGE = "COLLEGE",
  HIGH_SCHOOL = "HIGH_SCHOOL",
}

export enum Emoji {
  LIKE = "LIKE",
  LOVE = "LOVE",
}

export enum MediaType {
  PHOTO = "PHOTO",
  VIDEO = "VIDEO",
}

export enum Month {
  JANUARY = "JANUARY",
  FEBRUARY = "FEBRUARY",
  MARCH = "MARCH",
  APRIL = "APRIL",
  MAY = "MAY",
  JUNE = "JUNE",
  JULY = "JULY",
  AUGUST = "AUGUST",
  SEPTEMBER = "SEPTEMBER",
  OCTOBER = "OCTOBER",
  NOVEMBER = "NOVEMBER",
  DECEMBER = "DECEMBER",
}

export enum Permission {
  FRIENDS = "FRIENDS",
  ONLY_ME = "ONLY_ME",
  PUBLIC = "PUBLIC",
}

export enum ReactionType {
  ANGRY = "ANGRY",
  CARE = "CARE",
  HAHA = "HAHA",
  LIKE = "LIKE",
  LOVE = "LOVE",
  SAD = "SAD",
  WOW = "WOW",
}

export enum RelationshipStatusType {
  SINGLE = "SINGLE",
  IN_A_RELATIONSHIP = "IN_A_RELATIONSHIP",
  ENGAGED = "ENGAGED",
  MARRIED = "MARRIED",
  IN_A_CIVIL_UNION = "IN_A_CIVIL_UNION",
  IN_A_DOMESTIC_PARTNERSHIP = "IN_A_DOMESTIC_PARTNERSHIP",
  IN_AN_OPEN_RELATIONSHIP = "IN_AN_OPEN_RELATIONSHIP",
  IT_IS_COMPLICATED = "IT_IS_COMPLICATED",
  SEPARATED = "SEPARATED",
  DIVORCED = "DIVORCED",
  WIDOWED = "WIDOWED",
}

export interface Comment {
  __typename?: "Comment";
  id: string;
  dateTime: string;
  owner: User;
  ownerId: string;
  postId: string;
  reactions: Reaction[] | null;
  replies: Comment[] | null;
  text: string;
}

export interface Conversation {
  emoji: Emoji;
  files: File[] | null;
  first: string;
  firstNickname: string | null;
  media: Media[] | null;
  second: string;
  secondNickname: string | null;
  theme: ConversationTheme;
}

export interface CoverPhoto {
  __typename?: "CoverPhoto";
  id: string;
  comments: Comment[] | null;
  dateTime: string;
  description: string | null;
  isCurrent: boolean | null;
  ownerId: string;
  reactions: Reaction[] | null;
  shares: Share[] | null;
  url: string;
  visibility: Permission;
}

export type Date = {
  __typename?: "Date";
  day: string;
  month: string;
  year: string;
};

export interface DropdownItem {
  key: string;
  value: string;
}

type EducationCommonTypes = {
  __typename?: "Education";
  id: string;
  from: string;
  school: string;
  visibility: Permission;
};

// The degree is accepted only when the education level is college
type EducationConditionalTypes = (
  | { degree: string; level: EducationLevel.COLLEGE }
  | { degree?: never; level: EducationLevel.HIGH_SCHOOL }
) &
  ({ graduated: boolean; to: string } | { graduated?: never; to?: never });

export type Education = EducationCommonTypes & EducationConditionalTypes;

export interface File {
  __typename?: "File";
  id: string;
  name: string;
  size: number;
}

export interface Friendship {
  first: string;
  second: string;
}

export interface FriendshipRequest {
  receiver: string;
  sender: string;
}

export interface Media {
  __typename?: "Media";
  type: MediaType;
  url: string;
}

type MessageCommonTypes = {
  __typename?: "Message";
  id: string;
  dateTime: string;
  parentId: string | null;
  receiverId: string;
  reactions: Reaction[] | null;
  replies: Message[] | null;
  senderId: string;
};

type MessageConditionalTypes =
  | { emoji: Emoji; text?: never }
  | { emoji?: never; text: string };

export type Message = MessageCommonTypes & MessageConditionalTypes;

export interface NavigationItem {
  endIcon?: IconType;
  name: string;
  startIcon: IconType;
  onClick?: () => void;
}

export interface PostPhoto {
  __typename?: "PostPhoto";
  id: string;
  comments: Comment[] | null;
  ownerId: string;
  postId: string;
  reactions: Reaction[] | null;
  shares: Share[] | null;
  text: string | null;
  url: string;
}

export interface ProfilePhoto {
  __typename?: "ProfilePhoto";
  id: string;
  comments: Comment[] | null;
  dateTime: string;
  description: string | null;
  isCurrent: boolean | null;
  ownerId: string;
  reactions: Reaction[] | null;
  shares: Share[] | null;
  url: string;
  visibility: Permission;
}

type PlaceCommonTypes = {
  __typename?: "Place";
  id: string;
  city: string;
  from: string;
  visibility: Permission;
};

type PlaceConditionalTypes =
  | { isCurrent: boolean; to?: never }
  | { isCurrent?: never; to: string };

export type Place = PlaceCommonTypes & PlaceConditionalTypes;

export interface Post {
  __typename?: "Post";
  id: string;
  canComment: Permission;
  canReact: Permission;
  canShare: Permission;
  comments: Comment[] | null;
  dateTime: string;
  owner: User;
  ownerId: string;
  parentId: string | null;
  photos: PostPhoto[] | null;
  reactions: Reaction[] | null;
  receiverId: string;
  shares: Share[] | null;
  text: string | null;
  video: string | null;
  visibility: Permission;
}

export interface Reaction {
  __typename?: "Reaction";
  dateTime: string;
  id: string;
  owner: User;
  type: ReactionType;
}

export interface RelationshipStatus {
  __typename?: "RelationshipStatus";
  status: RelationshipStatusType;
  visibility: Permission;
}

export interface Share {
  __typename?: "Share";
  id: string;
  dateTime: string;
  owner: User;
}

export type Time = {
  __typename?: "Time";
  hour: string;
  minute: string;
  second: string;
};

export interface User {
  __typename?: "User";
  id: string;
  biography?: string | null;
  birthDate?: string | null;
  coverPhotos?: CoverPhoto[] | null;
  educationHistory: Education[] | null;
  email: string;
  firstName: string;
  friends?: User[] | null;
  friendshipRequests?: FriendshipRequest[] | null;
  lastName: string;
  messages: Message[] | null;
  placesHistory: Place[] | null;
  posts: Post[] | null;
  profilePhotos?: ProfilePhoto[] | null;
  relationshipStatus: RelationshipStatus | null;
  username: string;
  workHistory: Work[] | null;
}

type WorkCommonTypes = {
  __typename?: "Work";
  id: string;
  company: string;
  from: string;
  position: string;
  visibility: Permission;
};

type WorkConditionalTypes =
  | { isCurrent: boolean; to?: never }
  | { isCurrent?: never; to: string };

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
