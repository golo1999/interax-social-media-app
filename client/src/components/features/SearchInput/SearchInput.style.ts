import styled from "styled-components";

import { Colors } from "environment";

export const Container = styled.div`
  align-items: center;
  background-color: ${Colors.BlackOlive};
  border-radius: 20px;
  display: flex;
  gap: 0.25em;
  padding: 0.5em;
`;

export const Input = styled.input.attrs({ type: "text" })`
  background-color: inherit;
  border-radius: 20px;
  color: silver;
  flex: 1;
  padding: 0.25em;

  &::placeholder {
    color: silver;
  }
`;
