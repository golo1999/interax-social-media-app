import { useLazyQuery } from "@apollo/client";

import { CSSProperties, useEffect } from "react";

import { UserPhoto } from "components";
import {
  GET_USER_BY_ID,
  instanceOfUserError,
  instanceOfUserWithMessage,
} from "helpers";
import { useMutualFriends } from "hooks";
import { FriendshipRequest } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

import { ListItem } from "../FriendsPage.style";

import {
  Button,
  Container,
  DisplayedName,
  MutualFriends,
} from "./FriendRequests.style";

interface Props {
  request: FriendshipRequest;
  onConfirmClick: (userId: string | null) => void;
  onItemClick: (username: string) => void;
  onRemoveClick: (userId: string | null) => void;
}

export function Item({
  request,
  onConfirmClick,
  onItemClick,
  onRemoveClick,
}: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const [fetchUserById, { data: user = { userById: null } }] =
    useLazyQuery(GET_USER_BY_ID);
  const { theme } = useSettingsStore();

  const { sender } = request;

  useEffect(() => {
    fetchUserById({
      variables: {
        input: { authenticatedUserId: authenticatedUser?.id, userId: sender },
      },
    });
  }, [authenticatedUser, sender, fetchUserById]);

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

  const { mutualFriends, mutualFriendsText } = useMutualFriends(
    !user.userById
      ? null
      : instanceOfUserError(user.userById)
      ? null
      : instanceOfUserWithMessage(user.userById)
      ? user.userById.user
      : user.userById
  );

  if (instanceOfUserError(user.userById)) {
    return <></>;
  }

  const themeProps = { $isAuthenticated: !!authenticatedUser, $theme: theme };

  const {
    firstName,
    id: userId,
    lastName,
    username,
  } = {
    ...(instanceOfUserWithMessage(user.userById)
      ? user.userById.user
      : user.userById),
  };

  const userPhotoContainerStyle: CSSProperties = {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  };

  return (
    <ListItem {...themeProps}>
      <Container.DisplayedName mutualFriendsCount={mutualFriends.length}>
        <UserPhoto
          containerSize="100%"
          containerStyle={userPhotoContainerStyle}
          iconSize="50%"
          isSquare
          user={
            instanceOfUserWithMessage(user.userById)
              ? user.userById.user
              : user.userById
          }
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
        <Button.Confirm onClick={handleConfirmClick}>Confirm</Button.Confirm>
        <Button.Remove {...themeProps} onClick={handleRemoveClick}>
          Remove
        </Button.Remove>
      </Container.MutualFriends>
    </ListItem>
  );
}
