import { gql } from "@apollo/client";

import {
  Comment,
  Conversation,
  Message,
  Post,
  User,
  Users,
  UserError,
  UserWithMessage,
} from "models";

import { COMMENT_DATA, PLACE_DATA, POST_DATA, USER_DATA } from "./Fragments";

export interface GetAuthenticatedUserData {
  authenticatedUser: User;
}

export const GET_AUTHENTICATED_USER = gql`
  ${COMMENT_DATA}
  ${PLACE_DATA}
  ${POST_DATA}
  ${USER_DATA}
  query GetAuthenticatedUser {
    authenticatedUser {
      ...UserData
    }
  }
`;

export const GET_AUTHENTICATED_USER_WITH_FRIENDS = gql`
  ${COMMENT_DATA}
  query GetAuthenticatedUser {
    authenticatedUser {
      email
      firstName
      friends {
        firstName
        id
        lastName
        profilePhotos {
          comments {
            ...CommentData
          }
          dateTime
          description
          isCurrent
          id
          ownerId
          url
          visibility
        }
        username
      }
      friendshipRequests {
        receiver
        sender
      }
      id
      lastName
      username
    }
  }
`;

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

export interface GetCommentRepliesData {
  commentReplies: Comment[] | null;
}

export const GET_COMMENT_REPLIES = gql`
  ${COMMENT_DATA}
  query GetCommentReplies($commentId: ID!) {
    commentReplies(commentId: $commentId) {
      ...CommentData
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

export interface GetFriendsPostsByUserIdData {
  friendsPostsByOwnerId: Post[];
}

export const GET_FRIENDS_POSTS_BY_USER_ID = gql`
  ${COMMENT_DATA}
  query GetFriendsPostsByOwnerId($ownerId: ID!) {
    friendsPostsByOwnerId(ownerId: $ownerId) {
      canComment
      canReact
      canShare
      comments {
        ...CommentData
      }
      dateTime
      id
      owner {
        firstName
        id
        lastName
        username
      }
      parentId
      photos {
        id
        ownerId
        postId
        text
        url
      }
      reactions {
        owner {
          firstName
          id
          lastName
          username
        }
        type
      }
      shares {
        owner {
          firstName
          lastName
          username
        }
      }
      text
      video
      visibility
    }
  }
`;

export interface GetFriendshipSuggestionsByIdData {
  friendshipSuggestionsById: User[] | null;
}

export const GET_FRIENDSHIP_SUGGESTIONS_BY_ID = gql`
  ${COMMENT_DATA}
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

export interface GetUserFollowingListData {
  userFollowingList: Users | UserError | null;
}

export const GET_USER_FOLLOWING_LIST = gql`
  ${COMMENT_DATA}
  ${PLACE_DATA}
  ${POST_DATA}
  ${USER_DATA}
  query GetUserFollowingList($id: ID!) {
    userFollowingList(id: $id) {
      ... on UsersError {
        message
        __typename
      }
      ... on Users {
        users {
          ...UserData
        }
      }
    }
  }
`;

export interface GetUserByIdData {
  userById: User | UserError | UserWithMessage | null;
}

export const GET_USER_BY_ID = gql`
  ${COMMENT_DATA}
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

export interface GetUserByUsernameData {
  userByUsername: User | UserError | null;
}

export const GET_USER_BY_USERNAME = gql`
  ${COMMENT_DATA}
  ${PLACE_DATA}
  ${POST_DATA}
  ${USER_DATA}
  query GetUserByUsername($username: String!) {
    userByUsername(username: $username) {
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
  query GetUserFriendsById($id: String!) {
    userFriendsById(id: $id) {
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

export interface GetUserSavedPostsData {
  userSavedPosts: Post[] | null;
}

export const GET_USER_SAVED_POSTS = gql`
  ${COMMENT_DATA}
  ${POST_DATA}
  query GetUserSavedPosts($id: ID!) {
    userSavedPosts(id: $id) {
      ...PostData
    }
  }
`;
