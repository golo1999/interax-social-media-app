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
  query GetFriendsPostsByOwnerId($ownerId: ID!) {
    friendsPostsByOwnerId(ownerId: $ownerId) {
      canComment
      canReact
      canShare
      canView
      comments {
        id
        dateTime
        owner {
          email
          firstName
          id
          lastName
          username
        }
        reactions {
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
          reactions {
            id
            owner {
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
              firstName
              id
              lastName
              username
            }
            reactions {
              id
              owner {
                firstName
                id
                lastName
                username
              }
              type
            }
            replies {
              text
            }
            text
          }
          text
        }
        text
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
        ownerID
        postID
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
  const [fetchFriendsPostsByUserId, { data: friendsPostsByUserIdData }] =
    useLazyQuery<GetFriendsPostsByUserIdData>(GET_FRIENDS_POSTS_BY_USER_ID);

  useEffect(() => {
    fetchAuthenticatedUser();

    if (authenticatedUserData) {
      fetchFriendsPostsByUserId({
        variables: { ownerId: authenticatedUserData?.authenticatedUser.id },
      });
    }
  }, [
    authenticatedUserData,
    fetchAuthenticatedUser,
    fetchFriendsPostsByUserId,
  ]);

  return (
    <section style={style}>
      {friendsPostsByUserIdData?.friendsPostsByOwnerId ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
          {friendsPostsByUserIdData.friendsPostsByOwnerId.length > 0 &&
            friendsPostsByUserIdData.friendsPostsByOwnerId.map(
              (post, index) => (
                <UserPost
                  key={index}
                  authenticatedUser={authenticatedUserData?.authenticatedUser}
                  post={post}
                />
              )
            )}
        </div>
      ) : (
        <p>No posts found...</p>
      )}
    </section>
  );
}
