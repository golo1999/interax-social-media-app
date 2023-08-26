import styled from "styled-components";

import { Colors } from "environment";

interface FriendsListContainerProps {
  friends: number | null;
}

export const FriendsListContainer = styled.div<FriendsListContainerProps>`
  display: grid;
  gap: 0.5em 1em;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: ${({ friends }) =>
    !friends || friends <= 3
      ? "repeat(1, minmax(0, 1fr))"
      : friends <= 6
      ? "repeat(2, minmax(0, 1fr))"
      : "repeat(3, minmax(0, 1fr))"};
`;

export const SeeButton = styled.button.attrs({ type: "button" })`
  background-color: inherit;
  border-radius: 5px;
  color: ${Colors.TuftsBlue};
  font-size: medium;
  padding: 0.5em;
  user-select: none;

  &:hover {
    background-color: ${Colors.BlackOlive};
  }
`;
