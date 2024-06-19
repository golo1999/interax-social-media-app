import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "types";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

export const Container = {
  Icon: styled.span<ThemeProps>`
    align-items: center;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    padding: 0.5em 10px;

    &:hover {
      background-color: ${({ $isAuthenticated, $theme }) =>
        $isAuthenticated && $theme === "DARK"
          ? Colors.BlackOlive
          : Colors.Platinum};
    }
  `,
  Main: styled.div`
    align-items: center;
    display: flex;
    gap: 0.5em;
    user-select: none;
  `,
  User: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
  `,
};

export const Input = styled.input.attrs({ type: "text" })<ThemeProps>`
  background-color: ${({ $isAuthenticated, $theme }) =>
    $isAuthenticated && $theme === "DARK" ? Colors.BlackOlive : Colors.White};
  border: 1px solid
    ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.Platinum
        : Colors.VampireBlack};
  border-radius: 5px;
  color: ${({ $isAuthenticated, $theme }) =>
    $isAuthenticated && $theme === "DARK"
      ? Colors.Platinum
      : Colors.VampireBlack};
  flex: 1;
  padding: 0.75em 1em;

  &:focus {
    background-color: inherit;
    border-color: ${Colors.BrightNavyBlue};
  }
`;

export const Text = {
  Name: styled.p<ThemeProps>`
    color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.Platinum
        : Colors.VampireBlack};
    font-size: small;
  `,
  Nickname: styled.p<ThemeProps>`
    color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.Platinum
        : Colors.VampireBlack};
    font-weight: 500;
  `,
};
