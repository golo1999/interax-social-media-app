import styled from "styled-components";

import { Colors } from "environment";

export const Container = {
  Links: styled.div`
    align-items: center;
    display: flex;
    gap: 4px;
    justify-content: center;
  `,
  Main: styled.div`
    align-items: center;
    background-color: ${Colors.AntiFlashWhite};
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 1em;
    justify-content: center;
  `,
  Redirection: styled.div`
    background-color: ${Colors.CornSilk};
    border: 1px solid ${Colors.DeepLemon};
    color: ${Colors.DarkJungleGreen};
    font-size: 14px;
    padding: 10px;
    text-align: center;
  `,
};

export const Form = styled.form`
  background-color: ${Colors.White};
  border: 1px solid ${Colors.LightGray};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px 16px;
  width: 396px;
`;

export const Link = styled.p`
  color: ${Colors.BrightNavyBlue};
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export const LinkSeparator = styled.span`
  color: ${Colors.SpanishGray};
  cursor: default;
`;

export const Logo = styled.p`
  color: ${Colors.BrightNavyBlue};
  font-size: 48px;
  font-weight: 700;
  text-transform: lowercase;
  user-select: none;
`;

export const Title = styled.p`
  color: ${Colors.DarkJungleGreen};
  font-size: 18px;
  padding-bottom: 12px;
  text-align: center;
`;
