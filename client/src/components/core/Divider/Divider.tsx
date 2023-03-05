import { CSSProperties } from "react";
import styled from "styled-components";

const StyledDivider = styled.div<StyleProps>`
  background-color: #383a3c;
  ${(props) => props.vertical && "display: flex;"}
  ${(props) => !props.vertical && "height: 2px;"}
  ${(props) => props.vertical && "width: 2px;"}
`;

type StyleProps = { vertical?: boolean };

type CommonProps = {
  style?: CSSProperties;
};

type Props = CommonProps & StyleProps;

export function Divider({ style, vertical }: Props) {
  return <StyledDivider style={style} vertical={vertical} />;
}
