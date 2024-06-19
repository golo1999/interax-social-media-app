import { Box, CircularProgress } from "@mui/material";

import styled from "styled-components";

import { Colors } from "environment";
import { useAuthenticationStore, useSettingsStore } from "store";
import { Theme } from "types";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

const Container = styled(Box)<ThemeProps>`
  align-items: center;
  background-color: ${({ $isAuthenticated, $theme }) =>
    $isAuthenticated && $theme === "DARK"
      ? Colors.EerieBlack
      : Colors.AntiFlashWhite};
  display: flex;
  flex: 1;
  justify-content: center;
`;

const Spinner = styled(CircularProgress)`
  color: ${Colors.VampireBlack};
`;

export function LoadingPage() {
  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();

  return (
    <Container $isAuthenticated={!!authenticatedUser} $theme={theme}>
      <Spinner size="10vmin" />
    </Container>
  );
}
