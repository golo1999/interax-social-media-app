import { useLazyQuery, useMutation } from "@apollo/client";

import { Fragment, useEffect, useMemo, useState } from "react";
import {
  BsMessenger,
  BsPersonCheckFill,
  BsPersonPlusFill,
} from "react-icons/bs";
import { MdEdit, MdPhotoCamera } from "react-icons/md";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

import { Divider, Header, Navbar, UserPhoto } from "components";
import { Colors } from "environment";
import {
  AddMessageData,
  ADD_MESSAGE,
  GetAuthenticatedUserData,
  GetUserByUsernameData,
  GET_AUTHENTICATED_USER_WITH_FRIENDS,
  GET_USER_BY_USERNAME,
  RemoveUserFriendRequestData,
  REMOVE_USER_FRIENDSHIP_REQUEST,
  SendUserFriendRequestData,
  SEND_USER_FRIENDSHIP_REQUEST,
} from "helpers";
import { useHeaderItems } from "hooks";

import { About } from "./About";
import { Friends } from "./Friends";
import { Posts } from "./Posts";
import { Button, Container as StyledContainer } from "./ProfilePage.style";
import { FriendshipStatus } from "./ProfilePage.types";

export function ProfilePage() {
  const [
    fetchAuthenticatedUser,
    { data: authenticatedUserData = { authenticatedUser: null } },
  ] = useLazyQuery<GetAuthenticatedUserData>(
    GET_AUTHENTICATED_USER_WITH_FRIENDS
  );
  const [fetchUser, { data: userData = { userByUsername: null } }] =
    useLazyQuery<GetUserByUsernameData>(GET_USER_BY_USERNAME);

  const [addMessage] = useMutation<AddMessageData>(ADD_MESSAGE);
  const [removeUserFriendRequest] = useMutation<RemoveUserFriendRequestData>(
    REMOVE_USER_FRIENDSHIP_REQUEST
  );
  const [sendUserFriendRequest] = useMutation<SendUserFriendRequestData>(
    SEND_USER_FRIENDSHIP_REQUEST
  );

  const NAVBAR_ITEMS = useMemo(
    () => ["POSTS", "ABOUT", "FRIENDS", "PHOTOS"],
    []
  );

  const x = new Date(new Date(2022, 8, 1).setUTCHours(0, 0, 0, 0))
    .getTime()
    .toString();
  console.log(x);

  const [selectedNavbarItem, setSelectedNavbarItem] = useState(NAVBAR_ITEMS[0]);

  const headerItems = useHeaderItems();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const authenticatedUser = authenticatedUserData.authenticatedUser;
  const user = userData.userByUsername;
  const username = pathname.split("/")[1];

  useEffect(() => {
    // setting the first item as selected whenever the user navigates to another profile page
    if (selectedNavbarItem !== NAVBAR_ITEMS[0]) {
      setSelectedNavbarItem(NAVBAR_ITEMS[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [NAVBAR_ITEMS, pathname]);

  useEffect(() => {
    fetchAuthenticatedUser();
    fetchUser({ variables: { username } });
  }, [username, fetchAuthenticatedUser, fetchUser]);

  const status = !user
    ? FriendshipStatus.NOT_EXISTS
    : username === authenticatedUser?.username
    ? FriendshipStatus.ME
    : authenticatedUser?.friends?.some((friend) => friend.username === username)
    ? FriendshipStatus.FRIEND
    : user.friendshipRequests?.some(
        (request) =>
          request.receiver === authenticatedUser?.id &&
          request.sender === user.id
      )
    ? FriendshipStatus.FRIEND_REQUEST_RECEIVED
    : user.friendshipRequests?.some(
        (request) =>
          request.receiver === user.id &&
          request.sender === authenticatedUser?.id
      )
    ? FriendshipStatus.FRIEND_REQUEST_SENT
    : FriendshipStatus.NOT_FRIEND;

  if (status === FriendshipStatus.NOT_EXISTS) {
    return (
      <div>
        <p>User does not exist</p>
      </div>
    );
  }

  if (!user) {
    return <></>;
  }

  const { coverPhotos, firstName, friends, lastName, profilePhotos } = user;

  const currentCoverPhoto =
    coverPhotos?.find((photo) => photo.isCurrent) || null;
  const currentProfilePhoto =
    profilePhotos?.find((photo) => photo.isCurrent) || null;
  const hasCoverPhoto = !!currentCoverPhoto;
  const hasProfilePhoto = !!currentProfilePhoto;

  return (
    <div
      style={{
        backgroundColor: "inherit",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header
        // authenticatedUser={authenticatedUserData.authenticatedUser}
        selectedItem={null}
        items={headerItems}
      />
      <div
        style={{
          backgroundColor: Colors.RaisinBlack,
          display: "flex",
          flexDirection: "column",
          marginTop: "55px",
        }}
      >
        <StyledContainer.CoverPhoto hasCoverPhoto={hasCoverPhoto}>
          {hasCoverPhoto && (
            <img
              alt="COVER_PHOTO"
              height="100%"
              src={currentCoverPhoto.url}
              style={{ borderRadius: "5px", objectFit: "cover" }}
              width="100%"
            />
          )}
          {user.id === authenticatedUser?.id && (
            <button
              style={{
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: "5px",
                bottom: 0,
                color: Colors.EerieBlack,
                display: "flex",
                fontWeight: "bold",
                gap: "0.5em",
                margin: "0 2em 1em 0",
                padding: "0.75em 0.5em",
                position: "absolute",
                right: 0,
              }}
              type="button"
            >
              <MdPhotoCamera color={Colors.EerieBlack} size={16} />
              Edit cover photo
            </button>
          )}
        </StyledContainer.CoverPhoto>
        <div style={{ display: "flex", gap: "1em", margin: "0 15vw 1em 15vw" }}>
          <UserPhoto
            iconSize="3em"
            containerSize="9em"
            user={user}
            onPhotoClick={() => navigate(`/${username}`)}
          />
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              gap: "0.5em",
              justifyContent: "flex-end",
            }}
          >
            <b>
              <h1
                style={{ color: Colors.LightGray }}
              >{`${firstName} ${lastName}`}</h1>
              <p style={{ color: Colors.PhilippineGray }}>
                {!friends?.length
                  ? "0 friends"
                  : friends.length > 1
                  ? `${friends.length} friends`
                  : "1 friend"}
              </p>
            </b>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex" }}>
                {friends?.map((friend, index) => {
                  if (index > 7) {
                    return <Fragment key={index} />;
                  }

                  return (
                    <UserPhoto
                      key={index}
                      user={friend}
                      onPhotoClick={() => navigate(`/${friend.username}`)}
                    />
                  );
                })}
              </div>
              <ButtonsContainer
                friendshipStatus={status}
                onAcceptFriendButtonClick={() => {
                  // TODO
                }}
                onAddFriendButtonClick={() => {
                  sendUserFriendRequest({
                    variables: {
                      input: {
                        receiver: user.id,
                        sender: authenticatedUser?.id,
                      },
                    },
                    refetchQueries: [
                      {
                        query: GET_USER_BY_USERNAME,
                        variables: { username },
                      },
                    ],
                  });
                }}
                onFriendRequestSentButtonClick={() => {
                  removeUserFriendRequest({
                    variables: {
                      input: {
                        receiver: user.id,
                        sender: authenticatedUser?.id,
                      },
                    },
                    refetchQueries: [
                      {
                        query: GET_USER_BY_USERNAME,
                        variables: { username },
                      },
                    ],
                  });
                }}
                onMessageButtonClick={() => {
                  addMessage({
                    variables: {
                      input: {
                        emoji: null,
                        parentId: null,
                        receiverId: user.id,
                        senderId: authenticatedUser?.id,
                        text: "first message",
                      },
                    },
                    onCompleted: (data) => {
                      console.log(data.addMessage);
                    },
                  });
                }}
              />
            </div>
          </div>
        </div>
        <Divider margin="0 15vw" thickness="2px" />
        <div
          style={{
            alignItems: "center",
            backgroundColor: Colors.RaisinBlack,
            display: "flex",
            justifyContent: "space-between",
            margin: "0 15vw",
          }}
        >
          <Navbar.Default
            items={NAVBAR_ITEMS}
            selectedItem={selectedNavbarItem}
            onItemSelected={(item) => {
              if (selectedNavbarItem !== item) {
                setSelectedNavbarItem(item as string);
              }
            }}
          />
          <button
            style={{
              backgroundColor: Colors.BlackOlive,
              borderRadius: "5px",
              color: Colors.LightGray,
              fontWeight: "bold",
              padding: "0.5em 1em",
            }}
          >
            ...
          </button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          margin: "1em 15vw",
        }}
      >
        {selectedNavbarItem === "ABOUT" ? (
          <>
            <About authenticatedUser={authenticatedUser} user={user} />
            <Friends authenticatedUser={authenticatedUser} user={user} />
          </>
        ) : selectedNavbarItem === "FRIENDS" ? (
          <Friends authenticatedUser={authenticatedUser} user={user} />
        ) : selectedNavbarItem === "POSTS" ? (
          <Posts
            authenticatedUser={authenticatedUser}
            status={status}
            user={user}
          />
        ) : (
          <Photos />
        )}
      </div>
    </div>
  );
}

interface ButtonsContainerProps {
  friendshipStatus: FriendshipStatus;
  onAcceptFriendButtonClick: () => void;
  onAddFriendButtonClick: () => void;
  onFriendRequestSentButtonClick: () => void;
  onMessageButtonClick: () => void;
}

function ButtonsContainer({
  friendshipStatus,
  onAcceptFriendButtonClick,
  onAddFriendButtonClick,
  onFriendRequestSentButtonClick,
  onMessageButtonClick,
}: ButtonsContainerProps) {
  return (
    <div
      style={{
        alignItems: "flex-end",
        display: "flex",
        gap: "0.5em",
      }}
    >
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
    </div>
  );
}

function Photos() {
  return <div>Photos</div>;
}
