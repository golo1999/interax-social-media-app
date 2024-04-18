import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "types";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

export const Button = {
  Confirm: styled.button.attrs({ type: "button" })`
    background-color: ${Colors.BrightNavyBlue};
    border-radius: 5px;
    color: ${Colors.White};
    font-size: 15px;
    font-weight: 600;
    padding: 0.5em;

    &:hover {
      background-color: ${Colors.BleuDeFrance};
    }
  `,
  Remove: styled.button.attrs({ type: "button" })<ThemeProps>`
    background-color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.BlackOlive
        : Colors.Platinum};
    border-radius: 5px;
    color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.Platinum
        : Colors.DarkJungleGreen};
    font-size: 15px;
    font-weight: 600;
    padding: 0.5em;

    &:hover {
      background-color: ${({ $isAuthenticated, $theme }) =>
        $isAuthenticated && $theme === "DARK"
          ? Colors.DarkLiver
          : Colors.Gainsboro};
    }
  `,
  SeeMore: styled.button.attrs({ type: "button" })<ThemeProps>`
    align-items: center;
    background-color: inherit;
    border-radius: 5px;
    color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.FrenchSkyBlue
        : Colors.TrueBlue};
    display: flex;
    font-size: 17px;
    font-weight: 600;
    justify-content: center;
    padding: 0.5em 0;

    &:hover {
      background-color: ${({ $isAuthenticated, $theme }) =>
        $isAuthenticated && $theme === "DARK"
          ? Colors.DarkCharcoal
          : Colors.Platinum};
    }
  `,
};

interface DisplayedNameContainerProps {
  mutualFriendsCount: number;
}

export const Container = {
  DisplayedName: styled.div<DisplayedNameContainerProps>`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    ${({ mutualFriendsCount }) =>
      mutualFriendsCount === 0 && "padding-bottom: 0.25em;"};
  `,
  Main: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
  `,
  MutualFriends: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25em;
    padding: 0 0.5em 0.5em 0.5em;
    flex: 1;
    justify-content: flex-end;
  `,
};

export const DisplayedName = styled.span<ThemeProps>`
  color: ${({ $isAuthenticated, $theme }) =>
    $isAuthenticated && $theme === "DARK"
      ? Colors.Platinum
      : Colors.VampireBlack};
  cursor: pointer;
  font-size: 17px;
  font-weight: 600;
  overflow: hidden;
  padding: 0 0.5em 0.25em 0.5em;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`;

export const MutualFriends = styled.span<ThemeProps>`
  color: ${({ $isAuthenticated, $theme }) =>
    $isAuthenticated && $theme === "DARK"
      ? Colors.PhilippineGray
      : Colors.GraniteGray};
  cursor: default;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
