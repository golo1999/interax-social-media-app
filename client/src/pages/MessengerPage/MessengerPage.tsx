import { useLazyQuery } from "@apollo/client";

import { useEffect, useState } from "react";
import { MdInfo } from "react-icons/md";
import { useLocation, useNavigate } from "react-router";

import { Chat, ChatList, Divider, Header, UserPhoto } from "components";
import {
  GET_AUTHENTICATED_USER,
  GET_CONVERSATION_BETWEEN,
  GET_USER_BY_ID,
  GetAuthenticatedUserData,
  GetConversationBetweenData,
  GetUserByIdData,
} from "helpers";
import { useHeaderItems } from "hooks";
import { useMessagesStore } from "store";

import { Complementary } from "./Complementary";
import { getDisplayedEmoji, getMessageTheme } from "./MessengerPage.helpers";
import { Container, User } from "./MessengerPage.style";

export function MessengerPage() {
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

  const [isComplementaryVisible, setIsComplementaryVisible] = useState(true);

  const headerItems = useHeaderItems();
  const { pathname } = useLocation();
  const { isChatModalVisible, closeChatModal } = useMessagesStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isChatModalVisible) {
      closeChatModal();
    }
  }, [isChatModalVisible, closeChatModal]);

  const userId = pathname.split("/")[3];

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

  console.log(user.userById);

  if (conversation.conversationBetween) {
    console.log(conversation.conversationBetween);
  }

  const { emoji, first, firstNickname, secondNickname, theme } = {
    ...conversation.conversationBetween,
  };
  const { firstName, lastName, username } = { ...user.userById };

  function getDisplayedName() {
    if (!firstName || !lastName) {
      return "Interax user";
    } else if (!firstNickname && !secondNickname) {
      if (firstName && lastName) {
        return `${firstName} ${lastName}`;
      }
      return "";
    } else if (first === userId) {
      return firstNickname;
    }

    return secondNickname;
  }

  const isAuthenticatedUser =
    userId === authenticatedUserData.authenticatedUser?.id;
  const isAuthenticatedUserFriend =
    authenticatedUserData.authenticatedUser?.friends?.find(
      (friend) => friend.id === userId
    );
  const DisplayedEmoji = getDisplayedEmoji(emoji);

  return (
    <Container.Main>
      <Header
        authenticatedUser={authenticatedUserData.authenticatedUser}
        items={headerItems}
        selectedItem={null}
      />
      <Container.Content>
        <ChatList />
        <Divider thickness="1px" vertical />
        <Container.Chat>
          <Container.ChatHeader>
            <Container.User
              onClick={() => {
                if (username) {
                  navigate(`/${username}`);
                }
              }}
            >
              <UserPhoto user={user.userById} />
              <User.DetailsContainer>
                <User.Name>{getDisplayedName()}</User.Name>
                {(isAuthenticatedUser || isAuthenticatedUserFriend) && (
                  <User.Active>Active 47m ago</User.Active>
                )}
              </User.DetailsContainer>
            </Container.User>
            <Container.Icons>
              <Container.Icon
                onClick={() => setIsComplementaryVisible((value) => !value)}
              >
                <MdInfo color={getMessageTheme(theme)} size={24} />
              </Container.Icon>
            </Container.Icons>
          </Container.ChatHeader>
          <Chat userId={userId} />
        </Container.Chat>
        {isComplementaryVisible && (
          <>
            <Divider thickness="1px" vertical />
            <Complementary
              authenticatedUser={authenticatedUserData.authenticatedUser}
              conversation={conversation.conversationBetween}
              displayedEmoji={DisplayedEmoji}
              displayedName={getDisplayedName()}
              user={user.userById}
            />
          </>
        )}
      </Container.Content>
    </Container.Main>
  );
}
