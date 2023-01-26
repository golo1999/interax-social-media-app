import { gql, useLazyQuery } from "@apollo/client";

import React, { useEffect } from "react";
import { useLocation } from "react-router";

import { Post, User } from "../../models";

const GET_POSTS_BY_USER_ID = gql`
  query GetPostByOwnerId($ownerId: ID!) {
    postsByOwnerId(ownerId: $ownerId) {
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

const GET_USER_BY_ID = gql`
  query GetUser($userId: ID!) {
    user(id: $userId) {
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

interface GetPostsByUserIdData {
  postsByOwnerId: Post[];
}

interface FetchUserData {
  user: User;
}

export function ProfilePage() {
  const [fetchPostsByUserId, { data: postsByUserIdData }] =
    useLazyQuery<GetPostsByUserIdData>(GET_POSTS_BY_USER_ID);
  const [fetchUser, { data: userData, loading: fetchingUser }] =
    useLazyQuery<FetchUserData>(GET_USER_BY_ID);

  const location = useLocation();

  const { pathname } = location;

  const userId = pathname.split("/")[1];

  useEffect(() => {
    fetchPostsByUserId({ variables: { ownerId: userId } });
    fetchUser({ variables: { userId } });
  }, []);

  if (postsByUserIdData) {
    console.log("postsByUserIdData");
    console.log(postsByUserIdData.postsByOwnerId);
  }

  if (fetchingUser) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!fetchingUser && !userData?.user) {
    console.log("NOT FOUND!!");
  } else {
    console.log(userData?.user);
  }

  //   if (fetchingUser) {
  //     console.log("fetching user");
  //   } else if (userData?.user) {
  //     console.log(userData.user);
  //   } else {
  //     console.log("not found");
  //   }

  return (
    <div>
      <p>ProfilePage</p>
      {userData?.user ? <p>{userData.user.username}</p> : <p>User not found</p>}
    </div>
  );
}
