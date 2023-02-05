import { gql, useLazyQuery } from "@apollo/client";

import { useEffect } from "react";
import { useLocation } from "react-router";

import { User } from "../../models";

const GET_AUTHENTICATED_USER = gql`
  query GetAuthenticatedUser {
    authenticatedUser {
      email
      firstName
      friends {
        firstName
        id
        lastName
        username
      }
      id
      lastName
      username
    }
  }
`;

const GET_USER_BY_USERNAME = gql`
  query GetUserByUsername($username: String!) {
    userByUsername(username: $username) {
      biography
      birthDate
      email
      firstName
      friends {
        firstName
        id
        lastName
        username
      }
      id
      lastName
      username
    }
  }
`;

interface GetAuthenticatedUserData {
  authenticatedUser: User;
}

interface GetUserByUsernameData {
  userByUsername: User;
}

export function ProfilePage() {
  const [fetchAuthenticatedUser, { data: authenticatedUserData }] =
    useLazyQuery<GetAuthenticatedUserData>(GET_AUTHENTICATED_USER);
  const [fetchUser, { data: userData }] =
    useLazyQuery<GetUserByUsernameData>(GET_USER_BY_USERNAME);

  const location = useLocation();

  const { pathname } = location;

  const username = pathname.split("/")[1];

  useEffect(() => {
    fetchAuthenticatedUser();
    fetchUser({ variables: { username } });
  }, [username, fetchAuthenticatedUser, fetchUser]);

  const status = !userData?.userByUsername
    ? "NOT_EXISTS"
    : username === authenticatedUserData?.authenticatedUser.username
    ? "ME"
    : authenticatedUserData?.authenticatedUser.friends?.some(
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
    <div>
      <p>ProfilePage</p>
      {userData?.userByUsername ? (
        <p>{userData.userByUsername.username}</p>
      ) : (
        <p>User not found</p>
      )}
      {status === "ME" ? (
        <p>Me</p>
      ) : status === "FRIEND" ? (
        <p>Friend</p>
      ) : (
        <p>Add friend</p>
      )}
    </div>
  );
}
