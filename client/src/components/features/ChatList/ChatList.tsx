import { useMemo } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import { SearchInput } from "components";
import { Colors } from "environment";
import {
  useAuthenticationStore,
  useMessagesStore,
  useSettingsStore,
} from "store";

import { Container, Footer, Header, List } from "./ChatList.style";
import { GroupedMessage } from "./ChatList.types";
import { ChatListItem } from "./ChatListItem";

interface Props {
  isModal?: boolean;
}

export function ChatList({ isModal }: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const { closeChatModal } = useMessagesStore();
  const navigate = useNavigate();
  const { theme } = useSettingsStore();

  const { id: authenticatedUserId, messages } = {
    ...authenticatedUser,
  };

  console.log({ messages });

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

  console.log({ groupedMessages });

  function handleSeeInMessengerClick() {
    closeChatModal();

    if (groupedMessages) {
      // navigating to the first chat
      navigate(`/messages/t/${groupedMessages[0].userId}`);
    }
  }

  const themeProps = { $isAuthenticated: !!authenticatedUser, $theme: theme };

  const iconColor =
    !!authenticatedUser && theme === "DARK"
      ? Colors.PhilippineSilver
      : Colors.GraniteGray;

  return (
    <Container.Main {...themeProps} isModal={isModal}>
      {groupedMessages && (
        <>
          <Container.GroupedMessages>
            <Header.Element>
              <Header.Title {...themeProps}>Chats</Header.Title>
              <Header.IconsContainer>
                {isModal && (
                  <Container.Icon {...themeProps}>
                    <HiOutlineArrowsExpand
                      color={iconColor}
                      size={18}
                      onClick={handleSeeInMessengerClick}
                    />
                  </Container.Icon>
                )}
                <Container.Icon {...themeProps}>
                  <BsPencilSquare color={iconColor} size={18} />
                </Container.Icon>
              </Header.IconsContainer>
            </Header.Element>
            <SearchInput placeholder="Search Messenger" />
            <List>
              {groupedMessages.map((groupedMessage, index) => (
                <ChatListItem
                  key={index}
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
