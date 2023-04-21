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
  ${(props) =>
    props.isSelected && `background-color: ${Colors.JapaneseIndigo};`}
  border-radius: 5px;
  ${(props) => props.isSelected && `color: ${Colors.BrilliantAzure};`}
  font-weight: 500;
  padding: 0.5em;

  &:hover {
    ${(props) =>
      !props.isSelected && `background-color: ${Colors.BlackOlive};`};
  }
`;
