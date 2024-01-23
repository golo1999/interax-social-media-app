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
import { useAuthenticationStore, useSettingsStore } from "store";

import { Overview } from "./About";
import { EditDetailsModal } from "./EditDetailsModal";
import { FriendsListContainer, SeeButton } from "./Posts.style";
import { Container as StyledContainer } from "./Posts.style";
import { FriendshipStatus } from "./ProfilePage.types";

interface Props {
  status: FriendshipStatus;
  user: User;
}

export function Posts({ status, user }: Props) {
  const { firstName, friends } = user;

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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          maxWidth: "50%",
        }}
      >
        <Container vertical>
          <span
            style={{
              color: !!authenticatedUser
                ? Colors.LightGray
                : Colors.VampireBlack,
              fontSize: "20px",
              fontWeight: "bold",
              paddingBottom: "8px",
            }}
          >
            Intro
          </span>
          <Overview
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
            <span
              style={{
                color: !!authenticatedUser
                  ? Colors.LightGray
                  : Colors.VampireBlack,
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Photos
            </span>
            {
              <span style={{ color: Colors.BrightNavyBlue, fontSize: "17px" }}>
                See all photos
              </span>
            }
          </div>
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
                <span
                  style={{
                    color: !!authenticatedUser
                      ? Colors.LightGray
                      : Colors.VampireBlack,
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Friends
                </span>
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
                {!friends?.length || friends.length === 0
                  ? "0 friends"
                  : friends.length === 1
                  ? "1 friend"
                  : `${friends.length} friends`}
              </span>
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
        )}
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
            {user?.posts?.map((post, index) => {
              // Rendering only user's personal posts and other users' posts into user's timeline
              // Skipping user's posts from other users' timeline
              if (post.ownerId === user.id && post.receiverId !== user.id) {
                return <Fragment key={index} />;
              }

              return <UserPost id={post.id} key={index} />;
            })}
          </StyledContainer.Posts>
        )}
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
          user={user}
          onCloseClick={() => setIsCreatePostModalOpen((prev) => !prev)}
          onPostClick={() => setIsCreatePostModalOpen((prev) => !prev)}
        />
      )}
    </StyledContainer.Main>
  );
}
