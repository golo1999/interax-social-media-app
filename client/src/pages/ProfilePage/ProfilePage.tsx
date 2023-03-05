import { useLazyQuery } from "@apollo/client";

import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import { Divider, Navbar, UserPhoto } from "components";
import {
  GET_AUTHENTICATED_USER_WITH_FRIENDS,
  GET_USER_BY_USERNAME,
} from "helpers";
import { User } from "models";

import { About } from "./About";
import { Posts } from "./Posts";
import { NAVBAR_ITEMS } from "./ProfilePage.consts";
import { FriendshipStatus } from "./ProfilePage.types";

interface GetAuthenticatedUserData {
  authenticatedUser: User;
}

interface GetUserByUsernameData {
  userByUsername: User;
}

export function ProfilePage() {
  const [
    fetchAuthenticatedUser,
    { data: authenticatedUserData = { authenticatedUser: null } },
  ] = useLazyQuery<GetAuthenticatedUserData>(
    GET_AUTHENTICATED_USER_WITH_FRIENDS
  );
  const [fetchUser, { data: userData = { userByUsername: null } }] =
    useLazyQuery<GetUserByUsernameData>(GET_USER_BY_USERNAME);

  const [selectedNavbarItem, setSelectedNavbarItem] = useState(NAVBAR_ITEMS[0]);

  const location = useLocation();

  const { pathname } = location;

  const authenticatedUser = authenticatedUserData.authenticatedUser;
  const user = userData.userByUsername;
  const username = pathname.split("/")[1];

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

  const { firstName, friends, lastName } = user;

  return (
    <div style={{ backgroundColor: "inherit" }}>
      <div
        style={{
          backgroundColor: "#242526",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p>Cover photo</p>
        <div style={{ display: "flex" }}>
          <UserPhoto
            user={user}
            onPhotoClick={() => {
              // TODO
            }}
          />
          <div>
            <b>
              <p style={{ color: "#cfd1d5" }}>{`${firstName} ${lastName}`}</p>
              <p style={{ color: "#8d8f93" }}>
                {`${friends?.length ? friends.length : 0} friends`}
              </p>
            </b>
            <div>Friends</div>
          </div>
          <div
            style={{ alignItems: "flex-end", display: "flex", gap: "0.5em" }}
          >
            {status === FriendshipStatus.ME ? (
              <button style={{ backgroundColor: "#3a3b3c", color: "#cfd1d5" }}>
                Edit profile
              </button>
            ) : status === FriendshipStatus.FRIEND ? (
              <>
                <button
                  style={{ backgroundColor: "#3a3b3c", color: "#cfd1d5" }}
                >
                  Friends
                </button>
                <button
                  style={{ backgroundColor: "#3a3b3c", color: "#cfd1d5" }}
                >
                  Message
                </button>
              </>
            ) : (
              <>
                <button
                  style={{ backgroundColor: "#3a3b3c", color: "#cfd1d5" }}
                >
                  Add friend
                </button>
                <button
                  style={{ backgroundColor: "#3a3b3c", color: "#cfd1d5" }}
                >
                  Message
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <Divider />
      <div
        style={{
          alignItems: "center",
          backgroundColor: "#242526",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Navbar
          selectedItem={selectedNavbarItem}
          onItemSelected={(item) => {
            if (selectedNavbarItem !== item) {
              setSelectedNavbarItem(item);
            }
          }}
        />
        <button
          style={{
            backgroundColor: "#3a3b3c",
            borderRadius: "5px",
            color: "#cfd1d5",
            fontWeight: "bold",
            padding: "0.5em 1em",
          }}
        >
          ...
        </button>
      </div>
      {selectedNavbarItem === "ABOUT" ? (
        <About authenticatedUser={authenticatedUser} user={user} />
      ) : selectedNavbarItem === "FRIENDS" ? (
        <Friends />
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
  );
}

function Friends() {
  return <div>Friends</div>;
}

function Photos() {
  return <div>Photos</div>;
}
