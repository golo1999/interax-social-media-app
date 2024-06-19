import { TypedDocumentNode, gql } from "@apollo/client";

import {
  Comment,
  Conversation,
  Message,
  Post,
  User,
  UserError,
  UserWithMessage,
} from "models";

import {
  COLLEGE_EDUCATION_DATA,
  COMMENT_DATA,
  HIGH_SCHOOL_EDUCATION_DATA,
  PLACE_DATA,
  POST_DATA,
  USER_DATA,
} from "./Fragments";

export interface GetCommentData {
  comment: Comment | null;
}

export const GET_COMMENT = gql`
  ${COMMENT_DATA}
  query GetComment($id: ID!) {
    comment(id: $id) {
      ...CommentData
    }
  }
`;

type PageInfo = {
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
};

type CommentsEdge = { cursor: string; node: Comment };

type GetCommentsResult = {
  edges: CommentsEdge[];
  pageInfo: PageInfo;
  totalCount: number;
};

export interface GetCommentRepliesData {
  commentReplies: GetCommentsResult;
}

export const GET_COMMENT_REPLIES = gql`
  ${COMMENT_DATA}
  query GetCommentReplies($input: CommentRepliesInput!) {
    commentReplies(input: $input) {
      edges {
        cursor
        node {
          ...CommentData
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`;

export interface GetConversationBetweenData {
  conversationBetween: Conversation | null;
}

export const GET_CONVERSATION_BETWEEN = gql`
  query GetConversationBetween($input: GetConversationBetweenInput!) {
    conversationBetween(input: $input) {
      emoji
      files {
        name
        size
      }
      first
      firstNickname
      id
      media {
        type
        url
      }
      second
      secondNickname
      theme
    }
  }
`;

type GetFriendsPostsByOwnerIdResult = {
  edges: PostsEdge[];
  pageInfo: PageInfo;
  totalCount: number;
};

export interface GetFriendsPostsByUserIdData {
  friendsPostsByOwnerId: GetFriendsPostsByOwnerIdResult;
}

export const GET_FRIENDS_POSTS_BY_USER_ID = gql`
  ${COMMENT_DATA}
  ${POST_DATA}
  query GetFriendsPostsByOwnerId($input: FriendsPostsByOwnerIdInput!) {
    friendsPostsByOwnerId(input: $input) {
      edges {
        cursor
        node {
          ...PostData
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`;

export interface GetFriendshipSuggestionsByIdData {
  friendshipSuggestionsById: User[] | null;
}

export const GET_FRIENDSHIP_SUGGESTIONS_BY_ID = gql`
  ${COLLEGE_EDUCATION_DATA}
  ${COMMENT_DATA}
  ${HIGH_SCHOOL_EDUCATION_DATA}
  ${PLACE_DATA}
  ${POST_DATA}
  ${USER_DATA}
  query GetFriendshipSuggestionsById($id: ID!) {
    friendshipSuggestionsById(id: $id) {
      ...UserData
    }
  }
`;

export interface GetMessagesBetweenData {
  messagesBetween: Message[] | null;
}

export const GET_MESSAGES_BETWEEN = gql`
  query GetMessagesBetween($input: GetMessagesBetweenInput!) {
    messagesBetween(input: $input) {
      dateTime
      id
      reactions {
        dateTime
        id
        owner {
          firstName
          id
          lastName
          username
        }
        type
      }
      receiverId
      senderId
      text
    }
  }
`;

export interface GetPostData {
  post: Post | null;
}

export const GET_POST = gql`
  ${COMMENT_DATA}
  ${POST_DATA}
  query GetPost($id: ID!) {
    post(id: $id) {
      ...PostData
    }
  }
`;

export interface GetPostCommentsData {
  postComments: GetCommentsResult;
}

export const GET_POST_COMMENTS = gql`
  ${COMMENT_DATA}
  query GetPostComments($input: PostCommentsInput!) {
    postComments(input: $input) {
      edges {
        cursor
        node {
          ...CommentData
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`;

export interface GetUserBlockedListData {
  userBlockedList: User[] | null;
}

export const GET_USER_BLOCKED_LIST = gql`
  ${COMMENT_DATA}
  ${PLACE_DATA}
  ${POST_DATA}
  ${USER_DATA}
  query GetUserBlockedList($id: ID!) {
    userBlockedList(id: $id) {
      ...UserData
    }
  }
`;

interface GetUserByIdData {
  userById: User | UserError | UserWithMessage | null;
}

interface GetUserByIdVariables {
  input: {
    authenticatedUserId?: string;
    returnUserIfBlocked?: boolean;
    userId: string;
  };
}

export const GET_USER_BY_ID: TypedDocumentNode<
  GetUserByIdData,
  GetUserByIdVariables
> = gql`
  ${COLLEGE_EDUCATION_DATA}
  ${COMMENT_DATA}
  ${HIGH_SCHOOL_EDUCATION_DATA}
  ${PLACE_DATA}
  ${POST_DATA}
  ${USER_DATA}
  query GetUserById($input: GetUserByIdInput!) {
    userById(input: $input) {
      ... on User {
        ...UserData
      }
      ... on UserError {
        message
      }
      ... on UserWithMessage {
        message
        user {
          ...UserData
        }
      }
    }
  }
`;

interface GetUserByUsernameData {
  userByUsername: User | UserError | null;
}

interface GetUserByUsernameVariables {
  input: { authenticatedUserId?: string; username: string };
}

export const GET_USER_BY_USERNAME: TypedDocumentNode<
  GetUserByUsernameData,
  GetUserByUsernameVariables
> = gql`
  ${COLLEGE_EDUCATION_DATA}
  ${COMMENT_DATA}
  ${HIGH_SCHOOL_EDUCATION_DATA}
  ${PLACE_DATA}
  ${POST_DATA}
  ${USER_DATA}
  query GetUserByUsername($input: GetUserByUsernameInput!) {
    userByUsername(input: $input) {
      ... on User {
        ...UserData
      }
      ... on UserError {
        message
      }
    }
  }
`;

export const GET_USER_FRIENDS_BY_ID = gql`
  query GetUserFriendsById($input: UserFriendsByIdInput!) {
    userFriendsById(input: $input) {
      firstName
      id
      lastName
      username
    }
  }
`;

export const GET_USER_FRIENDS_BY_USERNAME = gql`
  query GetUserFriendsByUsername($username: String!) {
    userFriendsByUsername(username: $username) {
      firstName
      id
      lastName
      username
    }
  }
`;

export type PostsEdge = { cursor: string; node: Post };

type GetUserPostsByIdResult = {
  edges: PostsEdge[];
  pageInfo: PageInfo;
  totalCount: number;
};

export interface GetUserPostsByIdData {
  userPostsById: GetUserPostsByIdResult;
}

export const GET_USER_POSTS_BY_ID = gql`
  ${COMMENT_DATA}
  ${POST_DATA}
  query GetUserPostsById($input: UserPostsByIdInput!) {
    userPostsById(input: $input) {
      edges {
        cursor
        node {
          ...PostData
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`;
