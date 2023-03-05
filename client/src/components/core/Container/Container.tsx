import { CSSProperties, ReactNode } from "react";
import styled from "styled-components";

const StyledContainer = styled.div<StyleProps>`
  background-color: #242526;
  border-radius: 5px;
  color: #abadb1;
  display: flex;
  ${(props) => props.vertical && "flex-direction: column;"}
  gap: 0.5em;
  padding: ${(props) => props.padding || "1em"};
`;

type CommonProps = {
  children: ReactNode;
  style?: CSSProperties;
};

type StyleProps = { padding?: string; vertical?: boolean };

type Props = CommonProps & StyleProps;

export function Container({ children, padding, style, vertical }: Props) {
  return (
    <StyledContainer padding={padding} vertical={vertical} style={style}>
      {children}
    </StyledContainer>
  );
}
