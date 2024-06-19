import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "types";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

export const Container = {
  Main: styled.div<ThemeProps>`
    background-color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.RaisinBlack
        : Colors.White};
    border-radius: 8px;
    box-shadow: 0 12px 28px 0
      ${({ $isAuthenticated, $theme }) =>
        $isAuthenticated && $theme === "DARK"
          ? "rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.5)"
          : "rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.2)"};
    display: flex;
    flex-direction: column;
    padding: 8px;
    position: absolute;
    right: 16px;
    top: 0;
    z-index: 1;
  `,
};
