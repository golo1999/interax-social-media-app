import { useLazyQuery } from "@apollo/client";

import { CSSProperties, useEffect } from "react";

import { UserPost } from "components";
import { Colors } from "environment";
import {
  GetFriendsPostsByUserIdData,
  GET_FRIENDS_POSTS_BY_USER_ID,
} from "helpers";
import { useAuthenticationStore } from "store";
import { LoadingPage } from "pages";

interface Props {
  style?: CSSProperties;
}

export function Posts({ style }: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const [
    fetchFriendsPostsByUserId,
    {
      called,
      data: friendsPostsByUserIdData = { friendsPostsByOwnerId: null },
      loading,
    },
  ] = useLazyQuery<GetFriendsPostsByUserIdData>(GET_FRIENDS_POSTS_BY_USER_ID);

  useEffect(() => {
    fetchFriendsPostsByUserId({
      variables: { input: { ownerId: authenticatedUser?.id } },
    });
  }, [authenticatedUser, fetchFriendsPostsByUserId]);

  if (called && loading) {
    return (
      <div style={{ paddingTop: "3rem" }}>
        <LoadingPage />
      </div>
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

    if (!friendsPosts || friendsPosts.totalCount === 0) {
      return <p style={{ color: Colors.LightGray }}>No posts found...</p>;
    }

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        {friendsPosts.edges.map(({ cursor, node: { id: postId } }, index) => (
          <UserPost
            key={postId}
            postId={postId}
            onPostShared={() => {
              // TODO
            }}
          />
        ))}
      </div>
    );
  }

  return <section style={style}>{getContent()}</section>;
}
