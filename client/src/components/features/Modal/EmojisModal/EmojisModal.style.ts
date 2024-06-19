import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "types";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

export const Button = {
  Cancel: styled.button.attrs({ type: "button" })<ThemeProps>`
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

export const List = styled.ul`
  color: ${Colors.Platinum};
  display: grid;
  gap: 0.5em;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  height: fit-content;
  list-style-type: none;
`;

type ListItemProps = {
  isSelected: boolean;
} & ThemeProps;

export const ListItem = styled.li<ListItemProps>`
  ${({ $isAuthenticated, $theme, isSelected }) =>
    isSelected &&
    `background-color: ${
      $isAuthenticated && $theme === "DARK"
        ? Colors.BlackOlive
        : Colors.AliceBlue
    };`};
  border-radius: 10px;
  padding: 0.5em 10px;

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
