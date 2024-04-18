import { ReactNode } from "react";
import { IconType } from "react-icons";

import { Colors } from "environment";
import { FlexAlignItems, FlexDirection, FlexJustifyContent } from "types";

type ChildrenProps = { children?: ReactNode };

type HeaderTemplateProps =
  | {
      alignItems?: never;
      color?: never;
      direction?: never;
      gap?: never;
      iconColor?: keyof typeof Colors;
      iconSize?: string;
      isTemplate: true;
      justifyContent?: never;
      leftIcon?: IconType;
      padding?: never;
      rightIcon?: IconType;
      title: string;
      titleColor?: keyof typeof Colors;
      onLeftIconClick?: () => void;
      onRightIconClick?: () => void;
    }
  | {
      alignItems?: FlexAlignItems;
      color?: keyof typeof Colors;
      direction?: FlexDirection;
      gap?: string;
      iconColor?: never;
      iconSize?: never;
      isTemplate?: never;
      justifyContent?: FlexJustifyContent;
      leftIcon?: never;
      padding?: string;
      rightIcon?: never;
      title?: never;
      titleColor?: never;
      onLeftIconClick?: never;
      onRightIconClick?: never;
    };

export type ModalProps = ChildrenProps & { minHeight?: string; width?: string };

export type StyleProps = {
  alignItems?: FlexAlignItems;
  color?: keyof typeof Colors;
  direction?: FlexDirection;
  gap?: string;
  justifyContent?: FlexJustifyContent;
  padding?: string;
};

export type BodyProps = ChildrenProps & StyleProps;

export type FooterProps = ChildrenProps & StyleProps;

export type HeaderProps = ChildrenProps & HeaderTemplateProps;
