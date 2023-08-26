import { useLazyQuery } from "@apollo/client";

import { useEffect, useMemo } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import { SearchInput } from "components";
import { GET_AUTHENTICATED_USER, GetAuthenticatedUserData } from "helpers";
import { useMessagesStore } from "store";

import { Container, Footer, Header, List } from "./ChatList.style";
import { GroupedMessage } from "./ChatList.types";
import { ChatListItem } from "./ChatListItem";

interface Props {
  isModal?: boolean;
}

export function ChatList({ isModal }: Props) {
  const [
    fetchAuthenticatedUser,
    { data: authenticatedUserData = { authenticatedUser: null } },
  ] = useLazyQuery<GetAuthenticatedUserData>(GET_AUTHENTICATED_USER);

  useEffect(() => {
    fetchAuthenticatedUser();
  }, [fetchAuthenticatedUser]);

  const { id: authenticatedUserId, messages } = {
    ...authenticatedUserData.authenticatedUser,
  };

  const { closeChatModal } = useMessagesStore();
  const navigate = useNavigate();

  const groupedMessages = useMemo(() => {
    const list: GroupedMessage[] = [];

    messages?.forEach((message) => {
      const { receiverId, senderId } = message;
      const userId = senderId === authenticatedUserId ? receiverId : senderId;
      const matchedGroupedMessage = list.find(
        (groupedMessage) => groupedMessage.userId === userId
      );

      if (matchedGroupedMessage) {
        matchedGroupedMessage.messages?.push(message);
      } else {
        list.push({
          messages: [message],
          userId,
        });
      }
    });

    return list.length > 0 ? list : null;
  }, [authenticatedUserId, messages]);

  function handleSeeInMessengerClick() {
    closeChatModal();

    if (groupedMessages) {
      // navigating to the first chat
      navigate(`/messages/t/${groupedMessages[0].userId}`);
    }
  }

  return (
    <Container.Main isModal={isModal}>
      {groupedMessages && (
        <>
          <Container.GroupedMessages>
            <Header.Element>
              <Header.Title>Chats</Header.Title>
              <Header.IconsContainer>
                {isModal && (
                  <HiOutlineArrowsExpand
                    color="silver"
                    size={18}
                    onClick={handleSeeInMessengerClick}
                  />
                )}
                <BsPencilSquare color="silver" size={18} />
              </Header.IconsContainer>
            </Header.Element>
            <SearchInput placeholder="Search Messenger" />
            <List>
              {groupedMessages.map((groupedMessage, index) => (
                <ChatListItem
                  key={index}
                  authenticatedUserId={
                    authenticatedUserData.authenticatedUser?.id || null
                  }
                  isModal={isModal}
                  groupedMessage={groupedMessage}
                />
              ))}
            </List>
          </Container.GroupedMessages>
          {isModal && (
            <Footer.Element onClick={handleSeeInMessengerClick}>
              <Footer.Text>See all in Messenger</Footer.Text>
            </Footer.Element>
          )}
        </>
      )}
    </Container.Main>
  );
}
