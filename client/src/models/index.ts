enum Permission {
  FRIENDS = "FRIENDS",
  PERSONAL = "PERSONAL",
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
  email: string;
  firstName: string;
  friends?: User[] | null;
  lastName: string;
  posts: Post[] | null;
  username: string;
}

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

  */
