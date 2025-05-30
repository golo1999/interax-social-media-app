import { useLazyQuery, useMutation } from "@apollo/client";
import { BookmarkRemove } from "@mui/icons-material";

import {
  GET_SAVED_POST_COLLECTION_COUNT,
  REMOVE_SAVED_POST_COLLECTION,
  UNSAVE_POST,
} from "helpers";
import { PostWithSavedCollectionID, SavedPostCollection } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

import { Button, Container, Text } from "./SavedPost.style";

interface Props {
  post: PostWithSavedCollectionID;
  savedCollection: SavedPostCollection | undefined;
  onCollectionNameClick: () => void;
  onTextClick: () => void;
}

export function SavedPost({
  post,
  savedCollection,
  onCollectionNameClick,
  onTextClick,
}: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const [getSavedPostCollectionCount] = useLazyQuery(
    GET_SAVED_POST_COLLECTION_COUNT,
    {
      fetchPolicy: "network-only",
    }
  );
  const [removeSavedPostCollection] = useMutation(REMOVE_SAVED_POST_COLLECTION);
  const [unsavePost] = useMutation(UNSAVE_POST);
  const { theme } = useSettingsStore();

  const {
    id,
    owner: { firstName: ownerFirstName, lastName: ownerLastName },
    text,
  } = post;

  function handleUnsavePostClick() {
    unsavePost({
      variables: {
        input: {
          postId: id,
          userId: authenticatedUser!.id,
        },
      },
      onCompleted: ({ unsavePost }) => {
        if (unsavePost) {
          getSavedPostCollectionCount({
            variables: {
              input: {
                collectionId: unsavePost.collectionId,
                userId: unsavePost.userId,
              },
            },
            onCompleted: ({ savedPostCollectionCount }) => {
              // Removing the collection if it's empty
              if (savedPostCollectionCount === 0) {
                removeSavedPostCollection({
                  variables: {
                    input: {
                      collectionId: unsavePost.collectionId,
                      userId: unsavePost.userId,
                    },
                  }, // Updating the cache to reflect the changes
                  update(cache, { data: removeSavedPostCollection }) {
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
              }
            },
          });
        }
      },
      // Updating the cache instead of refetching the entire query
      update: (cache, { data }) => {
        cache.modify({
          fields: {
            // Removing the unsaved post from authenticated user's saved posts
            savedPosts: (existingSavedPosts = [], { readField }) =>
              existingSavedPosts.filter(
                (savedPost: PostWithSavedCollectionID) =>
                  readField("id", savedPost) !== data?.unsavePost?.postId
              ),
          }, // Using the authenticated user as identifier
          id: cache.identify({
            ...authenticatedUser,
          }),
        });
      },
    });
  }

  const themeProps = { $isAuthenticated: !!authenticatedUser, $theme: theme };

  return (
    <Container.Main {...themeProps}>
      {/* TO BE ADDED */}
      {/* <img alt={text || ""} /> */}
      <Container.PostDetails>
        <div>
          <Text.SavedPostText {...themeProps} onClick={onTextClick}>
            {text}
          </Text.SavedPostText>
          {savedCollection && (
            <Text.Collection {...themeProps}>
              Saved&#160;to&#160;
              <Text.CollectionName
                {...themeProps}
                onClick={onCollectionNameClick}
              >
                {savedCollection.name}
              </Text.CollectionName>
            </Text.Collection>
          )}
          <p>
            {ownerFirstName} {ownerLastName}
          </p>
        </div>
        <Button.UnsavePost {...themeProps} onClick={handleUnsavePostClick}>
          <BookmarkRemove fontSize="small" /> Unsave
        </Button.UnsavePost>
      </Container.PostDetails>
    </Container.Main>
  );
}
