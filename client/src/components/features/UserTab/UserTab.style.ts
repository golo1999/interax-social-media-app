import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "types";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

type ContainerProps = {
  isSelected?: boolean;
} & ThemeProps;

export const Container = styled.div<ContainerProps>`
  align-items: center;
  border-radius: 5px;
  display: flex;
  gap: 0.5em;
  padding: 0.75em;

  &:hover {
    ${({ $isAuthenticated, $theme, isSelected }) =>
      !isSelected &&
      `background-color: ${
        $isAuthenticated && $theme === "DARK"
          ? Colors.BlackOlive
          : Colors.Platinum
      };`};
  }
`;

export const Name = styled.span<ThemeProps>`
  color: ${({ $isAuthenticated, $theme }) =>
    $isAuthenticated && $theme === "DARK"
      ? Colors.Platinum
      : Colors.VampireBlack};
  font-size: 17px;
  font-weight: 600;
  user-select: none;
`;
