import { CSSProperties, ReactNode } from "react";
import styled from "styled-components";

import { Colors } from "environment";

const StyledContainer = styled.div<StyleProps>`
  background-color: ${Colors.RaisinBlack};
  border-radius: 5px;
  color: ${Colors.SilverChalice};
  display: flex;
  ${({ vertical }) => vertical && "flex-direction: column;"}
  gap: ${({ gap }) => (gap ||= "0.5em;")};
  padding: ${({ padding }) => padding || "1em"};
`;

type CommonProps = {
  children?: ReactNode;
  style?: CSSProperties;
};

type StyleProps = { gap?: string; padding?: string; vertical?: boolean };

type Props = CommonProps & StyleProps;

export function Container({ children, gap, padding, style, vertical }: Props) {
  return (
    <StyledContainer
      gap={gap}
      padding={padding}
      vertical={vertical}
      style={style}
    >
      {children}
    </StyledContainer>
  );
}
