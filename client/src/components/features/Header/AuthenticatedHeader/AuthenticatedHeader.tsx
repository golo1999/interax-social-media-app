import { useMatch } from "react-router";

import { IconItem, Navbar, SearchInput, UserPhoto } from "components";
import { Colors } from "environment";
import { User } from "models";
import { useMessagesStore, useSettingsStore } from "store";

import { Container, Icon } from "./AuthenticatedHeader.style";

interface Props {
  authenticatedUser: User;
  items: IconItem[];
  selectedItem: IconItem | null;
}

export function AuthenticatedHeader({
  authenticatedUser,
  items,
  selectedItem,
}: Props) {
  const { isChatModalVisible, closeChatModal, openChatModal } =
    useMessagesStore();
  const {
    isPostOptionsListVisible,
    isSettingsListVisible,
    closePostOptionsList,
    closeSettingsList,
    openSettingsList,
  } = useSettingsStore();
  const isMessagesRoute = useMatch("/messages/t/:userId");

  function handleItemSelected(newSelectedItem: IconItem) {
    if (selectedItem === newSelectedItem) {
      return;
    }

    const { onClick } = newSelectedItem;

    onClick();
  }

  function handleMessengerClick() {
    if (isPostOptionsListVisible) {
      closePostOptionsList();
    }

    if (isSettingsListVisible) {
      closeSettingsList();
    }

    if (isChatModalVisible) {
      closeChatModal();
    } else {
      openChatModal();
    }
  }

  function handleSearchClick() {
    // TODO
  }

  function handleUserPhotoClick() {
    if (isChatModalVisible) {
      closeChatModal();
    }

    if (isPostOptionsListVisible) {
      closePostOptionsList();
    }

    if (isSettingsListVisible) {
      closeSettingsList();
    } else {
      openSettingsList();
    }
  }

  const messengerIconColor = isChatModalVisible
    ? Colors.BrilliantAzure
    : Colors.Platinum;

  return (
    <>
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
        <UserPhoto
          user={authenticatedUser}
          onPhotoClick={handleUserPhotoClick}
        />
      </Container.Icons>
    </>
  );
}
