import { useLazyQuery } from "@apollo/client";

import { CSSProperties, useEffect } from "react";

import { UserPost } from "../../components";
import {
  GET_AUTHENTICATED_USER_WITH_FRIENDS,
  GET_FRIENDS_POSTS_BY_USER_ID,
} from "../../helpers";
import { Post, User } from "../../models";

interface GetAuthenticatedUserData {
  authenticatedUser: User;
}

interface GetFriendsPostsByUserIdData {
  friendsPostsByOwnerId: Post[];
}

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
        <p style={{ color: "#cfd1d5" }}>Loading...</p>
      </section>
    );
  }

  if (!friendsPostsByUserIdData.friendsPostsByOwnerId) {
    return (
      <section style={style}>
        <p style={{ color: "#cfd1d5" }}>No posts found...</p>
      </section>
    );
  }

  function getContent() {
    if (called && loading) {
      return <p style={{ color: "#cfd1d5" }}>Loading...</p>;
    }

    const friendsPosts = friendsPostsByUserIdData.friendsPostsByOwnerId;

    if (!friendsPosts || friendsPosts.length === 0) {
      return <p style={{ color: "#cfd1d5" }}>No posts found...</p>;
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
