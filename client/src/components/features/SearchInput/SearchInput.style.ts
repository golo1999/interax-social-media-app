import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "types";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

export const Container = styled.div<ThemeProps>`
  align-items: center;
  background-color: ${({ $isAuthenticated, $theme }) =>
    $isAuthenticated && $theme === "DARK"
      ? Colors.BlackOlive
      : Colors.AntiFlashWhite};
  border-radius: 20px;
  display: flex;
  gap: 0.25em;
  padding: 0.5em;
`;

export const Input = styled.input.attrs({ type: "text" })`
  background-color: inherit;
  border-radius: 20px;
  color: ${Colors.GraniteGray};
  flex: 1;
  font-size: 15px;
  padding: 0.25em;

  &::placeholder {
    color: ${Colors.GraniteGray};
  }
`;
