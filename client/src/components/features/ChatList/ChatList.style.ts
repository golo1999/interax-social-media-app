import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "models";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

type MainContainerProps = {
  isModal?: boolean;
} & ThemeProps;

export const Container = {
  GroupedMessages: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 0.5em;
    overflow: auto;
  `,
  Icon: styled.div<ThemeProps>`
    align-items: center;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    padding: 0.5em;

    &:hover {
      background-color: ${({ $isAuthenticated, $theme }) =>
        $isAuthenticated && $theme === "DARK"
          ? Colors.BlackOlive
          : Colors.AntiFlashWhite};
    }
  `,
  Main: styled.section<MainContainerProps>`
    background-color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.RaisinBlack
        : Colors.White};
    ${({ isModal }) => isModal && "border-radius: 5px;"};
    ${({ isModal }) => isModal && "bottom: 1em;"};
    ${({ isModal }) => isModal && "box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);"};
    display: flex;
    flex-direction: column;
    ${({ isModal }) => isModal && "flex: 1;"};
    padding: 0.5em;
    ${({ isModal }) => isModal && "position: fixed;"};
    ${({ isModal }) => isModal && "right: 1em;"};
    ${({ isModal }) => isModal && "top: 50px;"};
    width: 350px;
    ${({ isModal }) => isModal && "z-index: 2;"};
  `,
};

export const Footer = {
  Element: styled.footer`
    align-self: center;
    color: ${Colors.BrightNavyBlue};
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  `,
  Text: styled.span`
    font-size: 15px;
    font-weight: 600;
  `,
};

export const Header = {
  Element: styled.div`
    align-items: center;
    display: flex;
    gap: 0.5em;
    justify-content: space-between;
  `,
  IconsContainer: styled.div`
    align-items: center;
    display: flex;
    gap: 0.5em;
  `,
  Title: styled.h1<ThemeProps>`
    color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.Platinum
        : Colors.VampireBlack};
    padding: 0 0.5em;
  `,
};

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  user-select: none;
`;
