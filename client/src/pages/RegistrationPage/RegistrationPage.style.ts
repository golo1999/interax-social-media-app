import styled from "styled-components";

import { Colors } from "environment";

export const Button = styled.input.attrs({ type: "submit" })`
  background-color: ${Colors.IslamicGreen};
  border-radius: 6px;
  color: ${Colors.White};
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;
  height: 36px;
  padding: 0 32px;
  width: 194px;

  &:disabled {
    background-color: ${Colors.Platinum};
    color: ${Colors.AmericanSilver};
    cursor: not-allowed;
  }

  &:hover {
    ${({ disabled }) => !disabled && `background-color: ${Colors.SlimyGreen};`};
  }
`;

export const Container = {
  Button: styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    padding: 6px 0;
  `,
  Controller: styled.div`
    display: flex;
    flex-direction: column;
  `,
  FullWidth: styled.div`
    flex: 1;
  `,
  Genders: styled.div`
    display: flex;
    gap: 8px;
    padding: 0 16px;
  `,
  Link: styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    padding-bottom: 16px;
  `,
  Main: styled.div`
    align-items: center;
    background-color: ${Colors.AntiFlashWhite};
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 1em;
    justify-content: center;
  `,
  NameInputs: {
    Inner: styled.div`
      display: flex;
      gap: 8px;
    `,
    Outer: styled.div`
      display: flex;
      flex-direction: column;
    `,
  },
  TopInputs: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 6px 16px 0;
    width: 428px;
  `,
};

export const Form = styled.form`
  background-color: ${Colors.White};
  border-radius: 6px;
  border: 1px solid ${Colors.LightGray};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* width: 432px; */
`;

export const GenderText = styled.p`
  color: ${Colors.GraniteGray};
  font-size: 12px;
  padding: 0 16px;
`;

export const Link = styled.p`
  color: ${Colors.BlueCrayola};
  cursor: pointer;
  font-size: 17px;
  font-weight: 500;
  line-height: 20px;
  text-align: center;
`;

export const Logo = styled.p`
  color: ${Colors.BrightNavyBlue};
  font-size: 48px;
  font-weight: 700;
  text-transform: lowercase;
  user-select: none;
`;

export const Text = {
  Error: styled.span`
    color: ${Colors.RedCrayola};
    font-size: 13px;
  `,
};

export const Title = styled.h2`
  color: ${Colors.DarkJungleGreen};
  font-size: 25px;
  font-weight: 600;
  line-height: 32px;
  padding: 10px 16px 2px;
  text-align: center;
`;
