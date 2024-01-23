import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "models";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

export const Container = {
  Main: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  `,
  User: styled.div`
    border-radius: 5px;
    overflow: hidden;
    padding: 0.5em;
    text-overflow: ellipsis;
    user-select: none;
    white-space: nowrap;

    &:hover {
      background-color: ${Colors.BlackOlive};
    }
  `,
};

export const Title = styled.span<ThemeProps>`
  color: ${({ $isAuthenticated, $theme }) =>
    $isAuthenticated && $theme === "DARK"
      ? Colors.PhilippineSilver
      : Colors.VampireBlack};
  font-size: 17px;
  font-weight: 600;
`;
