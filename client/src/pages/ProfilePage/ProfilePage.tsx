import { useMutation, useSuspenseQuery } from "@apollo/client";
import { Divider } from "@mui/material";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  Fragment,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdPhotoCamera } from "react-icons/md";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

import { Header, Navbar, PhotoModal, UserPhoto } from "components";
import { FriendshipStatus, Permission } from "enums";
import { Colors } from "environment";
import {
  ADD_USER_COVER_PHOTO,
  ADD_USER_FRIEND,
  ADD_USER_PROFILE_PHOTO,
  AddUserCoverPhotoData,
  AddUserFriendData,
  AddUserProfilePhotoData,
  CHANGE_USER_COVER_PHOTO,
  CHANGE_USER_PROFILE_PHOTO,
  ChangeUserCoverPhotoData,
  ChangeUserProfilePhotoData,
  firebaseStorage,
  FOLLOW_USER,
  FollowUserData,
  GET_USER_BY_USERNAME,
  instanceOfUserError,
  REMOVE_USER_FRIENDSHIP_REQUEST,
  RemoveUserFriendRequestData,
  SEND_USER_FRIENDSHIP_REQUEST,
  SendUserFriendRequestData,
} from "helpers";
import { useHeaderItems, useScrollLock } from "hooks";
import { User } from "models";
import { LoadingPage, NotFoundPage } from "pages";
import {
  useAuthenticationStore,
  useMessagesStore,
  useSettingsStore,
} from "store";

import { About } from "./About";
import { ButtonsContainer } from "./ButtonsContainer";
import { Footer } from "./Footer";
import { Friends } from "./Friends";
import { Photos } from "./Photos";
import { Posts } from "./Posts";
import {
  B,
  Container as StyledContainer,
  CoverPhoto,
  Text,
} from "./ProfilePage.style";

type PhotoModalType = "COVER" | "PROFILE";

export function ProfilePage() {
  const { pathname } = useLocation();
  const username = pathname.split("/")[1];

  return (
    <Suspense fallback={<LoadingPage />}>
      <LoadingProfilePage username={username} />
    </Suspense>
  );
}

interface LoadingProps {
  username: string;
}

function LoadingProfilePage({ username }: LoadingProps) {
  const { authenticatedUser } = useAuthenticationStore();
  const { data } = useSuspenseQuery(GET_USER_BY_USERNAME, {
    variables: {
      input: { authenticatedUserId: authenticatedUser?.id, username },
    },
  });
  const { userByUsername } = data;

  if (instanceOfUserError(userByUsername) || !userByUsername) {
    return <NotFoundPage />;
  }

  return <SuccessProfilePage user={userByUsername} />;
}

interface SuccessProps {
  user: User;
}

