import styled from "styled-components";

import { Colors } from "environment";

interface UserContainerProps {
  isSelected: boolean;
}

export const Container = {
  Main: styled.div.attrs({ role: "navigation" })`
    display: flex;
    flex-direction: column;
    flex: 1;
  `,
  User: styled.div<UserContainerProps>`
    align-items: center;
    border-radius: 5px;
    display: flex;
    gap: 0.5em;
    padding: 0.75em;

    &:hover {
      ${(props) =>
        !props.isSelected && `background-color: ${Colors.BlackOlive};`};
    }
  `,
};

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
`;

interface ListItemProps {
  isSelected: boolean;
}

export const ListItem = styled.li<ListItemProps>`
  align-items: center;
  border-radius: 5px;
  ${(props) => props.isSelected && `background-color: ${Colors.BlackOlive};`};
  display: flex;
  gap: 0.5em;
  padding: 0.75em;
  user-select: none;

  &:hover {
    ${(props) =>
      !props.isSelected && `background-color: ${Colors.BlackOlive};`};
  }
`;

export const ListItemName = styled.p`
  color: ${Colors.Platinum};
  flex: 1;
  font-weight: 500;
`;

export const UserDisplayedName = styled.p`
  color: ${Colors.Platinum};
  font-weight: 500;
  user-select: none;
`;
