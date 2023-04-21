import styled from "styled-components";

import { Colors } from "environment";

export const Button = {
  Cancel: styled.button.attrs({ type: "button" })`
    background-color: ${Colors.BlackOlive};
    border-radius: 5px;
    color: ${Colors.Platinum};
    font-weight: bold;
    padding: 0.5em 1em;

    &:hover {
      background-color: ${Colors.DarkLiver};
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

export const CloseIconContainer = styled.span`
  align-items: center;
  background-color: ${Colors.BlackOlive};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  padding: 0.25em;
  width: fit-content;

  &:hover {
    background-color: ${Colors.DarkLiver};
  }
`;

export const Title = styled.p`
  font-size: larger;
`;
