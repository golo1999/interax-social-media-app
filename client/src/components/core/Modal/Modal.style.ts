import styled, { css } from "styled-components";

import { Colors } from "environment";

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
  min-height: ${(props) => props.minHeight || "fit-content"};
  max-height: 75vh;
  width: ${(props) => props.width || "fit-content"};
`;

type IconContainerProps = { isHidden?: boolean };

export const IconContainer = styled.span<IconContainerProps>`
  align-items: center;
  background-color: ${Colors.BlackOlive};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  padding: 0.25em;
  ${(props) => props.isHidden && "visibility: hidden;"};
  width: fit-content;

  &:hover {
    background-color: ${Colors.DarkLiver};
  }
`;

type TitleProps = { color?: string };

export const Title = styled.p<TitleProps>`
  ${(props) => props.color && `color: ${props.color};`};
  font-size: larger;
  font-weight: bold;
`;

interface StyleProps {
  alignItems?: "baseline" | "center" | "flex-end" | "flex-start" | "stretch";
  color?: string;
  direction?: "column" | "column-reverse" | "row" | "row-reverse";
  gap?: string;
  justifyContent?:
    | "baseline"
    | "center"
    | "end"
    | "first baseline"
    | "flex-end"
    | "flex-start"
    | "last baseline"
    | "left"
    | "right"
    | "safe"
    | "space-around"
    | "space-between"
    | "space-evenly"
    | "start"
    | "stretch";
  padding?: string;
}

const Styles = css<StyleProps>`
  ${(props) => props.alignItems && `align-items: ${props.alignItems};`};
  ${(props) => props.color && `color: ${props.color};`};
  display: flex;
  ${(props) => props.direction && `flex-direction: ${props.direction};`};
  ${(props) => props.gap && `gap: ${props.gap};`};
  ${(props) =>
    props.justifyContent && `justify-content: ${props.justifyContent};`};
  ${(props) => props.padding && `padding: ${props.padding};`}
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
