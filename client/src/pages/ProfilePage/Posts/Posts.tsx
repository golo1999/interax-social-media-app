import { useQuery } from "@apollo/client";

import { Fragment, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { Waypoint } from "react-waypoint";

import {
  Container,
  CreatePost,
  CreatePostModal,
  UserPhoto,
  UserPost,
} from "components";
import { FriendshipStatus } from "enums";
import { GET_USER_POSTS_BY_ID, GetUserPostsByIdData } from "helpers";
import { useScrollLock } from "hooks";
import {
  CollegeEducation,
  HighSchoolEducation,
  Place,
  User,
  Work,
} from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

import { Overview } from "../About";

import {
  Container as StyledContainer,
  Photo,
  SeeButton,
  Text,
} from "./Posts.style";

interface Props {
  filteredEducationHistory: (CollegeEducation | HighSchoolEducation)[];
  filteredPlacesHistory: Place[];
  filteredWorkHistory: Work[];
  friendshipStatus: FriendshipStatus;
  user: User;
  onEditDetailsClick: () => void;
  onSeeAllPhotosClick: () => void;
}

export function Posts({
  filteredEducationHistory,
  filteredPlacesHistory,
  filteredWorkHistory,
  friendshipStatus,
  user,
  onEditDetailsClick,
  onSeeAllPhotosClick,
}: Props) {
  const { firstName, friends, id: userId, photos } = user;

  const { authenticatedUser } = useAuthenticationStore();
  const {
    data: userPosts = {
      userPostsById: {
        edges: [],
        pageInfo: {
          endCursor: null,
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: null,
        },
        totalCount: 0,
      },
    },
    fetchMore,
  } = useQuery<GetUserPostsByIdData>(GET_USER_POSTS_BY_ID, {
    notifyOnNetworkStatusChange: true,
    variables: { input: { first: 5, userId } },
  });
  const navigate = useNavigate();
  const { lockScroll, unlockScroll } = useScrollLock();
  const { theme } = useSettingsStore();
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  return (
    <StyledContainer.Main>
      <StyledContainer.Column.First>
        <Container vertical>
          <Text.Intro isAuthenticated={!!authenticatedUser} theme={theme}>
            Intro
          </Text.Intro>
          <Overview
            filteredEducationHistory={filteredEducationHistory}
            filteredPlacesHistory={filteredPlacesHistory}
            filteredWorkHistory={filteredWorkHistory}
            friendshipStatus={friendshipStatus}
            isReadonly
            user={user}
            onEditDetailsClick={onEditDetailsClick}
          />
        </Container>
        <Container vertical>
          <StyledContainer.Photos>
            <Text.Photos isAuthenticated={!!authenticatedUser} theme={theme}>
              Photos
            </Text.Photos>
            {photos.length > 9 && (
              <Text.SeeAllPhotos onClick={onSeeAllPhotosClick}>
                See all photos
              </Text.SeeAllPhotos>
            )}
          </StyledContainer.Photos>
          <StyledContainer.PhotosList photosCount={photos.length}>
            {photos.map(({ id, url }) => (
              <StyledContainer.Photo key={id}>
                <Photo alt={id} src={url} />
              </StyledContainer.Photo>
            ))}
          </StyledContainer.PhotosList>
        </Container>
        {!!authenticatedUser && (
          <Container vertical>
            <div>
              <StyledContainer.FriendsHeader>
                <Text.Friends
                  isAuthenticated={!!authenticatedUser}
                  theme={theme}
                >
                  Friends
                </Text.Friends>
                {friends.length > 9 && (
                  <SeeButton
                    isAuthenticated={!!authenticatedUser}
                    theme={theme}
                  >
                    See all friends
                  </SeeButton>
                )}
              </StyledContainer.FriendsHeader>
              <Text.FriendsCount
                isAuthenticated={!!authenticatedUser}
                theme={theme}
              >
                {friends.length === 0
                  ? "0 friends"
                  : friends.length === 1
                  ? "1 friend"
                  : `${friends.length} friends`}
              </Text.FriendsCount>
            </div>
            <StyledContainer.FriendsList friendsCount={friends.length}>
              {friends.map((friend, index) => {
                if (index > 8) {
                  return <Fragment key={index} />;
                }

                const { firstName, lastName, username } = friend;

                return (
                  <StyledContainer.FriendCard key={index}>
                    <UserPhoto
                      containerSize="100%"
                      iconSize="2em"
                      isSquare
                      user={friend}
                      onPhotoClick={() => navigate(`/${username}`)}
                    />
                    <Text.FriendFullName
                      isAuthenticated={!!authenticatedUser}
                      theme={theme}
                    >
                      {firstName} {lastName}
                    </Text.FriendFullName>
                  </StyledContainer.FriendCard>
                );
              })}
            </StyledContainer.FriendsList>
          </Container>
        )}
      </StyledContainer.Column.First>
      <StyledContainer.Column.Second>
        {(friendshipStatus === FriendshipStatus.ME ||
          friendshipStatus === FriendshipStatus.FRIEND) && (
          <Container vertical>
            <CreatePost
              text={
                friendshipStatus === FriendshipStatus.ME
                  ? "What's on your mind?"
                  : `Write something for ${firstName}...`
              }
              onTextContainerClick={() => {
                lockScroll();
                setIsCreatePostModalOpen(true);
              }}
            />
          </Container>
        )}
        {!!authenticatedUser && (
          <StyledContainer.Posts>
            {userPosts.userPostsById.edges.map(
              ({ cursor, node: { id: postId } }, index, items) => (
                <Fragment key={postId}>
                  <UserPost
                    postId={postId}
                    onPostShared={() => {
                      fetchMore({
                        variables: {
                          input: { before: items[0].cursor, last: 1, userId },
                        },
                        updateQuery: (previousResult, { fetchMoreResult }) => ({
                          userPostsById: {
                            ...previousResult.userPostsById,
                            edges: [
                              ...fetchMoreResult.userPostsById.edges,
                              ...previousResult.userPostsById.edges,
                            ],
                            pageInfo: {
                              endCursor:
                                previousResult.userPostsById.pageInfo.endCursor,
                              hasNextPage:
                                previousResult.userPostsById.pageInfo
                                  .hasNextPage,
                              hasPreviousPage:
                                fetchMoreResult.userPostsById.pageInfo
                                  .hasPreviousPage,
                              startCursor:
                                fetchMoreResult.userPostsById.pageInfo
                                  .startCursor,
                            },
                            totalCount:
                              previousResult.userPostsById.totalCount +
                              fetchMoreResult.userPostsById.totalCount,
                          },
                        }),
                      });
                    }}
                  />
                  {index === items.length - 1 && (
                    <Waypoint
                      onEnter={() => {
                        if (userPosts.userPostsById.pageInfo.hasNextPage) {
                          fetchMore({
                            variables: {
                              input: { after: cursor, first: 5, userId },
                            },
                            updateQuery: (
                              previousResult,
                              { fetchMoreResult }
                            ) => ({
                              userPostsById: {
                                ...previousResult.userPostsById,
                                edges: [
                                  ...previousResult.userPostsById.edges,
                                  ...fetchMoreResult.userPostsById.edges,
                                ],
                                pageInfo: {
                                  ...previousResult.userPostsById.pageInfo,
                                  endCursor:
                                    fetchMoreResult.userPostsById.pageInfo
                                      .endCursor,
                                  hasNextPage:
                                    fetchMoreResult.userPostsById.pageInfo
                                      .hasNextPage,
                                },
                                totalCount:
                                  previousResult.userPostsById.totalCount +
                                  fetchMoreResult.userPostsById.totalCount,
                              },
                            }),
                          });
                        }
                      }}
                    />
                  )}
                </Fragment>
              )
            )}
          </StyledContainer.Posts>
        )}
      </StyledContainer.Column.Second>
      {isCreatePostModalOpen &&
        createPortal(
          <CreatePostModal
            user={user}
            onCloseClick={() => {
              unlockScroll();
              setIsCreatePostModalOpen(false);
            }}
            onPostCreated={() => {
              unlockScroll();
              setIsCreatePostModalOpen(false);
              fetchMore({
                variables: {
                  input: {
                    before: userPosts.userPostsById.edges[0].cursor,
                    last: 1,
                    userId,
                  },
                },
                updateQuery: (previousResult, { fetchMoreResult }) => ({
                  userPostsById: {
                    ...previousResult.userPostsById,
                    edges: [
                      ...fetchMoreResult.userPostsById.edges,
                      ...previousResult.userPostsById.edges,
                    ],
                    pageInfo: {
                      endCursor:
                        previousResult.userPostsById.pageInfo.endCursor,
                      hasNextPage:
                        previousResult.userPostsById.pageInfo.hasNextPage,
                      hasPreviousPage:
                        fetchMoreResult.userPostsById.pageInfo.hasPreviousPage,
                      startCursor:
                        fetchMoreResult.userPostsById.pageInfo.startCursor,
                    },
                    totalCount:
                      previousResult.userPostsById.totalCount +
                      fetchMoreResult.userPostsById.totalCount,
                  },
                }),
              });
            }}
          />,
          document.body
        )}
    </StyledContainer.Main>
  );
}
