import { CSSProperties } from "react";

import { UserPhoto } from "components";
import { useMutualFriends } from "hooks";
import { User } from "models";

import { ListItem } from "../FriendsPage.style";

import {
  Button,
  Container,
  DisplayedName,
  MutualFriends,
} from "./Suggestions.style";

interface Props {
  authenticatedUser: User | null;
  user: User;
  onAddFriendClick: (userId: string | null) => void;
  onItemClick: (username: string) => void;
  onRemoveClick: (userId: string | null) => void;
}

export function Item({
  authenticatedUser,
  user,
  onAddFriendClick,
  onItemClick,
  onRemoveClick,
}: Props) {
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

  const { mutualFriends, mutualFriendsText } = useMutualFriends({
    authenticatedUser,
    user: user,
  });

  const userPhotoContainerStyle: CSSProperties = {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  };

  return (
    <ListItem>
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
        <DisplayedName onClick={handleItemClick}>
          {firstName} {lastName}
        </DisplayedName>
      </Container.DisplayedName>
      <Container.MutualFriends>
        {mutualFriends.length > 0 && (
          <MutualFriends>{mutualFriendsText}</MutualFriends>
        )}
        <Button.AddFriend onClick={handleConfirmClick}>
          Add Friend
        </Button.AddFriend>
        <Button.Remove onClick={handleRemoveClick}>Remove</Button.Remove>
      </Container.MutualFriends>
    </ListItem>
  );
}
