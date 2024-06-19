import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "types";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

type IconContainerProps = { isHidden?: boolean } & ThemeProps;

export const Button = styled.input.attrs({ type: "submit" })`
  background-color: ${({ disabled }) =>
    disabled ? Colors.DarkLiver : Colors.BrightNavyBlue};
  border-radius: 5px;
  color: ${({ disabled }) =>
    disabled ? Colors.PhilippineGray : Colors.Platinum};
  cursor: ${({ disabled }) => (disabled ? "no-drop" : "default")};
  flex: 1;
  font-weight: 600;
  padding: 0.75em;

  &:hover {
    ${({ disabled }) =>
      !disabled && `background-color: ${Colors.BleuDeFrance};`};
  }
`;

export const Container = {
  Icon: styled.span<IconContainerProps>`
    align-items: center;
    background-color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.BlackOlive
        : Colors.AntiFlashWhite};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    padding: 0.25em;
    ${({ isHidden }) => isHidden && "visibility: hidden;"};
    width: fit-content;

    &:hover {
      background-color: ${({ $isAuthenticated, $theme }) =>
        $isAuthenticated && $theme === "DARK"
          ? Colors.DarkLiver
          : Colors.Platinum};
    }
  `,
  Visibility: styled.div<ThemeProps>`
    align-items: center;
    background-color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.BlackOlive
        : Colors.Platinum};
    border-radius: 5px;
    color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.Platinum
        : Colors.DarkJungleGreen};
    display: flex;
    gap: 0.15em;
    padding: 0.2em 0.25em;
    user-select: none;
    width: fit-content;
  `,
};

export const TextArea = styled.textarea<ThemeProps>`
  caret-color: ${({ $isAuthenticated, $theme }) =>
    $isAuthenticated && $theme === "DARK"
      ? Colors.MetallicSilver
      : Colors.DarkLiver};
  background-color: inherit;
  color: ${({ $isAuthenticated, $theme }) =>
    $isAuthenticated && $theme === "DARK"
      ? Colors.MetallicSilver
      : Colors.DarkJungleGreen};
  flex: 1;
  font-size: x-large;
  resize: none;

  &::placeholder {
    color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.MetallicSilver
        : Colors.DarkLiver};
  }
`;

export const Title = styled.p<ThemeProps>`
  color: ${({ $isAuthenticated, $theme }) =>
    $isAuthenticated && $theme === "DARK"
      ? Colors.Platinum
      : Colors.VampireBlack};
  font-size: larger;
`;
