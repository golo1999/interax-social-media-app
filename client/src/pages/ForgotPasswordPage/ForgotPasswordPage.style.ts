import styled from "styled-components";

import { Colors } from "environment";

export const Button = {
  Cancel: styled.button.attrs({ type: "button" })`
    background-color: ${Colors.Platinum};
    border-radius: 6px;
    color: ${Colors.DarkLiver};
    cursor: pointer;
    font-size: 15px;
    font-weight: 700;
    line-height: 36px;
    padding: 0 20px;
  `,
  Search: styled.input.attrs({ type: "submit" })`
    background-color: ${Colors.BlueCrayola};
    border-radius: 6px;
    color: ${Colors.White};
    cursor: pointer;
    font-size: 15px;
    font-weight: 700;
    line-height: 36px;
    padding: 0 20px;

    &:disabled {
      background-color: ${Colors.Platinum};
      color: ${Colors.AmericanSilver};
      cursor: not-allowed;
    }

    &:hover {
      ${({ disabled }) =>
        !disabled && `background-color: ${Colors.BrightNavyBlue};`};
    }
  `,
};

export const Container = {
  Buttons: styled.div`
    align-items: center;
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    padding: 16px;
  `,
  Input: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
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
};

export const Description = styled.p`
  color: ${Colors.DarkJungleGreen};
  font-size: 17px;
`;

export const Form = styled.form`
  background-color: ${Colors.White};
  border-radius: 6px;
  border: 1px solid ${Colors.LightGray};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 500px;
`;

export const Title = styled.h2`
  color: ${Colors.YankeesBlue};
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  padding: 18px 16px;
  text-transform: capitalize;
`;
