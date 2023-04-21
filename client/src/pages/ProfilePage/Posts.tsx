import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  CreatePost,
  CreatePostModal,
  UserPhoto,
  UserPost,
} from "components";
import { Colors } from "environment";
import { User } from "models";

import { Overview } from "./About";
import { EditDetailsModal } from "./EditDetailsModal";
import { FriendsListContainer, SeeButton } from "./Posts.style";
import { Container as StyledContainer } from "./ProfilePage.style";
import { FriendshipStatus } from "./ProfilePage.types";

interface Props {
  authenticatedUser: User | null;
  status: FriendshipStatus;
  user: User;
}

export function Posts({ authenticatedUser, status, user }: Props) {
  const { firstName, friends } = user;

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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          maxWidth: "50%",
        }}
      >
        <Container vertical>
          <h3 style={{ color: Colors.LightGray }}>Intro</h3>
          <Overview
            authenticatedUser={authenticatedUser}
            isReadonly
            user={user}
            onEditDetailsClick={() => {
              setIsEditDetailsModalOpen((prev) => !prev);
            }}
          />
        </Container>
        <Container vertical>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              gap: "1em",
              justifyContent: "space-between",
            }}
          >
            <h3 style={{ color: Colors.LightGray }}>Photos</h3>
            {<p style={{ color: Colors.BrilliantAzure }}>See all photos</p>}
          </div>
        </Container>
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
              <h3 style={{ color: Colors.LightGray }}>Friends</h3>
              {friends && friends.length > 9 && (
                <SeeButton>See all friends</SeeButton>
              )}
            </div>
            <p>
              {!friends?.length || friends.length === 0
                ? "0 friends"
                : friends.length === 1
                ? "1 friend"
                : `${friends.length} friends`}
            </p>
          </div>
          <FriendsListContainer friends={friends?.length || null}>
            {friends?.map((friend, index) => {
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
          </FriendsListContainer>
        </Container>
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          gap: "1em",
        }}
      >
        {(status === FriendshipStatus.ME ||
          status === FriendshipStatus.FRIEND) && (
          <Container vertical>
            <CreatePost
              authenticatedUser={authenticatedUser}
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1em",
          }}
        >
          {user?.posts?.map((post, index) => {
            // Rendering only user's personal posts and other users' posts into user's timeline
            // Skipping user's posts from other users' timeline
            if (post.ownerId === user.id && post.receiverId !== user.id) {
              return <Fragment key={index} />;
            }

            return (
              <UserPost
                key={index}
                authenticatedUser={authenticatedUser || undefined}
                id={post.id}
              />
            );
          })}
        </div>
      </div>
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
          authenticatedUser={authenticatedUser}
          user={user}
          onCloseClick={() => setIsCreatePostModalOpen((prev) => !prev)}
          onPostClick={() => setIsCreatePostModalOpen((prev) => !prev)}
        />
      )}
    </StyledContainer.Main>
  );
}
