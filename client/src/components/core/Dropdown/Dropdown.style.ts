import styled from "styled-components";

import { Colors } from "environment";

interface ListProps {
  displayedItems: number;
  isExpanded: boolean;
  itemHeight: number;
  top: number;
}

interface ListItemProps {
  isSelected: boolean;
}

export const Container = styled.div`
  color: ${Colors.LightGray};
  display: flex;
  flex-direction: column;
  font-weight: 500;
  position: relative;
  user-select: none;
  width: fit-content;
`;

export const Header = styled.div`
  align-items: center;
  background-color: ${Colors.BlackOlive};
  border-radius: 5px;
  display: flex;
  gap: 0.5em;
  padding: 0.5em;
  width: fit-content;

  &:hover {
    background-color: ${Colors.DarkLiver};
  }
`;

export const List = styled.ul<ListProps>`
  background-color: ${Colors.RaisinBlack};
  border-radius: 5px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  display: flex;
  flex-direction: column;
  list-style-type: none;
  max-height: calc(
    (${({ displayedItems }) => displayedItems}) *
      ${({ itemHeight }) => itemHeight}px + 2 * 0.5em
  );
  overflow: auto;
  padding: 0.5em;
  position: absolute;
  top: ${({ top }) => `${top}px`};
  visibility: ${({ isExpanded }) => (isExpanded ? "visible" : "hidden")};
  width: 300px;

  &::-webkit-scrollbar {
    width: 0.5em;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${Colors.DarkLiver};
  }
`;

export const ListItem = styled.li<ListItemProps>`
  ${({ isSelected }) => isSelected && `background-color: ${Colors.BlackOlive};`}
  border: ${({ isSelected }) =>
    isSelected ? `2px solid ${Colors.LightGray}` : "2px solid transparent"};
  border-radius: 5px;
  flex: 1;
  padding: 0.5em;

  &:hover {
    ${({ isSelected }) =>
      !isSelected && `background-color: ${Colors.BlackOlive};`}
  }
`;
