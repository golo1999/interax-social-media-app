import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "models";

interface ThemeProps {
  isAuthenticated: boolean;
  theme: Theme;
}

export const Container = {
  Main: styled.div`
    display: flex;
    gap: 1em;

    @media screen and (max-width: 924px) {
      flex-direction: column;
    }
  `,
  Posts: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
  `,
};

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

export const SeeButton = styled.button.attrs({ type: "button" })<ThemeProps>`
  background-color: inherit;
  border-radius: 5px;
  color: ${Colors.BrightNavyBlue};
  font-size: 17px;
  padding: 0.5em;
  transition: 0.3s ease;
  user-select: none;

  &:hover {
    background-color: ${({ isAuthenticated, theme }) =>
      isAuthenticated && theme === "DARK"
        ? Colors.BlackOlive
        : Colors.Platinum};
  }
`;
