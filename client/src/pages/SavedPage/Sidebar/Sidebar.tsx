import { gql, useMutation } from "@apollo/client";
import { Add } from "@mui/icons-material";
import { Divider } from "@mui/material";

import { useState } from "react";
import { createPortal } from "react-dom";

import { SavedCollectionModal } from "components";
import { Permission } from "enums";
import { Colors } from "environment";
import { ADD_SAVED_POST_COLLECTION } from "helpers";
import { useScrollLock } from "hooks";
import { SavedPostCollection } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

import { Item } from "./Item";
import { Button, Container, List, Text } from "./Sidebar.style";

interface Props {
  collections: SavedPostCollection[];
  selectedCollection: SavedPostCollection | undefined;
  onCollectionClick: (collection: SavedPostCollection) => void;
}

export function Sidebar({
  collections,
  selectedCollection,
  onCollectionClick,
}: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const [addSavedPostCollection] = useMutation(ADD_SAVED_POST_COLLECTION);
  const { lockScroll, unlockScroll } = useScrollLock();
  const { theme } = useSettingsStore();
  const [isCreateCollectionModalOpen, setIsCreateCollectionModalOpen] =
    useState(false);

  const themeProps = { $isAuthenticated: !!authenticatedUser, $theme: theme };

  const dividerColor =
    !!authenticatedUser && theme === "DARK" ? "Arsenic" : "LightGray";

  return (
    <>
      <Container.Main {...themeProps}>
        <Text.Title {...themeProps}>Saved</Text.Title>
        <Divider
          sx={{ borderColor: Colors[dividerColor], margin: "0 0.5em" }}
        />
        <Container.Content>
          <Text.Subtitle {...themeProps}>My collections</Text.Subtitle>
          <List.Collections>
            {collections.map((collection) => (
              <Item
                collection={collection}
                isSelected={collection.id === selectedCollection?.id}
                key={collection.id}
                onClick={() => onCollectionClick(collection)}
              />
            ))}
          </List.Collections>
          <Button.CreateNewCollection
            {...themeProps}
            onClick={() => {
              lockScroll();
              setIsCreateCollectionModalOpen(true);
            }}
          >
            <Add sx={{ fontSize: "22px" }} />
            Create new collection
          </Button.CreateNewCollection>
        </Container.Content>
      </Container.Main>
      {isCreateCollectionModalOpen &&
        createPortal(
          <SavedCollectionModal
            type="CREATE"
            onCloseClick={() => {
              unlockScroll();
              setIsCreateCollectionModalOpen(false);
            }}
            onCreateClick={(collectionName) => {
              addSavedPostCollection({
                variables: {
                  input: {
                    name: collectionName,
                    userId: authenticatedUser!.id,
                    visibility: Permission.ONLY_ME,
                  },
                },
                update: (cache, { data }) => {
                  cache.modify({
                    fields: {
                      savedPostCollections: (existingCollections = []) => {
                        const savedPostCollectionRef = cache.writeFragment({
                          data: data?.addSavedPostCollection,
                          fragment: gql`
                            fragment NewSavedCollection on SavedPostCollection {
                              id
                            }
                          `,
                        });

                        return [...existingCollections, savedPostCollectionRef];
                      },
                    },
                  });
                },
              });
            }}
          />,
          document.body
        )}
    </>
  );
}
