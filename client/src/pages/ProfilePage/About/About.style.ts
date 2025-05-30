import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "types";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

export const Container = {
  End: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 0.5em;
  `,
  Start: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
  `,
};

export const List = styled.ul`
  color: ${Colors.PhilippineSilver};
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  list-style-type: none;
  user-select: none;
`;

type ListItemProps = {
  isSelected?: boolean;
} & ThemeProps;

export const ListItem = styled.li<ListItemProps>`
  ${({ $isAuthenticated, $theme, isSelected }) =>
    isSelected &&
    `background-color: ${
      $isAuthenticated && $theme === "DARK"
        ? Colors.JapaneseIndigo
        : Colors.AliceBlue
    };`}
  border-radius: 5px;
  color: ${({ $isAuthenticated, $theme, isSelected }) =>
    // Dark theme
    $isAuthenticated && $theme === "DARK"
      ? isSelected
        ? Colors.BrilliantAzure
        : Colors.PhilippineSilver
      : // Light theme
      isSelected
      ? Colors.BrandeisBlue
      : Colors.GraniteGray};
  font-weight: 500;
  padding: 0.5em;

  &:hover {
    ${({ $isAuthenticated, $theme, isSelected }) =>
      !isSelected &&
      `background-color: ${
        $isAuthenticated && $theme === "DARK"
          ? Colors.BlackOlive
          : Colors.AntiFlashWhite
      };`};
  }
`;

export const Title = styled.h3<ThemeProps>`
  color: ${({ $isAuthenticated, $theme }) =>
    $isAuthenticated && $theme === "DARK"
      ? Colors.LightGray
      : Colors.VampireBlack};
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
