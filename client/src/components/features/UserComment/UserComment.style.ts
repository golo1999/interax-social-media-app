import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "types";

interface ThemeProps {
  isAuthenticated: boolean;
  theme: Theme;
}

export const Container = {
  Inner: styled.div`
    align-items: center;
    display: flex;
    gap: 0.5em;
    margin-top: 0.5em;
  `,
  Outer: styled.div`
    display: flex;
    flex-direction: column;
  `,
  OwnerDetails: styled.div<ThemeProps>`
    background-color: ${({ isAuthenticated, theme }) =>
      isAuthenticated && theme === "DARK"
        ? Colors.BlackOlive
        : Colors.AntiFlashWhite};
    border-radius: 20px;
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 5px 10px;
  `,
  Reactions: styled.div`
    align-items: center;
    display: flex;
    font-size: 0.7em;
    gap: 0.5em;
    position: relative;
    user-select: none;
  `,
  Replies: styled.div`
    padding: 5px 0 5px 37px;
  `,
};

export const Text = {
  OwnerDetails: {
    Badge: styled.p`
      font-size: 0.6em;
    `,
    Name: styled.p<ThemeProps>`
      color: ${({ isAuthenticated, theme }) =>
        isAuthenticated && theme === "DARK"
          ? Colors.Platinum
          : Colors.VampireBlack};
      font-size: 13px;
      font-weight: 600;
      user-select: none;
    `,
    Text: styled.p<ThemeProps>`
      color: ${({ isAuthenticated, theme }) =>
        isAuthenticated && theme === "DARK"
          ? Colors.Platinum
          : Colors.VampireBlack};
      font-size: 15px;
    `,
  },
  ShowMoreReplies: styled.p`
    cursor: pointer;
    width: fit-content;

    &:hover {
      text-decoration: underline;
    }
  `,
};
