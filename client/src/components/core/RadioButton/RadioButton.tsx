import { Radio } from "@mui/material";
import { CSSProperties, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

import { Colors } from "environment";

import { Label, Wrapper } from "./RadioButton.style";

type CommonProps = {
  isChecked: boolean;
  onChange: () => void;
};

type LabelPosition = "end" | "start";

type LabelProps =
  | { label?: never; labelPosition?: never }
  | { label: string; labelPosition?: LabelPosition };

type StyleProps = {
  color: keyof typeof Colors;
  labelStyle?: CSSProperties;
  wrapperStyle?: CSSProperties;
};

type Props = CommonProps & LabelProps & StyleProps;

export function RadioButton({
  color,
  isChecked,
  label,
  labelPosition = "end",
  labelStyle,
  wrapperStyle,
  onChange,
}: Props) {
  const radioId = useMemo(
    () => (label ? `radio-button-${label}-${uuidv4()}` : undefined),
    [label]
  );
  const radioStyle: CSSProperties = useMemo(() => {
    return { cursor: "default", padding: 0 };
  }, []);

  return (
    <Wrapper style={wrapperStyle} onClick={onChange}>
      {label && labelPosition === "start" && (
        <Label color={color} htmlFor={radioId} style={labelStyle}>
          {label}
        </Label>
      )}
      <Radio
        checked={isChecked}
        color="primary"
        id={radioId}
        style={radioStyle}
      />
      {label && labelPosition === "end" && (
        <Label color={color} htmlFor={radioId} style={labelStyle}>
          {label}
        </Label>
      )}
    </Wrapper>
  );
}
