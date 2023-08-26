import styled from "styled-components";

import { Colors } from "environment";

export const Label = {
  Container: styled.div`
    align-items: center;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    padding: 0.5em;
    user-select: none;

    &:hover {
      background-color: ${Colors.BlackOlive};
    }
  `,
  Text: styled.p`
    color: ${Colors.Platinum};
    font-weight: 500;
  `,
};

export const List = styled.ul`
  color: ${Colors.Platinum};
  display: flex;
  flex-direction: column;
  font-weight: 500;
  list-style-type: none;
  user-select: none;
`;

export const ListItem = styled.li`
  align-items: center;
  border-radius: 5px;
  display: flex;
  gap: 0.5em;
  padding: 0.5em;

  &:hover {
    background-color: ${Colors.BlackOlive};
  }
`;
