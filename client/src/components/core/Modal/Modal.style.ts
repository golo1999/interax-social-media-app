import styled, { css } from "styled-components";

import { Colors } from "environment";
import { FlexAlignItems, FlexDirection, FlexJustifyContent } from "types";

export const Background = styled.div`
  align-items: center;
  background-color: rgb(14, 14, 14, 0.9);
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100vw;
`;

interface ContainerProps {
  minHeight?: string;
  width?: string;
}

export const Container = styled.div<ContainerProps>`
  background-color: ${Colors.RaisinBlack};
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

type IconContainerProps = { isHidden?: boolean };

export const IconContainer = styled.span<IconContainerProps>`
  align-items: center;
  background-color: ${Colors.BlackOlive};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  padding: 0.25em;
  ${({ isHidden }) => isHidden && "visibility: hidden;"};
  width: fit-content;

  &:hover {
    background-color: ${Colors.DarkLiver};
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
