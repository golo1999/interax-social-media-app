import { MutableRefObject, createRef } from "react";
import { MdClose } from "react-icons/md";

import { Modal, UserPost } from "components";
import { Colors } from "environment";
import { useOutsideClick } from "hooks";
import { Post, PostWithSavedCollectionID } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

interface Props {
  post: Post | PostWithSavedCollectionID;
  onCloseClick: () => void;
  onRedirect?: () => void;
}

export function ViewPostModal({ post, onCloseClick, onRedirect }: Props) {
  const modalContainerRef = createRef<HTMLDivElement>();
  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();

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
    <Modal ref={modalContainerRef} width="700px">
      <Modal.Header
        iconColor={iconColor}
        isTemplate
        rightIcon={MdClose}
        title="Post"
        titleColor={titleColor}
        onRightIconClick={onCloseClick}
      />
      <Modal.Body>
        <UserPost
          postId={post.id}
          onPostShared={() => {
            // TODO
          }}
          onRedirect={onRedirect}
        />
      </Modal.Body>
    </Modal>
  );
}
