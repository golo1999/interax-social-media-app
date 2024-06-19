import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "types";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

export const Button = {
  Cancel: styled.button.attrs({ type: "button" })<ThemeProps>`
    background-color: inherit;
    border-radius: 5px;
    color: ${Colors.BrightNavyBlue};
    font-weight: bold;
    padding: 0.5em 1em;

    &:hover {
      background-color: ${({ $isAuthenticated, $theme }) =>
        $isAuthenticated && $theme === "DARK"
          ? Colors.BlackOlive
          : Colors.AntiFlashWhite};
    }
  `,
  Save: styled.button.attrs({ type: "button" })`
    background-color: ${Colors.BrightNavyBlue};
    border-radius: 5px;
    color: ${Colors.Platinum};
    font-weight: bold;
    padding: 0.5em 2em;

    &:hover {
      background-color: ${Colors.BleuDeFrance};
    }
  `,
};

export const Container = {
  Buttons: styled.div`
    align-items: center;
    display: flex;
    gap: inherit;
  `,
};

export const FileInput = styled.input.attrs({ type: "file" })`
  display: none;
`;

export const Text = styled.p`
  user-select: none;
`;

export const SelectedPhoto = styled.img`
  max-height: 100%;
  max-width: 100%;
`;
