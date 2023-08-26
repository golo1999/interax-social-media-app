import { Fragment, useMemo } from "react";

import { PostPhoto } from "models";

import { Blurred, Normal, PhotosContainer } from "./PostPhotos.style";

interface Props {
  photos: PostPhoto[] | null;
}

export function PostPhotos({ photos }: Props) {
  function getClassName(index: number) {
    switch (index) {
      case 0:
        return "zero";
      case 1:
        return "one";
      case 2:
        return "two";
      case 3:
        return "three";
      case 4:
        return "four";
      default:
        return;
    }
  }

  return useMemo(() => {
    if (!photos || photos.length === 0) {
      return <></>;
    }

    return (
      <PhotosContainer>
        {photos.map((photo, index) => {
          if (index > 4) {
            return <Fragment key={index} />;
          }

          const photosNumber = photos.length;

          if (index === 4 && photosNumber > 5) {
            const text = `+${photosNumber - index}`;

            return (
              <Blurred.PhotoContainer key={index}>
                <Blurred.PhotoText>{text}</Blurred.PhotoText>
                <Blurred.Photo alt={index.toString()} src={photo.url} />
              </Blurred.PhotoContainer>
            );
          }

          return (
            <Normal.PhotoContainer
              key={index}
              className={getClassName(index)}
              photosNumber={photosNumber}
            >
              <Normal.Photo alt={index.toString()} src={photo.url} />
            </Normal.PhotoContainer>
          );
        })}
      </PhotosContainer>
    );
  }, [photos]);
}
