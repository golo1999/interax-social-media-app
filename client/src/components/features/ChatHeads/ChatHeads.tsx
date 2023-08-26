import { useLazyQuery } from "@apollo/client";

import { Fragment, useEffect } from "react";
import styled from "styled-components";

import { UserPhoto } from "components";
import { useMessagesStore } from "store";
import { GetUserByIdData, GET_USER_BY_ID } from "helpers";

const Container = styled.div`
  bottom: 1em;
  display: flex;
  flex-direction: column-reverse;
  gap: 0.5em;
  position: fixed;
  right: 1em;
  width: fit-content;
  z-index: 1;
`;

export function ChatHeads() {
  const { activeMessageBoxes } = useMessagesStore();

  return (
    <Container>
      {activeMessageBoxes.map((item, index) => {
        if (item.visibility === "VISIBLE") {
          return <Fragment key={index} />;
        }

        return <ChatHead key={index} userId={item.userId} />;
      })}
    </Container>
  );
}

interface ChatHeadProps {
  userId: string;
}

function ChatHead({ userId }: ChatHeadProps) {
  const [fetchUserById, { data: user = { userById: null } }] =
    useLazyQuery<GetUserByIdData>(GET_USER_BY_ID);

  useEffect(() => {
    fetchUserById({ variables: { id: userId } });
  }, [userId, fetchUserById]);

  const { maximizeMessageBox } = useMessagesStore();

  function handlePhotoClick() {
    maximizeMessageBox(userId);
  }

  return (
    <UserPhoto
      containerSize="3em"
      iconSize="1.5em"
      user={user.userById}
      onPhotoClick={handlePhotoClick}
    />
  );
}
