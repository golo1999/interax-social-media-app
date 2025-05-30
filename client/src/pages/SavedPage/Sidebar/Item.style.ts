import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "types";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

type MainContainerProps = {
  $isSelected: boolean;
} & ThemeProps;

export const Container = {
  Main: styled.div<MainContainerProps>`
    align-items: center;
    ${({ $isAuthenticated, $isSelected, $theme }) =>
      $isSelected &&
      `background-color: ${
        $isAuthenticated && $theme === "DARK"
          ? Colors.SonicSilver
          : Colors.AntiFlashWhite
      };`};
    border-radius: 8px;
    display: flex;
    gap: 0.5em;
    height: 4em;
    padding: 0.5em;

    &:hover {
      ${({ $isAuthenticated, $isSelected, $theme }) =>
        !$isSelected &&
        `background-color: ${
          $isAuthenticated && $theme === "DARK"
            ? Colors.SonicSilver
            : Colors.AntiFlashWhite
        };`};
    }
  `,
};

export const Text = {
  Name: styled.p<ThemeProps>`
    color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.Platinum
        : Colors.VampireBlack};
    font-size: 15px;
    font-weight: 500;
  `,
  Visibility: styled.p<ThemeProps>`
    align-items: center;
    color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.PhilippineGray
        : Colors.GraniteGray};
    display: flex;
    font-size: 13px;
    gap: 4px;
  `,
};
