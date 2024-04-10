import { useLazyQuery, useMutation } from "@apollo/client";
import { Divider } from "@mui/material";

import { Fragment, useEffect, useMemo, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdPhotoCamera } from "react-icons/md";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

import { Header, Navbar, UserPhoto } from "components";
import { Colors } from "environment";
import {
  ADD_MESSAGE,
  AddMessageData,
  GET_USER_BY_USERNAME,
  GetUserByUsernameData,
  instanceOfUserError,
  REMOVE_USER_FRIENDSHIP_REQUEST,
  RemoveUserFriendRequestData,
  SEND_USER_FRIENDSHIP_REQUEST,
  SendUserFriendRequestData,
} from "helpers";
import { useHeaderItems } from "hooks";
import { NotFoundPage } from "pages";
import { useAuthenticationStore, useSettingsStore } from "store";

import { About } from "./About";
import { ButtonsContainer } from "./ButtonsContainer";
import { Footer } from "./Footer";
import { Friends } from "./Friends";
import { Posts } from "./Posts";
import {
  B,
  Container as StyledContainer,
  CoverPhoto,
  Text,
} from "./ProfilePage.style";
import { FriendshipStatus } from "./ProfilePage.types";

export function ProfilePage() {
  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();

  const [
    fetchUser,
    { data: userData = { userByUsername: null }, loading: isFetchingUser },
  ] = useLazyQuery<GetUserByUsernameData>(GET_USER_BY_USERNAME);

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

  // const x = new Date(new Date(2022, 8, 1).setUTCHours(0, 0, 0, 0))
  //   .getTime()
  //   .toString();
  // console.log(x);

  const [selectedNavbarItem, setSelectedNavbarItem] = useState(NAVBAR_ITEMS[0]);

  const headerItems = useHeaderItems();
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
    fetchUser({ variables: { username } });
  }, [username, fetchUser]);

  // First render
  if (!isFetchingUser && !user) {
    return <></>;
  } else if (isFetchingUser) {
    return (
      // <StyledContainer.Main>
      //   <Header selectedItem={null} items={headerItems} />
      // </StyledContainer.Main>
      <>Loading...</>
    );
  } else if (instanceOfUserError(user) || !user) {
    return <NotFoundPage />;
  }

  const status =
    username === authenticatedUser?.username
      ? FriendshipStatus.ME
      : authenticatedUser?.friends?.some(
          (friend) => friend.username === username
        )
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

  const { coverPhotos, firstName, friends, lastName, profilePhotos } = user;

  const currentCoverPhoto =
    coverPhotos?.find((photo) => photo.isCurrent) || null;
  const currentProfilePhoto =
    profilePhotos?.find((photo) => photo.isCurrent) || null;
  const hasCoverPhoto = !!currentCoverPhoto;
  const hasProfilePhoto = !!currentProfilePhoto;

  const dividerColor =
    !!authenticatedUser && theme === "DARK" ? "Arsenic" : "AmericanSilver";

  return (
    <StyledContainer.Main isAuthenticated={!!authenticatedUser} theme={theme}>
      <Header selectedItem={null} items={headerItems} />
      <StyledContainer.Top isAuthenticated={!!authenticatedUser} theme={theme}>
        <StyledContainer.CoverPhoto hasCoverPhoto={hasCoverPhoto}>
          {hasCoverPhoto && <CoverPhoto src={currentCoverPhoto.url} />}
          {user.id === authenticatedUser?.id && (
            <B.EditCoverPhoto>
              <MdPhotoCamera color={Colors.EerieBlack} size={16} />
              Edit cover photo
            </B.EditCoverPhoto>
          )}
        </StyledContainer.CoverPhoto>
        <StyledContainer.UserDetails>
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
              <Text.Name
                isAuthenticated={!!authenticatedUser}
                theme={theme}
              >{`${firstName} ${lastName}`}</Text.Name>
              {!!authenticatedUser && (
                <Text.FriendsCount
                  isAuthenticated={!!authenticatedUser}
                  theme={theme}
                >
                  {!friends?.length
                    ? "0 friends"
                    : friends.length > 1
                    ? `${friends.length} friends`
                    : "1 friend"}
                </Text.FriendsCount>
              )}
            </b>
            {!!authenticatedUser && (
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <StyledContainer.FriendsIcons>
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
                </StyledContainer.FriendsIcons>
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
                      onError: (error) => {
                        console.log({ error });
                      },
                    });
                  }}
                />
              </div>
            )}
          </div>
        </StyledContainer.UserDetails>
        <Divider color={dividerColor} style={{ margin: "0 15vw" }} />
        <StyledContainer.Navigation
          isAuthenticated={!!authenticatedUser}
          theme={theme}
        >
          <Navbar.Default
            items={NAVBAR_ITEMS}
            selectedItem={!!authenticatedUser ? selectedNavbarItem : null}
            onItemSelected={(item) => {
              if (!authenticatedUser) {
                console.log("LOGIN MODAL");
              } else if (selectedNavbarItem !== item) {
                setSelectedNavbarItem(item as string);
              }
            }}
          />
          <B.ShowMore isAuthenticated={!!authenticatedUser} theme={theme}>
            <HiDotsHorizontal size={16} />
          </B.ShowMore>
        </StyledContainer.Navigation>
      </StyledContainer.Top>
      <StyledContainer.Bottom>
        {selectedNavbarItem === "ABOUT" ? (
          <>
            <About user={user} />
            <Friends user={user} />
          </>
        ) : selectedNavbarItem === "FRIENDS" ? (
          <Friends user={user} />
        ) : selectedNavbarItem === "POSTS" ? (
          <Posts status={status} user={user} />
        ) : (
          <Photos />
        )}
      </StyledContainer.Bottom>
      {!authenticatedUser && <Footer user={user} />}
    </StyledContainer.Main>
  );
}

function Photos() {
  return <div>Photos</div>;
}
