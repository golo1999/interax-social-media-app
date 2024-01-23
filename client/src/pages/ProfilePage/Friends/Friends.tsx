import { useMutation } from "@apollo/client";

import { useMemo, useState } from "react";
import { MdMoreHoriz } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { Container, Navbar, UserPhoto } from "components";
import { Colors } from "environment";
import {
  AddUserFriendData,
  ADD_USER_FRIEND,
  GET_USER_BY_USERNAME,
  RemoveUserFriendRequestData,
  REMOVE_USER_FRIENDSHIP_REQUEST,
  SendUserFriendRequestData,
  SEND_USER_FRIENDSHIP_REQUEST,
} from "helpers";
import { useMutualFriends } from "hooks";
import { User } from "models";
import { useAuthenticationStore } from "store";

import { Button } from "../ProfilePage.style";

interface Props {
  user: User;
}

export function Friends({ user }: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const [addUserFriend] = useMutation<AddUserFriendData>(ADD_USER_FRIEND);
  const [removeUserFriendRequest] = useMutation<RemoveUserFriendRequestData>(
    REMOVE_USER_FRIENDSHIP_REQUEST
  );
  const [sendUserFriendRequest] = useMutation<SendUserFriendRequestData>(
    SEND_USER_FRIENDSHIP_REQUEST
  );

  const { id: userId, friends } = user;
  const isAuthenticatedUser = authenticatedUser?.id === userId;
  const isAuthenticatedUserFriend = authenticatedUser?.friends?.find(
    (friend) => friend.id === userId
  );

  const mutualFriends: User[] = useMemo(() => {
    const list: User[] = [];

    if (!isAuthenticatedUser && !isAuthenticatedUserFriend) {
      friends?.forEach((f) => {
        authenticatedUser?.friends?.forEach((f1) => {
          if (f.id === f1.id) {
            list.push(f1);
          }
        });
      });
    }

    return list;
  }, [
    authenticatedUser?.friends,
    friends,
    isAuthenticatedUser,
    isAuthenticatedUserFriend,
  ]);

  const NAVBAR_ITEMS = useMemo(() => {
    if (isAuthenticatedUser) {
      return [
        "ALL_FRIENDS",
        "BIRTHDAYS",
        "WORK",
        "COLLEGE",
        "CURRENT_CITY",
        "HOMETOWN",
        "FOLLOWERS",
        "FOLLOWING",
      ];
    } else if (isAuthenticatedUserFriend || mutualFriends.length > 0) {
      return [
        "ALL_FRIENDS",
        "MUTUAL_FRIENDS",
        "CURRENT_CITY",
        "HOMETOWN",
        "FOLLOWING",
      ];
    }

    return ["ALL_FRIENDS", "CURRENT_CITY", "FOLLOWING"];
  }, [isAuthenticatedUser, isAuthenticatedUserFriend, mutualFriends]);

  const [selectedNavbarItem, setSelectedNavbarItem] = useState(NAVBAR_ITEMS[0]);

  return (
    <Container gap="1em" padding="1em" vertical>
      <div>
        <h3 style={{ color: Colors.LightGray }}>Friends</h3>
      </div>
      {friends ? (
        <>
          <Navbar.Default
            items={NAVBAR_ITEMS}
            selectedItem={selectedNavbarItem}
            onItemSelected={(item) => {
              if (selectedNavbarItem !== item) {
                setSelectedNavbarItem(item as string);
              }
            }}
          />
          <div
            style={{
              display: "grid",
              gap: "2em",
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            {friends.map((friend, index) => {
              return (
                <Friend
                  key={index}
                  authenticatedUser={authenticatedUser}
                  user={friend}
                  // onAddFriendClick={() => {
                  //   addUserFriend({
                  //     variables: {
                  //       input: {
                  //         first: authenticatedUser?.id,
                  //         second: friend.id,
                  //       },
                  //     },
                  //     refetchQueries: [
                  //       {
                  //         query: GET_USER_BY_USERNAME,
                  //         variables: { username: authenticatedUser?.username },
                  //       },
                  //     ],
                  //   });
                  // }}
                  onAddFriendClick={() => {
                    sendUserFriendRequest({
                      variables: {
                        input: {
                          receiver: friend.id,
                          sender: authenticatedUser?.id,
                        },
                      },
                      refetchQueries: [
                        {
                          query: GET_USER_BY_USERNAME,
                          variables: { username: authenticatedUser?.username },
                        },
                      ],
                    });
                  }}
                  onRemoveFriendRequestClick={() => {
                    removeUserFriendRequest({
                      variables: {
                        input: {
                          receiver: friend.id,
                          sender: authenticatedUser?.id,
                        },
                      },
                      refetchQueries: [
                        {
                          query: GET_USER_BY_USERNAME,
                          variables: { username: authenticatedUser?.username },
                        },
                      ],
                    });
                  }}
                />
              );
            })}
          </div>
        </>
      ) : (
        <div>No friends to show...</div>
      )}
    </Container>
  );
}

interface FriendProps {
  authenticatedUser: User | null;
  user: User;
  onAddFriendClick: () => void;
  onRemoveFriendRequestClick: () => void;
}

function Friend({
  authenticatedUser,
  user,
  onAddFriendClick,
  onRemoveFriendRequestClick,
}: FriendProps) {
  const { firstName, id: userId, lastName, username } = user;
  const isAuthenticatedUser = authenticatedUser?.id === userId;
  const isAuthenticatedUserFriend = authenticatedUser?.friends?.find(
    (friend) => friend.id === userId
  );
  const authenticatedUserAlreadyRequestedFriendship =
    authenticatedUser?.friendshipRequests?.some(
      (request) =>
        request.receiver === userId && request.sender === authenticatedUser?.id
    ) || false;
  const userAlreadyRequestedFriendship =
    authenticatedUser?.friendshipRequests?.some(
      (request) =>
        request.receiver === authenticatedUser?.id && request.sender === userId
    ) || false;

  const { mutualFriends, mutualFriendsText } = useMutualFriends(user);

  const navigate = useNavigate();

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        gap: "1em",
      }}
    >
      <UserPhoto
        containerSize="5em"
        iconSize="2em"
        isSquare
        user={user}
        onPhotoClick={() => navigate(`/${username}`)}
      />
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h4
          style={{ color: Colors.LightGray }}
          onClick={() => navigate(`/${username}`)}
        >
          {firstName} {lastName}
        </h4>
        {mutualFriends.length > 0 && (
          <p style={{ fontSize: "small" }}>{mutualFriendsText}</p>
        )}
      </div>
      {!isAuthenticatedUser && (
        <>
          {isAuthenticatedUserFriend ? (
            <MdMoreHoriz size={24} />
          ) : authenticatedUserAlreadyRequestedFriendship ? (
            <Button
              backgroundColor="BrightNavyBlue"
              color="White"
              hoverBackgroundColor="BleuDeFrance"
              onClick={onRemoveFriendRequestClick}
            >
              Friend request sent
            </Button>
          ) : userAlreadyRequestedFriendship ? (
            <Button
              backgroundColor="BrightNavyBlue"
              color="White"
              hoverBackgroundColor="BleuDeFrance"
            >
              Accept friend request
            </Button>
          ) : (
            <Button
              backgroundColor="BrightNavyBlue"
              color="White"
              hoverBackgroundColor="BleuDeFrance"
              onClick={onAddFriendClick}
            >
              Add friend
            </Button>
          )}
        </>
      )}
    </div>
  );
}
