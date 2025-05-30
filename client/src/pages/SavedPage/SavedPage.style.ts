import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "types";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

export const Button = {
  ShowMore: styled.button<ThemeProps>`
    align-items: center;
    background-color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.BlackOlive
        : Colors.Platinum};
    border-radius: 5px;
    color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.LightGray
        : Colors.DarkJungleGreen};
    display: flex;
    justify-content: center;
    height: 36px;
    line-height: 16px;
    padding: 10px 16px;
    width: 48px;

    &:hover {
      background-color: ${({ $isAuthenticated, $theme }) =>
        $isAuthenticated && $theme === "DARK"
          ? Colors.DarkLiver
          : Colors.Gainsboro};
    }
  `,
};

export const Container = {
  Content: styled.div`
    display: flex;
    flex: 1;
    margin-top: 55px;
    max-height: calc(100vh - 55px);
  `,
  Main: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
  `,
  Menu: styled.div`
    position: relative;
  `,
  SavedPosts: {
    Inner: styled.div`
      display: flex;
      flex-direction: column;
      gap: 1em;
    `,
    Title: styled.div`
      align-items: center;
      display: flex;
      gap: 1em;
      height: 36px;
      justify-content: space-between;
    `,
    Outer: styled.div<ThemeProps>`
      background-color: ${({ $isAuthenticated, $theme }) =>
        $isAuthenticated && $theme === "DARK"
          ? Colors.EerieBlack
          : Colors.AntiFlashWhite};
      display: flex;
      flex-direction: column;
      flex: 1;
      gap: 1em;
      padding: 1em 2em;
    `,
  },
};

export const Text = {
  Title: styled.h3<ThemeProps>`
    color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.Platinum
        : Colors.VampireBlack};
  `,
};
