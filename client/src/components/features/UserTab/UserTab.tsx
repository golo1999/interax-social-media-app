import { UserPhoto } from "components";
import { User } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

import { Container, Name } from "./UserTab.style";

interface Props {
  containerSize?: string;
  iconSize?: string;
  isSelected?: boolean;
  user: User | null | undefined;
  onClick?: () => void;
}

export function UserTab({
  containerSize = "24px",
  iconSize = "12px",
  isSelected = false,
  user,
  onClick,
}: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();

  const { firstName, lastName } = { ...user };

  const themeProps = { $isAuthenticated: !!authenticatedUser, $theme: theme };

  return (
    <Container {...themeProps} isSelected={isSelected} onClick={onClick}>
      <UserPhoto
        containerSize={containerSize}
        iconSize={iconSize}
        user={user}
      />
      <Name {...themeProps}>
        {firstName} {lastName}
      </Name>
    </Container>
  );
}
