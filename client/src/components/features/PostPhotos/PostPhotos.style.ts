import styled from "styled-components";

import { Colors } from "environment";

interface PhotoContainerProps {
  photosNumber: number;
}

export const Blurred = {
  Photo: styled.img`
    height: 100%;
    max-width: 100%;
    object-fit: cover;
    opacity: 25%;
    width: 100%;
  `,
  PhotoContainer: styled.div`
    grid-column: 4 / span 3;
    grid-row: 9 / span 4;
    position: relative;
  `,
  PhotoText: styled.p`
    color: ${Colors.LightGray};
    font-size: 3em;
    font-weight: bold;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    user-select: none;
  `,
};

export const Normal = {
  Photo: styled.img`
    height: 100%;
    max-width: 100%;
    object-fit: cover;
    width: 100%;
  `,
  PhotoContainer: styled.div.attrs(({ className }) => ({
    className,
  }))`
    &.zero {
      grid-column: ${({ photosNumber }: PhotoContainerProps) =>
        photosNumber > 4 || photosNumber === 2
          ? "1 / span 3"
          : photosNumber === 4 || photosNumber === 3
          ? "1 / span 4"
          : "1 / span 6"};
      grid-row: ${({ photosNumber }) =>
        photosNumber > 4 ? "1 / span 6" : "1 / span 12"};
    }
    &.one {
      ${({ photosNumber }) =>
        photosNumber > 4
          ? "grid-column: 1 / span 3; grid-row: 7 / span 6;"
          : photosNumber === 4
          ? "grid-column: 5 / span 2; grid-row: 1 / span 4"
          : photosNumber === 3
          ? "grid-column: 5 / span 2; grid-row: 1 / span 6"
          : photosNumber === 2
          ? "grid-column: 4 / span 3; grid-row: 1 / span 12"
          : undefined}
    }
    &.two {
      ${({ photosNumber }) =>
        photosNumber > 4
          ? "grid-column: 4 / span 3; grid-row: 1 / span 4;"
          : photosNumber === 4
          ? "grid-column: 5 / span 2; grid-row: 5 / span 4"
          : photosNumber === 3
          ? "grid-column: 5 / span 3; grid-row: 7 / span 6"
          : undefined}
    }
    &.three {
      ${({ photosNumber }) =>
        photosNumber > 4
          ? "grid-column: 4 / span 3; grid-row: 5 / span 4;"
          : photosNumber === 4
          ? "grid-column: 5 / span 2; grid-row: 9 / span 4"
          : undefined}
    }
    &.four {
      ${({ photosNumber }) =>
        photosNumber > 4 && "grid-column: 4 / span 3; grid-row: 9 / span 4"}
    }
  `,
};

export const PhotosContainer = styled.div`
  cursor: pointer;
  display: grid;
  gap: 2px;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(12, 5vw);
`;
