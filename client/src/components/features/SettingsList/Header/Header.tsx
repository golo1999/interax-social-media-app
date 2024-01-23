import { memo } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";

import { Colors } from "environment";
import { useAuthenticationStore, useSettingsStore } from "store";

import { Container, Title } from "./Header.style";

interface Props {
  title: string;
  onBackIconClick: () => void;
}

export const Header = memo(function Header({ title, onBackIconClick }: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();

  const themeProps = { $isAuthenticated: !!authenticatedUser, $theme: theme };

  const backIconColor =
    !!authenticatedUser && theme === "DARK"
      ? Colors.Platinum
      : Colors.VampireBlack;

  return (
    <Container.Main>
      <div>
        <Container.BackIcon {...themeProps} onClick={onBackIconClick}>
          <HiOutlineArrowLeft color={backIconColor} size={20} />
        </Container.BackIcon>
      </div>
      <Title {...themeProps}>{title}</Title>
    </Container.Main>
  );
});
