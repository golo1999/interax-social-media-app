import styled from "styled-components";

import { Colors } from "environment";

interface ContainerProps {
  containsDescription: boolean;
  isSelected: boolean;
  selectedBackgroundColor?: keyof typeof Colors;
}

export const Container = {
  Main: styled.div<ContainerProps>`
    align-items: ${({ containsDescription }) =>
      containsDescription ? "flex-start" : "center"};
    border-radius: 5px;
    ${({ isSelected, selectedBackgroundColor }) =>
      isSelected &&
      selectedBackgroundColor &&
      `background-color: ${Colors[selectedBackgroundColor]};`};
    cursor: pointer;
    display: flex;
    gap: 0.5em;
    padding: 0.75em;
    user-select: none;

    &:hover {
      ${({ isSelected, selectedBackgroundColor }) =>
        !isSelected &&
        selectedBackgroundColor &&
        `background-color: ${Colors[selectedBackgroundColor]};`};
    }
  `,
  Texts: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
  `,
};

export const Description = styled.p`
  color: ${Colors.PhilippineSilver};
  font-size: 12px;
  font-weight: 400;
`;

export const Name = styled.p`
  color: ${Colors.Platinum};
  flex: 1;
  font-size: 15px;
  font-weight: 500;
`;
