import { useLazyQuery } from "@apollo/client";

import { Fragment, useEffect } from "react";
import styled from "styled-components";

import { UserPhoto } from "components";
import { useAuthenticationStore, useMessagesStore } from "store";
import {
  GET_USER_BY_ID,
  instanceOfUserError,
  instanceOfUserWithMessage,
} from "helpers";

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
  const { authenticatedUser } = useAuthenticationStore();
  const { activeMessageBoxes } = useMessagesStore();

  return (
    <Container>
      {activeMessageBoxes
        .filter(
          (messageBox) =>
            messageBox.authenticatedUserId === authenticatedUser!.id
        )
        .map((item, index) => {
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
  const { authenticatedUser } = useAuthenticationStore();
  const [fetchUserById, { data: user = { userById: null } }] =
    useLazyQuery(GET_USER_BY_ID);
  const { maximizeMessageBox } = useMessagesStore();

  useEffect(() => {
    fetchUserById({
      variables: {
        input: {
          authenticatedUserId: authenticatedUser?.id,
          returnUserIfBlocked: true,
          userId,
        },
      },
    });
  }, [authenticatedUser, userId, fetchUserById]);

  function handlePhotoClick() {
    maximizeMessageBox(authenticatedUser!.id, userId);
  }

  if (!user.userById || instanceOfUserError(user.userById)) {
    return <></>;
  }

  return (
    <UserPhoto
      containerSize="3em"
      iconSize="1.5em"
      isChatHead
      user={
        instanceOfUserWithMessage(user.userById)
          ? user.userById.user
          : user.userById
      }
      onPhotoClick={handlePhotoClick}
    />
  );
}
