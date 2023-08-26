import styled from "styled-components";

import { Colors } from "environment";

export const Container = {
  Content: styled.div`
    display: flex;
    flex: 1;
    margin-top: 55px;
    max-height: calc(100vh - 55px);
  `,
  Main: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
  `,
  Navigation: styled.div`
    background-color: ${Colors.RaisinBlack};
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    padding: 1em 0.5em;
    width: 350px;
  `,
  NavigationItem: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;
    padding: 2em;
  `,
};
