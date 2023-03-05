import styled from "styled-components";

interface ListItemProps {
  isSelected?: boolean;
}

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  list-style-type: none;
  user-select: none;
`;

export const ListItem = styled.li<ListItemProps>`
  ${(props) => props.isSelected && "background-color: #263951;"}
  border-radius: 5px;
  ${(props) => props.isSelected && "color: #2e89ff;"}
  font-weight: 500;
  padding: 0.5em;

  &:hover {
    background-color: #3a3b3c;
  }
`;
