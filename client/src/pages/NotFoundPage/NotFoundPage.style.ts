import { GrDocumentLocked } from "react-icons/gr";
import styled from "styled-components";

import { Colors } from "environment";

export const Button = styled.button.attrs({ type: "button" })`
  background-color: ${Colors.BrightNavyBlue};
  border-radius: 5px;
  color: ${Colors.Platinum};
  font-weight: 600;
  padding: 0.75em 3em;

  &:hover {
    background-color: ${Colors.BrilliantAzure};
  }
`;

export const Container = {
  Content: styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 0.5em;
    justify-content: center;
    // MarginTop for moving the content below Header
    margin-top: 55px;
  `,
  Main: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
  `,
};

export const ContentUnavailable = styled.p`
  color: silver;
  font-weight: 500;
`;

export const GoBack = styled.p`
  color: ${Colors.BrightNavyBlue};
  font-weight: 500;
  user-select: none;
`;

export const Icon = styled(GrDocumentLocked)`
  & path {
    stroke: ${Colors.Platinum};
  }
`;
