import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "types";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

export const Button = {
  CreateNewCollection: styled.button.attrs({ type: "button" })<ThemeProps>`
    align-items: center;
    background-color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.JapaneseIndigo
        : Colors.AliceBlue};
    border-radius: 5px;
    color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.FrenchSkyBlue
        : Colors.TrueBlue};
    display: flex;
    font-size: 14px;
    font-weight: 600;
    gap: 0.5em;
    height: 36px;
    justify-content: center;
    margin: 0 0.5em;

    &:hover {
      background-color: ${({ $isAuthenticated, $theme }) =>
        $isAuthenticated && $theme === "DARK"
          ? Colors.PoliceBlue
          : Colors.AzureishWhite};
    }
  `,
};

export const Container = {
  Content: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  `,
  Main: styled.div<ThemeProps>`
    background-color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.RaisinBlack
        : Colors.White};
    display: flex;
    flex-direction: column;
    padding: 0.5em;
    width: 360px;
  `,
};

export const List = {
  Collections: styled.ul`
    display: flex;
    flex-direction: column;
    user-select: none;
  `,
};

export const Text = {
  Title: styled.h1<ThemeProps>`
    color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.Platinum
        : Colors.VampireBlack};
    font-size: 24px;
    padding: 0 0.5em 0.5em 0.5em;
  `,
  Subtitle: styled.p<ThemeProps>`
    color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.Platinum
        : Colors.VampireBlack};
    font-size: 16px;
    font-weight: 500;
    padding: 0.5em 0.5em 0 0.5em;
  `,
};
