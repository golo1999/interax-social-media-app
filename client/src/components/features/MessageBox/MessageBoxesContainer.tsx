import { Fragment } from "react";
import styled from "styled-components";

import { MessageBox } from "components";
import { useAuthenticationStore, useMessagesStore } from "store";

const Container = styled.div`
  bottom: 0;
  display: flex;
  gap: 0.5em;
  position: fixed;
  right: 100px;
  z-index: 2;
`;

export function MessageBoxesContainer() {
  const { authenticatedUser } = useAuthenticationStore();
  const { activeMessageBoxes, closeMessageBox, minimizeMessageBox } =
    useMessagesStore();

  return (
    <Container>
      {activeMessageBoxes.map((item, index) => {
        const { authenticatedUserId, userId, visibility } = item;

        if (authenticatedUserId !== authenticatedUser?.id) {
          return <Fragment key={index} />;
        }

        if (visibility === "HIDDEN") {
          return <Fragment key={index} />;
        }

        function handleCloseClick() {
          closeMessageBox(authenticatedUser!.id, userId);
        }

        function handleMinimizeClick() {
          minimizeMessageBox(authenticatedUser!.id, userId);
        }

        return (
          <MessageBox
            key={index}
            userId={userId}
            onCloseClick={handleCloseClick}
            onMinimizeClick={handleMinimizeClick}
          />
        );
      })}
    </Container>
  );
}
