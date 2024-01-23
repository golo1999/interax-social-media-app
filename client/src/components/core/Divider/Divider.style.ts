import styled from "styled-components";

import { Colors } from "environment";

interface Props {
  color: keyof typeof Colors;
  margin?: string;
  thickness: string;
  vertical: boolean;
}

export const Divider = styled.div<Props>`
  background-color: ${({ color }) => Colors[color]};
  ${({ vertical }) => vertical && "display: flex;"}
  ${({ thickness, vertical }) => !vertical && `height: ${thickness};`}
  ${({ margin }) => margin && `margin: ${margin};`};
  ${({ thickness, vertical }) => vertical && `width: ${thickness};`}
`;
