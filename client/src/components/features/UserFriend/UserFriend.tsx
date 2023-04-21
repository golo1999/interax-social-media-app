import { UserPhoto } from "components";
import { Colors } from "environment";
import { User } from "models";

interface Props {
  friend: User;
  onClick?: () => void;
}

export function UserFriend({ friend, onClick }: Props) {
  const displayedName = `${friend.firstName} ${friend.lastName}`;

  return (
    <div
      style={{
        alignItems: "center",
        color: Colors.LightGray,
        display: "flex",
        gap: "0.5em",
      }}
      onClick={onClick}
    >
      <UserPhoto
        user={friend}
        onPhotoClick={() => {
          // TODO
        }}
      />
      <p
        style={{
          fontWeight: "bold",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {displayedName}
      </p>
    </div>
  );
}
