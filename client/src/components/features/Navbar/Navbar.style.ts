import styled from "styled-components";

interface ListItemProps {
  isSelected?: boolean;
}

export const List = styled.ul`
  color: #8d8f93;
  display: flex;
  list-style-type: none;
  padding-top: 5px;
  user-select: none;
`;

export const ListItem = styled.li<ListItemProps>`
  border-radius: 5px;
  ${(props) => props.isSelected && "color: #2e89ff;"}
  font-weight: 500;
  padding: 0.5em 1em;

  &:hover {
    ${(props) => !props.isSelected && "background-color: #3a3b3c;"}
  }
`;

export const ListItemBottomBorder = styled.div<ListItemProps>`
  ${(props) => props.isSelected && "background-color: #2e89ff;"}
  height: 3px;
  width: 100%;
`;

export const ListItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
