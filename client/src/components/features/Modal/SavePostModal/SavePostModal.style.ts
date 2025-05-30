import styled from "styled-components";

import { Colors } from "environment";

export const Button = {
  Cancel: styled.button.attrs({ type: "button" })`
    background-color: inherit;
    border-radius: 5px;
    color: ${Colors.TrueBlue};
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    height: 36px;
    padding: 0 12px;

    &:hover {
      background-color: ${Colors.AntiFlashWhite};
    }
  `,
  Create: styled.button.attrs({ type: "button" })`
    background-color: ${({ disabled }) =>
      disabled ? Colors.Platinum : Colors.BrandeisBlue};
    border-radius: 5px;
    color: ${({ disabled }) => (disabled ? Colors.SilverSand : Colors.White)};
    cursor: ${({ disabled }) => (disabled ? "no-drop" : "pointer")};
    font-size: 14px;
    height: 36px;
    padding: 0 12px;

    &:hover {
      ${({ disabled }) =>
        !disabled && `background-color: ${Colors.BrilliantAzure};`}
    }
  `,
  Done: styled.button.attrs({ type: "button" })`
    background-color: ${({ disabled }) =>
      disabled ? Colors.Platinum : Colors.BrandeisBlue};
    border-radius: 5px;
    color: ${({ disabled }) => (disabled ? Colors.SilverSand : Colors.White)};
    cursor: ${({ disabled }) => (disabled ? "no-drop" : "pointer")};
    font-size: 14px;
    height: 36px;
    padding: 0 40px;

    &:hover {
      ${({ disabled }) =>
        !disabled && `background-color: ${Colors.BrilliantAzure};`}
    }
  `,
};

export const CollectionList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 8px;
  user-select: none;
`;

export const Container = {
  NewCollection: {
    AddIcon: styled.div`
      align-items: center;
      aspect-ratio: 1 / 1;
      background-color: ${Colors.Gainsboro};
      border-radius: 5px;
      display: flex;
      justify-content: center;
      width: 3em;
    `,
    Inner: styled.div`
      align-items: center;
      border-radius: 5px;
      display: flex;
      flex: 1;
      gap: 0.5em;
      padding: 0.5em;

      &:hover {
        background-color: ${Colors.AntiFlashWhite};
      }
    `,
    Outer: styled.div`
      display: flex;
      padding: 0.5em;
      user-select: none;
    `,
  },
};

export const Text = {
  NewCollection: styled.p`
    color: ${Colors.VampireBlack};
    font-weight: 500;
  `,
};
