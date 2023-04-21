import { useMutation } from "@apollo/client";

import { Fragment, useMemo } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { useNavigate } from "react-router";

import {
  ADD_USER_FRIEND,
  AddUserFriendData,
  GET_AUTHENTICATED_USER,
  REMOVE_USER_FRIENDSHIP_REQUEST,
  RemoveUserFriendRequestData,
} from "helpers";
import { FriendshipRequest, User } from "models";

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
  authenticatedUser: User | null;
  displayedRequests: number;
  friendshipRequests: FriendshipRequest[] | null;
  onSeeAllClick: () => void;
  onSeeMoreClick: () => void;
}

export function FriendRequests({
  authenticatedUser,
  displayedRequests,
  friendshipRequests,
  onSeeAllClick,
  onSeeMoreClick,
}: Props) {
  const [addUserFriend] = useMutation<AddUserFriendData>(ADD_USER_FRIEND);
  const [removeUserFriendRequest] = useMutation<RemoveUserFriendRequestData>(
    REMOVE_USER_FRIENDSHIP_REQUEST
  );

  const navigate = useNavigate();

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
            refetchQueries: [{ query: GET_AUTHENTICATED_USER }],
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
        refetchQueries: [{ query: GET_AUTHENTICATED_USER }],
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
  const receivedFriendshipRequestsCount = receivedFriendshipRequests.length;

  return (
    <Container.Main>
      <SectionHeader>
        <SectionTitle>Friend requests</SectionTitle>
        {receivedFriendshipRequestsCount > 0 &&
          displayedRequests < receivedFriendshipRequestsCount && (
            <SeeButton onClick={onSeeAllClick}>See all</SeeButton>
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
                  authenticatedUser={authenticatedUser}
                  request={request}
                  onConfirmClick={handleConfirmClick}
                  onItemClick={handleItemClick}
                  onRemoveClick={handleRemoveClick}
                />
              );
            })}
          </List>
          {displayedRequests < receivedFriendshipRequestsCount && (
            <Button.SeeMore onClick={onSeeMoreClick}>
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
