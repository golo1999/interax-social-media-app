import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "models";

interface CommonProps {
  isSelected?: boolean;
}

interface ThemeProps {
  isAuthenticated: boolean;
  theme: Theme;
}

type ListItemProps = CommonProps & ThemeProps;

export const List = styled.ul<ThemeProps>`
  /* color: ${Colors.PhilippineSilver}; */
  color: ${({ isAuthenticated, theme }) =>
    isAuthenticated && theme === "DARK"
      ? Colors.PhilippineSilver
      : Colors.GraniteGray};
  display: flex;
  list-style-type: none;
  padding-top: 5px;
  user-select: none;
`;

export const ListItem = styled.li<ListItemProps>`
  border-radius: 5px;
  ${({ isSelected }) => isSelected && `color: ${Colors.BrilliantAzure};`}
  font-weight: 500;
  padding: 0.5em 1em;

  &:hover {
    ${({ isAuthenticated, isSelected, theme }) =>
      !isSelected &&
      (!isAuthenticated || theme === "LIGHT") &&
      `background-color: ${Colors.AntiFlashWhite};`}
    ${({ isAuthenticated, isSelected, theme }) =>
      !isSelected &&
      isAuthenticated &&
      theme === "DARK" &&
      `background-color: ${Colors.BlackOlive};`}
  }
`;

export const ListItemBottomBorder = styled.div<CommonProps>`
  ${({ isSelected }) =>
    isSelected && `background-color: ${Colors.BrilliantAzure};`}
  height: 3px;
  width: 100%;
`;

export const ListItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
