import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "types";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

export const Container = {
  Main: styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    /* right: 14px;
    top: 36px;
    z-index: 1; */
    right: 26px;
    top: 44px;
    /* z-index: 3; */
  `,
  Tabs: styled.div<ThemeProps>`
    background-color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK" ? Colors.BlackOlive : Colors.White};
    border-radius: 10px 0 10px 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px,
      rgba(0, 0, 0, 0.1) 0px 2px 4px 0px;
    padding: 8px;
    user-select: none;
    width: 344px;
  `,
  Triangle: styled.div`
    display: flex;
    filter: drop-shadow(rgba(0, 0, 0, 0.05) 2px -6px 3px);
    justify-content: flex-end;
  `,
};

export const Triangle = styled.div<ThemeProps>`
  background-color: ${({ $isAuthenticated, $theme }) =>
    $isAuthenticated && $theme === "DARK" ? Colors.BlackOlive : Colors.White};
  clip-path: polygon(100% 0%, 100% 100%, 0% 100%);
  height: 20px;
  width: 20px;
`;
