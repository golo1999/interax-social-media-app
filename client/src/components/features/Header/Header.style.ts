import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "models";

interface ThemeProps {
  isAuthenticated: boolean;
  theme: Theme;
}

export const Container = {
  Main: styled.div<ThemeProps>`
    background-color: ${({ isAuthenticated, theme }) =>
      isAuthenticated && theme === "DARK" ? Colors.RaisinBlack : Colors.White};
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100%;
    z-index: 2;
  `,
  Top: styled.div`
    align-items: center;
    display: flex;
    flex: 1;
    justify-content: space-between;
    padding: 0 0.75em;
  `,
};
