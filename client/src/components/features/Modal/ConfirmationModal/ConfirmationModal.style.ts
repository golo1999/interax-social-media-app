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
  Confirm: styled.button.attrs({ type: "button" })`
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

export const Message = styled.p<ThemeProps>`
  color: ${({ $isAuthenticated, $theme }) =>
    $isAuthenticated && $theme === "DARK"
      ? Colors.Platinum
      : Colors.DarkJungleGreen};
  font-size: smaller;
`;
