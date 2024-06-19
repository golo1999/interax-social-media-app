import { CSSProperties } from "react";

import { User } from "models";

type CommonProps = { user?: User | null; onPhotoClick?: () => void };

type ContainerCommonProps = { hasProfilePhoto: boolean };

type ProfilePhotoProps =
  | { isProfilePhoto: boolean; onChangePhotoClick: () => void }
  | { isProfilePhoto?: never; onChangePhotoClick?: never };

type ContainerOptionalProps = {
  containerSize?: string;
  containerStyle?: CSSProperties;
  iconSize?: string;
  isChatHead?: boolean;
  isSquare?: boolean;
} & ProfilePhotoProps;

export type ContainerProps = ContainerCommonProps & ContainerOptionalProps;

type IconProps = { iconStyle?: CSSProperties };

export type PhotoProps = { isSquare?: boolean; photoStyle?: CSSProperties };

export type Props = CommonProps &
  ContainerOptionalProps & { photoStyle?: CSSProperties } & IconProps;
