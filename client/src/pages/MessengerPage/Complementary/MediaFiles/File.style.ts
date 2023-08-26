import styled from "styled-components";

import { Colors } from "environment";

export const Container = {
  Details: styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 0;
  `,
  Icon: styled.div`
    align-items: center;
    aspect-ratio: 1 / 1;
    background-color: ${Colors.BlackOlive};
    border-radius: 5px;
    display: flex;
    height: 100%;
    justify-content: center;
    padding: 1em;
  `,
  Main: styled.div`
    align-items: center;
    display: flex;
    gap: 0.5em;
  `,
};

export const Name = styled.p`
  color: ${Colors.Platinum};
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Size = styled.p`
  color: silver;
  font-size: small;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
