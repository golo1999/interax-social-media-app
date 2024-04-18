import { CSSProperties, InputHTMLAttributes } from "react";

import { Colors } from "environment";
import { BorderStyle, FontWeight } from "types";

import { Input as StyledInput } from "./Input.style";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  backgroundColor?: keyof typeof Colors;
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
  style?: CSSProperties;
  width?: number | string;
}

export function Input({
  backgroundColor = "White",
  borderColor,
  borderStyle,
  borderWidth,
  color,
  focusedBorderColor,
  focusedPlaceholderColor,
  fontSize,
  fontWeight,
  height,
  hoveredBorderColor,
  padding,
  placeholderColor,
  style,
  width,
  ...props
}: Props) {
  return (
    <StyledInput
      {...props}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderStyle={borderStyle}
      borderWidth={borderWidth}
      color={color}
      focusedBorderColor={focusedBorderColor}
      focusedPlaceholderColor={focusedPlaceholderColor}
      fontSize={fontSize}
      fontWeight={fontWeight}
      height={height}
      hoveredBorderColor={hoveredBorderColor}
      padding={padding}
      placeholderColor={placeholderColor}
      style={style}
      width={width}
    />
  );
}
