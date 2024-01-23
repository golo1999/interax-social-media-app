import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "models";

interface ThemeProps {
  isAuthenticated: boolean;
  theme: Theme;
}

export const Container = {
  MoreOptionsIcon: styled.div`
    align-items: center;
    background-color: ${Colors.BlackOlive};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    padding: 0.25em;
  `,
  Text: styled.div`
    flex: 1;
  `,
  Visibility: styled.div`
    align-items: center;
    display: flex;
    gap: 1em;
  `,
};

export const Text = {
  Normal: styled.span<ThemeProps>`
    color: ${({ isAuthenticated, theme }) =>
      isAuthenticated && theme === "DARK"
        ? Colors.Platinum
        : Colors.VampireBlack};
    font-size: 15px;
  `,
  Period: styled.p<ThemeProps>`
    color: ${({ isAuthenticated, theme }) =>
      isAuthenticated && theme === "DARK"
        ? Colors.PhilippineSilver
        : Colors.GraniteGray};
    font-size: 13px;
  `,
  SemiBold: styled.span`
    font-weight: 600;
  `,
};
