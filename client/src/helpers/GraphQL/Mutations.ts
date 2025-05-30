import { TypedDocumentNode, gql } from "@apollo/client";

import { ConversationTheme, Emoji, Permission } from "enums";
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
  HighSchoolEducation,
  Message,
  Place,
  Post,
  PostReaction,
  PostWithSavedCollectionID,
  ProfilePhoto,
  RelationshipStatus,
  SavedPost,
  SavedPostCollection,
  UserPhoto,
  Work,
} from "models";

import {
  COMMENT_DATA,
  CONVERSATION_DATA,
  PLACE_DATA,
  POST_DATA,
  POST_WITH_SAVED_COLLECTION_ID_DATA,
} from "./Fragments";

interface AddCommentData {
  addComment: Comment | null;
}

interface AddCommentVariables {
  input: {
    commentOwnerId: string;
    parentId?: string;
    postId: string;
    text: string;
    topLevelParentId?: string;
  };
}

export const ADD_COMMENT: TypedDocumentNode<
  AddCommentData,
  AddCommentVariables
> = gql`
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

interface AddMessageData {
  addMessage: Message | null;
}

interface AddMessageVariables {
  input: {
    emoji?: Emoji;
    parentId?: string;
    receiverId: string;
    senderId: string;
    text?: string;
  };
}

export const ADD_MESSAGE: TypedDocumentNode<
  AddMessageData,
  AddMessageVariables
> = gql`
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

interface AddSavedPostCollectionData {
  addSavedPostCollection: SavedPostCollection | null;
}

interface AddSavedPostCollectionVariables {
  input: {
    name: string;
    userId: string;
    visibility: Permission;
  };
}

export const ADD_SAVED_POST_COLLECTION: TypedDocumentNode<
  AddSavedPostCollectionData,
  AddSavedPostCollectionVariables
> = gql`
  mutation AddSavedPostCollection($input: AddSavedPostCollectionInput!) {
    addSavedPostCollection(input: $input) {
      id
      name
      visibility
    }
  }
`;

interface AddCollegeEducationData {
  addUserCollegeEducation: CollegeEducation | null;
}

interface AddCollegeEducationVariables {
  input: {
    degree: string;
    from: string;
    graduated: boolean;
    school: string;
    to?: string;
    userId: string;
    visibility: Permission;
  };
}

export const ADD_USER_COLLEGE_EDUCATION: TypedDocumentNode<
  AddCollegeEducationData,
  AddCollegeEducationVariables
> = gql`
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

interface AddUserFriendData {
  addUserFriend: Friendship | null;
}

interface AddUserFriendVariables {
  input: { first: string; second: string };
}

export const ADD_USER_FRIEND: TypedDocumentNode<
  AddUserFriendData,
  AddUserFriendVariables
> = gql`
  mutation AddUserFriend($input: AddUserFriendInput!) {
    addUserFriend(input: $input) {
      first
      second
    }
  }
`;

interface AddHighSchoolEducationData {
  addUserHighSchoolEducation: HighSchoolEducation | null;
}

interface AddHighSchoolEducationVariables {
  input: {
    from: string;
    graduated: boolean;
    school: string;
    to?: string;
    userId: string;
    visibility: Permission;
  };
}

export const ADD_USER_HIGH_SCHOOL_EDUCATION: TypedDocumentNode<
  AddHighSchoolEducationData,
  AddHighSchoolEducationVariables
> = gql`
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

interface AddUserPlaceData {
  addUserPlace: Place | null;
}

interface AddUserPlaceVariables {
  input: {
    city: string;
    from: string;
    isCurrent: boolean;
    to?: string;
    userId: string;
    visibility: Permission;
  };
}

export const ADD_USER_PLACE: TypedDocumentNode<
  AddUserPlaceData,
  AddUserPlaceVariables
> = gql`
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

interface AddUserCoverPhotoData {
  addUserCoverPhoto: CoverPhoto | null;
}

interface AddUserCoverPhotoVariables {
  input: {
    ownerId: string;
    url: string;
    visibility: Permission;
  };
}

export const ADD_USER_COVER_PHOTO: TypedDocumentNode<
  AddUserCoverPhotoData,
  AddUserCoverPhotoVariables
> = gql`
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

interface AddUserPhotoData {
  addUserPhoto: UserPhoto | null;
}

