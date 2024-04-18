import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "types";

interface ThemeProps {
  isAuthenticated: boolean;
  theme: Theme;
}

export const Container = styled.div<ThemeProps>`
  align-items: center;
  background-color: ${({ isAuthenticated, theme }) =>
    isAuthenticated && theme === "DARK" ? Colors.RaisinBlack : Colors.White};
  border-radius: 20px;
  border: 2px solid
    ${({ isAuthenticated, theme }) =>
      isAuthenticated && theme === "DARK"
        ? Colors.Onyx
        : Colors.AmericanSilver};
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;
  display: flex;
  gap: 0.5em;
  padding: 0.5em;
  position: absolute;
`;

export const Emoji = styled.img`
  transition: 0.3s ease;

  &:hover {
    transform: scale(1.3);
  }
`;
