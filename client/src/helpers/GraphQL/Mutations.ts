import { gql } from "@apollo/client";

import {
  BlockUserResult,
  CollegeEducation,
  Comment,
  CommentReaction,
  Conversation,
  CoverPhoto,
  FollowRelationship,
  Friendship,
  FriendshipRequest,
  HidePostResult,
  HighSchoolEducation,
  Message,
  Place,
  Post,
  PostReaction,
  ProfilePhoto,
  RelationshipStatus,
  SavedPost,
  UserPhoto,
  Work,
} from "models";

import {
  COMMENT_DATA,
  CONVERSATION_DATA,
  PLACE_DATA,
  POST_DATA,
} from "./Fragments";

export interface AddCommentData {
  addComment: Comment | null;
}

export const ADD_COMMENT = gql`
  mutation AddComment($input: AddCommentInput!) {
    addComment(input: $input) {
      dateTime
      id
      owner {
        email
        firstName
        id
        lastName
        username
      }
      parentId
      reactions {
        reactionType
      }
      replies {
        text
      }
      text
      topLevelParentId
    }
  }
`;

export interface AddCommentReactionData {
  addCommentReaction: CommentReaction | null;
}

export const ADD_COMMENT_REACTION = gql`
  mutation AddCommentReaction($input: AddCommentReactionInput!) {
    addCommentReaction(input: $input) {
      commentId
      dateTime
      id
      reactionType
      userId
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

export interface AddPostReactionData {
  addPostReaction: PostReaction | null;
}

export const ADD_POST_REACTION = gql`
  mutation AddPostReaction($input: AddPostReactionInput!) {
    addPostReaction(input: $input) {
      dateTime
      id
      postId
      reactionType
      userId
    }
  }
`;

export interface AddCollegeEducationData {
  addUserCollegeEducation: CollegeEducation | null;
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
      userId
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
  addUserHighSchoolEducation: HighSchoolEducation | null;
}

export const ADD_USER_HIGH_SCHOOL_EDUCATION = gql`
  mutation AddUserHighSchoolEducation(
    $input: AddUserHighSchoolEducationInput!
  ) {
    addUserHighSchoolEducation(input: $input) {
      from
      graduated
      id
      level
      school
      to
      userId
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

export interface AddUserCoverPhotoData {
  addUserCoverPhoto: CoverPhoto | null;
}

export const ADD_USER_COVER_PHOTO = gql`
  mutation AddUserCoverPhoto($input: AddUserCoverPhotoInput!) {
    addUserCoverPhoto(input: $input) {
      dateTime
      id
      ownerId
      url
      visibility
    }
  }
`;

export interface AddUserPhotoData {
  addUserPhoto: UserPhoto | null;
}

export const ADD_USER_PHOTO = gql`
  mutation AddUserPhoto($input: AddUserPhotoInput!) {
    addUserPhoto(input: $input) {
      dateTime
      description
      id
      ownerId
      url
      visibility
    }
  }
`;

export interface AddUserProfilePhotoData {
  addUserProfilePhoto: ProfilePhoto | null;
}

export const ADD_USER_PROFILE_PHOTO = gql`
  mutation AddUserProfilePhoto($input: AddUserProfilePhotoInput!) {
    addUserProfilePhoto(input: $input) {
      dateTime
      id
      ownerId
      url
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
  blockUser: BlockUserResult | null;
}

export const BLOCK_USER = gql`
  mutation BlockUser($input: BlockUserInput!) {
    blockUser(input: $input) {
      blockedUserId
      userId
    }
  }
`;

export interface ChangeUserCoverPhotoData {
  changeUserCoverPhoto: CoverPhoto | null;
}

export const CHANGE_USER_COVER_PHOTO = gql`
  mutation ChangeUserCoverPhoto($input: ChangeUserCoverPhotoInput!) {
    changeUserCoverPhoto(input: $input) {
      dateTime
      id
      ownerId
      url
      visibility
    }
  }
`;

export interface ChangeUserProfilePhotoData {
  changeUserProfilePhoto: ProfilePhoto | null;
}

export const CHANGE_USER_PROFILE_PHOTO = gql`
  mutation ChangeUserProfilePhoto($input: ChangeUserProfilePhotoInput!) {
    changeUserProfilePhoto(input: $input) {
      dateTime
      id
      ownerId
      url
      visibility
    }
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
  followUser: FollowRelationship | null;
}

export const FOLLOW_USER = gql`
  mutation FollowUser($input: FollowUserInput!) {
    followUser(input: $input) {
      followingUserId
      userId
    }
  }
`;

export interface HidePostData {
  hidePost: HidePostResult | null;
}

export const HIDE_POST = gql`
  mutation HidePost($input: HidePostInput!) {
    hidePost(input: $input) {
      id
      postId
      userId
    }
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
  removeCommentReaction: CommentReaction | null;
}

export const REMOVE_COMMENT_REACTION = gql`
  mutation RemoveCommentReaction($input: RemoveCommentReactionInput!) {
    removeCommentReaction(input: $input) {
      commentId
      dateTime
      id
      reactionType
      userId
    }
  }
`;

export interface RemovePostData {
  removePost: string | null;
}

export const REMOVE_POST = gql`
  mutation RemovePost($id: ID!) {
    removePost(id: $id)
  }
`;

export interface RemovePostReactionData {
  removePostReaction: PostReaction | null;
}

export const REMOVE_POST_REACTION = gql`
  mutation RemovePostReaction($input: RemovePostReactionInput!) {
    removePostReaction(input: $input) {
      dateTime
      id
      postId
      reactionType
      userId
    }
  }
`;

export interface RemovePostSharesData {
  removePostShares: Post[] | null;
}

export const REMOVE_POST_SHARES = gql`
  ${COMMENT_DATA}
  ${POST_DATA}
  mutation RemovePostShares($id: ID!) {
    removePostShares(id: $id) {
      ...PostData
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
  savePost: SavedPost | null;
}

export const SAVE_POST = gql`
  mutation SavePost($input: SavePostInput!) {
    savePost(input: $input) {
      id
      postId
      userId
    }
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

export interface SharePostData {
  sharePost: Post[] | null;
}

export const SHARE_POST = gql`
  ${COMMENT_DATA}
  ${POST_DATA}
  mutation SharePost($input: SharePostInput!) {
    sharePost(input: $input) {
      ...PostData
    }
  }
`;

export interface UnblockUserData {
  unblockUser: BlockUserResult | null;
}

export const UNBLOCK_USER = gql`
  mutation UnblockUser($input: BlockUserInput!) {
    unblockUser(input: $input) {
      blockedUserId
      userId
    }
  }
`;

export interface UnfollowUserData {
  unfollowUser: FollowRelationship | null;
}

export const UNFOLLOW_USER = gql`
  mutation UnfollowUser($input: FollowUserInput!) {
    unfollowUser(input: $input) {
      followingUserId
      userId
    }
  }
`;

export interface UnsavePostData {
  unsavePost: SavedPost | null;
}

export const UNSAVE_POST = gql`
  mutation UnsavePost($input: SavePostInput!) {
    unsavePost(input: $input) {
      id
      postId
      userId
    }
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
