import styled from "styled-components";

import { Colors } from "environment";

export const Button = {
  CreateNewAccount: styled.button.attrs({ type: "button" })`
    background-color: ${Colors.WageningenGreen};
    border-radius: 6px;
    color: ${Colors.White};
    cursor: pointer;
    font-size: 17px;
    font-weight: 600;
    padding: 10px 12px;
    transition: 0.3s ease;
    width: 230px;

    &:hover {
      background-color: ${Colors.YellowGreen};
    }
  `,
  Login: styled.button.attrs({ type: "button" })`
    background-color: ${Colors.BlueCrayola};
    border-radius: 6px;
    color: ${Colors.White};
    cursor: pointer;
    font-size: 17px;
    font-weight: 600;
    padding: 10px 12px;
    transition: 0.3s ease;
    width: 230px;

    &:hover {
      background-color: ${Colors.BrightNavyBlue};
    }
  `,
};

export const Container = {
  Buttons: styled.div`
    align-items: center;
    display: flex;
    gap: 12px;
    justify-content: center;
  `,
  Main: styled.div`
    background-color: ${Colors.White};
    bottom: 0;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 5px 0px;
    display: flex;
    flex-direction: column;
    gap: 26px;
    padding: 26px 12px;
    position: fixed;
    width: 100%;
    z-index: 5;
  `,
};

export const Text = {
  Or: styled.span`
    color: ${Colors.GraniteGray};
    font-size: 13px;
    font-weight: 600;
    line-height: 16px;
  `,
  Title: styled.span`
    color: ${Colors.VampireBlack};
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    width: 100%;
  `,
};
