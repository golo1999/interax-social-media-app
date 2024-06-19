import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "types";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

export const Button = styled.button.attrs({ type: "button" })<ThemeProps>`
  background-color: unset;
  border-radius: 5px;
  color: ${({ $isAuthenticated, $theme }) =>
    $isAuthenticated && $theme === "DARK"
      ? Colors.FrenchSkyBlue
      : Colors.TrueBlue};
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  padding: 8px 12px;

  &:hover {
    background-color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.BlackOlive
        : Colors.AntiFlashWhite};
  }
`;

export const Container = {
  Main: styled.div`
    background-color: white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding: 1em;
  `,
  Photo: styled.div`
    aspect-ratio: 1 / 1;
    border-radius: 5px;
    position: relative;
  `,
  Photos: styled.div`
    display: grid;
    gap: 0.5em;
    grid-template-columns: repeat(5, minmax(0, 1fr));
  `,
  Top: styled.div`
    align-items: center;
    display: flex;
    gap: 1em;
    justify-content: space-between;
  `,
};

export const Photo = styled.img`
  border-radius: inherit;
  height: 100%;
  inset: 0;
  max-width: 100%;
  object-fit: cover;
  position: absolute;
`;

export const Title = styled.h3`
  color: ${Colors.VampireBlack};
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
