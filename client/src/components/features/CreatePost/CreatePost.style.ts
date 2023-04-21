import styled from "styled-components";

import { Colors } from "environment";

export const Container = {
  Items: styled.div`
    align-items: center;
    display: flex;
    gap: 0.5em;
  `,
  Main: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Text: styled.div`
    align-items: center;
    background-color: ${Colors.BlackOlive};
    border-radius: 20px;
    color: ${Colors.MetallicSilver};
    display: flex;
    flex: 1;
    padding: 0.5em 1em;
    user-select: none;

    &:hover {
      background-color: ${Colors.DarkLiver};
    }
  `,
};