interface AddUserPhotoVariables {
  input: {
    ownerId: string;
    url: string;
    visibility: Permission;
  };
}

export const ADD_USER_PHOTO: TypedDocumentNode<
  AddUserPhotoData,
  AddUserPhotoVariables
> = gql`
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

interface AddUserProfilePhotoData {
  addUserProfilePhoto: ProfilePhoto | null;
}

interface AddUserProfilePhotoVariables {
  input: {
    ownerId: string;
    url: string;
    visibility: Permission;
  };
}

export const ADD_USER_PROFILE_PHOTO: TypedDocumentNode<
  AddUserProfilePhotoData,
  AddUserProfilePhotoVariables
> = gql`
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

interface AddUserRelationshipStatusData {
  addUserRelationshipStatus: RelationshipStatus | null;
}

interface AddUserRelationshipStatusVariables {
  input: {
    status: RelationshipStatus;
    userId: string;
    visibility: Permission;
  };
}

export const ADD_USER_RELATIONSHIP_STATUS: TypedDocumentNode<
  AddUserRelationshipStatusData,
  AddUserRelationshipStatusVariables
> = gql`
  mutation AddUserRelationshipStatus($input: AddUserRelationshipStatusInput!) {
    addUserRelationshipStatus(input: $input) {
      status
      visibility
    }
  }
`;

interface AddUserWorkplaceData {
  addUserWorkplace: Work | null;
}

interface AddUserWorkplaceVariables {
  input: {
    company: string;
    from: string;
    isCurrent: boolean;
    position: string;
    to?: string;
    userId: string;
    visibility: Permission;
  };
}

export const ADD_USER_WORKPLACE: TypedDocumentNode<
  AddUserWorkplaceData,
  AddUserWorkplaceVariables
> = gql`
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

interface ChangeUserCoverPhotoData {
  changeUserCoverPhoto: CoverPhoto | null;
}

interface ChangeUserCoverPhotoVariables {
  input: {
    url: string;
    userId: string;
  };
}

export const CHANGE_USER_COVER_PHOTO: TypedDocumentNode<
  ChangeUserCoverPhotoData,
  ChangeUserCoverPhotoVariables
> = gql`
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

interface ChangeUserProfilePhotoData {
  changeUserProfilePhoto: ProfilePhoto | null;
}

interface ChangeUserProfilePhotoVariables {
  input: { url: string; userId: string };
}

export const CHANGE_USER_PROFILE_PHOTO: TypedDocumentNode<
  ChangeUserProfilePhotoData,
  ChangeUserProfilePhotoVariables
> = gql`
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

interface FollowUserData {
  followUser: FollowRelationship | null;
}

interface FollowUserVariables {
  input: { followingUserId: string; userId: string };
}

export const FOLLOW_USER: TypedDocumentNode<
  FollowUserData,
  FollowUserVariables
> = gql`
  mutation FollowUser($input: FollowUserInput!) {
    followUser(input: $input) {
      followingUserId
      userId
    }
  }
