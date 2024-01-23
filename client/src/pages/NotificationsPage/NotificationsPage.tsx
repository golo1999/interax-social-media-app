import styled from "styled-components";

import { NotificationsList } from "components";
import { Colors } from "environment";
import { Theme } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

const Container = {
  Main: styled.div<ThemeProps>`
    background-color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.BlackOlive
        : Colors.AntiFlashWhite};
    display: flex;
    flex: 1;
    justify-content: center;
  `,
};

export function NotificationsPage() {
  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();

  const themeProps = { $isAuthenticated: !!authenticatedUser, $theme: theme };

  return (
    <Container.Main {...themeProps}>
      <div style={{ margin: "16px 0" }}>
        <NotificationsList />
      </div>
    </Container.Main>
  );
}
