import { CSSProperties } from "react";

import { Colors } from "environment";

import { Divider as StyledDivider } from "./Divider.style";

type StyleProps = {
  color?: keyof typeof Colors;
  margin?: string;
  thickness?: string;
  vertical?: boolean;
};

type CommonProps = {
  style?: CSSProperties;
};

type Props = CommonProps & StyleProps;

export function Divider({
  color = "Onyx",
  margin,
  style,
  thickness = "1px",
  vertical = false,
}: Props) {
  return (
    <StyledDivider
      color={color}
      margin={margin}
      style={style}
      thickness={thickness}
      vertical={vertical}
    />
  );
}
