import { Container, UserPost, WriteComment } from "components";
import { User } from "models";

import { FriendshipStatus } from "./ProfilePage.types";

interface Props {
  authenticatedUser: User | null;
  status: FriendshipStatus;
  user: User;
}

export function Posts({ authenticatedUser, status, user }: Props) {
  const { firstName, friends } = user;

  return (
    <div style={{ display: "flex", gap: "1em", margin: "1em" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        <Container vertical>
          <h3>About</h3>
          <p>Lives in MOCKED_CITY</p>
          <p>From MOCKED_CITY</p>
        </Container>
        <Container vertical>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h3>Photos</h3>
            <p>See all photos</p>
          </div>
        </Container>
        <Container vertical>
          <h3>Friends</h3>
          <div>
            {friends?.map((friend, index) => (
              <p key={index}>{friend.username}</p>
            ))}
          </div>
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
            <WriteComment
              placeholder={
                status === FriendshipStatus.ME
                  ? "What's on your mind?"
                  : `Write something for ${firstName}...`
              }
              user={user}
              onSendClick={() => {
                // TODO
              }}
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
          {user?.posts?.map((post, index) => (
            <UserPost
              key={index}
              authenticatedUser={authenticatedUser || undefined}
              id={post.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
