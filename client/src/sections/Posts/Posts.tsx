import { gql, useLazyQuery, useQuery } from "@apollo/client";

import { useEffect } from "react";

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
      photo
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

const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts {
      canComment
      canReact
      canShare
      canView
      comments {
        owner {
          username
        }
        reactions {
          owner {
            username
          }
          type
        }
        replies {
          id
          owner {
            email
            firstName
            id
            lastName
            username
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
        username
      }
      photo
      reactions {
        owner {
          username
        }
        type
      }
      shares {
        owner {
          username
        }
      }
      text
      video
    }
  }
`;

const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      biography
      birthDate
      email
      firstName
      friends {
        id
        email
        firstName
        lastName
        username
      }
      lastName
      username
    }
  }
`;

interface GetAuthenticatedUserData {
  authenticatedUser: User;
}

interface GetFriendsPostsByUserIdData {
  friendsPostsByOwnerId: Post[];
}

interface GetPostsData {
  posts: Post[];
}

interface GetUsersData {
  users: User[];
}

export function Posts() {
  const [fetchAuthenticatedUser, { data: authenticatedUserData }] =
    useLazyQuery<GetAuthenticatedUserData>(GET_AUTHENTICATED_USER);
  const [fetchFriendsPostsByUserId, { data: friendsPostsByUserIdData }] =
    useLazyQuery<GetFriendsPostsByUserIdData>(GET_FRIENDS_POSTS_BY_USER_ID);

  const { data: postsData } = useQuery<GetPostsData>(GET_ALL_POSTS);
  const { data: usersData } = useQuery<GetUsersData>(GET_ALL_USERS);

  useEffect(() => {
    fetchAuthenticatedUser();

    if (authenticatedUserData) {
      fetchFriendsPostsByUserId({
        variables: { ownerId: authenticatedUserData?.authenticatedUser.id },
      });
    }
  }, [authenticatedUserData]);

  return (
    <section>
      {friendsPostsByUserIdData?.friendsPostsByOwnerId ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
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
