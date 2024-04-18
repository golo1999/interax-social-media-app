import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "types";

interface ThemeProps {
  isAuthenticated: boolean;
  theme: Theme;
}

export const Button = styled.button<ThemeProps>`
  align-items: center;
  background-color: transparent;
  border-radius: 5px;
  display: flex;
  flex: 1;
  gap: 0.5em;
  justify-content: center;
  font-size: 1em;
  font-weight: bold;
  padding: 0.5em 0;

  &:hover {
    background-color: ${({ isAuthenticated, theme }) =>
      isAuthenticated && theme === "DARK"
        ? Colors.BlackOlive
        : Colors.AntiFlashWhite};
  }
`;

export const Container = {
  Buttons: styled.div`
    align-items: center;
    display: flex;
    position: relative;
  `,
  Comments: styled.div`
    align-items: center;
    display: flex;
    gap: 4px;
  `,
  CommentsReactionsShares: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  CommentsShares: styled.div`
    align-items: center;
    display: flex;
    gap: 12px;
  `,
  Emojis: styled.div`
    display: flex;
    gap: 0.25em;
  `,
  EmojisReactions: styled.div`
    display: flex;
  `,
  MoreOptionsIcon: styled.div<ThemeProps>`
    align-items: center;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    padding: 0.25em;

    &:hover {
      background-color: ${({ isAuthenticated, theme }) =>
        isAuthenticated && theme === "DARK"
          ? Colors.BlackOlive
          : Colors.AntiFlashWhite};
    }
  `,
  PostOwner: styled.div`
    align-items: center;
    display: flex;
    flex: 1;
    gap: 1em;
  `,
  PostText: styled.div`
    line-height: 21px;
    position: relative;
  `,
  Shares: styled.div`
    align-items: center;
    display: flex;
    gap: 4px;
  `,
};

export const Header = styled.div`
  align-items: center;
  display: flex;
  gap: 1em;
`;

type PostTextProps = {
  isCompletelyVisible: boolean;
} & ThemeProps;

export const Text = {
  CommentsCount: styled.p`
    color: ${Colors.GraniteGray};
    font-size: 15px;
    line-height: 20px;
  `,
  DateTime: styled.p<ThemeProps>`
    color: ${({ isAuthenticated, theme }) =>
      isAuthenticated && theme === "DARK"
        ? Colors.PhilippineSilver
        : Colors.GraniteGray};
    cursor: default;
  `,
  PostOwnerName: styled.p<ThemeProps>`
    color: ${({ isAuthenticated, theme }) =>
      isAuthenticated && theme === "DARK"
        ? Colors.LightGray
        : Colors.VampireBlack};
    cursor: pointer;
    font-weight: bold;
    max-width: 60ch;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
    white-space: nowrap;

    &:hover {
      text-decoration: underline;
    }
  `,
  PostText: styled.span<PostTextProps>`
    color: ${({ isAuthenticated, theme }) =>
      isAuthenticated && theme === "DARK"
        ? Colors.Platinum
        : Colors.VampireBlack};
    ${({ isCompletelyVisible }) =>
      !isCompletelyVisible && "display: -webkit-box;"};
    font-size: 15px;
    font-weight: 400;
    line-height: 20px;
    ${({ isCompletelyVisible }) => !isCompletelyVisible && "overflow: hidden;"};
    ${({ isCompletelyVisible }) =>
      !isCompletelyVisible && "-webkit-box-orient: vertical;"};
    ${({ isCompletelyVisible }) =>
      !isCompletelyVisible && "-webkit-line-clamp: 5;"};
  `,
  SeeMore: styled.span<ThemeProps>`
    color: ${({ isAuthenticated, theme }) =>
      isAuthenticated && theme === "DARK"
        ? Colors.Platinum
        : Colors.VampireBlack};
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
    line-height: 20px;

    &:hover {
      text-decoration: underline;
    }
  `,
  SharesCount: styled.p`
    color: ${Colors.GraniteGray};
    font-size: 15px;
    line-height: 20px;
  `,
};
