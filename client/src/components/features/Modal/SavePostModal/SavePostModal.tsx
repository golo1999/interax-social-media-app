import { gql, useMutation, useQuery } from "@apollo/client";
import { Add } from "@mui/icons-material";
import { Divider, TextField } from "@mui/material";

import { MutableRefObject, createRef, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

import { Modal } from "components";
import {
  ADD_SAVED_POST_COLLECTION,
  GET_SAVED_POST_COLLECTIONS,
  REMOVE_SAVED_POST_COLLECTION,
} from "helpers";
import { Permission } from "enums";
import { Colors } from "environment";
import { useOutsideClick } from "hooks";
import { SavedPostCollection } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

import { Item } from "./Item";
import { Button, CollectionList, Container, Text } from "./SavePostModal.style";

interface Props {
  onCloseClick: () => void;
  onDoneClick: (collectionId: string) => void;
}

export function SavePostModal({ onCloseClick, onDoneClick }: Props) {
  const modalContainerRef = createRef<HTMLDivElement>();
  const { authenticatedUser } = useAuthenticationStore();
  const [addSavedPostCollection] = useMutation(ADD_SAVED_POST_COLLECTION);
  const [removeSavedPostCollection] = useMutation(REMOVE_SAVED_POST_COLLECTION);
  const [collections, setCollections] = useState<SavedPostCollection[]>([]);
  const [selectedCollection, setSelectedCollection] =
    useState<SavedPostCollection | null>(null);
  const { loading } = useQuery(GET_SAVED_POST_COLLECTIONS, {
    variables: { userId: authenticatedUser!.id },
    onCompleted: ({ savedPostCollections }) => {
      setCollections(savedPostCollections);
      setSelectedCollection(
        savedPostCollections.find(({ isChecked }) => isChecked) ||
          savedPostCollections[0]
      );
    },
  });
  const { theme } = useSettingsStore();
  const [isAddingNewCollection, setIsAddingNewCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");

  useEffect(() => {
    console.log({ selectedCollection });
  }, [selectedCollection]);

  useEffect(() => {
    console.log({ collections });
  }, [collections]);

  useOutsideClick({
    ref: modalContainerRef as MutableRefObject<HTMLElement>,
    handle: onCloseClick,
  });

  const dividerColor: keyof typeof Colors =
    !!authenticatedUser && theme === "DARK" ? "Arsenic" : "LightGray";
  const iconColor: keyof typeof Colors =
    !!authenticatedUser && theme === "DARK" ? "Platinum" : "PhilippineGray";
  const titleColor: keyof typeof Colors =
    !!authenticatedUser && theme === "DARK" ? "Platinum" : "VampireBlack";

  return (
    <Modal minHeight="75vh" ref={modalContainerRef} width="550px">
      <Modal.Header
        iconColor={iconColor}
        isTemplate
        rightIcon={MdClose}
        title="Save To"
        titleColor={titleColor}
        onRightIconClick={onCloseClick}
      />
      <Divider sx={{ borderColor: Colors[dividerColor] }} />
      <Modal.Body direction="column">
        <CollectionList>
          {collections.map((collection) => (
            <Item
              collection={collection}
              isSelected={collection === selectedCollection}
              key={collection.id}
              onClick={() => {
                if (
                  !selectedCollection ||
                  collection.id !== selectedCollection.id
                ) {
                  setSelectedCollection(collection);
                }
              }}
            />
          ))}
        </CollectionList>
      </Modal.Body>
      <Divider />
      <Container.NewCollection.Outer>
        {isAddingNewCollection ? (
          <TextField
            label="Name"
            placeholder="Give your collection a name..."
            sx={{ flex: 1 }}
            value={newCollectionName}
            onChange={({ target: { value } }) => setNewCollectionName(value)}
          />
        ) : (
          <Container.NewCollection.Inner
            onClick={() => setIsAddingNewCollection(true)}
          >
            <Container.NewCollection.AddIcon>
              <Add sx={{ color: Colors.VampireBlack }} />
            </Container.NewCollection.AddIcon>
            <Text.NewCollection>New Collection</Text.NewCollection>
          </Container.NewCollection.Inner>
        )}
      </Container.NewCollection.Outer>
      <Divider />
      <Modal.Footer
        alignItems="center"
        gap="0.5em"
        justifyContent="flex-end"
        padding="0.5em 1em"
      >
        {isAddingNewCollection ? (
          <>
            <Button.Cancel onClick={() => setIsAddingNewCollection(false)}>
              Cancel
            </Button.Cancel>
            <Button.Create
              disabled={newCollectionName.trim().length < 1}
              onClick={() =>
                addSavedPostCollection({
                  notifyOnNetworkStatusChange: true,
                  variables: {
                    input: {
                      name: newCollectionName,
                      userId: authenticatedUser!.id,
                      visibility: Permission.ONLY_ME,
                    },
                  },
                  onCompleted: ({ addSavedPostCollection }) => {
                    if (addSavedPostCollection) {
                      onDoneClick(addSavedPostCollection.id);
                    }
                  },
                  // Updating the cache to reflect the changes
                  update(cache, { data }) {
                    cache.modify({
                      fields: {
                        savedPostCollections(existingCollections = []) {
                          const savedPostCollectionRef = cache.writeFragment({
                            data: data?.addSavedPostCollection,
                            fragment: gql`
                              fragment NewSavedCollection on SavedPostCollection {
                                id
                              }
                            `,
                          });

                          return [
                            ...existingCollections,
                            savedPostCollectionRef,
                          ];
                        },
                      },
                    });
                  },
                })
              }
            >
              Create
            </Button.Create>
          </>
        ) : (
          <Button.Done
            disabled={!selectedCollection}
            onClick={() => {
              if (selectedCollection) {
                onDoneClick(selectedCollection.id);
              }
            }}
          >
            Done
          </Button.Done>
        )}
      </Modal.Footer>
    </Modal>
  );
}