function SuccessProfilePage({ user }: SuccessProps) {
  const { authenticatedUser } = useAuthenticationStore();
  const headerItems = useHeaderItems();
  const { pathname } = useLocation();
  const { addMessageBox } = useMessagesStore();
  const [addUserCoverPhoto] =
    useMutation<AddUserCoverPhotoData>(ADD_USER_COVER_PHOTO);
  const [addUserFriend] = useMutation<AddUserFriendData>(ADD_USER_FRIEND);
  const [addUserProfilePhoto] = useMutation<AddUserProfilePhotoData>(
    ADD_USER_PROFILE_PHOTO
  );
  const [changeUserCoverPhoto] = useMutation<ChangeUserCoverPhotoData>(
    CHANGE_USER_COVER_PHOTO
  );
  const [changeUserProfilePhoto] = useMutation<ChangeUserProfilePhotoData>(
    CHANGE_USER_PROFILE_PHOTO
  );
  const [followUser] = useMutation<FollowUserData>(FOLLOW_USER);
  const [removeUserFriendRequest] = useMutation<RemoveUserFriendRequestData>(
    REMOVE_USER_FRIENDSHIP_REQUEST
  );
  const [sendUserFriendRequest] = useMutation<SendUserFriendRequestData>(
    SEND_USER_FRIENDSHIP_REQUEST
  );
  const navigate = useNavigate();
  const { lockScroll, unlockScroll } = useScrollLock();
  const { theme } = useSettingsStore();

  const NAVBAR_ITEMS = useMemo(
    () => ["POSTS", "ABOUT", "FRIENDS", "PHOTOS"],
    []
  );

  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [photoModalType, setPhotoModalType] = useState<PhotoModalType>();
  const [selectedNavbarItem, setSelectedNavbarItem] = useState(NAVBAR_ITEMS[0]);

  useEffect(() => {
    // setting the first item as selected whenever the user navigates to another profile page
    if (selectedNavbarItem !== NAVBAR_ITEMS[0]) {
      setSelectedNavbarItem(NAVBAR_ITEMS[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [NAVBAR_ITEMS, pathname]);

  useEffect(() => console.log({ user }), [user]);

  const closePhotoModal = useCallback(() => {
    unlockScroll();
    setIsPhotoModalOpen(false);
  }, [unlockScroll]);

  const openPhotoModal = useCallback(() => {
    lockScroll();
    setIsPhotoModalOpen(true);
  }, [lockScroll]);

  const {
    coverPhoto,
    educationHistory,
    firstName,
    friends,
    friendshipRequests,
    id: userId,
    lastName,
    photos,
    placesHistory,
    profilePhoto,
    username,
    workHistory,
  } = user;

  const friendshipStatus = useMemo(
    () =>
      username === authenticatedUser?.username
        ? FriendshipStatus.ME
        : authenticatedUser?.friends?.some(
            (friend) => friend.username === username
          )
        ? FriendshipStatus.FRIEND
        : friendshipRequests.some(
            (request) =>
              request.receiver === authenticatedUser?.id &&
              request.sender === userId
          )
        ? FriendshipStatus.FRIEND_REQUEST_RECEIVED
        : friendshipRequests.some(
            (request) =>
              request.receiver === userId &&
              request.sender === authenticatedUser?.id
          )
        ? FriendshipStatus.FRIEND_REQUEST_SENT
        : FriendshipStatus.NOT_FRIEND,
    [
      authenticatedUser?.friends,
      authenticatedUser?.id,
      authenticatedUser?.username,
      friendshipRequests,
      userId,
      username,
    ]
  );

  const filteredEducationHistory = useMemo(() => {
    switch (friendshipStatus) {
      case FriendshipStatus.FRIEND:
        return educationHistory.filter(
          ({ visibility }) =>
            visibility === Permission.FRIENDS ||
            visibility === Permission.PUBLIC
        );
      case FriendshipStatus.ME:
        return educationHistory;
      case FriendshipStatus.FRIEND_REQUEST_RECEIVED:
      case FriendshipStatus.FRIEND_REQUEST_SENT:
      case FriendshipStatus.NOT_FRIEND:
        return educationHistory.filter(
          ({ visibility }) => visibility === Permission.PUBLIC
        );
    }
  }, [educationHistory, friendshipStatus]);

  const filteredPlacesHistory = useMemo(() => {
    switch (friendshipStatus) {
      case FriendshipStatus.FRIEND:
        return placesHistory.filter(
          ({ visibility }) =>
            visibility === Permission.FRIENDS ||
            visibility === Permission.PUBLIC
        );
      case FriendshipStatus.ME:
        return placesHistory;
      case FriendshipStatus.FRIEND_REQUEST_RECEIVED:
      case FriendshipStatus.FRIEND_REQUEST_SENT:
      case FriendshipStatus.NOT_FRIEND:
        return placesHistory.filter(
          ({ visibility }) => visibility === Permission.PUBLIC
        );
    }
  }, [friendshipStatus, placesHistory]);

  const filteredWorkHistory = useMemo(() => {
    switch (friendshipStatus) {
      case FriendshipStatus.FRIEND:
        return workHistory.filter(
          ({ visibility }) =>
            visibility === Permission.FRIENDS ||
            visibility === Permission.PUBLIC
        );
      case FriendshipStatus.ME:
        return workHistory;
      case FriendshipStatus.FRIEND_REQUEST_RECEIVED:
      case FriendshipStatus.FRIEND_REQUEST_SENT:
      case FriendshipStatus.NOT_FRIEND:
        return workHistory.filter(
          ({ visibility }) => visibility === Permission.PUBLIC
        );
    }
  }, [friendshipStatus, workHistory]);

  function handleSavePhotoClick(file: File | null) {
    if (!file) return;

    const photoType = file.type.split("/")[1];
    const photosDirectoryName =
      photoModalType === "COVER" ? "coverPhotos" : "profilePhotos";
    const photoId = `${
      authenticatedUser?.id
    }/${photosDirectoryName}/${new Date().getTime()}.${photoType}`;
    const storageRef = ref(firebaseStorage, photoId);
    const uploadTask = uploadBytesResumable(storageRef, file as Blob);

    uploadTask.on(
      "state_changed",
      ({ bytesTransferred, totalBytes }) => {
        console.log({
          progress: Math.round((bytesTransferred / totalBytes) * 100),
        });
      },
      (error) => {
        console.log({ error });
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);

        switch (photoModalType) {
          case "COVER":
            addUserCoverPhoto({
              variables: {
                input: {
                  ownerId: authenticatedUser?.id,
                  url,
                  visibility: Permission.PUBLIC,
                },
              },
              onCompleted: () => {
                changeUserCoverPhoto({
                  variables: {
                    input: { url, userId: authenticatedUser?.id },
                  },
                });
              },
            });
            break;
          case "PROFILE":
            addUserProfilePhoto({
              variables: {
                input: {
                  ownerId: authenticatedUser?.id,
                  url,
                  visibility: Permission.PUBLIC,
                },
              },
              onCompleted: () => {
                changeUserProfilePhoto({
                  variables: {
                    input: { url, userId: authenticatedUser?.id },
                  },
                });
              },
            });
            break;
        }
      }
    );
  }

  const friendsCountText = useMemo(
    () =>
      friends.length === 0
        ? "0 friends"
        : friends.length > 1
        ? `${friends.length} friends`
        : "1 friend",
    [friends]
  );

  const hasCoverPhoto = !!coverPhoto;
  const hasProfilePhoto = !!profilePhoto;

  const dividerColor =
    !!authenticatedUser && theme === "DARK" ? "Arsenic" : "LightGray";

  return (
    <StyledContainer.Main isAuthenticated={!!authenticatedUser} theme={theme}>
      <Header selectedItem={null} items={headerItems} />
      <StyledContainer.Top isAuthenticated={!!authenticatedUser} theme={theme}>
        <StyledContainer.CoverPhoto hasCoverPhoto={hasCoverPhoto}>
          {hasCoverPhoto && <CoverPhoto src={coverPhoto.url} />}
          {userId === authenticatedUser?.id && (
            <B.EditCoverPhoto
              onClick={() => {
                setPhotoModalType("COVER");
                openPhotoModal();
              }}
            >
              <MdPhotoCamera color={Colors.EerieBlack} size={16} />
              Edit cover photo
            </B.EditCoverPhoto>
          )}
        </StyledContainer.CoverPhoto>
        <StyledContainer.UserDetails>
          <UserPhoto
            containerSize="9em"
            iconSize="3em"
            isProfilePhoto
            user={user}
            onChangePhotoClick={() => {
              if (userId === authenticatedUser?.id) {
                setPhotoModalType("PROFILE");
                openPhotoModal();
              }
            }}
            onPhotoClick={() => {
              if (hasProfilePhoto) {
                // TODO: Navigate to "PhotoPage"
              }
            }}
          />
          <StyledContainer.NameFriendsCount>
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
                  {friendsCountText}
                </Text.FriendsCount>
              )}
            </b>
            {!!authenticatedUser && (
              <StyledContainer.FriendsIconsButtons>
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
                  friendshipStatus={friendshipStatus}
                  onAcceptFriendButtonClick={() => {
                    addUserFriend({
                      variables: {
                        input: { first: authenticatedUser.id, second: userId },
                      },
                      onCompleted: () => {
                        removeUserFriendRequest({
                          variables: {
                            input: {
                              receiver: userId,
                              sender: authenticatedUser?.id,
                            },
                          },
                          onCompleted: () => {
                            followUser({
                              variables: {
                                input: {
                                  followingUserId: authenticatedUser.id,
                                  userId,
                                },
                              },
                              onCompleted: () => {
                                followUser({
                                  variables: {
                                    input: {
                                      followingUserId: userId,
                                      userId: authenticatedUser.id,
                                    },
                                  },
                                  refetchQueries: [
                                    {
                                      query: GET_USER_BY_USERNAME,
                                      variables: {
                                        input: {
                                          authenticatedUserId:
                                            authenticatedUser.id,
                                          username,
                                        },
                                      },
                                    },
                                  ],
                                });
                              },
                            });
                          },
                        });
                      },
                    });
                  }}
                  onAddFriendButtonClick={() => {
                    sendUserFriendRequest({
                      variables: {
                        input: {
                          receiver: userId,
                          sender: authenticatedUser?.id,
                        },
                      },
                      refetchQueries: [
                        {
                          query: GET_USER_BY_USERNAME,
                          variables: {
                            input: {
                              authenticatedUserId: authenticatedUser.id,
                              username,
                            },
                          },
                        },
                      ],
                    });
                  }}
                  onFriendRequestSentButtonClick={() => {
                    removeUserFriendRequest({
                      variables: {
                        input: {
                          receiver: userId,
                          sender: authenticatedUser?.id,
                        },
                      },
                      refetchQueries: [
                        {
                          query: GET_USER_BY_USERNAME,
                          variables: {
                            input: {
                              authenticatedUserId: authenticatedUser.id,
                              username,
                            },
                          },
                        },
                      ],
                    });
                  }}
                  onMessageButtonClick={() =>
                    addMessageBox(authenticatedUser!.id, userId)
                  }
                />
              </StyledContainer.FriendsIconsButtons>
            )}
          </StyledContainer.NameFriendsCount>
        </StyledContainer.UserDetails>
        <Divider sx={{ borderColor: Colors[dividerColor], margin: "0 15vw" }} />
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
              } else {
                if (selectedNavbarItem !== item) {
                  setSelectedNavbarItem(item as string);
                } else if (window.scrollY > 0) {
                  window.scrollTo({ behavior: "smooth", top: 0 });
                }
              }
            }}
          />
          <B.ShowMore isAuthenticated={!!authenticatedUser} theme={theme}>
            <HiDotsHorizontal size={16} />
          </B.ShowMore>
        </StyledContainer.Navigation>
      </StyledContainer.Top>
      <StyledContainer.Bottom>
        {(() => {
          switch (selectedNavbarItem) {
            case "ABOUT":
              return (
                <>
                  <About
                    filteredEducationHistory={filteredEducationHistory}
                    filteredPlacesHistory={filteredPlacesHistory}
                    filteredWorkHistory={filteredWorkHistory}
                    friendshipStatus={friendshipStatus}
                    user={user}
                  />
                  <Friends user={user} />
                </>
              );
            case "FRIENDS":
              return <Friends user={user} />;
            case "POSTS":
              return (
                <Posts
                  filteredEducationHistory={filteredEducationHistory}
                  filteredPlacesHistory={filteredPlacesHistory}
                  filteredWorkHistory={filteredWorkHistory}
                  friendshipStatus={friendshipStatus}
                  user={user}
                  onEditDetailsClick={() => setSelectedNavbarItem("ABOUT")}
                  onSeeAllPhotosClick={() => setSelectedNavbarItem("PHOTOS")}
                />
              );
            case "PHOTOS":
              return <Photos photos={photos} />;
          }
        })()}
      </StyledContainer.Bottom>
      {!authenticatedUser && <Footer user={user} />}
      {isPhotoModalOpen &&
        createPortal(
          <PhotoModal
            onCloseClick={closePhotoModal}
            onSaveClick={handleSavePhotoClick}
          />,
          document.body
        )}
    </StyledContainer.Main>
  );
}
