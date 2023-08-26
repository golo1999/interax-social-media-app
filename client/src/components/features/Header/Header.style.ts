import styled from "styled-components";

import { Colors } from "environment";

interface MainContainerProps {
  isUserAuthenticated: boolean;
}

export const Container = {
  Main: styled.div<MainContainerProps>`
    background-color: ${({ isUserAuthenticated }) =>
      isUserAuthenticated ? Colors.RaisinBlack : "white"};
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100%;
    z-index: 2;
  `,
  Top: styled.div`
    align-items: center;
    display: flex;
    flex: 1;
    justify-content: space-between;
    padding: 0 0.75em;
  `,
};
