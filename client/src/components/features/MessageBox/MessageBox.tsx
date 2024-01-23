import { useLazyQuery } from "@apollo/client";

import { MutableRefObject, useEffect, useRef, useState } from "react";

import { Chat, Divider, UserPhoto } from "components";
import { Colors } from "environment";
import {
  GetUserByIdData,
  GET_USER_BY_ID,
  GET_CONVERSATION_BETWEEN,
  GetConversationBetweenData,
  instanceOfUserError,
  instanceOfUserWithMessage,
} from "helpers";
import { useOutsideClick } from "hooks";
import { useAuthenticationStore, useSettingsStore } from "store";

import { Container, Header, Icon, User } from "./MessageBox.style";

interface Props {
  userId: string;
  onCloseClick: () => void;
  onMinimizeClick: () => void;
}

export function MessageBox({ userId, onCloseClick, onMinimizeClick }: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const [
    fetchConversationBetween,
    { data: conversation = { conversationBetween: null } },
  ] = useLazyQuery<GetConversationBetweenData>(GET_CONVERSATION_BETWEEN);
  const [fetchUserById, { data: user = { userById: null } }] =
    useLazyQuery<GetUserByIdData>(GET_USER_BY_ID);
  const mainContainerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { theme } = useSettingsStore();
  const [isFocused, setIsFocused] = useState(false);

  useOutsideClick({
    ref: mainContainerRef,
    handle: () => {
      if (isFocused) {
        setIsFocused((val) => !val);
      }
    },
  });

  useEffect(() => {
    console.log({ isFocused });
  }, [isFocused]);

  useEffect(() => {
    fetchUserById({
      variables: { input: { id: userId, returnUserIfBlocked: true } },
    });

    if (authenticatedUser) {
      fetchConversationBetween({
        variables: {
          input: {
            first: authenticatedUser.id,
            second: userId,
          },
        },
      });
    }
  }, [authenticatedUser, userId, fetchConversationBetween, fetchUserById]);

  if (!user.userById || instanceOfUserError(user.userById)) {
    return <></>;
  }

  const { first, firstNickname, secondNickname } = {
    ...conversation.conversationBetween,
  };
  const { firstName, lastName } = {
    ...(instanceOfUserWithMessage(user.userById)
      ? user.userById.user
      : user.userById),
  };

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

  const dividerColor =
    !!authenticatedUser && theme === "DARK" ? "Arsenic" : "AmericanSilver";
  const iconColor = isFocused ? Colors.Azure : Colors.SilverSand;

  return (
    <Container.Main
      $isAuthenticated={!!authenticatedUser}
      $theme={theme}
      isFocused={isFocused}
      ref={mainContainerRef}
      onClick={() => {
        if (!isFocused) {
          setIsFocused((val) => !val);
        }
      }}
    >
      <Header>
        <Container.User $isAuthenticated={!!authenticatedUser} $theme={theme}>
          <UserPhoto
            user={
              instanceOfUserWithMessage(user.userById)
                ? user.userById.user
                : user.userById
            }
          />
          <User.DetailsContainer>
            <User.Name $isAuthenticated={!!authenticatedUser} $theme={theme}>
              {getDisplayedName()}
            </User.Name>
            <User.Active $isAuthenticated={!!authenticatedUser} $theme={theme}>
              Active 2h ago
            </User.Active>
          </User.DetailsContainer>
        </Container.User>
        <Container.Icons>
          <Icon.Minimize
            $isAuthenticated={!!authenticatedUser}
            $theme={theme}
            color={iconColor}
            size={24}
            onClick={onMinimizeClick}
          />
          <Icon.Close
            $isAuthenticated={!!authenticatedUser}
            $theme={theme}
            color={iconColor}
            size={24}
            onClick={onCloseClick}
          />
        </Container.Icons>
      </Header>
      <Divider color={dividerColor} />
      <Chat userId={userId} />
    </Container.Main>
  );
}
