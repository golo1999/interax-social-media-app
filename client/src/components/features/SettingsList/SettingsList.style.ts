import styled from "styled-components";

import { Colors } from "environment";

export const Container = {
  Main: styled.div`
    background-color: ${Colors.RaisinBlack};
    border-radius: 5px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    color: white;
    display: flex;
    flex-direction: column;
    padding: 0.5em;
    position: fixed;
    right: 1em;
    top: 50px;
    width: 350px;
    z-index: 2;
  `,
};
