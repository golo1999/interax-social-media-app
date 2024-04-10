import { useLazyQuery, useMutation } from "@apollo/client";
import { Divider } from "@mui/material";

import { useEffect } from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { ImBin } from "react-icons/im";
import { MdBlock } from "react-icons/md";
import { VscCloseAll } from "react-icons/vsc";

import { Tab } from "components";
import {
  BLOCK_USER,
  BlockUserData,
  GET_USER_BY_USERNAME,
  GET_USER_FOLLOWING_LIST,
  GET_USER_SAVED_POSTS,
  GetUserFollowingListData,
  GetUserSavedPostsData,
  HIDE_POST,
  HidePostData,
  REMOVE_POST,
  REMOVE_USER_FRIEND,
  RemovePostData,
  RemoveUserFriendData,
  SAVE_POST,
  SavePostData,
  UNFOLLOW_USER,
  UnfollowUserData,
  UNSAVE_POST,
  UnsavePostData,
} from "helpers";
import { User } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

import { Container } from "./PostOptionsList.style";

interface Props {
  postId: string;
  postOwner: User;
  receiverUsername: string;
}

export function PostOptionsList({
  postId,
  postOwner: { firstName, id: postOwnerId, username },
  receiverUsername,
}: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const [
    fetchFollowingList,
    { data: followingList, loading: isFetchingFollowingList },
  ] = useLazyQuery<GetUserFollowingListData>(GET_USER_FOLLOWING_LIST);
  const [fetchSavedPosts, { data: savedPosts, loading: isFetchingSavedPosts }] =
    useLazyQuery<GetUserSavedPostsData>(GET_USER_SAVED_POSTS);
  const [blockUser] = useMutation<BlockUserData>(BLOCK_USER);
  const [hidePost] = useMutation<HidePostData>(HIDE_POST);
  const [removeUserFriend] =
    useMutation<RemoveUserFriendData>(REMOVE_USER_FRIEND);
  const [removePost] = useMutation<RemovePostData>(REMOVE_POST);
  const [savePost] = useMutation<SavePostData>(SAVE_POST);
  const [unfollowUser] = useMutation<UnfollowUserData>(UNFOLLOW_USER);
  const [unsavePost] = useMutation<UnsavePostData>(UNSAVE_POST);
  const { closePostOptionsList } = useSettingsStore();

  useEffect(() => {
    fetchFollowingList({ variables: { id: authenticatedUser?.id } });
    fetchSavedPosts({
      variables: { id: authenticatedUser?.id },
    });
  }, [authenticatedUser?.id, fetchFollowingList, fetchSavedPosts]);

  function handleBlockProfileClick() {
    blockUser({
      variables: {
        input: {
          blockedUserId: postOwnerId,
          userId: authenticatedUser?.id,
        },
      },
      refetchQueries: [
        {
          query: GET_USER_BY_USERNAME,
          variables: { username: receiverUsername },
        },
      ],
      onCompleted: () => {
        closePostOptionsList();
        removeUserFriend({
          variables: {
            input: {
              first: authenticatedUser?.id,
              second: postOwnerId,
            },
          },
          onCompleted: () => {
            unfollowUser({
              variables: {
                input: {
                  followingUserId: postOwnerId,
                  userId: authenticatedUser?.id,
                },
              },
            });
            unfollowUser({
              variables: {
                input: {
                  followingUserId: authenticatedUser?.id,
                  userId: postOwnerId,
                },
              },
            });
          },
        });
      },
    });
  }

  function handleDeletePostClick() {
    removePost({
      variables: { id: postId },
      refetchQueries: [
        // If the sender of the post is the same as the receiver of the post
        // (e.g: the authenticated user posted on his/her own timeline)
        username === receiverUsername
          ? {
              query: GET_USER_BY_USERNAME,
              variables: { username },
            }
          : {
              query: GET_USER_BY_USERNAME,
              variables: { username: receiverUsername },
            },
      ],
      onCompleted: (data) => {
        console.log(data);
        closePostOptionsList();
      },
    });
  }

  function handleHidePostClick() {
    // TODO
    hidePost({
      variables: {
        input: { hiddenPostId: postId, userId: authenticatedUser?.id },
      },
      refetchQueries: [
        // TODO
        { query: GET_USER_BY_USERNAME, variables: { username } },
      ],
      onCompleted: (data) => {
        console.log(data);
        closePostOptionsList();
      },
    });
  }

  function handleSavePostClick() {
    savePost({
      variables: {
        input: { postId, userId: authenticatedUser?.id },
      },
      refetchQueries: [
        {
          query: GET_USER_SAVED_POSTS,
          variables: { id: authenticatedUser?.id },
        },
      ],
      onCompleted: (data) => {
        console.log(data);
        closePostOptionsList();
      },
    });
  }

  function handleUnfollowClick() {
    unfollowUser({
      variables: {
        input: {
          followingUserId: postOwnerId,
          userId: authenticatedUser?.id,
        },
      },
      refetchQueries: [
        {
          query: GET_USER_FOLLOWING_LIST,
          variables: { id: authenticatedUser?.id },
        },
      ],
      onCompleted: (data) => {
        console.log(data);
        closePostOptionsList();
      },
    });
  }

  function handleUnsavePostClick() {
    unsavePost({
      variables: { input: { postId, userId: authenticatedUser?.id } },
      refetchQueries: [
        {
          query: GET_USER_SAVED_POSTS,
          variables: { id: authenticatedUser?.id },
        },
      ],
      onCompleted: (data) => {
        console.log(data);
        closePostOptionsList();
      },
    });
  }

  const isAuthenticatedUserPost = postOwnerId === authenticatedUser?.id;
  const isFollowingPostOwner =
    followingList?.userFollowingList?.__typename === "Users"
      ? !!followingList.userFollowingList.users.find(
          (user) => user.id === postOwnerId
        )
      : false;
  const isFriendsWithPostOwner = !!authenticatedUser?.friends?.find(
    (friend) => friend.id === postOwnerId
  );
  const isSaved = !!savedPosts?.userSavedPosts?.find(
    (post) => post.id === postId
  );

  const blockProfileText = firstName.endsWith("s")
    ? `Block ${firstName}' profile`
    : `Block ${firstName}'s profile`;
  const unfollowDescription = isFriendsWithPostOwner
    ? "Stop seeing posts but stay friends."
    : "Stop seeing posts from this person.";
  const unfollowText = `Unfollow ${firstName}`;

  if (
    (isFetchingFollowingList && !followingList?.userFollowingList) ||
    (isFetchingSavedPosts && !savedPosts?.userSavedPosts)
  ) {
    return <Container.Main>Loading...</Container.Main>;
  } else if (savedPosts?.userSavedPosts) {
    console.log("finished loading");
  }

  return (
    <Container.Main>
      {isSaved ? (
        <Tab
          description="Remove this from your saved items"
          name="Unsave post"
          startIcon={IoBookmark}
          onClick={handleUnsavePostClick}
        />
      ) : (
        <Tab
          description="Add this to your saved items."
          name="Save post"
          startIcon={IoBookmarkOutline}
          onClick={handleSavePostClick}
        />
      )}
      <Divider color="LightGray" style={{ margin: "8px 0" }} />
      {isAuthenticatedUserPost && (
        <Tab
          name="Delete post"
          startIcon={ImBin}
          onClick={handleDeletePostClick}
        />
      )}
      {!isAuthenticatedUserPost && (
        <Tab
          description="See fewer posts like this."
          name="Hide post"
          startIcon={AiOutlineCloseSquare}
          onClick={handleHidePostClick}
        />
      )}
      {!isAuthenticatedUserPost && isFollowingPostOwner && (
        <Tab
          description={unfollowDescription}
          name={unfollowText}
          startIcon={VscCloseAll}
          onClick={handleUnfollowClick}
        />
      )}
      {!isAuthenticatedUserPost && (
        <Tab
          description="You won't be able to see or contact each other."
          name={blockProfileText}
          startIcon={MdBlock}
          onClick={handleBlockProfileClick}
        />
      )}
    </Container.Main>
  );
}
