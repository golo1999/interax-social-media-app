import { ReactNode } from "react";
import { IconType } from "react-icons";

import { Colors } from "environment";

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
      alignItems?:
        | "baseline"
        | "center"
        | "flex-end"
        | "flex-start"
        | "stretch";
      color?: keyof typeof Colors;
      direction?: "column" | "column-reverse" | "row" | "row-reverse";
      gap?: string;
      iconColor?: never;
      iconSize?: never;
      isTemplate?: never;
      justifyContent?:
        | "baseline"
        | "center"
        | "end"
        | "first baseline"
        | "flex-end"
        | "flex-start"
        | "last baseline"
        | "left"
        | "right"
        | "safe"
        | "space-around"
        | "space-between"
        | "space-evenly"
        | "start"
        | "stretch";
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
  alignItems?: "baseline" | "center" | "flex-end" | "flex-start" | "stretch";
  color?: keyof typeof Colors;
  direction?: "column" | "column-reverse" | "row" | "row-reverse";
  gap?: string;
  justifyContent?:
    | "baseline"
    | "center"
    | "end"
    | "first baseline"
    | "flex-end"
    | "flex-start"
    | "last baseline"
    | "left"
    | "right"
    | "safe"
    | "space-around"
    | "space-between"
    | "space-evenly"
    | "start"
    | "stretch";
  padding?: string;
};

export type BodyProps = ChildrenProps & StyleProps;

export type FooterProps = ChildrenProps & StyleProps;

export type HeaderProps = ChildrenProps & HeaderTemplateProps;
