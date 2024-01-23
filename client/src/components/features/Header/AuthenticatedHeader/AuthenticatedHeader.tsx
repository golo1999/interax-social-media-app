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
    isNotificationListVisible,
    isPostOptionsListVisible,
    isSettingsListVisible,
    theme,
    closeNotificationsList,
    closePostOptionsList,
    closeSettingsList,
    openNotificationsList,
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
    if (isNotificationListVisible) {
      closeNotificationsList();
    }

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

  function handleNotificationsClick() {
    if (isChatModalVisible) {
      closeChatModal();
    }

    if (isPostOptionsListVisible) {
      closePostOptionsList();
    }

    if (isSettingsListVisible) {
      closeSettingsList();
    }

    if (isNotificationListVisible) {
      closeNotificationsList();
    } else {
      openNotificationsList();
    }
  }

  function handleSearchClick() {
    // TODO
  }

  function handleUserPhotoClick() {
    if (isChatModalVisible) {
      closeChatModal();
    }

    if (isNotificationListVisible) {
      closeNotificationsList();
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

  const themeProps = { $isAuthenticated: !!authenticatedUser, $theme: theme };

  const messengerIconColor = isChatModalVisible
    ? Colors.BrilliantAzure
    : !!authenticatedUser && theme === "DARK"
    ? Colors.Platinum
    : Colors.VampireBlack;
  const notificationsIconColor = isNotificationListVisible
    ? Colors.BrilliantAzure
    : !!authenticatedUser && theme === "DARK"
    ? Colors.Platinum
    : Colors.VampireBlack;

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
            {...themeProps}
            isModalOpen={isChatModalVisible}
            onClick={handleMessengerClick}
          >
            <Icon.Messenger color={messengerIconColor} size={24} />
          </Container.Icon>
        )}
        <Container.Icon
          {...themeProps}
          isModalOpen={isNotificationListVisible}
          onClick={handleNotificationsClick}
        >
          <Icon.Notifications color={notificationsIconColor} size={24} />
        </Container.Icon>
        <UserPhoto
          containerSize="40px"
          iconSize="16px"
          user={authenticatedUser}
          onPhotoClick={handleUserPhotoClick}
        />
      </Container.Icons>
    </>
  );
}
