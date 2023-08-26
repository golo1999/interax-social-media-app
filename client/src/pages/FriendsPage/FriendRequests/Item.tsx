import { useLazyQuery } from "@apollo/client";

import { CSSProperties, useEffect } from "react";

import { UserPhoto } from "components";
import { GET_USER_BY_ID, GetUserByIdData } from "helpers";
import { useMutualFriends } from "hooks";
import { FriendshipRequest, User } from "models";

import { ListItem } from "../FriendsPage.style";

import {
  Button,
  Container,
  DisplayedName,
  MutualFriends,
} from "./FriendRequests.style";

interface Props {
  authenticatedUser: User | null;
  request: FriendshipRequest;
  onConfirmClick: (userId: string | null) => void;
  onItemClick: (username: string) => void;
  onRemoveClick: (userId: string | null) => void;
}

export function Item({
  authenticatedUser,
  request,
  onConfirmClick,
  onItemClick,
  onRemoveClick,
}: Props) {
  const [fetchUserById, { data: user = { userById: null } }] =
    useLazyQuery<GetUserByIdData>(GET_USER_BY_ID);

  const { sender } = request;

  useEffect(() => {
    fetchUserById({ variables: { id: sender } });
  }, [sender, fetchUserById]);

  const { firstName, id: userId, lastName, username } = { ...user.userById };

  function handleConfirmClick() {
    onRemoveClick(userId || null);
  }

  function handleItemClick() {
    if (username) {
      onItemClick(username);
    }
  }

  function handleRemoveClick() {
    onConfirmClick(userId || null);
  }

  const { mutualFriends, mutualFriendsText } = useMutualFriends({
    authenticatedUser,
    user: user.userById,
  });

  const userPhotoContainerStyle: CSSProperties = {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  };

  return (
    <ListItem>
      <Container.DisplayedName mutualFriendsCount={mutualFriends.length}>
        <UserPhoto
          containerSize="100%"
          containerStyle={userPhotoContainerStyle}
          iconSize="50%"
          isSquare
          user={user.userById}
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
        <Button.Confirm onClick={handleConfirmClick}>Confirm</Button.Confirm>
        <Button.Remove onClick={handleRemoveClick}>Remove</Button.Remove>
      </Container.MutualFriends>
    </ListItem>
  );
}
