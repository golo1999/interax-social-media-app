import { ButtonHTMLAttributes, ElementType } from "react";

import { Colors } from "environment";

import { Button } from "./BaseButton.style";
import { FontWeight } from "./BaseButton.types";

export interface BaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: ElementType;
  backgroundColor?: keyof typeof Colors;
  children?: string;
  color?: keyof typeof Colors;
  disabledBackgroundColor?: keyof typeof Colors;
  disabledColor?: keyof typeof Colors;
  fontSize?: number | string;
  fontWeight?: FontWeight;
  hoverBackgroundColor?: keyof typeof Colors;
  lineHeight?: number | string;
  padding?: number | string;
  onClick?: () => void;
}

export function BaseButton({
  as,
  backgroundColor,
  children,
  color,
  disabledBackgroundColor,
  disabledColor,
  fontSize,
  fontWeight,
  hoverBackgroundColor,
  lineHeight,
  padding,
  onClick,
  ...props
}: BaseButtonProps) {
  return (
    <Button
      {...props}
      as={as}
      backgroundColor={backgroundColor}
      color={color}
      disabledBackgroundColor={disabledBackgroundColor}
      disabledColor={disabledColor}
      fontSize={fontSize}
      fontWeight={fontWeight}
      hoverBackgroundColor={hoverBackgroundColor}
      lineHeight={lineHeight}
      padding={padding}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
