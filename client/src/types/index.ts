export type BorderStyle =
  | BorderStyleType
  | `${BorderStyleType} ${BorderStyleType}`
  | `${BorderStyleType} ${BorderStyleType} ${BorderStyleType}`
  | `${BorderStyleType} ${BorderStyleType} ${BorderStyleType} ${BorderStyleType}`;

type BorderStyleType =
  | "-moz-initial"
  | "dashed"
  | "dotted"
  | "double"
  | "groove"
  | "hidden"
  | "inherit"
  | "initial"
  | "inset"
  | "none"
  | "outset"
  | "revert-layer"
  | "revert"
  | "ridge"
  | "solid"
  | "unset";

export type DropdownDirection = "BOTTOM" | "TOP";

export type FlexAlignItems =
  | "baseline"
  | "center"
  | "flex-end"
  | "flex-start"
  | "stretch";

export type FlexDirection = "column" | "column-reverse" | "row" | "row-reverse";

export type FlexJustifyContent =
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

export type FontWeight =
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "bold"
  | "bolder"
  | "inherit"
  | "initial"
  | "lighter"
  | "normal"
  | "revert-layer"
  | "revert"
  | "unset";

export type FooterIcon = "SEND" | "THUMB_UP";

export type Gender = "Female" | "Male";

export type LabelPosition = "end" | "start";

export type MediaFileType = "FILES" | "MEDIA";

export type MessageBoxVisibility = "HIDDEN" | "VISIBLE";

export type ModalType = "CREATE_POST" | "POST_VISIBILITY";

export type NotificationsListContent = "ALL" | "UNREAD";

export type NotificationType =
  | "BIRTHDAY"
  | "COMMENT"
  | "GROUP/POST_ADDED"
  | "GROUP/WELCOME"
  | "POST_ADDED"
  | "POST_REACTED";

export type SettingsListContent =
  | "DEFAULT"
  | "DISPLAY"
  | "SETTINGS"
  | "SETTINGS/LANGUAGE";

export type Theme = "DARK" | "LIGHT";
