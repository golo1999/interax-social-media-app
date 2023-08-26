import styled from "styled-components";

import { Colors } from "environment";

interface ListItemProps {
  isSelected?: boolean;
}

export const List = styled.ul`
  color: ${Colors.PhilippineSilver};
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  list-style-type: none;
  user-select: none;
`;

export const ListItem = styled.li<ListItemProps>`
  ${({ isSelected }) =>
    isSelected && `background-color: ${Colors.JapaneseIndigo};`}
  border-radius: 5px;
  ${({ isSelected }) => isSelected && `color: ${Colors.BrilliantAzure};`}
  font-weight: 500;
  padding: 0.5em;

  &:hover {
    ${({ isSelected }) =>
      !isSelected && `background-color: ${Colors.BlackOlive};`};
  }
`;
