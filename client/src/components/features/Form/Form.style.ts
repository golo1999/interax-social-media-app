import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "models";

interface InputProps {
  isValid: boolean;
}

interface ThemeProps {
  isAuthenticated: boolean;
  theme: Theme;
}

export const Button = {
  Cancel: styled.button.attrs({ type: "button" })`
    background-color: ${Colors.BlackOlive};
    border-radius: 5px;
    color: ${Colors.LightGray};
    font-size: medium;
    font-weight: bold;
    padding: 0.5em;
  `,
  Submit: styled.input.attrs({ type: "submit" })`
    background-color: ${({ disabled }) =>
      disabled ? Colors.DarkLiver : Colors.BlackOlive};
    border-radius: 5px;
    color: ${({ disabled }) =>
      disabled ? Colors.OldSilver : Colors.LightGray};
    cursor: ${({ disabled }) => (disabled ? "no-drop" : "default")};
    font-size: medium;
    font-weight: bold;
    padding: 0.5em;
  `,
  Visibility: styled.button.attrs({ type: "button" })`
    align-items: center;
    background-color: ${Colors.BlackOlive};
    border-radius: 5px;
    color: ${Colors.LightGray};
    display: flex;
    font-size: medium;
    font-weight: bold;
    gap: 0.2em;
    padding: 0.5em;
  `,
};

export const Container = {
  Buttons: {
    Decision: styled.div`
      display: flex;
      gap: 0.5em;
    `,
    Element: styled.div`
      display: flex;
      gap: 0.5em;
      justify-content: space-between;
    `,
  },
  Checkbox: styled.div`
    align-items: center;
    display: flex;
    gap: 0.5em;
  `,
  Dates: styled.div`
    align-items: center;
    display: flex;
    gap: 0.5em;
  `,
};

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

export const History = {
  Container: {
    Main: styled.div`
      display: flex;
      flex-direction: column;
      gap: 0.5em;
    `,
    MainHorizontal: styled.div`
      align-items: center;
      display: flex;
      gap: 0.5em;
    `,
    NoData: styled.div`
      align-items: center;
      display: flex;
      gap: 0.5em;
    `,
  },
  Item: styled.div`
    align-items: center;
    display: flex;
    gap: 0.5em;
  `,
  NoDataText: styled.span<ThemeProps>`
    color: ${({ isAuthenticated, theme }) =>
      isAuthenticated && theme === "DARK"
        ? Colors.PhilippineSilver
        : Colors.GraniteGray};
    font-size: 15px;
    font-weight: 500;
  `,
};

export const Input = styled.input<InputProps>`
  background-color: inherit;
  border: 2px solid ${({ isValid }) => (isValid ? Colors.Onyx : "red")};
  border-radius: 5px;
  color: ${Colors.LightGray};
  font-size: medium;
  padding: 1em;

  &::placeholder {
    color: ${({ isValid }) => (isValid ? Colors.PhilippineGray : "red")};
  }
`;

export const Label = styled.label`
  color: ${Colors.LightGray};
`;
