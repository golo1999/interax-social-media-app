import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "types";

interface ThemeProps {
  isAuthenticated: boolean;
  theme: Theme;
}

interface FriendsListContainerProps {
  friendsCount: number;
}

export const Container = {
  Column: {
    First: styled.div`
      display: flex;
      flex-direction: column;
      gap: 1em;
      max-width: 50%;
    `,
    Second: styled.div`
      display: flex;
      flex: 1;
      flex-direction: column;
      gap: 1em;
    `,
  },
  FriendsList: styled.div<FriendsListContainerProps>`
    display: grid;
    gap: 0.5em 1em;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: ${({ friendsCount }) =>
      !friendsCount || friendsCount <= 3
        ? "repeat(1, minmax(0, 1fr))"
        : friendsCount <= 6
        ? "repeat(2, minmax(0, 1fr))"
        : "repeat(3, minmax(0, 1fr))"};
  `,
  Main: styled.div`
    display: flex;
    gap: 1em;

    @media screen and (max-width: 924px) {
      flex-direction: column;
    }
  `,
  Photos: styled.div`
    align-items: center;
    display: flex;
    gap: 1em;
    justify-content: space-between;
  `,
  Posts: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
  `,
};

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

export const Text = {
  Friends: styled.span`
    // light theme: VampireBlack
    color: ${Colors.LightGray};
    font-size: 20px;
    font-weight: bold;
  `,
  Intro: styled.span`
    // light theme: VampireBlack
    color: ${Colors.LightGray};
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 8px;
  `,
  Photos: styled.span`
    // light theme: VampireBlack
    color: ${Colors.LightGray};
    font-size: 20px;
    font-weight: bold;
  `,
  SeeAllPhotos: styled.span`
    color: ${Colors.BrightNavyBlue};
    font-size: 17px;
  `,
};
