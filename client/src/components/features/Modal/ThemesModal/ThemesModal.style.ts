import styled from "styled-components";

import { Colors } from "environment";
import { Theme as ThemeType } from "types";

interface AppThemeProps {
  $isAuthenticated: boolean;
  $theme: ThemeType;
}

export const Button = {
  Cancel: styled.button.attrs({ type: "button" })<AppThemeProps>`
    background-color: inherit;
    border-radius: 5px;
    color: ${Colors.BrightNavyBlue};
    font-weight: bold;
    padding: 0.5em 1em;

    &:hover {
      background-color: ${({ $isAuthenticated, $theme }) =>
        $isAuthenticated && $theme === "DARK"
          ? Colors.BlackOlive
          : Colors.Platinum};
    }
  `,
  Save: styled.button.attrs({ type: "button" })`
    background-color: ${Colors.BrightNavyBlue};
    border-radius: 5px;
    color: ${Colors.Platinum};
    font-weight: bold;
    padding: 0.5em 2em;

    &:hover {
      background-color: ${Colors.BleuDeFrance};
    }
  `,
};

export const Default = styled.div`
  align-items: center;
  border-radius: 50%;
  display: flex;
  justify-content: center;
`;

export const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  height: fit-content;
  list-style-type: none;
`;

type ListItemProps = {
  isSelected: boolean;
} & AppThemeProps;

export const ListItem = styled.li<ListItemProps>`
  ${({ $isAuthenticated, $theme, isSelected }) =>
    isSelected &&
    `background-color: ${
      $isAuthenticated && $theme === "DARK"
        ? Colors.BlackOlive
        : Colors.AliceBlue
    };`};
  border-radius: 15px;
  padding: 0.5em;

  &:hover {
    ${({ $isAuthenticated, $theme, isSelected }) =>
      !isSelected &&
      `background-color: ${
        $isAuthenticated && $theme === "DARK"
          ? Colors.BlackOlive
          : Colors.AliceBlue
      };`}
  }
`;

interface ThemeItemProps {
  color: keyof typeof Colors;
}

export const Theme = styled.div<ThemeItemProps>`
  background-color: ${({ color }) => Colors[color]};
  border-radius: 50%;
  height: 3em;
  width: 3em;
`;
