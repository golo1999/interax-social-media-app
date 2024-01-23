import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "models";

interface ThemeProps {
  isAuthenticated: boolean;
  theme: Theme;
}

export const Container = {
  Content: styled.div`
    display: flex;
    gap: 5em;
    // margin-top for moving the content below Header
    margin-top: 55px;
    padding: 1em 0.5em;
  `,
  Main: styled.div<ThemeProps>`
    background-color: ${({ isAuthenticated, theme }) =>
      isAuthenticated && theme === "DARK"
        ? Colors.EerieBlack
        : Colors.AntiFlashWhite};
    display: flex;
    flex-direction: column;
    flex: 1;
  `,
  Posts: styled.div.attrs({ role: "main" })`
    flex: 2;
  `,
};
