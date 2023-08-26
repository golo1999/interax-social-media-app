import styled from "styled-components";

import { Colors } from "environment";

interface ContainerProps {
  isSelected?: boolean;
}

export const Container = styled.div<ContainerProps>`
  align-items: center;
  border-radius: 5px;
  display: flex;
  gap: 0.5em;
  padding: 0.75em;

  &:hover {
    ${({ isSelected }) =>
      !isSelected && `background-color: ${Colors.BlackOlive};`};
  }
`;

export const Name = styled.p`
  color: ${Colors.Platinum};
  font-weight: 500;
  user-select: none;
`;
