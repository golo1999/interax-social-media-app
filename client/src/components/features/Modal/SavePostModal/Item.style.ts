import styled from "styled-components";

import { Colors } from "environment";

export const Container = {
  Main: styled.div`
    align-items: center;
    border-radius: 5px;
    display: flex;
    gap: 8px;
    height: 64px;
    padding: 8px;

    &:hover {
      background-color: ${Colors.AntiFlashWhite};
    }
  `,
};
