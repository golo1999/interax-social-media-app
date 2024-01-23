import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "models";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

export const Container = {
  Content: styled.div`
    display: flex;
    flex: 1;
    margin-top: 55px;
    max-height: calc(100vh - 55px);
  `,
  Main: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
  `,
  Navigation: styled.div<ThemeProps>`
    background-color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.RaisinBlack
        : Colors.White};
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    padding: 1em 0.5em;
    width: 350px;
  `,
  NavigationItem: styled.div<ThemeProps>`
    background-color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.EerieBlack
        : Colors.AntiFlashWhite};
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;
    padding: 2em;
  `,
};

export const List = styled.ul`
  display: grid;
  gap: 0.5em;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  list-style-type: none;
`;

export const ListItem = styled.li<ThemeProps>`
  background-color: ${({ $isAuthenticated, $theme }) =>
    $isAuthenticated && $theme === "DARK" ? Colors.RaisinBlack : Colors.White};
  border-radius: 5px;
  border: 1px solid
    ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.Arsenic
        : Colors.AmericanSilver};
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;
  display: flex;
  flex-direction: column;
`;

export const NavigationTitle = styled.h1<ThemeProps>`
  color: ${({ $isAuthenticated, $theme }) =>
    $isAuthenticated && $theme === "DARK"
      ? Colors.Platinum
      : Colors.VampireBlack};
  font-size: 24px;
  padding: 0 0.5em;
`;

export const SectionHeader = styled.div`
  align-items: center;
  display: flex;
  gap: 1em;
  justify-content: space-between;
`;

export const SectionNoData = styled.p`
  color: ${Colors.Platinum};
`;

export const SectionTitle = styled.span<ThemeProps>`
  color: ${({ $isAuthenticated, $theme }) =>
    $isAuthenticated && $theme === "DARK"
      ? Colors.Platinum
      : Colors.VampireBlack};
  font-size: 20px;
  font-weight: bold;
`;

export const SeeButton = styled.button.attrs({ type: "button" })<ThemeProps>`
  background-color: inherit;
  border-radius: 5px;
  color: ${({ $isAuthenticated, $theme }) =>
    $isAuthenticated && $theme === "DARK" ? Colors.TuftsBlue : Colors.TrueBlue};
  font-size: 17px;
  padding: 0.5em;
  user-select: none;

  &:hover {
    background-color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.BlackOlive
        : Colors.Platinum};
  }
`;
