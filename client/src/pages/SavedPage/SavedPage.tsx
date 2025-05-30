import { useMutation, useQuery } from "@apollo/client";

import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { HiDotsHorizontal } from "react-icons/hi";

import {
  ConfirmationModal,
  Header,
  SavedCollectionModal,
  ViewPostModal,
} from "components";
import {
  GET_SAVED_POST_COLLECTIONS,
  REMOVE_SAVED_POST_COLLECTION,
  UPDATE_SAVED_POST_COLLECTION,
} from "helpers";
import { useHeaderItems, useScrollLock } from "hooks";
import { PostWithSavedCollectionID, SavedPostCollection } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

import { Menu } from "./Menu";
import { Button, Container, Text } from "./SavedPage.style";
import { SavedPost } from "./SavedPost";
import { Sidebar } from "./Sidebar";

export function SavedPage() {
  const { authenticatedUser } = useAuthenticationStore();
  const [removeSavedPostCollection] = useMutation(REMOVE_SAVED_POST_COLLECTION);
  const [updateSavedPostCollection] = useMutation(UPDATE_SAVED_POST_COLLECTION);
  const { lockScroll, unlockScroll } = useScrollLock();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRenameCollectionModalOpen, setIsRenameCollectionModalOpen] =
    useState(false);
  const [isViewPostModalOpen, setIsViewPostModalOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] =
    useState<SavedPostCollection>();
  const [selectedPost, setSelectedPost] = useState<
    PostWithSavedCollectionID | undefined
  >();
  const { data = { savedPostCollections: [] } } = useQuery(
    GET_SAVED_POST_COLLECTIONS,
    {
      variables: { userId: authenticatedUser!.id },
    }
  );
  const { theme } = useSettingsStore();

  function handleConfirmationModalCloseClick() {
    unlockScroll();
    setIsConfirmationModalOpen(false);
    setIsMenuOpen(false);
  }

  function handleConfirmationModalConfirmClick() {
    removeSavedPostCollection({
      variables: {
        input: {
          collectionId: selectedCollection!.id,
          userId: authenticatedUser!.id,
        },
      },
      onCompleted: () => setSelectedCollection(undefined),
      update: (cache, { data }) => {
        cache.modify({
          fields: {
            savedPostCollections: (existingCollections = [], { readField }) =>
              existingCollections.filter(
                (collection: SavedPostCollection) =>
                  readField("id", collection) !==
                  data?.removeSavedPostCollection?.id
              ),
          },
        });
      },
    });
  }

  function handleRenameCollectionModalCloseClick() {
    unlockScroll();
    setIsRenameCollectionModalOpen(false);
    setIsMenuOpen(false);
  }

  function handleRenameCollectionModalRenameClick(newCollectionName: string) {
    if (newCollectionName !== selectedCollection?.name) {
      updateSavedPostCollection({
        variables: {
          input: {
            collectionId: selectedCollection!.id,
            name: newCollectionName,
            userId: authenticatedUser!.id,
          },
        },
        onCompleted: ({ updateSavedPostCollection }) => {
          if (updateSavedPostCollection) {
            setSelectedCollection(updateSavedPostCollection);
          }
        },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              savedPostCollections: (existingCollections = [], { readField }) =>
                existingCollections.map((collection: SavedPostCollection) => {
                  if (readField("id", collection) === selectedCollection?.id) {
                    return data?.updateSavedPostCollection;
                  }

                  return collection;
                }),
            },
          });
        },
      });
    }
  }

  const headerItems = useHeaderItems();

  const filteredPosts = useMemo(
    () =>
      typeof selectedCollection === "undefined"
        ? authenticatedUser!.savedPosts
        : authenticatedUser!.savedPosts.filter(
            (a) => a.savedCollectionId === selectedCollection.id
          ),
    [authenticatedUser, selectedCollection]
  );

  const sortedCollections = useMemo(
    () =>
      [...data.savedPostCollections].sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      ),
    [data.savedPostCollections]
  );

  const themeProps = { $isAuthenticated: !!authenticatedUser, $theme: theme };

  return (
    <>
      <Container.Main>
        <Header items={headerItems} selectedItem={null} />
        <Container.Content>
          <Sidebar
            collections={sortedCollections}
            selectedCollection={selectedCollection}
            onCollectionClick={(collection) =>
              setSelectedCollection(
                collection.id !== selectedCollection?.id
                  ? collection
                  : undefined
              )
            }
          />
          <Container.SavedPosts.Outer {...themeProps}>
            <Container.SavedPosts.Title>
              <Text.Title {...themeProps}>
                {typeof selectedCollection === "undefined"
                  ? "All"
                  : selectedCollection.name}
              </Text.Title>
              {typeof selectedCollection !== "undefined" && (
                <Container.Menu>
                  <Button.ShowMore
                    {...themeProps}
                    onClick={() => setIsMenuOpen((value) => !value)}
                  >
                    <HiDotsHorizontal size={16} />
                  </Button.ShowMore>
                  {isMenuOpen && (
                    <Menu
                      onDeleteClick={() => {
                        lockScroll();
                        setIsConfirmationModalOpen(true);
                      }}
                      onRenameClick={() => {
                        lockScroll();
                        setIsRenameCollectionModalOpen(true);
                      }}
                    />
                  )}
                </Container.Menu>
              )}
            </Container.SavedPosts.Title>
            <Container.SavedPosts.Inner>
              {filteredPosts.map((post) => {
                const { id, savedCollectionId } = post;

                const savedCollection = sortedCollections.find(
                  ({ id }) => id === savedCollectionId
                );

                return (
                  <SavedPost
                    key={id}
                    post={post}
                    savedCollection={savedCollection}
                    onCollectionNameClick={() =>
                      setSelectedCollection(
                        savedCollection !== selectedCollection
                          ? savedCollection
                          : undefined
                      )
                    }
                    onTextClick={() => {
                      // If the post isn't hidden by the authenticated user
                      if (
                        !authenticatedUser?.hiddenPosts.some(
                          ({ id }) => id === post.id
                        )
                      ) {
                        setSelectedPost(post);
                        lockScroll();
                        setIsViewPostModalOpen(true);
                      }
                    }}
                  />
                );
              })}
            </Container.SavedPosts.Inner>
          </Container.SavedPosts.Outer>
        </Container.Content>
      </Container.Main>
      {isConfirmationModalOpen &&
        createPortal(
          <ConfirmationModal
            confirmButtonText="Delete"
            message="Are you sure you wish to delete this collection?"
            title="Delete Collection"
            onCloseClick={handleConfirmationModalCloseClick}
            onConfirmClick={handleConfirmationModalConfirmClick}
          />,
          document.body
        )}
      {isRenameCollectionModalOpen &&
        createPortal(
          <SavedCollectionModal
            currentCollectionName={selectedCollection!.name}
            type="RENAME"
            onCloseClick={handleRenameCollectionModalCloseClick}
            onRenameClick={handleRenameCollectionModalRenameClick}
          />,
          document.body
        )}
      {isViewPostModalOpen &&
        typeof selectedPost !== "undefined" &&
        createPortal(
          <ViewPostModal
            post={selectedPost}
            onCloseClick={() => {
              setSelectedPost(undefined);
              unlockScroll();
              setIsViewPostModalOpen(false);
            }}
            onRedirect={unlockScroll}
          />,
          document.body
        )}
    </>
  );
}
