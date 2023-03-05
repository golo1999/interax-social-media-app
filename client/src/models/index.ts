export enum EducationLevel {
  COLLEGE = "COLLEGE",
  HIGH_SCHOOL = "HIGH_SCHOOL",
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
  postId: string;
  reactions: Reaction[] | null;
  replies: Comment[] | null;
  text: string;
}

export interface Date {
  __typename?: "Date";
  day: string;
  month: string;
  year: string;
}

export interface DropdownItem {
  key: string;
  value: string;
}

type EducationCommonTypes = {
  __typename?: "Education";
  id: string;
  from: Date;
  school: string;
  visibility: Permission;
};

// The degree is accepted only when the education level is college
type EducationConditionalTypes = (
  | { degree: string; level: EducationLevel.COLLEGE }
  | { degree?: never; level: EducationLevel.HIGH_SCHOOL }
) &
  ({ graduated: boolean; to: Date } | { graduated?: never; to?: never });

export type Education = EducationCommonTypes & EducationConditionalTypes;

export interface Photo {
  __typename?: "Photo";
  id: string;
  comments: Comment[] | null;
  ownerId: string;
  postId: string;
  reactions: Reaction[] | null;
  shares: Share[] | null;
  text: string | null;
  url: string;
}

type PlaceCommonTypes = {
  __typename?: "Place";
  id: string;
  city: string;
  from: Date;
  visibility: Permission;
};

type PlaceConditionalTypes =
  | { isCurrent: boolean; to?: never }
  | { isCurrent?: never; to: Date };

export type Place = PlaceCommonTypes & PlaceConditionalTypes;

export interface Post {
  __typename?: "Post";
  id: string;
  canComment: Permission;
  canReact: Permission;
  canShare: Permission;
  canView: Permission;
  comments: Comment[] | null;
  dateTime: string;
  owner: User;
  parentId: string | null;
  photos: Photo[] | null;
  reactions: Reaction[] | null;
  shares: Share[] | null;
  text: string | null;
  video: string | null;
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

export interface User {
  __typename?: "User";
  id: string;
  biography?: string | null;
  birthDate?: string | null;
  educationHistory: Education[] | null;
  email: string;
  firstName: string;
  friends?: User[] | null;
  lastName: string;
  placesHistory: Place[] | null;
  posts: Post[] | null;
  relationshipStatus: RelationshipStatus | null;
  username: string;
  workHistory: Work[] | null;
}

type WorkCommonTypes = {
  __typename?: "Work";
  id: string;
  company: string;
  from: Date;
  position: string;
  visibility: Permission;
};

type WorkConditionalTypes =
  | { isCurrent: boolean; to?: never }
  | { isCurrent?: never; to: Date };

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
