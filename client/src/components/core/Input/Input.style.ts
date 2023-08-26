import styled from "styled-components";

import { Colors } from "environment";

import type { FontWeight } from "../Button/BaseButton.types";

import type { BorderStyle } from "./Input.types";

interface Props {
  backgroundColor: keyof typeof Colors;
  borderColor?: keyof typeof Colors;
  borderStyle?: BorderStyle;
  borderWidth?: string;
  color?: keyof typeof Colors;
  focusedBorderColor?: keyof typeof Colors;
  focusedPlaceholderColor?: keyof typeof Colors;
  fontSize?: number | string;
  fontWeight?: FontWeight;
  height?: number | string;
  hoveredBorderColor?: keyof typeof Colors;
  padding?: number | string;
  placeholderColor?: keyof typeof Colors;
  width?: number | string;
}

export const Input = styled.input<Props>`
  background-color: ${({ backgroundColor }) => Colors[backgroundColor]};
  border-radius: 6px;
  ${({ borderColor }) =>
    borderColor && `border-color: ${Colors[borderColor]};`};
  ${({ borderStyle }) => borderStyle && `border-style: ${borderStyle};`};
  ${({ borderWidth }) => borderWidth && `border-width: ${borderWidth};`};
  ${({ color }) => color && `color: ${Colors[color]};`};
  ${({ fontSize }) => fontSize && `font-size: ${fontSize};`};
  ${({ fontWeight }) => fontWeight && `font-weight: ${fontWeight};`};
  ${({ height }) => height && `height: ${height};`};
  ${({ padding }) => padding && `padding: ${padding};`};
  ${({ width }) => width && `width: ${width};`};

  &:hover {
    ${({ hoveredBorderColor }) =>
      hoveredBorderColor && `border-color: ${Colors[hoveredBorderColor]};`}
  }

  &:focus {
    ${({ focusedBorderColor }) =>
      focusedBorderColor && `border-color: ${Colors[focusedBorderColor]};`}

    &::placeholder {
      ${({ focusedPlaceholderColor }) =>
        focusedPlaceholderColor && `color: ${Colors[focusedPlaceholderColor]};`}
    }
  }

  &::placeholder {
    ${({ placeholderColor }) =>
      placeholderColor && `color: ${Colors[placeholderColor]};`};
  }
`;
