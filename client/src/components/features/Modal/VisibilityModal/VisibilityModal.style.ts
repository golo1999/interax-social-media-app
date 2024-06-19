import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "types";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

type Props = {
  isSelected: boolean;
} & ThemeProps;

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
          : Colors.AntiFlashWhite};
    }
  `,
  Done: styled.button.attrs({ type: "button" })`
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

type IconContainerProps = { isHidden?: boolean };

export const IconContainer = styled.span<IconContainerProps>`
  align-items: center;
  background-color: ${Colors.BlackOlive};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  padding: 0.25em;
  ${({ isHidden }) => isHidden && "visibility: hidden;"};
  width: fit-content;

  &:hover {
    background-color: ${Colors.DarkLiver};
  }
`;

export const List = styled.ul`
  display: flex;
  flex: 1;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0.5em;
  user-select: none;
`;

export const ListItem = {
  DetailsContainer: styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
  `,
  Element: styled.li<Props>`
    align-items: center;
    ${({ $isAuthenticated, $theme, isSelected }) =>
      isSelected &&
      `background-color: ${
        $isAuthenticated && $theme === "DARK"
          ? Colors.GunMetal
          : Colors.AliceBlue
      };`};
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    gap: 1em;
    padding: 0.5em;

    &:hover {
      ${({ $isAuthenticated, $theme, isSelected }) =>
        !isSelected &&
        `background-color: ${
          $isAuthenticated && $theme === "DARK"
            ? Colors.BlackOlive
            : Colors.AntiFlashWhite
        };`}
    }
  `,
  IconContainer: styled.div<ThemeProps>`
    align-items: center;
    background-color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK" ? Colors.Arsenic : Colors.Platinum};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    padding: 1em;
  `,
  Title: styled.p<ThemeProps>`
    color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.Platinum
        : Colors.DarkJungleGreen};
    font-weight: 500;
  `,
};

export const Title = styled.p`
  font-size: larger;
`;
