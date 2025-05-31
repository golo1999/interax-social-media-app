import { createRef, MutableRefObject, useMemo, useRef, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import { ConditionalWrapper, SearchInput } from "components";
import { Colors } from "environment";
import { useOutsideClick } from "hooks";
import {
  useAuthenticationStore,
  useMessagesStore,
  useSettingsStore,
} from "store";

import {
  Background,
  Container,
  Footer,
  Header,
  List,
  Text,
} from "./ChatList.style";
import { GroupedMessage } from "./ChatList.types";
import { ChatListItem } from "./ChatListItem";

interface Props {
  isModal?: boolean;
}

export function ChatList({ isModal }: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const { isChatModalVisible, closeChatModal } = useMessagesStore();
  const navigate = useNavigate();
  const mainContainerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { theme } = useSettingsStore();
  const [searchInputText, setSearchInputText] = useState("");
  const searchInputRef = createRef<HTMLInputElement>();

  useOutsideClick({
    ref: mainContainerRef,
    handle: closeChatModal,
  });

  const { id: authenticatedUserId, messages = [] } = {
    ...authenticatedUser,
  };

  console.log({ messages });

  // const groupedMessages = useMemo(() => {
  //   const list: GroupedMessage[] = [];

  //   messages?.forEach((message) => {
  //     const { receiverId, senderId } = message;
  //     const userId = senderId === authenticatedUserId ? receiverId : senderId;
  //     const matchedGroupedMessage = list.find(
  //       (groupedMessage) => groupedMessage.userId === userId
  //     );

  //     if (matchedGroupedMessage) {
  //       matchedGroupedMessage.messages?.push(message);
  //     } else {
  //       list.push({
  //         messages: [message],
  //         userId,
  //       });
  //     }
  //   });

  //   return list.length > 0 ? list : [];
  // }, [authenticatedUserId, messages]);

  // console.log({ groupedMessages });

  function handleSeeInMessengerClick() {
    closeChatModal();

    if (messages.length > 0) {
      // navigating to the first chat
      navigate(`/messages/t/${messages[0].userId}`);
    }
  }

  const themeProps = { $isAuthenticated: !!authenticatedUser, $theme: theme };

  const iconColor =
    !!authenticatedUser && theme === "DARK"
      ? Colors.PhilippineSilver
      : Colors.GraniteGray;

  return (
    <ConditionalWrapper
      condition={isChatModalVisible && isModal}
      wrapper={(children) => <Background>{children}</Background>}
    >
      <Container.Main {...themeProps} isModal={isModal} ref={mainContainerRef}>
        <Container.GroupedMessages>
          <Header.Element>
            <Header.Title {...themeProps}>Chats</Header.Title>
            {messages.length > 0 && (
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
                  {/* TODO */}
                  <BsPencilSquare color={iconColor} size={18} />
                </Container.Icon>
              </Header.IconsContainer>
            )}
          </Header.Element>
          {messages.length > 0 ? (
            <>
              <SearchInput
                placeholder="Search Messenger"
                ref={searchInputRef}
                onTextChange={(text) => setSearchInputText(text)}
              />
              <List>
                {messages.map((groupedMessage, index) => (
                  <ChatListItem
                    key={index}
                    isModal={isModal}
                    groupedMessage={groupedMessage}
                    searchInputText={searchInputText}
                  />
                ))}
              </List>
            </>
          ) : (
            <Text.NoMessages {...themeProps}>
              No messages found...
            </Text.NoMessages>
          )}
        </Container.GroupedMessages>
        {messages.length > 0 && isModal && (
          <Footer.Element onClick={handleSeeInMessengerClick}>
            <Footer.Text>See all in Messenger</Footer.Text>
          </Footer.Element>
        )}
      </Container.Main>
    </ConditionalWrapper>
  );
}
