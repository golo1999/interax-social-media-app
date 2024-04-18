import { useMemo } from "react";
import {
  BsMessenger,
  BsPersonCheckFill,
  BsPersonPlusFill,
} from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import styled from "styled-components";

import { FriendshipStatus } from "enums";

import { Button } from "./ProfilePage.style";

const Container = styled.div`
  align-items: flex-end;
  display: flex;
  gap: 0.5em;
`;

interface Props {
  friendshipStatus: FriendshipStatus;
  onAcceptFriendButtonClick: () => void;
  onAddFriendButtonClick: () => void;
  onFriendRequestSentButtonClick: () => void;
  onMessageButtonClick: () => void;
}

export function ButtonsContainer({
  friendshipStatus,
  onAcceptFriendButtonClick,
  onAddFriendButtonClick,
  onFriendRequestSentButtonClick,
  onMessageButtonClick,
}: Props) {
  const buttons = useMemo(() => {
    switch (friendshipStatus) {
      case FriendshipStatus.FRIEND:
        return (
          <>
            <Button
              backgroundColor="BlackOlive"
              color="White"
              hoverBackgroundColor="DarkLiver"
            >
              <BsPersonCheckFill color="white" />
              Friends
            </Button>
            <Button
              backgroundColor="BlackOlive"
              color="White"
              hoverBackgroundColor="DarkLiver"
              onClick={onMessageButtonClick}
            >
              <BsMessenger color="white" />
              Message
            </Button>
          </>
        );
      case FriendshipStatus.FRIEND_REQUEST_RECEIVED:
        return (
          <>
            <Button
              backgroundColor="BrightNavyBlue"
              color="White"
              hoverBackgroundColor="BleuDeFrance"
              onClick={onAcceptFriendButtonClick}
            >
              <BsPersonPlusFill color="white" />
              Accept friend request
            </Button>
            <Button
              backgroundColor="BlackOlive"
              color="White"
              hoverBackgroundColor="DarkLiver"
            >
              <BsMessenger color="white" />
              Message
            </Button>
          </>
        );
      case FriendshipStatus.FRIEND_REQUEST_SENT:
        return (
          <>
            <Button
              backgroundColor="BrightNavyBlue"
              color="White"
              hoverBackgroundColor="BleuDeFrance"
              onClick={onFriendRequestSentButtonClick}
            >
              <BsPersonPlusFill color="white" />
              Friend request sent
            </Button>
            <Button
              backgroundColor="BlackOlive"
              color="White"
              hoverBackgroundColor="DarkLiver"
            >
              <BsMessenger color="white" />
              Message
            </Button>
          </>
        );
      case FriendshipStatus.ME:
        return (
          <Button
            backgroundColor="BlackOlive"
            color="White"
            hoverBackgroundColor="DarkLiver"
          >
            <MdEdit color="white" />
            Edit profile
          </Button>
        );
      case FriendshipStatus.NOT_FRIEND:
        return (
          <>
            <Button
              backgroundColor="BrightNavyBlue"
              color="White"
              hoverBackgroundColor="BleuDeFrance"
              onClick={onAddFriendButtonClick}
            >
              <BsPersonPlusFill color="white" />
              Add friend
            </Button>
            <Button
              backgroundColor="BlackOlive"
              color="White"
              hoverBackgroundColor="DarkLiver"
              onClick={onMessageButtonClick}
            >
              <BsMessenger color="white" />
              Message
            </Button>
          </>
        );
    }
  }, [
    friendshipStatus,
    onAcceptFriendButtonClick,
    onAddFriendButtonClick,
    onFriendRequestSentButtonClick,
    onMessageButtonClick,
  ]);

  return <Container>{buttons}</Container>;
}
