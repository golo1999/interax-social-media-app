import { CSSProperties } from "react";

import { UserPhoto } from "components";
import { useMutualFriends } from "hooks";
import { User } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

import { ListItem } from "../FriendsPage.style";

import {
  Button,
  Container,
  DisplayedName,
  MutualFriends,
} from "./Suggestions.style";

interface Props {
  user: User;
  onAddFriendClick: (userId: string | null) => void;
  onItemClick: (username: string) => void;
  onRemoveClick: (userId: string | null) => void;
}

export function Item({
  user,
  onAddFriendClick,
  onItemClick,
  onRemoveClick,
}: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();

  const { firstName, id: userId, lastName, username } = user;

  function handleConfirmClick() {
    onRemoveClick(userId || null);
  }

  function handleItemClick() {
    onItemClick(username);
  }

  function handleRemoveClick() {
    onAddFriendClick(userId || null);
  }

  const { mutualFriends, mutualFriendsText } = useMutualFriends(user);

  const themeProps = { $isAuthenticated: !!authenticatedUser, $theme: theme };

  const userPhotoContainerStyle: CSSProperties = {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  };

  return (
    <ListItem {...themeProps}>
      <Container.DisplayedName
        friendshipSuggestionsCount={mutualFriends.length}
      >
        <UserPhoto
          containerSize="100%"
          containerStyle={userPhotoContainerStyle}
          iconSize="50%"
          isSquare
          user={user}
          onPhotoClick={handleItemClick}
        />
        <DisplayedName {...themeProps} onClick={handleItemClick}>
          {firstName} {lastName}
        </DisplayedName>
      </Container.DisplayedName>
      <Container.MutualFriends>
        {mutualFriends.length > 0 && (
          <MutualFriends {...themeProps}>{mutualFriendsText}</MutualFriends>
        )}
        <Button.AddFriend {...themeProps} onClick={handleConfirmClick}>
          Add Friend
        </Button.AddFriend>
        <Button.Remove {...themeProps} onClick={handleRemoveClick}>
          Remove
        </Button.Remove>
      </Container.MutualFriends>
    </ListItem>
  );
}
