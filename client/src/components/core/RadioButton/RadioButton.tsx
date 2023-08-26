import { CSSProperties, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

import { Colors } from "environment";

import { Label, Radio, Wrapper } from "./RadioButton.style";

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
  inputStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  wrapperStyle?: CSSProperties;
};

type Props = CommonProps & LabelProps & StyleProps;

export function RadioButton({
  color,
  inputStyle,
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

  return (
    <Wrapper style={wrapperStyle} onClick={onChange}>
      {label && labelPosition === "start" && (
        <Label color={color} htmlFor={radioId} style={labelStyle}>
          {label}
        </Label>
      )}
      <Radio
        id={radioId}
        color={color}
        checked={isChecked}
        style={inputStyle}
        onChange={onChange}
      />
      {label && labelPosition === "end" && (
        <Label color={color} htmlFor={radioId} style={labelStyle}>
          {label}
        </Label>
      )}
    </Wrapper>
  );
}
