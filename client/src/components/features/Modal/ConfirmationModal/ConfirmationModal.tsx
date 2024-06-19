import { Divider } from "@mui/material";

import { MutableRefObject, createRef } from "react";
import { MdClose } from "react-icons/md";

import { Modal } from "components";
import { Colors } from "environment";
import { useOutsideClick } from "hooks";
import { useAuthenticationStore, useSettingsStore } from "store";

import { Button, Message } from "./ConfirmationModal.style";

interface Props {
  confirmButtonText?: string;
  message?: string;
  title?: string;
  onCloseClick: () => void;
  onConfirmClick: () => void;
}

export function ConfirmationModal({
  confirmButtonText = "Confirm",
  message,
  title = "Confirm action",
  onCloseClick,
  onConfirmClick,
}: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();
  const modalContainerRef = createRef<HTMLDivElement>();

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
    <Modal ref={modalContainerRef} width="35vw">
      <Modal.Header
        iconColor={iconColor}
        isTemplate
        rightIcon={MdClose}
        title={title}
        titleColor={titleColor}
        onRightIconClick={onCloseClick}
      />
      <Divider sx={{ borderColor: Colors[dividerColor] }} />
      <Modal.Body padding="0.75em">
        {message && (
          <Message $isAuthenticated={!!authenticatedUser} $theme={theme}>
            {message}
          </Message>
        )}
      </Modal.Body>
      <Modal.Footer
        alignItems="center"
        gap="0.5em"
        justifyContent="flex-end"
        padding="0.75em"
      >
        <Button.Cancel
          $isAuthenticated={!!authenticatedUser}
          $theme={theme}
          onClick={onCloseClick}
        >
          Cancel
        </Button.Cancel>
        <Button.Confirm onClick={onConfirmClick}>
          {confirmButtonText}
        </Button.Confirm>
      </Modal.Footer>
    </Modal>
  );
}
