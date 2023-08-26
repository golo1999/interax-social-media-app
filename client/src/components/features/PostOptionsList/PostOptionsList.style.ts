import styled from "styled-components";

import { Colors } from "environment";

export const Container = {
  Main: styled.div`
    background-color: ${Colors.RaisinBlack};
    border-radius: 8px;
    box-shadow: 0 12px 28px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    padding: 8px;
    position: absolute;
    right: 16px;
    top: 0;
    z-index: 1;
  `,
};
