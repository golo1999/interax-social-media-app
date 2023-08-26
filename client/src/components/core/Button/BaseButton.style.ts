import styled from "styled-components";

import { Colors } from "environment";

import { FontWeight } from "./BaseButton.types";

interface Props {
  backgroundColor?: keyof typeof Colors;
  color?: keyof typeof Colors;
  disabledBackgroundColor?: keyof typeof Colors;
  disabledColor?: keyof typeof Colors;
  fontSize?: number | string;
  fontWeight?: FontWeight;
  hoverBackgroundColor?: keyof typeof Colors;
  lineHeight?: number | string;
  padding?: number | string;
}

export const Button = styled.button<Props>`
  ${({ backgroundColor }) =>
    backgroundColor && `background-color: ${Colors[backgroundColor]};`};
  ${({ disabled, disabledBackgroundColor }) =>
    disabled &&
    disabledBackgroundColor &&
    `background-color: ${Colors[disabledBackgroundColor]};`};
  border-radius: 6px;
  ${({ color, disabled }) => color && !disabled && `color: ${Colors[color]};`}
  ${({ disabled, disabledColor }) =>
    disabled && disabledColor && `color: ${disabledColor};`}
  ${({ disabled }) => disabled && "cursor: not-allowed;"};
  ${({ fontSize }) => fontSize && `font-size: ${fontSize};`}
  ${({ fontWeight }) => fontWeight && `font-weight: ${fontWeight};`}
  ${({ lineHeight }) => lineHeight && `line-height: ${lineHeight};`};
  ${({ padding }) => padding && `padding: ${padding};`}

  &:hover {
    ${({ hoverBackgroundColor, disabled }) =>
      hoverBackgroundColor &&
      !disabled &&
      `background-color: ${Colors[hoverBackgroundColor]};`}
  }
`;
