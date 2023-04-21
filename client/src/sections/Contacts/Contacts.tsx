import { useLazyQuery } from "@apollo/client";

import { CSSProperties, useEffect } from "react";
import styled from "styled-components";

import { UserFriend } from "components";
import { Colors } from "environment";
import {
  GetAuthenticatedUserData,
  GET_AUTHENTICATED_USER_WITH_FRIENDS,
} from "helpers";
import { useMessagesStore } from "store";

const Container = {
  Main: styled.section`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  `,
  User: styled.div`
    border-radius: 5px;
    overflow: hidden;
    padding: 0.5em;
    text-overflow: ellipsis;
    user-select: none;
    white-space: nowrap;

    &:hover {
      background-color: ${Colors.BlackOlive};
    }
  `,
};

interface Props {
  style?: CSSProperties;
}

export function Contacts({ style }: Props) {
  const [
    fetchAuthenticatedUser,
    { data: authenticatedUserData = { authenticatedUser: null } },
  ] = useLazyQuery<GetAuthenticatedUserData>(
    GET_AUTHENTICATED_USER_WITH_FRIENDS
  );

  const { activeMessageBoxes, addMessageBox, maximizeMessageBox } =
    useMessagesStore();

  useEffect(() => {
    fetchAuthenticatedUser();
  }, [fetchAuthenticatedUser]);

  const { friends } = { ...authenticatedUserData.authenticatedUser };

  return (
    <Container.Main style={style}>
      <div>
        <h4 style={{ color: "silver" }}>Contacts</h4>
      </div>
      {friends?.slice(0, 20).map((friend, index) => {
        const { id: friendId } = friend;

        function handleClick() {
          const matchedMessageBox = activeMessageBoxes.find(
            (messageBox) => messageBox.userId === friendId
          );

          if (!matchedMessageBox) {
            addMessageBox(friendId);
          } else if (matchedMessageBox.visibility === "HIDDEN") {
            maximizeMessageBox(friendId);
          }
        }

        return (
          <Container.User key={index}>
            <UserFriend friend={friend} onClick={handleClick} />
          </Container.User>
        );
      })}
    </Container.Main>
  );
}
