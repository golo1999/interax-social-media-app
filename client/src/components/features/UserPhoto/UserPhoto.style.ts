import styled from "styled-components";

import { Colors } from "environment";

import { ContainerProps, PhotoProps } from "./UserPhoto.types";

export const Container = {
  ChangePhoto: styled.div`
    align-items: center;
    background-color: ${Colors.Platinum};
    border-radius: 50%;
    bottom: 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: 6px;
    position: absolute;
    right: 0;
    width: fit-content;

    &:hover {
      background-color: ${Colors.LightGray};
    }
  `,
  CloseChatHead: styled.div`
    align-items: center;
    background-color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    padding: 4px;
    position: absolute;
    right: 0;
    top: 0;

    &:hover {
      background-color: ${Colors.AntiFlashWhite};
    }
  `,
  Main: styled.div<ContainerProps>`
    align-items: center;
    aspect-ratio: 1 / 1;
    background-color: ${({ hasProfilePhoto }) =>
      hasProfilePhoto ? "inherit" : Colors.PhilippineGray};
    border-radius: ${({ isSquare }) => (isSquare ? "5px;" : "50%;")};
    display: flex;
    justify-content: center;
    height: ${({ containerSize }) => (containerSize ||= "2em;")};
    user-select: none;
    width: ${({ containerSize }) => (containerSize ||= "2em;")};
  `,
  NoPhoto: styled.div`
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    position: relative;
    width: 100%;
  `,
  Photo: styled.div`
    height: 100%;
    position: relative;
    width: 100%;
  `,
};

export const Photo = styled.img<PhotoProps>`
  aspect-ratio: 1 / 1;
  border-radius: ${({ isSquare }) => (isSquare ? "5px;" : "50%;")};
  height: 100%;
  object-fit: cover;
  width: 100%;

  &:hover {
    opacity: 0.9;
  }
`;
