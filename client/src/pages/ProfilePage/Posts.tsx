import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  CreatePost,
  CreatePostModal,
  UserPhoto,
  UserPost,
} from "components";
import { FriendshipStatus } from "enums";
import { Colors } from "environment";
import { User } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

import { Overview } from "./About";
import { EditDetailsModal } from "./EditDetailsModal";
import { Container as StyledContainer, SeeButton, Text } from "./Posts.style";

interface Props {
  status: FriendshipStatus;
  user: User;
}

export function Posts({ status, user }: Props) {
  const { firstName, friends, id: userId, posts } = user;

  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isEditDetailsModalOpen, setIsEditDetailsModalOpen] = useState(false);

  if (isCreatePostModalOpen) {
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "15px";
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
  } else {
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "";
    document.body.style.position = "";
    document.body.style.top = "";
  }

  const navigate = useNavigate();

  return (
    <StyledContainer.Main>
      <StyledContainer.Column.First>
        <Container vertical>
          <Text.Intro>Intro</Text.Intro>
          <Overview
            isReadonly
            user={user}
            onEditDetailsClick={() => {
              setIsEditDetailsModalOpen((prev) => !prev);
            }}
          />
        </Container>
        <Container vertical>
          <StyledContainer.Photos>
            <Text.Photos>Photos</Text.Photos>
            {/* TODO: conditional render "See all photos" */}
            {<Text.SeeAllPhotos>See all photos</Text.SeeAllPhotos>}
          </StyledContainer.Photos>
        </Container>
        {!!authenticatedUser && (
          <Container vertical>
            <div>
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  gap: "1em",
                  justifyContent: "space-between",
                }}
              >
                <Text.Friends>Friends</Text.Friends>
                {friends && friends.length > 9 && (
                  <SeeButton
                    isAuthenticated={!!authenticatedUser}
                    theme={theme}
                  >
                    See all friends
                  </SeeButton>
                )}
              </div>
              <span>
                {friends.length === 0
                  ? "0 friends"
                  : friends.length === 1
                  ? "1 friend"
                  : `${friends.length} friends`}
              </span>
            </div>
            <StyledContainer.FriendsList friendsCount={friends.length}>
              {friends.map((friend, index) => {
                if (index > 8) {
                  return <Fragment key={index} />;
                }

                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.25em",
                    }}
                  >
                    <UserPhoto
                      containerSize="100%"
                      iconSize="2em"
                      isSquare
                      user={friend}
                      onPhotoClick={() => navigate(`/${friend.username}`)}
                    />
                    <h5
                      style={{
                        color: Colors.LightGray,
                        overflow: "hidden",
                        padding: "0 0 0.25em 0",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {friend.firstName} {friend.lastName}
                    </h5>
                  </div>
                );
              })}
            </StyledContainer.FriendsList>
          </Container>
        )}
      </StyledContainer.Column.First>
      <StyledContainer.Column.Second>
        {(status === FriendshipStatus.ME ||
          status === FriendshipStatus.FRIEND) && (
          <Container vertical>
            <CreatePost
              text={
                status === FriendshipStatus.ME
                  ? "What's on your mind?"
                  : `Write something for ${firstName}...`
              }
              onTextContainerClick={() =>
                setIsCreatePostModalOpen((prev) => !prev)
              }
            />
          </Container>
        )}
        {!!authenticatedUser && (
          <StyledContainer.Posts>
            {posts.map((post, index) => {
              console.log({ post });
              // Rendering only user's personal posts and other users' posts into user's timeline
              // Skipping user's posts from other users' timeline
              if (post.ownerId === userId && post.receiverId !== userId) {
                return <Fragment key={index} />;
              }

              return <UserPost data={post} key={index} />;
            })}
          </StyledContainer.Posts>
        )}
      </StyledContainer.Column.Second>
      {isEditDetailsModalOpen && (
        <EditDetailsModal
          onCloseClick={() => {
            setIsEditDetailsModalOpen((prev) => !prev);
          }}
          onSaveClick={() => {
            setIsEditDetailsModalOpen((prev) => !prev);
          }}
        />
      )}
      {isCreatePostModalOpen && (
        <CreatePostModal
          user={user}
          onCloseClick={() => setIsCreatePostModalOpen((prev) => !prev)}
          onPostClick={() => setIsCreatePostModalOpen((prev) => !prev)}
        />
      )}
    </StyledContainer.Main>
  );
}
