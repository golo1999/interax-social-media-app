import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "types";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

export const Container = {
  Main: styled.div.attrs({ role: "complementary" })`
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: 350px;
  `,
  Options: styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 0.5em;
  `,
};

export const StyledUser = {
  Active: styled.span<ThemeProps>`
    color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.PhilippineSilver
        : Colors.GraniteGray};
    font-size: 13px;
  `,
  Container: {
    Details: styled.div`
      align-items: center;
      display: flex;
      flex-direction: column;
    `,
    Main: styled.div`
      align-items: center;
      align-self: center;
      display: flex;
      flex-direction: column;
      gap: 0.5em;
      padding-top: 1em;
    `,
  },
  DisplayedName: styled.span<ThemeProps>`
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.Platinum
        : Colors.VampireBlack};
    display: -webkit-box;
    font-size: 17px;
    font-weight: 600;
    line-clamp: 1;
    overflow: hidden;
    white-space: pre-wrap;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  `,
};
