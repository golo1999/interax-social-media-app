import { Divider } from "@mui/material";

import { MutableRefObject, createRef, useState } from "react";
import { MdClose } from "react-icons/md";

import { Modal } from "components";
import { Colors } from "environment";
import { useOutsideClick } from "hooks";
import { useAuthenticationStore, useSettingsStore } from "store";

import {
  Button,
  Container,
  FileInput,
  SelectedPhoto,
  Text,
} from "./PhotoModal.style";

interface Props {
  onCloseClick: () => void;
  onSaveClick: (file: File | null) => void;
}

export function PhotoModal({ onCloseClick, onSaveClick }: Props) {
  const fileInputRef = createRef<HTMLInputElement>();
  const modalContainerRef = createRef<HTMLDivElement>();
  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useOutsideClick({
    ref: modalContainerRef as MutableRefObject<HTMLElement>,
    handle: onCloseClick,
  });

  function handleSaveClick() {
    onSaveClick(selectedFile);
    onCloseClick();
  }

  const dividerColor: keyof typeof Colors =
    !!authenticatedUser && theme === "DARK" ? "Arsenic" : "LightGray";
  const iconColor: keyof typeof Colors =
    !!authenticatedUser && theme === "DARK" ? "Platinum" : "PhilippineGray";
  const titleColor: keyof typeof Colors =
    !!authenticatedUser && theme === "DARK" ? "Platinum" : "VampireBlack";

  return (
    <Modal minHeight="75vh" ref={modalContainerRef} width="60vw">
      <Modal.Header
        iconColor={iconColor}
        isTemplate
        rightIcon={MdClose}
        title="Select Photo"
        titleColor={titleColor}
        onRightIconClick={onCloseClick}
      />
      <Divider sx={{ borderColor: Colors[dividerColor] }} />
      <Modal.Body alignItems="center" justifyContent="center" padding="0.75rem">
        {selectedFile ? (
          <SelectedPhoto
            alt={selectedFile.name}
            src={URL.createObjectURL(selectedFile)}
          />
        ) : (
          <Text>No file selected</Text>
        )}
      </Modal.Body>
      <Modal.Footer
        alignItems="center"
        gap="0.5em"
        justifyContent="space-between"
        padding="0.75em"
      >
        <div>
          <FileInput
            accept="image/png,image/jpeg"
            id="file-upload-input"
            ref={fileInputRef}
            onChange={({ target: { files } }) => {
              if (files) {
                setSelectedFile(files[0]);
              }
            }}
          />
          <label htmlFor="file-upload-input">
            <Button.Cancel
              $isAuthenticated={!!authenticatedUser}
              $theme={theme}
              onClick={() => {
                fileInputRef.current?.click();
              }}
            >
              Select file
            </Button.Cancel>
          </label>
        </div>
        <Container.Buttons>
          <Button.Cancel
            $isAuthenticated={!!authenticatedUser}
            $theme={theme}
            onClick={onCloseClick}
          >
            Cancel
          </Button.Cancel>
          <Button.Save onClick={handleSaveClick}>Save</Button.Save>
        </Container.Buttons>
      </Modal.Footer>
    </Modal>
  );
}
