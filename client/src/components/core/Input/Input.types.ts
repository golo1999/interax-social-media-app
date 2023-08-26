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

export type BorderStyle =
  | BorderStyleType
  | `${BorderStyleType} ${BorderStyleType}`
  | `${BorderStyleType} ${BorderStyleType} ${BorderStyleType}`
  | `${BorderStyleType} ${BorderStyleType} ${BorderStyleType} ${BorderStyleType}`;
