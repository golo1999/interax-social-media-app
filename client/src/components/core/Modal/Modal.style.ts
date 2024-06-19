import styled, { css } from "styled-components";

import { Colors } from "environment";
import {
  FlexAlignItems,
  FlexDirection,
  FlexJustifyContent,
  Theme,
} from "types";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

type BackgroundProps = {
  $scrollPosition: number;
} & ThemeProps;

export const Background = styled.div<BackgroundProps>`
  align-items: center;
  background-color: ${({ $isAuthenticated, $theme }) =>
    $isAuthenticated && $theme === "DARK"
      ? "rgb(14, 14, 14, 0.9)"
      : "rgb(228, 230, 235, 0.9)"};
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: absolute;
  top: ${({ $scrollPosition }) => $scrollPosition}px;
  width: 100vw;
  z-index: 9999;
`;

type ContainerProps = {
  minHeight?: string;
  width?: string;
} & ThemeProps;

export const Container = styled.div<ContainerProps>`
  background-color: ${({ $isAuthenticated, $theme }) =>
    $isAuthenticated && $theme === "DARK" ? Colors.RaisinBlack : Colors.White};
  border-radius: 5px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  display: flex;
  flex-direction: column;
  /* min-height: 50vh; */
  min-height: ${({ minHeight }) => minHeight || "fit-content"};
  max-height: 75vh;
  /* width: 550px; */
  width: ${({ width }) => width || "fit-content"};
`;

type IconContainerProps = { isHidden?: boolean } & ThemeProps;

export const IconContainer = styled.span<IconContainerProps>`
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
`;

type TitleProps = { color?: keyof typeof Colors };

export const Title = styled.p<TitleProps>`
  ${({ color }) => color && `color: ${Colors[color]};`};
  font-size: larger;
  font-weight: bold;
`;

interface StyleProps {
  alignItems?: FlexAlignItems;
  color?: keyof typeof Colors;
  direction?: FlexDirection;
  gap?: string;
  justifyContent?: FlexJustifyContent;
  padding?: string;
}

const Styles = css<StyleProps>`
  ${({ alignItems }) => alignItems && `align-items: ${alignItems};`};
  ${({ color }) => color && `color: ${Colors[color]};`};
  display: flex;
  ${({ direction }) => direction && `flex-direction: ${direction};`};
  ${({ gap }) => gap && `gap: ${gap};`};
  ${({ justifyContent }) =>
    justifyContent && `justify-content: ${justifyContent};`};
  ${({ padding }) => padding && `padding: ${padding};`}
`;

export const Body = styled.div`
  ${Styles};
  flex: 1;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0.5em;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${Colors.DarkLiver};
  }
`;

export const Footer = styled.div`
  ${Styles}
`;

export const Header = styled.div`
  ${Styles}
`;
