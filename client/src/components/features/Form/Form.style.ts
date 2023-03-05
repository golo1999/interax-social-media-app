import styled from "styled-components";

interface InputProps {
  isValid: boolean;
}

export const Button = {
  Cancel: styled.button.attrs({ type: "button" })`
    background-color: #3a3b3c;
    border-radius: 5px;
    color: #cfd1d5;
    font-size: medium;
    font-weight: bold;
    padding: 0.5em;
  `,
  Submit: styled.input.attrs({ type: "submit" })`
    background-color: ${(props) => (props.disabled ? "#505151" : "#3a3b3c")};
    border-radius: 5px;
    color: ${(props) => (props.disabled ? "#848585" : "#cfd1d5")};
    cursor: ${(props) => (props.disabled ? "no-drop" : "default")};
    font-size: medium;
    font-weight: bold;
    padding: 0.5em;
  `,
  Visibility: styled.button.attrs({ type: "button" })`
    align-items: center;
    background-color: #3a3b3c;
    border-radius: 5px;
    color: #cfd1d5;
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
  NoDataText: styled.p`
    font-weight: 500;
  `,
};

export const Input = styled.input<InputProps>`
  background-color: inherit;
  border: 2px solid ${(props) => (props.isValid ? "#383a3c" : "red")};
  border-radius: 5px;
  color: #cfd1d5;
  font-size: medium;
  padding: 1em;

  &::placeholder {
    color: ${(props) => (props.isValid ? "#8d8f93" : "red")};
  }
`;

export const Label = styled.label`
  color: #cfd1d5;
`;
