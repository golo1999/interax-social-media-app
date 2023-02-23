import { CSSProperties } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  background-color: #242526;
  border-radius: 5px;
  color: #abadb1;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
`;

interface Props {
  children: React.ReactNode;
  style?: CSSProperties;
}

export function Container({ children, style }: Props) {
  return <StyledContainer style={style}>{children}</StyledContainer>;
}
