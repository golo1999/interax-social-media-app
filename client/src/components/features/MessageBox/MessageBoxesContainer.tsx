import { Fragment } from "react";
import styled from "styled-components";

import { MessageBox } from "components";
import { useMessagesStore } from "store";

const Container = styled.div`
  bottom: 0;
  display: flex;
  gap: 0.5em;
  position: fixed;
  right: 100px;
`;

export function MessageBoxesContainer() {
  const { activeMessageBoxes, closeMessageBox, minimizeMessageBox } =
    useMessagesStore();

  return (
    <Container>
      {activeMessageBoxes.map((item, index) => {
        const { userId, visibility } = item;

        if (visibility === "HIDDEN") {
          return <Fragment key={index} />;
        }

        function handleCloseClick() {
          closeMessageBox(userId);
        }

        function handleMinimizeClick() {
          minimizeMessageBox(userId);
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
