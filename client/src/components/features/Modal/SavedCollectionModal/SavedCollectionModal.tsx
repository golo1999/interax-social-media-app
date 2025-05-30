import { Divider, TextField } from "@mui/material";

import { MutableRefObject, createRef, useState } from "react";
import { MdClose } from "react-icons/md";

import { Modal } from "components";
import { Colors } from "environment";
import { useOutsideClick } from "hooks";
import { useAuthenticationStore, useSettingsStore } from "store";

import { Button } from "./SavedCollectionModal.style";

type CommonProps = { onCloseClick: () => void };

type CreateModalProps = {
  currentCollectionName?: never;
  type: "CREATE";
  onCreateClick: (collectionName: string) => void;
  onRenameClick?: never;
};

type RenameModalProps = {
  currentCollectionName: string;
  type: "RENAME";
  onCreateClick?: never;
  onRenameClick: (collectionName: string) => void;
};

type Props = CommonProps & (CreateModalProps | RenameModalProps);

export function SavedCollectionModal({
  currentCollectionName,
  type,
  onCloseClick,
  onCreateClick,
  onRenameClick,
}: Props) {
  const modalContainerRef = createRef<HTMLDivElement>();
  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();
  const [updatedCollectionName, setUpdatedCollectionName] = useState(
    currentCollectionName || ""
  );

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
    <Modal ref={modalContainerRef} width="500px">
      <Modal.Header
        iconColor={iconColor}
        isTemplate
        rightIcon={MdClose}
        title="Create Collection"
        titleColor={titleColor}
        onRightIconClick={onCloseClick}
      />
      <Divider sx={{ borderColor: Colors[dividerColor] }} />
      <Modal.Body direction="column" padding="12px">
        <TextField
          label="Name"
          placeholder="Give your collection a name..."
          sx={{ flex: 1 }}
          value={updatedCollectionName}
          onChange={({ target: { value } }) => setUpdatedCollectionName(value)}
        />
      </Modal.Body>
      <Modal.Footer
        alignItems="center"
        gap="0.5em"
        justifyContent="flex-end"
        padding="12px"
      >
        <Button.Cancel onClick={onCloseClick}>Cancel</Button.Cancel>
        {type === "CREATE" ? (
          <Button.Create
            disabled={updatedCollectionName.trim().length < 1}
            onClick={() => {
              onCreateClick(updatedCollectionName);
              onCloseClick();
            }}
          >
            Create
          </Button.Create>
        ) : (
          <Button.Rename
            onClick={() => {
              onRenameClick(updatedCollectionName);
              onCloseClick();
            }}
          >
            Rename
          </Button.Rename>
        )}
      </Modal.Footer>
    </Modal>
  );
}
