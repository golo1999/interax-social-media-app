import styled from "styled-components";

import { Colors } from "environment";

interface Props {
  color: keyof typeof Colors;
}

export const Label = styled.label<Props>`
  color: ${({ color }) => Colors[color]};
  font-weight: 600;
`;

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
`;
