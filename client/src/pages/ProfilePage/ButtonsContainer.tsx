import {
  BsMessenger,
  BsPersonCheckFill,
  BsPersonPlusFill,
} from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import styled from "styled-components";

import { Button } from "./ProfilePage.style";
import { FriendshipStatus } from "./ProfilePage.types";

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
  return (
    <Container>
      {friendshipStatus === FriendshipStatus.ME ? (
        <Button
          backgroundColor="BlackOlive"
          color="White"
          hoverBackgroundColor="DarkLiver"
        >
          <MdEdit color="white" />
          Edit profile
        </Button>
      ) : friendshipStatus === FriendshipStatus.FRIEND ? (
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
      ) : friendshipStatus === FriendshipStatus.FRIEND_REQUEST_RECEIVED ? (
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
      ) : friendshipStatus === FriendshipStatus.FRIEND_REQUEST_SENT ? (
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
      ) : (
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
          >
            <BsMessenger color="white" />
            Message
          </Button>
        </>
      )}
    </Container>
  );
}
