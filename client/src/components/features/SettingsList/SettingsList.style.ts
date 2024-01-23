import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "models";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

type MainContainerProps = { height: number } & ThemeProps;

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
  ContentTitle: styled.div`
    display: flex;
    gap: 12px;
    padding-bottom: 20px;
  `,
  Main: styled.div<MainContainerProps>`
    background-color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.RaisinBlack
        : Colors.White};
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px,
      rgba(0, 0, 0, 0.1) 0px 2px 4px 0px;
    color: white;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 0.5em;
    position: fixed;
    right: 1em;
    top: 50px;
    // If there is content that overflows the container
    ${({ height }) => height > window.innerHeight - 50 && "bottom: 1em;"}
    width: 350px;
    z-index: 2;
  `,
};

export const ContentTitle = styled.h2<ThemeProps>`
  color: ${({ $isAuthenticated, $theme }) =>
    $isAuthenticated && $theme === "DARK"
      ? Colors.Platinum
      : Colors.VampireBlack};
`;
