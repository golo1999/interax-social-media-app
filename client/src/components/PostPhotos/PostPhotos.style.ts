import styled from "styled-components";

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
    color: #cfd1d5;
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
  PhotoContainer: styled.div.attrs((props) => ({
    className: props.className,
  }))`
    &.zero {
      grid-column: ${(props: PhotoContainerProps) =>
        props.photosNumber > 4 || props.photosNumber === 2
          ? "1 / span 3"
          : props.photosNumber === 4 || props.photosNumber === 3
          ? "1 / span 4"
          : "1 / span 6"};
      grid-row: ${(props) =>
        props.photosNumber > 4 ? "1 / span 6" : "1 / span 12"};
    }
    &.one {
      ${(props) =>
        props.photosNumber > 4
          ? "grid-column: 1 / span 3; grid-row: 7 / span 6;"
          : props.photosNumber === 4
          ? "grid-column: 5 / span 2; grid-row: 1 / span 4"
          : props.photosNumber === 3
          ? "grid-column: 5 / span 2; grid-row: 1 / span 6"
          : props.photosNumber === 2
          ? "grid-column: 4 / span 3; grid-row: 1 / span 12"
          : undefined}
    }
    &.two {
      ${(props) =>
        props.photosNumber > 4
          ? "grid-column: 4 / span 3; grid-row: 1 / span 4;"
          : props.photosNumber === 4
          ? "grid-column: 5 / span 2; grid-row: 5 / span 4"
          : props.photosNumber === 3
          ? "grid-column: 5 / span 3; grid-row: 7 / span 6"
          : undefined}
    }
    &.three {
      ${(props) =>
        props.photosNumber > 4
          ? "grid-column: 4 / span 3; grid-row: 5 / span 4;"
          : props.photosNumber === 4
          ? "grid-column: 5 / span 2; grid-row: 9 / span 4"
          : undefined}
    }
    &.four {
      ${(props) =>
        props.photosNumber > 4 &&
        "grid-column: 4 / span 3; grid-row: 9 / span 4"}
    }
  `,
};

export const PhotosContainer = styled.div`
  display: grid;
  gap: 2px;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(12, 5vw);
`;