`;

export interface HidePostData {
  hidePost: Post | null;
}

export const HIDE_POST = gql`
  ${COMMENT_DATA}
  ${POST_DATA}
  mutation HidePost($input: HidePostInput!) {
    hidePost(input: $input) {
      ...PostData
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

interface RemovePostData {
  removePost: string | null;
}

interface RemovePostVariables {
  input: { postId: string; userId: string };
}

export const REMOVE_POST: TypedDocumentNode<
  RemovePostData,
  RemovePostVariables
> = gql`
  mutation RemovePost($input: RemovePostInput!) {
    removePost(input: $input)
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

interface RemovePostSharesData {
  removePostShares: Post[] | null;
}

interface RemovePostSharesVariables {
  input: { postId: string; userId: string };
}

export const REMOVE_POST_SHARES: TypedDocumentNode<
  RemovePostSharesData,
  RemovePostSharesVariables
> = gql`
  ${COMMENT_DATA}
  ${POST_DATA}
  mutation RemovePostShares($input: RemovePostSharesInput!) {
    removePostShares(input: $input) {
      ...PostData
    }
  }
`;

interface RemoveSavedPostCollectionData {
  removeSavedPostCollection: SavedPostCollection | null;
}

interface RemoveSavedPostCollectionVariables {
  input: { collectionId: string; userId: string };
}

export const REMOVE_SAVED_POST_COLLECTION: TypedDocumentNode<
  RemoveSavedPostCollectionData,
  RemoveSavedPostCollectionVariables
> = gql`
  mutation RemoveSavedPostCollection($input: RemoveSavedPostCollectionInput!) {
    removeSavedPostCollection(input: $input) {
      id
      name
      visibility
    }
  }
`;

interface RemoveUserFriendData {
  removeUserFriend: Friendship | null;
}

export const REMOVE_USER_FRIEND: TypedDocumentNode<
  RemoveUserFriendData,
  AddUserFriendVariables
> = gql`
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

interface SavePostData {
  savePost: PostWithSavedCollectionID | null;
}

interface SavePostVariables {
  input: { collectionId: string; postId: string; userId: string };
}

export const SAVE_POST: TypedDocumentNode<
  SavePostData,
  SavePostVariables
> = gql`
  ${COMMENT_DATA}
  ${POST_WITH_SAVED_COLLECTION_ID_DATA}
  mutation SavePost($input: SavePostInput!) {
    savePost(input: $input) {
      ...PostWithSavedCollectionIdData
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

interface UnfollowUserData {
  unfollowUser: FollowRelationship | null;
}

export const UNFOLLOW_USER: TypedDocumentNode<
  UnfollowUserData,
  FollowUserVariables
> = gql`
  mutation UnfollowUser($input: FollowUserInput!) {
    unfollowUser(input: $input) {
      followingUserId
      userId
    }
  }
`;

interface UnsavePostData {
  unsavePost: SavedPost | null;
}

interface UnsavePostVariables {
  input: { postId: string; userId: string };
}

export const UNSAVE_POST: TypedDocumentNode<
  UnsavePostData,
  UnsavePostVariables
> = gql`
  mutation UnsavePost($input: UnsavePostInput!) {
    unsavePost(input: $input) {
      collectionId
      id
      postId
      userId
    }
  }
`;

interface UpdateConversationEmojiData {
  updateConversationEmoji: Conversation | null;
}

interface UpdateConversationEmojiVariables {
  input: { emojiName: string; first: string; second: string };
}

export const UPDATE_CONVERSATION_EMOJI: TypedDocumentNode<
  UpdateConversationEmojiData,
  UpdateConversationEmojiVariables
> = gql`
  ${CONVERSATION_DATA}
  mutation UpdateConversationEmoji($input: UpdateConversationEmojiInput!) {
    updateConversationEmoji(input: $input) {
      ...ConversationData
    }
  }
`;

interface UpdateConversationNicknameData {
  updateConversationNickname: Conversation | null;
}

interface UpdateConversationNicknameVariables {
  input: { first: string; nickname?: string; second: string; userId: string };
}

export const UPDATE_CONVERSATION_NICKNAME: TypedDocumentNode<
  UpdateConversationNicknameData,
  UpdateConversationNicknameVariables
> = gql`
  ${CONVERSATION_DATA}
  mutation UpdateConversationNickname(
    $input: UpdateConversationNicknameInput!
  ) {
    updateConversationNickname(input: $input) {
      ...ConversationData
    }
  }
`;

interface UpdateConversationThemeData {
  updateConversationTheme: Conversation | null;
}

interface UpdateConversationThemeVariables {
  input: { first: string; second: string; theme: ConversationTheme };
}

export const UPDATE_CONVERSATION_THEME: TypedDocumentNode<
  UpdateConversationThemeData,
  UpdateConversationThemeVariables
> = gql`
  ${CONVERSATION_DATA}
  mutation UpdateConversationTheme($input: UpdateConversationThemeInput!) {
    updateConversationTheme(input: $input) {
      ...ConversationData
    }
  }
`;

interface UpdateSavedPostCollectionData {
  updateSavedPostCollection: SavedPostCollection | null;
}

interface UpdateSavedPostCollectionVariables {
  input: {
    collectionId: string;
    name?: string;
    userId: string;
    visibility?: Permission;
  };
}

export const UPDATE_SAVED_POST_COLLECTION: TypedDocumentNode<
  UpdateSavedPostCollectionData,
  UpdateSavedPostCollectionVariables
> = gql`
  mutation UpdateSavedPostCollection($input: UpdateSavedPostCollectionInput!) {
    updateSavedPostCollection(input: $input) {
      id
      name
      visibility
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
