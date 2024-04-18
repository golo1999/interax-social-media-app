import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "types";

interface ThemeProps {
  isAuthenticated: boolean;
  theme: Theme;
}

// The "Button" component below should be added here
export const B = {
  EditCoverPhoto: styled.button.attrs({ type: "button" })`
    align-items: center;
    background-color: white;
    border-radius: 5px;
    bottom: 0;
    color: ${Colors.EerieBlack};
    display: flex;
    font-weight: bold;
    gap: 0.5em;
    margin: 0 2em 1em 0;
    padding: 0.75em 0.5em;
    position: absolute;
    right: 0;
  `,
  ShowMore: styled.button<ThemeProps>`
    align-items: center;
    background-color: ${({ isAuthenticated, theme }) =>
      isAuthenticated && theme === "DARK"
        ? Colors.BlackOlive
        : Colors.Platinum};
    border-radius: 5px;
    color: ${({ isAuthenticated, theme }) =>
      isAuthenticated && theme === "DARK"
        ? Colors.LightGray
        : Colors.DarkJungleGreen};
    display: flex;
    justify-content: center;
    height: 36px;
    line-height: 16px;
    padding: 10px 16px;
    width: 48px;

    &:hover {
      background-color: ${({ isAuthenticated, theme }) =>
        isAuthenticated && theme === "DARK"
          ? Colors.DarkLiver
          : Colors.Gainsboro};
    }
  `,
};

interface ButtonProps {
  backgroundColor: keyof typeof Colors;
  color: keyof typeof Colors;
  hoverBackgroundColor: keyof typeof Colors;
}

export const Button = styled.button.attrs({ type: "button" })<ButtonProps>`
  align-items: center;
  background-color: ${({ backgroundColor }) => Colors[backgroundColor]};
  border-radius: 5px;
  color: ${({ color }) => Colors[color]};
  display: flex;
  font-size: medium;
  font-weight: 500;
  gap: 0.25em;
  justify-content: center;
  padding: 0.5em;

  &:hover {
    background-color: ${({ hoverBackgroundColor }) =>
      Colors[hoverBackgroundColor]};
  }
`;

interface CoverPhotoContainerProps {
  hasCoverPhoto: boolean;
}

export const Container = {
  Bottom: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
    margin: 1em 15vw;
  `,
  CoverPhoto: styled.div<CoverPhotoContainerProps>`
    background-color: ${({ hasCoverPhoto }) =>
      hasCoverPhoto ? "inherit" : Colors.EerieBlack};
    border-radius: 5px;
    height: 50vh;
    margin: 0 13vw;
    position: relative;

    @media screen and (max-width: 1270px) {
      margin: 0;
    }
  `,
  FriendsIcons: styled.div`
    display: flex;
  `,
  Main: styled.div<ThemeProps>`
    background-color: ${({ isAuthenticated, theme }) =>
      isAuthenticated && theme === "DARK"
        ? Colors.EerieBlack
        : Colors.AntiFlashWhite};
    display: flex;
    flex-direction: column;
  `,
  Navigation: styled.div<ThemeProps>`
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin: 0 15vw;
  `,
  Top: styled.div<ThemeProps>`
    /* background-color: ${Colors.RaisinBlack}; */
    background-color: ${({ isAuthenticated, theme }) =>
      isAuthenticated && theme === "DARK" ? Colors.RaisinBlack : Colors.White};
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
    display: flex;
    flex-direction: column;
    margin-top: 55px;
  `,
  UserDetails: styled.div`
    display: flex;
    gap: 1em;
    margin: 0 15vw 1em 15vw;
  `,
};

export const CoverPhoto = styled.img.attrs({
  alt: "COVER_PHOTO",
  height: "100%",
  width: "100%",
})`
  cursor: pointer;
  border-radius: 0 0 8px 8px;
  object-fit: cover;
`;

export const Text = {
  FriendsCount: styled.p<ThemeProps>`
    color: ${({ isAuthenticated, theme }) =>
      isAuthenticated && theme === "DARK"
        ? Colors.PhilippineGray
        : Colors.GraniteGray};
  `,
  Name: styled.h1<ThemeProps>`
    /* color: ${Colors.LightGray}; */
    color: ${({ isAuthenticated, theme }) =>
      isAuthenticated && theme === "DARK"
        ? Colors.LightGray
        : Colors.VampireBlack};
  `,
};
