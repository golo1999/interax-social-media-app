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
  __typename: "Comment";
  id: string;
  dateTime: string;
  owner: User;
  reactions: Reaction[];
  text: string;
}

export interface Post {
  __typename: "Post";
  id: string;
  canComment: Permission;
  canReact: Permission;
  canShare: Permission;
  canView: Permission;
  comments: Comment[];
  dateTime: string;
  owner: User;
  photo: string;
  reactions: Reaction[];
  shares: Share[];
  text: string;
  video: string;
}

export interface Reaction {
  __typename: "Reaction";
  id: string;
  owner: User;
  type: ReactionType;
}

export interface Share {
  __typename: "Share";
  id: string;
  dateTime: string;
  owner: User;
}

export interface User {
  __typename: "User";
  id: string;
  biography?: string | null;
  birthDate?: string | null;
  email: string;
  firstName: string;
  friends?: User[] | null;
  lastName: string;
  username: string;
}
