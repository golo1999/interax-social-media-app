import { UserPhoto } from "../../../components";
import { User } from "../../../models";

interface Props {
  friend: User;
}

export function UserFriend({ friend }: Props) {
  const displayedName = `${friend.firstName} ${friend.lastName}`;

  return (
    <div
      style={{
        alignItems: "center",
        color: "#cfd1d5",
        display: "flex",
        gap: "0.5em",
      }}
    >
      <UserPhoto
        user={friend}
        onPhotoClick={() => {
          // TODO
        }}
      />
      <p style={{ fontWeight: "bold" }}>{displayedName}</p>
    </div>
  );
}
