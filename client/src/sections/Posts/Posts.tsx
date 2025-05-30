import { useSuspenseQuery } from "@apollo/client";

import { Fragment, Suspense, useMemo } from "react";
import styled from "styled-components";

import { UserPost } from "components";
import { Colors } from "environment";
import {
  GET_FRIENDS_POSTS_BY_USER_ID,
  GetFriendsPostsByOwnerIdResult,
} from "helpers";
import { LoadingPage } from "pages";
import { useAuthenticationStore } from "store";

const Container = {
  NoContent: styled.div`
    padding-top: 3rem;
  `,
  Posts: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
  `,
};

const Text = {
  NoContent: styled.p`
    color: ${Colors.LightGray};
  `,
};

export function Posts() {
  return (
    <Suspense
      fallback={
        <Container.NoContent>
          <LoadingPage />
        </Container.NoContent>
      }
    >
      <LoadingPosts />
    </Suspense>
  );
}

function LoadingPosts() {
  const { authenticatedUser } = useAuthenticationStore();
  const { data } = useSuspenseQuery(GET_FRIENDS_POSTS_BY_USER_ID, {
    variables: { input: { ownerId: authenticatedUser!.id } },
  });
  const { friendsPostsByOwnerId } = data;

  if (friendsPostsByOwnerId.totalCount === 0) {
    return (
      <Container.NoContent>
        <Text.NoContent>No posts found...</Text.NoContent>
      </Container.NoContent>
    );
  }

  return <SuccessPosts posts={friendsPostsByOwnerId} />;
}

interface SuccessProps {
  posts: GetFriendsPostsByOwnerIdResult;
}

function SuccessPosts({ posts }: SuccessProps) {
  const { edges } = posts;

  const { authenticatedUser } = useAuthenticationStore();

  const displayedPosts = useMemo(
    () =>
      edges.map(({ cursor, node: { id: postId } }) => {
        const isHidden =
          authenticatedUser?.hiddenPosts.some(({ id }) => id === cursor) ||
          false;
        console.log({ cursor, isHidden });

        if (isHidden) {
          return <Fragment key={postId} />;
        }

        return (
          <UserPost
            key={postId}
            postId={postId}
            onPostShared={() => {
              // TODO
            }}
          />
        );
      }),
    [authenticatedUser?.hiddenPosts, edges]
  );

  return <Container.Posts>{displayedPosts}</Container.Posts>;
}
