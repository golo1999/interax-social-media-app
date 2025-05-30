import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "types";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

export const Button = {
  UnsavePost: styled.button.attrs({ type: "button" })<ThemeProps>`
    align-items: center;
    background-color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.BlackOlive
        : Colors.Platinum};
    border-radius: 6px;
    color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.Platinum
        : Colors.VampireBlack};
    cursor: pointer;
    display: flex;
    font-size: 15px;
    font-weight: 500;
    gap: 0.5em;
    height: 32px;
    padding: 0 40px;

    &:hover {
      background-color: ${({ $isAuthenticated, $theme }) =>
        $isAuthenticated && $theme === "DARK"
          ? Colors.DarkLiver
          : Colors.AmericanSilver};
    }
  `,
};

export const Container = {
  Main: styled.div<ThemeProps>`
    align-items: center;
    background-color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.RaisinBlack
        : Colors.White};
    border-radius: 5px;
    display: flex;
    gap: 1em;
    padding: 1em;
  `,
  PostDetails: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
  `,
};

export const Text = {
  Collection: styled.p<ThemeProps>`
    color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.PhilippineSilver
        : Colors.VampireBlack};
    font-size: 12px;
  `,
  CollectionName: styled.span<ThemeProps>`
    color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.Platinum
        : Colors.VampireBlack};
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  `,
  SavedPostText: styled.p<ThemeProps>`
    color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.Platinum
        : Colors.VampireBlack};
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
  `,
};
