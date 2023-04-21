import { useLazyQuery } from "@apollo/client";

import { CSSProperties, useEffect } from "react";

import { UserPost } from "components";
import { Colors } from "environment";
import {
  GetAuthenticatedUserData,
  GetFriendsPostsByUserIdData,
  GET_AUTHENTICATED_USER_WITH_FRIENDS,
  GET_FRIENDS_POSTS_BY_USER_ID,
} from "helpers";

interface Props {
  style?: CSSProperties;
}

export function Posts({ style }: Props) {
  const [fetchAuthenticatedUser, { data: authenticatedUserData }] =
    useLazyQuery<GetAuthenticatedUserData>(GET_AUTHENTICATED_USER_WITH_FRIENDS);
  const [
    fetchFriendsPostsByUserId,
    {
      called,
      data: friendsPostsByUserIdData = { friendsPostsByOwnerId: null },
      loading,
    },
  ] = useLazyQuery<GetFriendsPostsByUserIdData>(GET_FRIENDS_POSTS_BY_USER_ID);

  useEffect(() => {
    fetchAuthenticatedUser();

    if (authenticatedUserData) {
      const { id: authenticatedUserId } =
        authenticatedUserData.authenticatedUser;

      fetchFriendsPostsByUserId({
        variables: { ownerId: authenticatedUserId },
      });
    }
  }, [
    authenticatedUserData,
    fetchAuthenticatedUser,
    fetchFriendsPostsByUserId,
  ]);

  if (called && loading) {
    return (
      <section style={style}>
        <p style={{ color: Colors.LightGray }}>Loading...</p>
      </section>
    );
  }

  if (!friendsPostsByUserIdData.friendsPostsByOwnerId) {
    return (
      <section style={style}>
        <p style={{ color: Colors.LightGray }}>No posts found...</p>
      </section>
    );
  }

  function getContent() {
    if (called && loading) {
      return <p style={{ color: Colors.LightGray }}>Loading...</p>;
    }

    const friendsPosts = friendsPostsByUserIdData.friendsPostsByOwnerId;

    if (!friendsPosts || friendsPosts.length === 0) {
      return <p style={{ color: Colors.LightGray }}>No posts found...</p>;
    }

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        {friendsPosts.map((post, index) => (
          <UserPost
            key={index}
            authenticatedUser={authenticatedUserData?.authenticatedUser}
            id={post.id}
          />
        ))}
      </div>
    );
  }

  return <section style={style}>{getContent()}</section>;
}
