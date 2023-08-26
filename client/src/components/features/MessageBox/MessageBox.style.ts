import { MdClose, MdHorizontalRule } from "react-icons/md";
import styled from "styled-components";

import { Colors } from "environment";

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  height: 350px;
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
`;

export const Container = {
  Main: styled.div`
    background-color: ${Colors.RaisinBlack};
    border-radius: 5px 5px 0 0;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    display: flex;
    flex-direction: column;
    width: 300px;
  `,
  Icons: styled.div`
    align-items: center;
    display: flex;
  `,
  User: styled.div`
    align-items: center;
    border-radius: 5px;
    display: flex;
    flex: 1;
    gap: 0.5em;
    min-width: 0;
    padding: 0.25em;

    &:hover {
      background-color: ${Colors.BlackOlive};
    }
  `,
};

export const Footer = styled.div`
  align-items: center;
  display: flex;
  gap: 0.5em;
  padding: 0.5em;
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  gap: 1em;
  padding: 0.15em;
  user-select: none;
`;

export const Icon = {
  Close: styled(MdClose)`
    border-radius: 50%;

    &:hover {
      background-color: ${Colors.BlackOlive};
    }
  `,
  Minimize: styled(MdHorizontalRule)`
    border-radius: 50%;

    &:hover {
      background-color: ${Colors.BlackOlive};
    }
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

export const User = {
  Active: styled.p`
    color: silver;
    font-size: small;
  `,
  DetailsContainer: styled.div`
    display: flex;
    flex-direction: column;
    min-width: 0;
  `,
  Name: styled.p`
    color: ${Colors.Platinum};
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
};
