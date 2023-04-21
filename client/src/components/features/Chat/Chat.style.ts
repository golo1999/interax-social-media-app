import { MdSend } from "react-icons/md";
import styled from "styled-components";

import { Colors } from "environment";

interface MainContainerProps {
  height?: string;
}

export const Container = {
  Main: styled.div<MainContainerProps>`
    display: flex;
    flex-direction: column;
    ${(props) => (props.height ? `height: ${props.height};` : "flex: 1;")};
    gap: 1em;
    overflow: auto;
    padding: 0.5em;

    &::-webkit-scrollbar {
      width: auto;
    }

    &::-webkit-scrollbar-button:single-button {
      background-color: rgb(64, 64, 64);
      display: block;
      background-size: 10px;
      background-repeat: no-repeat;
    }

    &::-webkit-scrollbar-button:single-button:vertical:decrement {
      background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='100' width='100' fill='%23e4e6ea' class='bi bi-caret-down-fill' viewBox='0 0 16 16'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z' /></svg>");
      background-position: center 5px;
      height: 20px;
      width: 20px;
    }

    &::-webkit-scrollbar-button:single-button:vertical:hover {
      background-color: ${Colors.DarkLiver};
    }

    &::-webkit-scrollbar-button:single-button:vertical:increment {
      background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='100' width='100' fill='%23e4e6ea' class='bi bi-caret-up-fill' viewBox='0 0 16 16'><path d='m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z' /></svg>");
      background-position: center 5px;
      height: 20px;
      width: 20px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${Colors.DimGray};
    }

    &::-webkit-scrollbar-track {
      background-color: ${Colors.Arsenic};
    }
  `,
  Messages: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
  `,
  NoMessages: styled.div`
    align-items: center;
    align-self: center;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    padding-top: 2em;
  `,
  UniqueDateTime: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
  `,
};

export const DisplayedName = styled.p`
  color: ${Colors.Platinum};
  font-weight: 500;
`;

export const DisplayedTime = styled.p`
  align-self: center;
  color: silver;
  font-size: small;
`;

export const Footer = styled.div`
  align-items: center;
  display: flex;
  gap: 0.5em;
  padding: 0.5em;
`;

export const HiddenInput = {
  FileUpload: styled.input.attrs({ type: "file" })`
    display: none;
  `,
};

export const Input = styled.input.attrs({ type: "text" })`
  background-color: ${Colors.BlackOlive};
  border-radius: 20px;
  color: silver;
  flex: 1;
  padding: 0.75em 1em;

  &::placeholder {
    color: silver;
  }
`;

export const SendIcon = styled(MdSend)`
  user-select: none;
`;
