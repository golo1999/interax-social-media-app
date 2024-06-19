import { useMutation } from "@apollo/client";
import { Divider } from "@mui/material";

import { useState } from "react";
import { createPortal } from "react-dom";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { ImBin } from "react-icons/im";
import { MdBlock } from "react-icons/md";
import { VscCloseAll, VscExpandAll } from "react-icons/vsc";
// import { useMatch } from "react-router-dom";

import { ConfirmationModal, Tab } from "components";
import { Colors } from "environment";
import {
  BLOCK_USER,
  BlockUserData,
  FOLLOW_USER,
  FollowUserData,
  GET_FRIENDS_POSTS_BY_USER_ID,
  GET_USER_BY_ID,
  HIDE_POST,
  HidePostData,
  PostsEdge,
  REMOVE_POST,
  REMOVE_POST_SHARES,
  REMOVE_USER_FRIEND,
  RemovePostData,
  RemovePostSharesData,
  RemoveUserFriendData,
  SAVE_POST,
  SavePostData,
  UNFOLLOW_USER,
  UnfollowUserData,
  UNSAVE_POST,
  UnsavePostData,
} from "helpers";
import { useScrollLock } from "hooks";
import { User } from "models";
import { useAuthenticationStore, useModalStore, useSettingsStore } from "store";

import { Container } from "./PostOptionsList.style";

interface Props {
  parentId: string | null;
  postId: string;
  postOwner: User;
  postReceiver: User;
}

