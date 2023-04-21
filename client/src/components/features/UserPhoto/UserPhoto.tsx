import { CSSProperties } from "react";
import { FaUser } from "react-icons/fa";
import styled from "styled-components";

import { Colors } from "environment";
import { User } from "models";

const Container = styled.div<ContainerProps>`
  align-items: center;
  aspect-ratio: 1 / 1;
  background-color: ${(props) =>
    props.hasProfilePhoto ? "inherit" : Colors.PhilippineGray};
  border-radius: ${(props) => (props.isSquare ? "5px;" : "50%;")};
  display: flex;
  justify-content: center;
  height: ${(props) => (props.containerSize ||= "2em;")};
  user-select: none;
  width: ${(props) => (props.containerSize ||= "2em;")};
`;

const Photo = styled.img<PhotoProps>`
  aspect-ratio: 1 / 1;
  border-radius: ${(props) => (props.isSquare ? "5px;" : "50%;")};
  height: 100%;
  object-fit: cover;
  width: 100%;
`;

type CommonProps = { user: User | null; onPhotoClick?: () => void };

type ContainerCommonProps = { hasProfilePhoto: boolean };

type ContainerOptionalProps = {
  containerSize?: string;
  containerStyle?: CSSProperties;
  iconSize?: string;
  isSquare?: boolean;
};

type ContainerProps = ContainerCommonProps & ContainerOptionalProps;

type IconProps = { iconStyle?: CSSProperties };

type PhotoProps = { isSquare?: boolean; photoStyle?: CSSProperties };

type Props = CommonProps &
  ContainerOptionalProps & { photoStyle?: CSSProperties } & IconProps;

export function UserPhoto({
  containerSize,
  containerStyle,
  iconSize,
  iconStyle,
  isSquare,
  photoStyle,
  user,
  onPhotoClick,
}: Props) {
  if (!user) {
    return (
      <Container
        containerSize={containerSize}
        hasProfilePhoto={false}
        isSquare={isSquare}
        style={containerStyle}
        onClick={onPhotoClick}
      >
        <FaUser color={Colors.RaisinBlack} size={iconSize} style={iconStyle} />
      </Container>
    );
  }

  const { profilePhotos } = user;

  const currentProfilePhoto =
    profilePhotos?.find((photo) => photo.isCurrent) || null;
  const hasProfilePhoto = !!currentProfilePhoto;

  if (!hasProfilePhoto) {
    return (
      <Container
        containerSize={containerSize}
        hasProfilePhoto={false}
        isSquare={isSquare}
        style={containerStyle}
        onClick={onPhotoClick}
      >
        <FaUser color={Colors.RaisinBlack} size={iconSize} style={iconStyle} />
      </Container>
    );
  }

  const { url } = currentProfilePhoto;

  return (
    <Container
      containerSize={containerSize}
      hasProfilePhoto={hasProfilePhoto}
      isSquare={isSquare}
      style={containerStyle}
      onClick={onPhotoClick}
    >
      <Photo
        alt="PROFILE_PHOTO"
        isSquare={isSquare}
        src={url}
        style={photoStyle}
      />
    </Container>
  );
}
