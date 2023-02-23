import { CSSProperties } from "react";
import styled from "styled-components";

const StyledDivider = styled.div`
  background-color: #383a3c;
  height: 2px;
`;

interface Props {
  style?: CSSProperties;
}

export function Divider({ style }: Props) {
  return <StyledDivider style={style} />;
}
