import styled from "styled-components";

import { Colors } from "environment";

interface Props {
  color: keyof typeof Colors;
}

export const Label = styled.label<Props>`
  color: ${({ color }) => Colors[color]};
  font-weight: 600;
`;

type RadioProps = Props;

export const Radio = styled.input.attrs({ type: "radio" })<RadioProps>`
  -webkit-appearance: none;
  appearance: none;
  border: 2px solid ${({ color }) => Colors[color]};
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
      background-color: ${({ color }) => Colors[color]};
    }
  }
`;

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
`;
