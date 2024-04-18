import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "types";

interface ThemeProps {
  isAuthenticated: boolean;
  theme: Theme;
}

export const InnerContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 0.5em;
  margin-top: 0.5em;
`;

export const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OwnerDetails = {
  Badge: styled.p`
    font-size: 0.6em;
  `,
  Container: styled.div<ThemeProps>`
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
};

export const Reactions = {
  Container: styled.div`
    align-items: center;
    display: flex;
    font-size: 0.7em;
    gap: 0.5em;
    position: relative;
    user-select: none;
  `,
};
