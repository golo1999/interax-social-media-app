import { UserPhoto } from "components";
import { User } from "models";

import { Container, Name } from "./UserTab.style";

interface Props {
  containerSize?: string;
  iconSize?: string;
  isSelected?: boolean;
  user: User | null;
  onClick?: () => void;
}

export function UserTab({
  containerSize = "24px",
  iconSize = "12px",
  isSelected = false,
  user,
  onClick,
}: Props) {
  const { firstName, lastName } = { ...user };

  return (
    <Container isSelected={isSelected} onClick={onClick}>
      <UserPhoto
        containerSize={containerSize}
        iconSize={iconSize}
        user={user}
      />
      <Name>
        {firstName} {lastName}
      </Name>
    </Container>
  );
}
