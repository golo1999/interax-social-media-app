import styled from "styled-components";

import { Colors } from "environment";

type IconContainerProps = { isHidden?: boolean };

export const Button = styled.input.attrs({ type: "submit" })`
  background-color: ${({ disabled }) =>
    disabled ? Colors.DarkLiver : Colors.BrightNavyBlue};
  border-radius: 5px;
  color: ${({ disabled }) =>
    disabled ? Colors.PhilippineGray : Colors.Platinum};
  cursor: ${({ disabled }) => (disabled ? "no-drop" : "default")};
  flex: 1;
  font-weight: 600;
  padding: 0.75em;

  &:hover {
    ${({ disabled }) =>
      !disabled && `background-color: ${Colors.BleuDeFrance};`};
  }
`;

export const Container = {
  Icon: styled.span<IconContainerProps>`
    align-items: center;
    background-color: ${Colors.BlackOlive};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    padding: 0.25em;
    ${({ isHidden }) => isHidden && "visibility: hidden;"};
    width: fit-content;

    &:hover {
      background-color: ${Colors.DarkLiver};
    }
  `,
  Visibility: styled.div`
    align-items: center;
    background-color: ${Colors.BlackOlive};
    border-radius: 5px;
    color: ${Colors.Platinum};
    display: flex;
    gap: 0.15em;
    padding: 0.2em 0.25em;
    user-select: none;
    width: fit-content;
  `,
};

export const TextArea = styled.textarea`
  caret-color: ${Colors.MetallicSilver};
  background-color: inherit;
  color: ${Colors.MetallicSilver};
  flex: 1;
  font-size: x-large;
  resize: none;

  &::placeholder {
    color: ${Colors.MetallicSilver};
  }
`;

export const Title = styled.p`
  font-size: larger;
`;
