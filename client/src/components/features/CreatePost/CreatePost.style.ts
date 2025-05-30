import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "types";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

export const Container = {
  Items: styled.div`
    align-items: center;
    display: flex;
    gap: 0.5em;
  `,
  Main: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Text: styled.div<ThemeProps>`
    align-items: center;
    background-color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.BlackOlive
        : Colors.AntiFlashWhite};
    border-radius: 20px;
    color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.MetallicSilver
        : Colors.DarkLiver};
    display: flex;
    flex: 1;
    padding: 0.5em 1em;
    user-select: none;

    &:hover {
      background-color: ${({ $isAuthenticated, $theme }) =>
        $isAuthenticated && $theme === "DARK"
          ? Colors.DarkLiver
          : Colors.Platinum};
    }
  `,
};