export function PostOptionsList({
  parentId,
  postId,
  postOwner: { firstName, id: postOwnerId },
  postReceiver: { id: postReceiverId, username: postReceiverUsername },
}: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const {
    confirmationModalConfirmButtonText,
    confirmationModalMessage,
    confirmationModalTitle,
    isConfirmationModalOpen,
    closeConfirmationModal,
    openConfirmationModal,
    setConfirmationModalConfirmButtonText,
    setConfirmationModalMessage,
  } = useModalStore();
  const [blockUser] = useMutation<BlockUserData>(BLOCK_USER);
  const [followUser] = useMutation<FollowUserData>(FOLLOW_USER);
  const [hidePost] = useMutation<HidePostData>(HIDE_POST);
  const [removePost] = useMutation<RemovePostData>(REMOVE_POST, {
    // https://www.apollographql.com/docs/react/data/mutations/#updating-the-cache-directly
    update(cache) {
      cache.modify({
        fields: {
          userPostsById(existingPosts) {
            function getEndCursor() {
              if (existingPosts.totalCount === 1) {
                return null;
              }

              if (removedPostIndex === existingPosts.totalCount - 1) {
                return existingPosts.edges[existingPosts.totalCount - 2].cursor;
              }

              return existingPosts.pageInfo.endCursor;
            }

            function getStartCursor() {
              if (existingPosts.totalCount === 1) {
                return null;
              }

              if (removedPostIndex === 0) {
                return existingPosts.edges[1].cursor;
              }

              return existingPosts.pageInfo.startCursor;
            }

            const removedPostIndex = existingPosts.edges.findIndex(
              ({ cursor }: PostsEdge) => cursor === postId
            );
            const updatedExistingPosts = {
              edges: existingPosts.edges.filter(
                ({ cursor }: PostsEdge) => cursor !== postId
              ),
              pageInfo: {
                ...existingPosts.pageInfo,
                endCursor: getEndCursor(),
                startCursor: getStartCursor(),
              },
              totalCount: existingPosts.totalCount - 1,
            };

            return updatedExistingPosts;
          },
        },
      });
    },
  });
  const [removePostShares] =
    useMutation<RemovePostSharesData>(REMOVE_POST_SHARES);
  const [removeUserFriend] =
    useMutation<RemoveUserFriendData>(REMOVE_USER_FRIEND);
  const [savePost] = useMutation<SavePostData>(SAVE_POST);
  const [unfollowUser] = useMutation<UnfollowUserData>(UNFOLLOW_USER);
  const [unsavePost] = useMutation<UnsavePostData>(UNSAVE_POST);
  const { lockScroll, unlockScroll } = useScrollLock();
  const { theme, closePostOptionsList } = useSettingsStore();
  const [actionType, setActionType] = useState<
    "BLOCK_USER" | "DELETE_POST" | "HIDE_POST" | "UNFOLLOW_USER" | undefined
  >();

  function handleBlockProfileClick() {
    // TODO: To be tested
    blockUser({
      variables: {
        input: {
          blockedUserId: postOwnerId,
          userId: authenticatedUser?.id,
        },
      },
      onCompleted: ({ blockUser: blockUserResult }) => {
        console.log({ blockUserResult });
        removeUserFriend({
          variables: {
            input: {
              first: authenticatedUser?.id,
              second: postOwnerId,
            },
          },
          onCompleted: ({ removeUserFriend: removeUserFriendResult }) => {
            console.log({ removeUserFriendResult });
            unfollowUser({
              variables: {
                input: {
                  followingUserId: postOwnerId,
                  userId: authenticatedUser?.id,
                },
              },
              onCompleted: ({ unfollowUser: unfollowUserResult }) => {
                console.log({ unfollowUserResult });
                unfollowUser({
                  variables: {
                    input: {
                      followingUserId: authenticatedUser?.id,
                      userId: postOwnerId,
                    },
                  },
                  refetchQueries: [
                    {
                      query: GET_USER_BY_ID,
                      variables: {
                        input: {
                          authenticatedUserId: authenticatedUser?.id,
                          returnUserIfBlocked: true,
                          userId: postReceiverId,
                        },
                      },
                    },
                    {
                      query: GET_FRIENDS_POSTS_BY_USER_ID,
                      variables: { ownerId: postReceiverId },
                    },
                  ],
                  onCompleted: ({ unfollowUser: unfollowUserResult1 }) => {
                    console.log({ unfollowUserResult1 });
                    closePostOptionsList();
                  },
                });
              },
            });
          },
        });
      },
    });
  }

  // OK
  function handleDeletePostClick() {
    // If the post is shared
    if (parentId) {
      removePost({
        variables: { id: postId },
        onCompleted: closePostOptionsList,
      });
    } else {
      removePostShares({
        variables: { id: postId },
        onCompleted: () => {
          removePost({
            variables: { id: postId },
            onCompleted: closePostOptionsList,
          });
        },
      });
    }
  }

  // OK
  function handleFollowClick() {
    followUser({
      variables: {
        input: { followingUserId: postOwnerId, userId: authenticatedUser?.id },
      },
      refetchQueries: [
        {
          query: GET_USER_BY_ID,
          variables: {
            input: {
              authenticatedUserId: authenticatedUser?.id,
              returnUserIfBlocked: true,
              userId: postReceiverId,
            },
          },
        },
        {
          query: GET_FRIENDS_POSTS_BY_USER_ID,
          variables: { ownerId: postReceiverId },
        },
      ],
      onCompleted: closePostOptionsList,
    });
  }

  // OK
  function handleHidePostClick() {
    hidePost({
      variables: {
        input: { postId, userId: authenticatedUser?.id },
      },
      refetchQueries: [
        {
          query: GET_USER_BY_ID,
          variables: {
            input: {
              authenticatedUserId: authenticatedUser?.id,
              returnUserIfBlocked: true,
              userId: postReceiverId,
            },
          },
        },
        {
          query: GET_FRIENDS_POSTS_BY_USER_ID,
          variables: { input: { ownerId: postReceiverId } },
        },
      ],
      onCompleted: closePostOptionsList,
    });
  }

  // OK
  function handleSavePostClick() {
    savePost({
      variables: {
        input: { postId, userId: authenticatedUser?.id },
      },
      refetchQueries: [
        {
          query: GET_USER_BY_ID,
          variables: {
            input: {
              authenticatedUserId: authenticatedUser?.id,
              returnUserIfBlocked: true,
              userId: authenticatedUser?.id,
            },
          },
        },
      ],
      onCompleted: closePostOptionsList,
    });
  }

  // OK
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
          query: GET_USER_BY_ID,
          variables: {
            input: {
              authenticatedUserId: authenticatedUser?.id,
              returnUserIfBlocked: true,
              userId: postReceiverId,
            },
          },
        },
        {
          query: GET_FRIENDS_POSTS_BY_USER_ID,
          variables: { ownerId: postReceiverId },
        },
      ],
      onCompleted: closePostOptionsList,
    });
  }

  // OK
  function handleUnsavePostClick() {
    unsavePost({
      variables: { input: { postId, userId: authenticatedUser?.id } },
      refetchQueries: [
        {
          query: GET_USER_BY_ID,
          variables: {
            input: {
              authenticatedUserId: authenticatedUser?.id,
              returnUserIfBlocked: true,
              userId: authenticatedUser?.id,
            },
          },
        },
      ],
      onCompleted: closePostOptionsList,
    });
  }

  const isAuthenticatedUserPost = postOwnerId === authenticatedUser?.id;
  const isFollowingPostOwner =
    authenticatedUser?.followingUsers.some(({ id }) => id === postOwnerId) ||
    false;

  const isFriendsWithPostOwner = !!authenticatedUser?.friends?.find(
    (friend) => friend.id === postOwnerId
  );
  const isSaved = authenticatedUser?.savedPosts.some(({ id }) => id === postId);

  const blockProfileText = firstName.endsWith("s")
    ? `Block ${firstName}' profile`
    : `Block ${firstName}'s profile`;
  const followDescription = "See more posts from this person.";
  const followText = `Follow ${firstName}`;
  const unfollowDescription = isFriendsWithPostOwner
    ? "Stop seeing posts but stay friends."
    : "Stop seeing posts from this person.";
  const unfollowText = `Unfollow ${firstName}`;

  const dividerColor: keyof typeof Colors =
    !!authenticatedUser && theme === "DARK" ? "Arsenic" : "LightGray";
  const selectedTabColor: keyof typeof Colors | undefined =
    !!authenticatedUser && theme === "LIGHT" ? "AntiFlashWhite" : undefined;
  const startIconColor: keyof typeof Colors | undefined =
    !!authenticatedUser && theme === "LIGHT" ? "VampireBlack" : undefined;

  return (
    <>
      <Container.Main $isAuthenticated={!!authenticatedUser} $theme={theme}>
        {isSaved ? (
          <Tab
            selectedBackgroundColor={selectedTabColor}
            startIconColor={startIconColor}
            description="Remove this from your saved items"
            name="Unsave post"
            startIcon={IoBookmark}
            onClick={handleUnsavePostClick}
          />
        ) : (
          <Tab
            selectedBackgroundColor={selectedTabColor}
            startIconColor={startIconColor}
            description="Add this to your saved items."
            name="Save post"
            startIcon={IoBookmarkOutline}
            onClick={handleSavePostClick}
          />
        )}
        <Divider sx={{ borderColor: Colors[dividerColor], margin: "8px 0" }} />
        {isAuthenticatedUserPost && (
          <Tab
            name="Delete post"
            selectedBackgroundColor={selectedTabColor}
            startIcon={ImBin}
            startIconColor={startIconColor}
            onClick={() => {
              lockScroll();
              setConfirmationModalConfirmButtonText("Delete");
              setConfirmationModalMessage(
                "Are you sure you want to delete this post?"
              );
              setActionType("DELETE_POST");
              openConfirmationModal();
            }}
          />
        )}
        {!isAuthenticatedUserPost && (
          <Tab
            selectedBackgroundColor={selectedTabColor}
            startIconColor={startIconColor}
            description="See fewer posts like this."
            name="Hide post"
            startIcon={AiOutlineCloseSquare}
            onClick={() => {
              lockScroll();
              setConfirmationModalConfirmButtonText("Hide");
              setConfirmationModalMessage(
                "Are you sure you want to hide this post?"
              );
              setActionType("HIDE_POST");
              openConfirmationModal();
            }}
          />
        )}
        {!isAuthenticatedUserPost &&
          (isFollowingPostOwner ? (
            <Tab
              selectedBackgroundColor={selectedTabColor}
              startIconColor={startIconColor}
              description={unfollowDescription}
              name={unfollowText}
              startIcon={VscCloseAll}
              onClick={() => {
                lockScroll();
                setConfirmationModalConfirmButtonText("Unfollow");
                setConfirmationModalMessage(
                  `Are you sure you want to unfollow ${firstName}?`
                );
                setActionType("UNFOLLOW_USER");
                openConfirmationModal();
              }}
            />
          ) : (
            <Tab
              selectedBackgroundColor={selectedTabColor}
              startIconColor={startIconColor}
              description={followDescription}
              name={followText}
              startIcon={VscExpandAll}
              onClick={handleFollowClick}
            />
          ))}
        {!isAuthenticatedUserPost && (
          <Tab
            selectedBackgroundColor={selectedTabColor}
            startIconColor={startIconColor}
            description="You won't be able to see or contact each other."
            name={blockProfileText}
            startIcon={MdBlock}
            onClick={() => {
              lockScroll();
              setConfirmationModalConfirmButtonText("Block");
              setConfirmationModalMessage(
                `Are you sure you want to block ${firstName}?`
              );
              setActionType("BLOCK_USER");
              openConfirmationModal();
            }}
          />
        )}
      </Container.Main>
      {isConfirmationModalOpen &&
        createPortal(
          <ConfirmationModal
            confirmButtonText={confirmationModalConfirmButtonText}
            message={confirmationModalMessage}
            title={confirmationModalTitle}
            onCloseClick={() => {
              unlockScroll();
              closeConfirmationModal();
            }}
            onConfirmClick={() => {
              unlockScroll();
              closeConfirmationModal();

              switch (actionType) {
                case "BLOCK_USER":
                  handleBlockProfileClick();
                  break;
                case "DELETE_POST":
                  handleDeletePostClick();
                  break;
                case "HIDE_POST":
                  handleHidePostClick();
                  break;
                case "UNFOLLOW_USER":
                  handleUnfollowClick();
                  break;
              }
            }}
          />,
          document.body
        )}
    </>
  );
}
