import { useLazyQuery } from "@apollo/client";

import { CSSProperties, useEffect } from "react";

import { UserFriend } from "../../components";
import {
  GET_AUTHENTICATED_USER_WITH_FRIENDS,
  GET_USER_FRIENDS_BY_USERNAME,
} from "../../helpers";
import { User } from "../../models";

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
    useLazyQuery<GetAuthenticatedUserData>(GET_AUTHENTICATED_USER_WITH_FRIENDS);
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
