import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "models";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

export const Label = {
  Container: styled.div<ThemeProps>`
    align-items: center;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 8px;
    user-select: none;

    &:hover {
      background-color: ${({ $isAuthenticated, $theme }) =>
        $isAuthenticated && $theme === "DARK"
          ? Colors.BlackOlive
          : Colors.AntiFlashWhite};
    }
  `,
  Text: styled.span<ThemeProps>`
    color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.Platinum
        : Colors.VampireBlack};
    flex: 1;
    font-size: 15px;
    font-weight: 600;
  `,
};

export const List = styled.ul<ThemeProps>`
  color: ${({ $isAuthenticated, $theme }) =>
    $isAuthenticated && $theme === "DARK"
      ? Colors.Platinum
      : Colors.VampireBlack};
  display: flex;
  flex-direction: column;
  list-style-type: none;
  user-select: none;
`;

export const ListItem = {
  Container: styled.li<ThemeProps>`
    align-items: center;
    border-radius: 5px;
    display: flex;
    font-size: 15px;
    font-weight: 500;
    gap: 12px;
    padding: 12px 8px;

    &:hover {
      background-color: ${({ $isAuthenticated, $theme }) =>
        $isAuthenticated && $theme === "DARK"
          ? Colors.BlackOlive
          : Colors.AntiFlashWhite};
    }
  `,
  Text: styled.span`
    flex: 1;
  `,
};
