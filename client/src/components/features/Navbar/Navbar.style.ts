import styled from "styled-components";

import { Colors } from "environment";

interface ListItemProps {
  isSelected?: boolean;
}

export const List = styled.ul`
  color: ${Colors.PhilippineSilver};
  display: flex;
  list-style-type: none;
  padding-top: 5px;
  user-select: none;
`;

export const ListItem = styled.li<ListItemProps>`
  border-radius: 5px;
  ${(props) => props.isSelected && `color: ${Colors.BrilliantAzure};`}
  font-weight: 500;
  padding: 0.5em 1em;

  &:hover {
    ${(props) => !props.isSelected && `background-color: ${Colors.BlackOlive};`}
  }
`;

export const ListItemBottomBorder = styled.div<ListItemProps>`
  ${(props) =>
    props.isSelected && `background-color: ${Colors.BrilliantAzure};`}
  height: 3px;
  width: 100%;
`;

export const ListItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
