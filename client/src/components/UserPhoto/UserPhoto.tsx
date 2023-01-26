import { User } from "../../models";

interface Props {
  user?: User;
  onPhotoClick: () => void;
}

export function UserPhoto({ user, onPhotoClick }: Props) {
  return (
    <div
      style={{
        alignItems: "center",
        backgroundColor: "#8d8f93",
        borderRadius: "50%",
        color: "#242526",
        display: "flex",
        justifyContent: "center",
        fontSize: "1em",
        height: "2em",
        userSelect: "none",
        width: "2em",
      }}
      onClick={onPhotoClick}
    >
      {user?.firstName.slice(0, 1).toUpperCase() ?? "?"}
    </div>
  );
}
