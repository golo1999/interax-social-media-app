import { CSSProperties } from "react";
import styled from "styled-components";

import { Colors } from "environment";

const StyledDivider = styled.div<StyleProps>`
  background-color: ${Colors.Onyx};
  ${(props) => props.vertical && "display: flex;"}
  ${(props) => !props.vertical && `height: ${props.thickness};`}
  ${(props) => props.margin && `margin: ${props.margin};`};
  ${(props) => props.vertical && `width: ${props.thickness};`}
`;

type StyleProps = { margin?: string; thickness: string; vertical?: boolean };

type CommonProps = {
  style?: CSSProperties;
};

type Props = CommonProps & StyleProps;

export function Divider({ margin, style, thickness, vertical }: Props) {
  return (
    <StyledDivider
      margin={margin}
      style={style}
      thickness={thickness}
      vertical={vertical}
    />
  );
}
