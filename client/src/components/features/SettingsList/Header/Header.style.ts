import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "models";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

export const Container = {
  BackIcon: styled.div<ThemeProps>`
    display: flex;
    border-radius: 50%;
    padding: 8px;

    &:hover {
      background-color: ${({ $isAuthenticated, $theme }) =>
        $isAuthenticated && $theme === "DARK"
          ? Colors.BlackOlive
          : Colors.AntiFlashWhite};
    }
  `,
  Main: styled.div`
    display: flex;
    gap: 12px;
    padding-bottom: 20px;
  `,
};

export const Title = styled.h2<ThemeProps>`
  color: ${({ $isAuthenticated, $theme }) =>
    $isAuthenticated && $theme === "DARK"
      ? Colors.Platinum
      : Colors.VampireBlack};
`;
