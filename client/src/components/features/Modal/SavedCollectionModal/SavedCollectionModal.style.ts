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
    padding: 0 40px;

    &:hover {
      ${({ disabled }) =>
        !disabled && `background-color: ${Colors.BrilliantAzure};`}
    }
  `,
  Rename: styled.button.attrs({ type: "button" })`
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
};
