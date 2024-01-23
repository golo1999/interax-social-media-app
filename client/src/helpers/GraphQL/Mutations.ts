import { gql } from "@apollo/client";

import {
  Comment,
  Conversation,
  Education,
  Friendship,
  FriendshipRequest,
  Message,
  Place,
  Post,
  Reaction,
  RelationshipStatus,
  Work,
} from "models";

import {
  COMMENT_DATA,
  CONVERSATION_DATA,
  PLACE_DATA,
  POST_DATA,
} from "./Fragments";

export interface AddCommentReactionData {
  addCommentReaction: Reaction | null;
}

export const ADD_COMMENT_REACTION = gql`
  mutation AddCommentReaction($input: AddCommentReactionInput!) {
    addCommentReaction(input: $input) {
      id
      dateTime
      owner {
        email
        firstName
        id
        lastName
        username
      }
      type
    }
  }
`;

export interface AddCommentReplyData {
  addCommentReply: Comment | null;
}

export const ADD_COMMENT_REPLY = gql`
  mutation AddCommentReply($input: AddCommentReplyInput!) {
    addCommentReply(input: $input) {
      dateTime
      id
      owner {
        firstName
        id
        lastName
        username
      }
      text
    }
  }
`;

export interface AddMessageData {
  addMessage: Message | null;
}

export const ADD_MESSAGE = gql`
  mutation AddMessage($input: AddMessageInput!) {
    addMessage(input: $input) {
      dateTime
      emoji
      id
      reactions {
        dateTime
        id
        owner {
          email
          firstName
          id
          lastName
          username
        }
        type
      }
      receiverId
      replies {
        dateTime
        id
        receiverId
        senderId
        text
      }
      senderId
      text
    }
  }
`;

export interface AddPostCommentData {
  addPostComment: Comment | null;
}

export const ADD_POST_COMMENT = gql`
  mutation AddPostComment($input: AddPostCommentInput!) {
    addPostComment(input: $input) {
      dateTime
      id
      owner {
        email
        firstName
        id
        lastName
        username
      }
      reactions {
        type
      }
      replies {
        text
      }
      text
    }
  }
`;

export interface AddPostReactionData {
  addPostReaction: Reaction | null;
}

export const ADD_POST_REACTION = gql`
  mutation AddPostReaction($input: AddPostReactionInput!) {
    addPostReaction(input: $input) {
      id
      owner {
        email
        firstName
        id
        lastName
        username
      }
      type
    }
  }
`;

export interface AddCollegeEducationData {
  addUserCollegeEducation: Education | null;
}

export const ADD_USER_COLLEGE_EDUCATION = gql`
  mutation AddUserCollegeEducation($input: AddUserCollegeEducationInput!) {
    addUserCollegeEducation(input: $input) {
      degree
      from
      graduated
      id
      level
      school
      to
      visibility
    }
  }
`;

export interface AddUserFriendData {
  addUserFriend: Friendship | null;
}

export const ADD_USER_FRIEND = gql`
  mutation AddUserFriend($input: AddUserFriendInput!) {
    addUserFriend(input: $input) {
      first
      second
    }
  }
`;

export interface AddHighSchoolEducationData {
  addUserHighSchoolEducation: Education | null;
}

export const ADD_USER_HIGH_SCHOOL_EDUCATION = gql`
  mutation AddUserHighSchoolEducation(
    $input: AddUserHighSchoolEducationInput!
  ) {
    addUserHighSchoolEducation(input: $input) {
      degree
      from
      graduated
      id
      level
      school
      to
      visibility
    }
  }
`;

export interface AddUserPlaceData {
  addUserPlace: Place | null;
}

export const ADD_USER_PLACE = gql`
  mutation AddUserPlace($input: AddUserPlaceInput!) {
    addUserPlace(input: $input) {
      city
      from
      id
      isCurrent
      to
      visibility
    }
  }
`;

export interface AddRelationshipStatusData {
  addUserRelationshipStatus: RelationshipStatus | null;
}

export const ADD_USER_RELATIONSHIP_STATUS = gql`
  mutation AddUserRelationshipStatus($input: AddUserRelationshipStatusInput!) {
    addUserRelationshipStatus(input: $input) {
      status
      visibility
    }
  }
`;

export interface AddUserWorkplaceData {
  addUserWorkplace: Work | null;
}

export const ADD_USER_WORKPLACE = gql`
  mutation AddUserWorkplace($input: AddUserWorkplaceInput!) {
    addUserWorkplace(input: $input) {
      company
      from
      id
      position
      to
      visibility
    }
  }
`;

export interface BlockUserData {
  blockUser: string | null;
}

export const BLOCK_USER = gql`
  mutation BlockUser($input: BlockUserInput!) {
    blockUser(input: $input)
  }
`;

export interface CreatePostData {
  createPost: Post | null;
}

export const CREATE_POST = gql`
  ${COMMENT_DATA}
  ${POST_DATA}
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      ...PostData
    }
  }
`;

export interface FollowUserData {
  followUser: string | null;
}

export const FOLLOW_USER = gql`
  mutation FollowUser($input: FollowUserInput!) {
    followUser(input: $input)
  }
`;

export interface HidePostData {
  hidePost: string | null;
}

export const HIDE_POST = gql`
  mutation HidePost($input: HidePostInput!) {
    hidePost(input: $input)
  }
`;

export interface RemoveCommentData {
  removeComment: Comment | null;
}

export const REMOVE_COMMENT = gql`
  ${COMMENT_DATA}
  mutation RemoveComment($id: ID!) {
    removeComment(id: $id) {
      ...CommentData
    }
  }
`;

