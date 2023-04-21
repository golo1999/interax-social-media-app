import styled from "styled-components";

import { Colors } from "environment";

interface ButtonProps {
  backgroundColor: string;
  color: string;
  hoverBackgroundColor: string;
}

export const Button = styled.button.attrs({ type: "button" })<ButtonProps>`
  align-items: center;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 5px;
  color: ${(props) => props.color};
  display: flex;
  font-size: medium;
  font-weight: 500;
  gap: 0.25em;
  justify-content: center;
  padding: 0.5em;

  &:hover {
    background-color: ${(props) => props.hoverBackgroundColor};
  }
`;

interface CoverPhotoContainerProps {
  hasCoverPhoto: boolean;
}

export const Container = {
  CoverPhoto: styled.div<CoverPhotoContainerProps>`
    background-color: ${(props) =>
      props.hasCoverPhoto ? "inherit" : Colors.EerieBlack};
    border-radius: 5px;
    height: 50vh;
    margin: 0 13vw;
    position: relative;

    @media screen and (max-width: 1270px) {
      margin: 0;
    }
  `,
  Main: styled.div`
    display: flex;
    gap: 1em;

    @media screen and (max-width: 924px) {
      flex-direction: column;
    }
  `,
};
