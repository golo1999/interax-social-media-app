import { useMatch } from "react-router";

import { Divider, IconItem, Navbar, SearchInput, UserPhoto } from "components";
import { Colors } from "environment";
import { User } from "models";
import { useMessagesStore } from "store";

import { Container, Icon } from "./Header.style";

interface Props {
  authenticatedUser: User | null;
  items: IconItem[];
  selectedItem: IconItem | null;
}

export function Header({ authenticatedUser, items, selectedItem }: Props) {
  const { isChatModalVisible, closeChatModal, openChatModal } =
    useMessagesStore();
  const isMessagesRoute = useMatch("/messages/t/:userId");

  function handleItemSelected(newSelectedItem: IconItem) {
    if (selectedItem === newSelectedItem) {
      return;
    }

    const { onClick } = newSelectedItem;

    onClick();
  }

  function handleMessengerClick() {
    if (isChatModalVisible) {
      closeChatModal();
    } else {
      openChatModal();
    }
  }

  function handleSearchClick() {
    // TODO
  }

  const messengerIconColor = isChatModalVisible
    ? Colors.BrilliantAzure
    : Colors.Platinum;

  return (
    <Container.Main>
      <Container.Top>
        <SearchInput onSearchClick={handleSearchClick} />
        <Navbar.Icons
          selectedItem={selectedItem}
          items={items}
          onItemSelected={handleItemSelected}
        />
        <Container.Icons>
          {!isMessagesRoute && (
            <Container.Icon
              isModalVisible={isChatModalVisible}
              onClick={handleMessengerClick}
            >
              <Icon.Messenger color={messengerIconColor} size={20} />
            </Container.Icon>
          )}
          <Container.Icon isModalVisible={false}>
            <Icon.Notifications color={Colors.Platinum} size={20} />
          </Container.Icon>
          <UserPhoto user={authenticatedUser} />
        </Container.Icons>
      </Container.Top>
      <Divider thickness="1px" />
    </Container.Main>
  );
}
