import styled from "styled-components";

import { Colors } from "environment";

export const Button = {
  CreateAccount: styled.button.attrs({ type: "button" })`
    background-color: ${Colors.WageningenGreen};
    border-radius: 6px;
    color: ${Colors.White};
    cursor: pointer;
    font-size: 17px;
    font-weight: bold;
    padding: 14px 16px;
    transition: 0.3s ease;

    &:hover {
      background-color: ${Colors.YellowGreen};
    }
  `,
};

export const Container = {
  Controller: styled.div`
    display: flex;
    flex-direction: column;
  `,
  CreateAccountButton: styled.div`
    display: flex;
    justify-content: center;
  `,
  Main: styled.div`
    align-items: center;
    background-color: ${Colors.AntiFlashWhite};
    display: flex;
    flex: 1;
    gap: 96px;
    justify-content: center;
  `,
  TitleSubtitle: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 500px;
  `,
};

export const Form = styled.form`
  background-color: ${Colors.White};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
    rgba(0, 0, 0, 0.1) 0px 8px 16px 0px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 16px 24px;
  width: 396px;
`;

export const Subtitle = styled.h2`
  color: ${Colors.DarkJungleGreen};
  font-size: 28px;
  font-weight: 400;
  line-height: 32px;
`;

export const Text = {
  Error: styled.span`
    color: ${Colors.RedCrayola};
    font-size: 13px;
  `,
  ForgottenPassword: styled.span`
    color: ${Colors.BlueCrayola};
    cursor: pointer;
    font-size: 14px;
    text-align: center;

    &:hover {
      text-decoration: underline;
    }
  `,
};

export const Title = styled.h1`
  color: ${Colors.BlueCrayola};
  font-size: 64px;
  text-transform: lowercase;
  user-select: none;
`;
