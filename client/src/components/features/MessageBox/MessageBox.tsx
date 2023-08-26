import { useLazyQuery } from "@apollo/client";

import { useEffect } from "react";

import { Chat, Divider, UserPhoto } from "components";
import { Colors } from "environment";
import {
  GetAuthenticatedUserData,
  GetUserByIdData,
  GET_AUTHENTICATED_USER,
  GET_USER_BY_ID,
  GET_CONVERSATION_BETWEEN,
  GetConversationBetweenData,
} from "helpers";

import { Container, Header, Icon, User } from "./MessageBox.style";

interface Props {
  userId: string;
  onCloseClick: () => void;
  onMinimizeClick: () => void;
}

export function MessageBox({ userId, onCloseClick, onMinimizeClick }: Props) {
  const [
    fetchAuthenticatedUser,
    { data: authenticatedUserData = { authenticatedUser: null } },
  ] = useLazyQuery<GetAuthenticatedUserData>(GET_AUTHENTICATED_USER);
  const [
    fetchConversationBetween,
    { data: conversation = { conversationBetween: null } },
  ] = useLazyQuery<GetConversationBetweenData>(GET_CONVERSATION_BETWEEN);
  const [fetchUserById, { data: user = { userById: null } }] =
    useLazyQuery<GetUserByIdData>(GET_USER_BY_ID);

  useEffect(() => {
    fetchAuthenticatedUser();
    fetchUserById({ variables: { id: userId } });

    if (authenticatedUserData.authenticatedUser) {
      fetchConversationBetween({
        variables: {
          input: {
            first: authenticatedUserData.authenticatedUser.id,
            second: userId,
          },
        },
      });
    }
  }, [
    authenticatedUserData.authenticatedUser,
    userId,
    fetchAuthenticatedUser,
    fetchConversationBetween,
    fetchUserById,
  ]);

  const { first, firstNickname, secondNickname } = {
    ...conversation.conversationBetween,
  };
  const { firstName, lastName } = { ...user.userById };

  function getDisplayedName() {
    if (!firstNickname && !secondNickname) {
      if (firstName && lastName) {
        return `${firstName} ${lastName}`;
      }
      return "";
    } else if (first === userId) {
      return firstNickname;
    }

    return secondNickname;
  }

  return (
    <Container.Main>
      <Header>
        <Container.User>
          <UserPhoto user={user.userById} />
          <User.DetailsContainer>
            <User.Name>{getDisplayedName()}</User.Name>
            <User.Active>Active 2h ago</User.Active>
          </User.DetailsContainer>
        </Container.User>
        <Container.Icons>
          <Icon.Minimize
            color={Colors.Azure}
            size={24}
            onClick={onMinimizeClick}
          />
          <Icon.Close color={Colors.Azure} size={24} onClick={onCloseClick} />
        </Container.Icons>
      </Header>
      <Divider />
      <Chat chatHeight="350px" userId={userId} />
    </Container.Main>
  );
}
