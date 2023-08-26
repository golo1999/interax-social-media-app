import styled from "styled-components";

export const Container = {
  Content: styled.div`
    display: flex;
    gap: 5em;
    // margin-top for moving the content below Header
    margin-top: 55px;
    padding: 1em 0.5em;
  `,
  Main: styled.div`
    background-color: inherit;
    display: flex;
    flex-direction: column;
    flex: 1;
  `,
  Posts: styled.div.attrs({ role: "main" })`
    flex: 2;
  `,
};
