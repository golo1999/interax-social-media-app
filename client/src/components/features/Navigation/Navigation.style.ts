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
      ${({ isSelected }) =>
        !isSelected && `background-color: ${Colors.BlackOlive};`};
    }
  `,
};

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
`;
