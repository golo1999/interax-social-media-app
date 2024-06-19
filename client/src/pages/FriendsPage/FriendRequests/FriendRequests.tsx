import { useMutation } from "@apollo/client";

import { Fragment, useMemo } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import {
  ADD_USER_FRIEND,
  AddUserFriendData,
  REMOVE_USER_FRIENDSHIP_REQUEST,
  RemoveUserFriendRequestData,
} from "helpers";
import { FriendshipRequest } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

import {
  List,
  SectionHeader,
  SectionNoData,
  SectionTitle,
  SeeButton,
} from "../FriendsPage.style";

import { Button, Container } from "./FriendRequests.style";
import { Item } from "./Item";

interface Props {
  displayedRequests: number;
  friendshipRequests: FriendshipRequest[] | null;
  onSeeAllClick: () => void;
  onSeeMoreClick: () => void;
}

export function FriendRequests({
  displayedRequests,
  friendshipRequests,
  onSeeAllClick,
  onSeeMoreClick,
}: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const [addUserFriend] = useMutation<AddUserFriendData>(ADD_USER_FRIEND);
  const [removeUserFriendRequest] = useMutation<RemoveUserFriendRequestData>(
    REMOVE_USER_FRIENDSHIP_REQUEST
  );
  const navigate = useNavigate();
  const { theme } = useSettingsStore();

  const { id: authenticatedUserId } = {
    ...authenticatedUser,
  };

  function handleConfirmClick(userId: string | null) {
    if (userId) {
      removeUserFriendRequest({
        variables: {
          input: {
            receiver: userId,
            sender: authenticatedUserId,
          },
        },
        onCompleted: () => {
          addUserFriend({
            variables: {
              input: { first: authenticatedUserId, second: userId },
            },
          });
        },
      });
    }
  }

  function handleItemClick(username: string) {
    navigate(`/${username}`);
  }

  function handleRemoveClick(userId: string | null) {
    if (userId) {
      removeUserFriendRequest({
        variables: {
          input: {
            receiver: userId,
            sender: authenticatedUserId,
          },
        },
      });
    }
  }

  const receivedFriendshipRequests = useMemo(
    () =>
      friendshipRequests?.filter(
        (request) => request.receiver === authenticatedUserId
      ) || [],
    [authenticatedUserId, friendshipRequests]
  );

  const themeProps = { $isAuthenticated: !!authenticatedUser, $theme: theme };

  const receivedFriendshipRequestsCount = receivedFriendshipRequests.length;

  return (
    <Container.Main>
      <SectionHeader>
        <SectionTitle {...themeProps}>Friend Requests</SectionTitle>
        {receivedFriendshipRequestsCount > 0 &&
          displayedRequests < receivedFriendshipRequestsCount && (
            <SeeButton {...themeProps} onClick={onSeeAllClick}>
              See all
            </SeeButton>
          )}
      </SectionHeader>
      {receivedFriendshipRequestsCount > 0 ? (
        <>
          <List>
            {receivedFriendshipRequests.map((request, index) => {
              // displaying the next requests only after the "See more" button was pressed
              if (
                index >= displayedRequests &&
                displayedRequests < receivedFriendshipRequestsCount
              ) {
                return <Fragment key={index} />;
              }

              return (
                <Item
                  key={index}
                  request={request}
                  onConfirmClick={handleConfirmClick}
                  onItemClick={handleItemClick}
                  onRemoveClick={handleRemoveClick}
                />
              );
            })}
          </List>
          {displayedRequests < receivedFriendshipRequestsCount && (
            <Button.SeeMore {...themeProps} onClick={onSeeMoreClick}>
              See more
              <MdArrowDropDown size={24} />
            </Button.SeeMore>
          )}
        </>
      ) : (
        <SectionNoData>
          There are no received friendship requests to show.
        </SectionNoData>
      )}
    </Container.Main>
  );
}
