import { GrDocumentLocked } from "react-icons/gr";
import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "types";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

export const Button = styled.button.attrs({ type: "button" })`
  background-color: ${Colors.BrandeisBlue};
  border-radius: 5px;
  color: ${Colors.White};
  font-weight: 600;
  padding: 0 40px;
  height: 40px;

  &:hover {
    background-color: ${Colors.BrilliantAzure};
  }
`;

export const Container = {
  Content: styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 20px;
    justify-content: center;
    // MarginTop for moving the content below Header
    margin-top: 55px;
  `,
  Main: styled.div<ThemeProps>`
    background-color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.RaisinBlack
        : Colors.White};
    display: flex;
    flex-direction: column;
    flex: 1;
  `,
  Navigation: styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 4px;
  `,
};

export const Icon = styled(GrDocumentLocked)<ThemeProps>`
  & path {
    stroke: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.PhilippineSilver
        : Colors.GraniteGray};
  }
`;

export const Text = {
  ContentUnavailable: styled.p<ThemeProps>`
    color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.PhilippineSilver
        : Colors.GraniteGray};
    font-size: 17px;
  `,
  GoBack: styled.p<ThemeProps>`
    color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.BlueJeans
        : Colors.TrueBlue};
    cursor: pointer;
    font-weight: 500;
    user-select: none;

    &:hover {
      ${({ $isAuthenticated, $theme }) =>
        $isAuthenticated &&
        $theme === "LIGHT" &&
        "text-decoration: underline;"};
    }
  `,
};
