import { gql, useLazyQuery } from "@apollo/client";

import { CSSProperties, useEffect } from "react";

import { UserPost } from "../../components";
import { Post, User } from "../../models";

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

export const GET_FRIENDS_POSTS_BY_USER_ID = gql`
  fragment CommentData on Comment {
    dateTime
    id
    owner {
      email
      firstName
      id
      lastName
      username
    }
    postId
    reactions {
      dateTime
      id
      owner {
        email
        firstName
        id
        lastName
        username
      }
      type
    }
    replies {
      dateTime
      id
      owner {
        email
        firstName
        id
        lastName
        username
      }
      text
    }
    text
  }

  query GetFriendsPostsByOwnerId($ownerId: ID!) {
    friendsPostsByOwnerId(ownerId: $ownerId) {
      canComment
      canReact
      canShare
      canView
      comments {
        ...CommentData
      }
      dateTime
      id
      owner {
        firstName
        id
        lastName
        username
      }
      photos {
        id
        ownerId
        postId
        text
        url
      }
      reactions {
        owner {
          firstName
          id
          lastName
          username
        }
        type
      }
      shares {
        owner {
          firstName
          lastName
          username
        }
      }
      text
      video
    }
  }
`;

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
    useLazyQuery<GetAuthenticatedUserData>(GET_AUTHENTICATED_USER);
  const [
    fetchFriendsPostsByUserId,
    { called, data: friendsPostsByUserIdData, loading },
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

  if (!friendsPostsByUserIdData?.friendsPostsByOwnerId) {
    return (
      <section style={style}>
        <p style={{ color: "#cfd1d5" }}>No posts found...</p>
      </section>
    );
  }

  const friendsPosts = friendsPostsByUserIdData.friendsPostsByOwnerId;

  return (
    <section style={style}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        {friendsPosts.length > 0 &&
          friendsPosts.map((post, index) => (
            <UserPost
              key={index}
              authenticatedUser={authenticatedUserData?.authenticatedUser}
              id={post.id}
            />
          ))}
      </div>
    </section>
  );
}
