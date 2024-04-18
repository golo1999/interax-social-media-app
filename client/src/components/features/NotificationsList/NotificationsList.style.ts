import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "types";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

type MainContainerProps = { isModal?: boolean } & ThemeProps;

export const Container = {
  Content: styled.div`
    display: flex;
    flex-direction: column;
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
  // Main: styled.div<MainContainerProps>`
  //   background-color: ${({ $isAuthenticated, $theme }) =>
  //     $isAuthenticated && $theme === "DARK"
  //       ? Colors.RaisinBlack
  //       : Colors.White};
  //   border-radius: 5px;
  //   ${({ isModal }) => isModal && "bottom: 1em;"};
  //   box-shadow: ${({ isModal }) =>
  //     isModal
  //       ? "0 3px 10px rgb(0 0 0 / 0.2)"
  //       : "rgba(0, 0, 0, 0.2) 0px 1px 2px 0px"};
  //   display: flex;
  //   flex-direction: column;
  //   gap: 8px;
  //   overflow-y: auto;
  //   padding: 0.5em;
  //   ${({ isModal }) => isModal && "position: fixed;"};
  //   ${({ isModal }) => isModal && "right: 1em;"};
  //   ${({ isModal }) => isModal && "top: 50px;"};
  //   ${({ isModal }) => isModal && "width: 350px;"};
  //   ${({ isModal }) => isModal && "z-index: 2;"};
  // `,
  Main: {
    Inner: styled.div<MainContainerProps>`
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow-y: auto;
      position: relative;
      scrollbar-width: thin;
    `,
    Outer: styled.div<MainContainerProps>`
      background-color: ${({ $isAuthenticated, $theme }) =>
        $isAuthenticated && $theme === "DARK"
          ? Colors.RaisinBlack
          : Colors.White};
      border-radius: 5px;
      ${({ isModal }) => isModal && "bottom: 1em;"};
      box-shadow: ${({ isModal }) =>
        isModal
          ? "0 3px 10px rgb(0 0 0 / 0.2)"
          : "rgba(0, 0, 0, 0.2) 0px 1px 2px 0px"};
      display: flex;
      padding: 8px;
      ${({ isModal }) => isModal && "position: fixed;"};
      ${({ isModal }) => isModal && "right: 1em;"};
      ${({ isModal }) => isModal && "top: 50px;"};
      ${({ isModal }) => isModal && "width: 350px;"};
      ${({ isModal }) => isModal && "z-index: 2;"};
    `,
  },
  Options: styled.div`
    display: flex;
    gap: 8px;
    padding-left: 8px;
    user-select: none;
  `,
  SeeAll: styled.div`
    display: flex;
    justify-content: flex-end;
  `,
};

export const Header = {
  Element: styled.div`
    align-items: center;
    display: flex;
    gap: 0.5em;
    justify-content: space-between;
    /* position: relative; */
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
    font-size: 24px;
    padding: 0 0.5em;
  `,
};

type OptionProps = { isSelected?: boolean } & ThemeProps;

export const Option = styled.div<OptionProps>`
  align-items: center;
  ${({ $isAuthenticated, $theme, isSelected }) =>
    isSelected &&
    `background-color: ${
      $isAuthenticated && $theme === "DARK"
        ? "rgba(29, 133, 252, 0.2)"
        : Colors.AliceBlue
    };`};
  border-radius: 18px;
  color: ${({ $isAuthenticated, $theme, isSelected }) =>
    $isAuthenticated && $theme === "DARK"
      ? isSelected
        ? Colors.FrenchSkyBlue
        : Colors.Platinum
      : isSelected
      ? Colors.TrueBlue
      : Colors.VampireBlack};
  display: flex;
  font-size: 15px;
  font-weight: 600;
  height: 36px;
  padding: 0 12px;

  &:hover {
    background-color: ${({ $isAuthenticated, $theme, isSelected }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.BlackOlive
        : Colors.AntiFlashWhite};
  }
`;

export const SeeAll = styled.span<ThemeProps>`
  border-radius: 6px;
  color: ${({ $isAuthenticated, $theme }) =>
    $isAuthenticated && $theme === "DARK" ? Colors.BlueJeans : Colors.TrueBlue};
  padding: 8px;
  user-select: none;

  &:hover {
    background-color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.BlackOlive
        : Colors.AntiFlashWhite};
  }
`;
