import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { BookmarkAdd, BookmarkRemove } from "@mui/icons-material";
import { Divider } from "@mui/material";

import { useState } from "react";
import { createPortal } from "react-dom";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { ImBin } from "react-icons/im";
import { MdBlock } from "react-icons/md";
import { VscCloseAll, VscExpandAll } from "react-icons/vsc";
import { useMatch } from "react-router-dom";

import { ConfirmationModal, SavePostModal, Tab } from "components";
import { Colors } from "environment";
import {
  BLOCK_USER,
  BlockUserData,
  FOLLOW_USER,
  GET_FRIENDS_POSTS_BY_USER_ID,
  GET_SAVED_POST_COLLECTION_COUNT,
  GET_USER_BY_ID,
  HIDE_POST,
  HidePostData,
  PageInfo,
  PostsEdge,
  REMOVE_POST,
  REMOVE_POST_SHARES,
  REMOVE_SAVED_POST_COLLECTION,
  REMOVE_USER_FRIEND,
  SAVE_POST,
  UNFOLLOW_USER,
  UNSAVE_POST,
} from "helpers";
import { useScrollLock } from "hooks";
import {
  Post,
  PostWithSavedCollectionID,
  SavedPostCollection,
  User,
} from "models";
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
  postOwner,
  postReceiver,
}: Props) {
  const { firstName, id: postOwnerId } = postOwner;
  const { id: postReceiverId, username: postReceiverUsername } = postReceiver;

  const { authenticatedUser } = useAuthenticationStore();
  const [getSavedPostCollectionCount] = useLazyQuery(
    GET_SAVED_POST_COLLECTION_COUNT,
    {
      fetchPolicy: "network-only",
    }
  );
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
  const [followUser] = useMutation(FOLLOW_USER);
  const [hidePost] = useMutation<HidePostData>(HIDE_POST, {
    update: (cache, { data }) => {
      // ProfilePage
      if (isProfileRoute) {
        if (isAuthenticatedUserProfileRoute) {
        } else {
        }
      }
      // HomePage
      else {
      }

      // NOT WORKING
      // // Removing the post from receiver's timeline
      // // If the owner and receiver are different users
      // if (postOwner.id !== postReceiver.id) {
      //   cache.modify({
      //     fields: {
      //       posts: (existingPosts = [], { readField }) =>
      //         existingPosts.filter(
      //           (post: Post) => readField("id", post) !== data?.hidePost?.postId
      //         ),
      //     },
      //     id: cache.identify({ ...postReceiver }),
      //   });
      // }
      // // Removing the post from owner's timeline
      // cache.modify({
      //   fields: {
      //     posts: (existingPosts = [], { readField }) => {
      //       console.log({ owner: cache.identify({ ...postOwner }) });
      //       console.log({ existingPosts });
      //       const filteredPosts = existingPosts.filter(
      //         (post: Post) => readField("id", post) !== data?.hidePost?.postId
      //       );
      //       console.log({ filteredPosts });
      //       return filteredPosts;
      //     },
      //   },
      //   id: cache.identify({ ...postOwner }),
      // });
      // Removing the post from friends' post list
      cache.modify({
        fields: {
          friendsPostsByOwnerId: (
            { edges = [], pageInfo, totalCount },
            { readField }
          ) => {
            const updatedEdges: PostsEdge[] = edges.filter(
              (edge: PostsEdge) =>
                readField("cursor", edge) !== data?.hidePost?.id
            );
            const updatedPageInfo: PageInfo = {
              ...pageInfo,
              endCursor: updatedEdges[updatedEdges.length - 1].cursor,
              startCursor: updatedEdges[0].cursor,
            };
            const updatedTotalCount: number = totalCount - 1;

            return {
              edges: updatedEdges,
              pageInfo: updatedPageInfo,
              totalCount: updatedTotalCount,
            };
          },
        },
      });
      // Adding the post to authenticated user's hidden posts
      cache.modify({
        fields: {
          hiddenPosts: (existingPosts = []) => {
            const hiddenPostRef = cache.writeFragment({
              data: data?.hidePost,
              fragment: gql`
                fragment NewHiddenPost on Post {
                  id
                }
              `,
            });

            return [...existingPosts, hiddenPostRef];
          },
        },
        id: cache.identify({ ...authenticatedUser }),
      });
    },
  });
  const [removePost] = useMutation(REMOVE_POST, {
    // https://www.apollographql.com/docs/react/data/mutations/#updating-the-cache-directly
    update(cache) {
      cache.modify({
        fields: {
          userPostsById(existingPosts = []) {
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
  const [removePostShares] = useMutation(REMOVE_POST_SHARES);
  const [removeSavedPostCollection] = useMutation(REMOVE_SAVED_POST_COLLECTION);
  const [removeUserFriend] = useMutation(REMOVE_USER_FRIEND);
  const [savePost] = useMutation(SAVE_POST);
  const [unfollowUser] = useMutation(UNFOLLOW_USER);
  const [unsavePost] = useMutation(UNSAVE_POST);
  const { lockScroll, unlockScroll } = useScrollLock();
  const { theme, closePostOptionsList } = useSettingsStore();
  const [actionType, setActionType] = useState<
    "BLOCK_USER" | "DELETE_POST" | "HIDE_POST" | "UNFOLLOW_USER" | undefined
  >();
  const [isSavePostModalOpen, setIsSavePostModalOpen] = useState(false);
  // const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
  //   useState(false);

  // TODO: To be used when refetching queries
  const isHomeRoute = useMatch("/");
  const isProfileRoute = useMatch("/:username");
  const isAuthenticatedUserProfileRoute =
    isProfileRoute?.params.username === authenticatedUser?.username;

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
              first: authenticatedUser!.id,
              second: postOwnerId,
            },
          },
          onCompleted: ({ removeUserFriend: removeUserFriendResult }) => {
            console.log({ removeUserFriendResult });
            unfollowUser({
              variables: {
                input: {
                  followingUserId: postOwnerId,
                  userId: authenticatedUser!.id,
                },
              },
              onCompleted: ({ unfollowUser: unfollowUserResult }) => {
                console.log({ unfollowUserResult });
                unfollowUser({
                  variables: {
                    input: {
                      followingUserId: authenticatedUser!.id,
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
        variables: { input: { postId, userId: authenticatedUser!.id } },
        onCompleted: closePostOptionsList,
      });
    } else {
      removePostShares({
        variables: { input: { postId, userId: authenticatedUser!.id } },
        onCompleted: () => {
          removePost({
            variables: { input: { postId, userId: authenticatedUser!.id } },
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
        input: { followingUserId: postOwnerId, userId: authenticatedUser!.id },
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
        // {
        //   query: GET_USER_BY_ID,
        //   variables: {
        //     input: {
        //       authenticatedUserId: authenticatedUser?.id,
        //       returnUserIfBlocked: true,
        //       userId: postReceiverId,
        //     },
        //   },
        // },
        // {
        //   query: GET_FRIENDS_POSTS_BY_USER_ID,
        //   variables: { input: { ownerId: postReceiverId } },
        // },
      ],
      onCompleted: closePostOptionsList,
    });
  }

  // OK
  function handleSavePostClick(collectionId: string) {
    savePost({
      variables: {
        input: { collectionId, postId, userId: authenticatedUser!.id },
      },
      onCompleted: closePostOptionsList,
      update: (cache, { data }) => {
        cache.modify({
          fields: {
            savedPosts: (existingSavedPosts = []) => {
              const savedPostRef = cache.writeFragment({
                data: data?.savePost,
                fragment: gql`
                  fragment NewSavedPost on PostWithSavedCollectionID {
                    id
                  }
                `,
              });

              return [savedPostRef, ...existingSavedPosts];
            },
          },
          id: cache.identify({ ...authenticatedUser }),
        });
      },
    });
  }

  // OK
  function handleUnfollowClick() {
    unfollowUser({
      variables: {
        input: {
          followingUserId: postOwnerId,
          userId: authenticatedUser!.id,
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
      variables: { input: { postId, userId: authenticatedUser!.id } },
      onCompleted: ({ unsavePost }) => {
        console.log({ unsavePost });

        if (unsavePost) {
          getSavedPostCollectionCount({
            variables: {
              input: {
                collectionId: unsavePost.collectionId,
                userId: unsavePost.userId,
              },
            },
            onCompleted: ({ savedPostCollectionCount }) => {
              console.log({ savedPostCollectionCount });

              if (savedPostCollectionCount === 0) {
                removeSavedPostCollection({
                  variables: {
                    input: {
                      collectionId: unsavePost.collectionId,
                      userId: unsavePost.userId,
                    },
                  },
                  onCompleted: ({ removeSavedPostCollection }) => {
                    console.log({ removeSavedPostCollection });
                    closePostOptionsList();
                  }, // Updating the cache to reflect the changes
                  update(cache, { data: removeSavedPostCollection }) {
                    console.log({ cache });
                    cache.modify({
                      fields: {
                        savedPostCollections(
                          existingCollections = [],
                          { readField }
                        ) {
                          return existingCollections.filter(
                            (collection: SavedPostCollection) =>
                              readField("id", collection) !==
                              removeSavedPostCollection
                                ?.removeSavedPostCollection?.id
                          );
                        },
                      },
                    });
                  },
                });
              } else {
                closePostOptionsList();
              }
            },
          });
        }
      },
      update: (cache, { data }) => {
        cache.modify({
          fields: {
            savedPosts: (existingSavedPosts = [], { readField }) =>
              existingSavedPosts.filter(
                (savedPost: PostWithSavedCollectionID) =>
                  readField("id", savedPost) !== data?.unsavePost?.postId
              ),
          },
          id: cache.identify({ ...authenticatedUser }),
        });
      },
    });
  }

  const isAuthenticatedUserPost = postOwnerId === authenticatedUser?.id;
  const isFollowingPostOwner =
    authenticatedUser?.followingUsers.some(({ id }) => id === postOwnerId) ||
    false;

  const isFriendsWithPostOwner = !!authenticatedUser?.friends?.find(
    (friend) => friend.id === postOwnerId
  );
  const isSaved =
    authenticatedUser?.savedPosts.some(({ id }) => id === postId) || false;

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
            startIcon={BookmarkRemove}
            onClick={handleUnsavePostClick}
          />
        ) : (
          <Tab
            selectedBackgroundColor={selectedTabColor}
            startIconColor={startIconColor}
            description="Add this to your saved items."
            name="Save post"
            startIcon={BookmarkAdd}
            // onClick={handleSavePostClick}
            onClick={() => {
              lockScroll();
              setIsSavePostModalOpen(true);
            }}
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
      {isSavePostModalOpen &&
        createPortal(
          <SavePostModal
            onCloseClick={() => {
              unlockScroll();
              setIsSavePostModalOpen(false);
            }}
            onDoneClick={(collectionId) => {
              unlockScroll();
              setIsSavePostModalOpen(false);
              handleSavePostClick(collectionId);
            }}
          />,
          document.body
        )}
    </>
  );
}