export interface RemoveCommentReactionData {
  removeCommentReaction: Reaction | null;
}

export const REMOVE_COMMENT_REACTION = gql`
  mutation RemoveCommentReaction($input: RemoveCommentReactionInput!) {
    removeCommentReaction(input: $input) {
      id
      dateTime
      owner {
        email
        firstName
        id
        lastName
        username
      }
      type
    }
  }
`;

export interface RemoveCommentReplyData {
  removeCommentReply: Comment | null;
}

export const REMOVE_COMMENT_REPLY = gql`
  mutation RemoveCommentReply($input: RemoveCommentReplyInput!) {
    removeCommentReply(input: $input) {
      dateTime
      id
      owner {
        firstName
        id
        lastName
        username
      }
      text
    }
  }
`;

export interface RemovePostData {
  removePost: Post | null;
}

export const REMOVE_POST = gql`
  ${COMMENT_DATA}
  ${POST_DATA}
  mutation RemovePost($id: ID!) {
    removePost(id: $id) {
      ...PostData
    }
  }
`;

export interface RemovePostReactionData {
  removePostReaction: Reaction | null;
}

export const REMOVE_POST_REACTION = gql`
  mutation RemovePostReaction($input: RemovePostReactionInput!) {
    removePostReaction(input: $input) {
      id
      owner {
        username
      }
      type
    }
  }
`;

export interface RemoveUserFriendData {
  removeUserFriend: Friendship | null;
}

export const REMOVE_USER_FRIEND = gql`
  mutation RemoveUserFriend($input: AddUserFriendInput!) {
    removeUserFriend(input: $input) {
      first
      second
    }
  }
`;

export interface RemoveUserFriendRequestData {
  removeUserFriendshipRequest: FriendshipRequest | null;
}

export const REMOVE_USER_FRIENDSHIP_REQUEST = gql`
  mutation RemoveUserFriendshipRequest(
    $input: RemoveUserFriendshipRequestInput!
  ) {
    removeUserFriendshipRequest(input: $input) {
      receiver
      sender
    }
  }
`;

export interface SavePostData {
  savePost: string | null;
}

export const SAVE_POST = gql`
  mutation SavePost($input: SavePostInput!) {
    savePost(input: $input)
  }
`;

export interface SendUserFriendRequestData {
  sendUserFriendshipRequest: FriendshipRequest | null;
}

export const SEND_USER_FRIENDSHIP_REQUEST = gql`
  mutation SendUserFriendshipRequest($input: SendUserFriendshipRequestInput!) {
    sendUserFriendshipRequest(input: $input) {
      receiver
      sender
    }
  }
`;

export interface UnblockUserData {
  unblockUser: string | null;
}

export const UNBLOCK_USER = gql`
  mutation UnblockUser($input: BlockUserInput!) {
    unblockUser(input: $input)
  }
`;

export interface UnfollowUserData {
  unfollowUser: string | null;
}

export const UNFOLLOW_USER = gql`
  mutation UnfollowUser($input: FollowUserInput!) {
    unfollowUser(input: $input)
  }
`;

export interface UnsavePostData {
  unsavePost: string | null;
}

export const UNSAVE_POST = gql`
  mutation UnsavePost($input: SavePostInput!) {
    unsavePost(input: $input)
  }
`;

export interface UpdateConversationEmojiData {
  updateConversationEmoji: Conversation | null;
}

export const UPDATE_CONVERSATION_EMOJI = gql`
  ${CONVERSATION_DATA}
  mutation UpdateConversationEmoji($input: UpdateConversationEmojiInput!) {
    updateConversationEmoji(input: $input) {
      ...ConversationData
    }
  }
`;

export interface UpdateConversationNicknameData {
  updateConversationNickname: Conversation | null;
}

export const UPDATE_CONVERSATION_NICKNAME = gql`
  ${CONVERSATION_DATA}
  mutation UpdateConversationNickname(
    $input: UpdateConversationNicknameInput!
  ) {
    updateConversationNickname(input: $input) {
      ...ConversationData
    }
  }
`;

export interface UpdateConversationThemeData {
  updateConversationTheme: Conversation | null;
}

export const UPDATE_CONVERSATION_THEME = gql`
  ${CONVERSATION_DATA}
  mutation UpdateConversationTheme($input: UpdateConversationThemeInput!) {
    updateConversationTheme(input: $input) {
      ...ConversationData
    }
  }
`;

export interface UpdatePostReactionData {
  updatePostReaction: Reaction | null;
}

export const UPDATE_POST_REACTION = gql`
  mutation UpdatePostReaction($input: UpdatePostReactionInput!) {
    updatePostReaction(input: $input) {
      id
      owner {
        email
        firstName
        id
        lastName
        username
      }
      type
    }
  }
`;

export interface UpdateUserPlaceData {
  updateUserPlace: Place | null;
}

export const UPDATE_USER_PLACE = gql`
  ${PLACE_DATA}
  mutation UpdateUserPlace($input: UpdateUserPlaceInput!) {
    updateUserPlace(input: $input) {
      ...PlaceData
    }
  }
`;

export interface UpdateCommentReactionData {
  updateCommentReaction: Reaction | null;
}

export const UPDATE_COMMENT_REACTION = gql`
  mutation UpdateCommentReaction($input: UpdateCommentReactionInput!) {
    updateCommentReaction(input: $input) {
      id
      dateTime
      owner {
        email
        firstName
        id
        lastName
        username
      }
      type
    }
  }
`;
