import styled from "styled-components";

import { Colors } from "environment";

export const Form = styled.form`
  display: flex;
  gap: 0.5em;
  padding: 7px 0;
`;

export const Logo = styled.p`
  color: ${Colors.BrightNavyBlue};
  font-size: 28px;
  font-weight: 700;
  text-transform: lowercase;
  user-select: none;
`;
