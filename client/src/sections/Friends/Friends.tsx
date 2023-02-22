import { gql, useLazyQuery } from "@apollo/client";

import { CSSProperties, useEffect } from "react";

import { UserFriend } from "../../components";
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

const GET_USER_FRIENDS_BY_USERNAME = gql`
  query GetUserFriendsByUsername($username: String!) {
    userFriendsByUsername(username: $username) {
      firstName
      id
      lastName
      username
    }
  }
`;

interface GetAuthenticatedUserData {
  authenticatedUser: User;
}

interface GetUserFriendsByUsernameData {
  userFriendsByUsername: User[];
}

interface Props {
  style?: CSSProperties;
}

export function Friends({ style }: Props) {
  const [fetchAuthenticatedUser, { data: authenticatedUserData }] =
    useLazyQuery<GetAuthenticatedUserData>(GET_AUTHENTICATED_USER);
  const [fetchUserFriends, { data: userFriendsData }] =
    useLazyQuery<GetUserFriendsByUsernameData>(GET_USER_FRIENDS_BY_USERNAME);

  useEffect(() => {
    fetchAuthenticatedUser();

    if (authenticatedUserData) {
      fetchUserFriends({
        variables: {
          username: authenticatedUserData.authenticatedUser.username,
        },
      });
    }
  }, [authenticatedUserData, fetchAuthenticatedUser, fetchUserFriends]);

  return (
    <section
      style={{
        ...{
          display: "flex",
          flexDirection: "column",
          gap: "0.5em",
          padding: "0.5em",
        },
        ...style,
      }}
    >
      <div>
        <h3 style={{ color: "#8d8f93" }}>Friends</h3>
      </div>
      {userFriendsData?.userFriendsByUsername &&
        userFriendsData.userFriendsByUsername.map((friend, index) => (
          <UserFriend key={index} friend={friend} />
        ))}
    </section>
  );
}
