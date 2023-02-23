import { useLazyQuery } from "@apollo/client";

import { useEffect } from "react";
import { useLocation } from "react-router";

import { UserPost } from "../../components";

import { Container, WriteComment } from "../../components";
import {
  GET_AUTHENTICATED_USER_WITH_FRIENDS,
  GET_USER_BY_USERNAME,
} from "../../helpers";
import { User } from "../../models";

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

  const location = useLocation();

  const { pathname } = location;

  const username = pathname.split("/")[1];

  useEffect(() => {
    fetchAuthenticatedUser();
    fetchUser({ variables: { username } });
  }, [username, fetchAuthenticatedUser, fetchUser]);

  const status = !userData.userByUsername
    ? "NOT_EXISTS"
    : username === authenticatedUserData.authenticatedUser?.username
    ? "ME"
    : authenticatedUserData.authenticatedUser?.friends?.some(
        (friend) => friend.username === username
      )
    ? "FRIEND"
    : "NOT_FRIEND";

  if (status === "NOT_EXISTS") {
    return (
      <div>
        <p>User does not exist</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "inherit" }}>
      <div>
        <p>Header</p>
      </div>
      <div style={{ display: "flex", gap: "1em", margin: "1em" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
          <Container>
            <h3>About</h3>
            <p>Lives in MOCKED_CITY</p>
            <p>From MOCKED_CITY</p>
          </Container>
          <Container>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <h3>Photos</h3>
              <p>See all photos</p>
            </div>
          </Container>
          <Container>
            <h3>Friends</h3>
            <div>
              {userData.userByUsername?.friends?.map((friend, index) => (
                <p key={index}>{friend.username}</p>
              ))}
            </div>
          </Container>
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            gap: "1em",
          }}
        >
          {(status === "ME" || status === "FRIEND") && (
            <Container>
              <WriteComment
                placeholder={
                  status === "ME"
                    ? "What's on your mind?"
                    : `Write something for ${userData.userByUsername?.firstName}...`
                }
                user={authenticatedUserData.authenticatedUser || undefined}
                onSendClick={() => {
                  // TODO
                }}
              />
            </Container>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1em",
            }}
          >
            {userData.userByUsername?.posts?.map((post, index) => (
              <UserPost
                key={index}
                authenticatedUser={
                  authenticatedUserData.authenticatedUser || undefined
                }
                id={post.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
