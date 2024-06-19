import styled from "styled-components";

import { Colors } from "environment";

export const Button = {
  UnsavePost: styled.button.attrs({ type: "button" })`
    align-items: center;
    display: flex;
    gap: 0.5em;
    padding: 0.5em;
  `,
};

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
  SavedPost: {
    Details: styled.div`
      display: flex;
      flex-direction: column;
      gap: 1em;
    `,
    Main: styled.div`
      align-items: center;
      background-color: ${Colors.White};
      border-radius: 5px;
      display: flex;
      gap: 1em;
      padding: 1em;
    `,
  },
  SavedPosts: {
    Inner: styled.div`
      display: flex;
      flex-direction: column;
      gap: 1em;
    `,
    Outer: styled.div`
      background-color: ${Colors.AntiFlashWhite};
      display: flex;
      flex-direction: column;
      flex: 1;
      gap: 1em;
      padding: 1em 2em;
    `,
  },
};

export const Sidebar = styled.div`
  background-color: ${Colors.White};
`;

export const Text = {
  SavedPost: {
    Text: styled.p`
      font-weight: bold;
    `,
  },
};
