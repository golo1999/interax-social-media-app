import styled from "styled-components";

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
  color: #cfd1d5;
  display: flex;
  flex-direction: column;
  font-weight: 500;
  position: relative;
  user-select: none;
  width: fit-content;
`;

export const Header = styled.div`
  align-items: center;
  background-color: #3a3b3c;
  border-radius: 5px;
  display: flex;
  gap: 0.5em;
  padding: 0.5em;
  width: fit-content;

  &:hover {
    background-color: #4e4f50;
  }
`;

export const List = styled.ul<ListProps>`
  background-color: #242526;
  border-radius: 5px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  display: flex;
  flex-direction: column;
  list-style-type: none;
  max-height: calc(
    (${(props) => props.displayedItems}) * ${(props) => props.itemHeight}px + 2 *
      0.5em
  );
  overflow: auto;
  padding: 0.5em;
  position: absolute;
  top: ${(props) => `${props.top}px`};
  visibility: ${(props) => (props.isExpanded ? "visible" : "hidden")};
  width: 300px;

  &::-webkit-scrollbar {
    width: 0.5em;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #4e4f50;
  }
`;

export const ListItem = styled.li<ListItemProps>`
  ${(props) => props.isSelected && "background-color: #3a3b3c;"}
  border: ${(props) =>
    props.isSelected ? "2px solid #cfd1d5" : "2px solid transparent"};
  border-radius: 5px;
  flex: 1;
  padding: 0.5em;

  &:hover {
    ${(props) => !props.isSelected && "background-color: #3a3b3c;"}
  }
`;
