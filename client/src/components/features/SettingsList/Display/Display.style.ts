import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "types";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

export const Container = {
  Content: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
  Main: styled.div`
    display: flex;
  `,
  MoonIcon: styled.div<ThemeProps>`
    display: flex;
    background-color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.BlackOlive
        : Colors.Platinum};
    border-radius: 50%;
    padding: 8px;
  `,
  Tabs: styled.div`
    display: flex;
    flex-direction: column;
  `,
};

export const Description = styled.span<ThemeProps>`
  color: ${({ $isAuthenticated, $theme }) =>
    $isAuthenticated && $theme === "DARK"
      ? Colors.PhilippineSilver
      : Colors.GraniteGray};
  font-size: 15px;
  padding-left: 12px;
`;

export const Subtitle = styled.span<ThemeProps>`
  color: ${({ $isAuthenticated, $theme }) =>
    $isAuthenticated && $theme === "DARK"
      ? Colors.Platinum
      : Colors.VampireBlack};
  font-size: 17px;
  font-weight: 600;
  padding-left: 12px;
`;
