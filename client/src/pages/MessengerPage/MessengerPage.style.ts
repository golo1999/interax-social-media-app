import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "types";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

export const Container = {
  Chat: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
  `,
  ChatHeader: styled.div`
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 4px 0px;
    display: flex;
    gap: 0.5em;
    justify-content: space-between;
    padding: 0.5em;
    user-select: none;
  `,
  Content: styled.div`
    display: flex;
    flex: 1;
    margin-top: 55px;
    max-height: calc(100vh - 55px);
  `,
  Icon: styled.div`
    align-items: center;
    border-radius: 50%;
    display: flex;
    padding: 0.25em;

    &:hover {
      background-color: ${Colors.BlackOlive};
    }
  `,
  Icons: styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
  `,
  Main: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
  `,
  User: styled.div<ThemeProps>`
    align-items: center;
    border-radius: 5px;
    display: flex;
    gap: 0.5em;
    padding: 0.25em;
    transition: 0.3s ease;

    &:hover {
      background-color: ${({ $isAuthenticated, $theme }) =>
        $isAuthenticated && $theme === "DARK"
          ? Colors.BlackOlive
          : Colors.AntiFlashWhite};
    }
  `,
};

export const User = {
  Active: styled.div<ThemeProps>`
    color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.PhilippineSilver
        : Colors.GraniteGray};
    font-size: 13px;
  `,
  DetailsContainer: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Name: styled.div<ThemeProps>`
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.Platinum
        : Colors.VampireBlack};
    display: -webkit-box;
    font-size: 17px;
    font-weight: 600;
    line-clamp: 1;
    overflow: hidden;
    white-space: pre-wrap;
  `,
};
