import styled from "styled-components";

const Label = styled.label<StyleProps>`
  color: ${(props) => props.color};
  font-weight: 600;
`;

const Radio = styled.input.attrs({ type: "radio" })<StyleProps>`
  -webkit-appearance: none;
  appearance: none;
  border: 2px solid ${(props) => props.color};
  border-radius: 50%;
  height: 1.5em;
  margin: 0;
  width: 1.5em;

  ::after {
    border-radius: 50%;
    content: "";
    display: block;
    height: 0.75em;
    margin: 3px;
    width: 0.75em;
  }

  :checked {
    ::after {
      background-color: ${(props) => props.color};
    }
  }
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
`;

type CommonProps = {
  isChecked: boolean;
  label?: string;
  onChange: () => void;
};

type StyleProps = {
  color: string;
};

type Props = CommonProps & StyleProps;

export function RadioButton({ color, isChecked, label, onChange }: Props) {
  const radioId = label ? "radio-button" : undefined;

  return (
    <Wrapper>
      <Radio
        id={radioId}
        color={color}
        checked={isChecked}
        onChange={onChange}
      />
      {label && (
        <Label color={color} htmlFor="radio-button">
          {label}
        </Label>
      )}
    </Wrapper>
  );
}
