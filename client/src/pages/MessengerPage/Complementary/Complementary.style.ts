import styled from "styled-components";

import { Colors } from "environment";

export const Container = {
  Main: styled.div.attrs({ role: "complementary" })`
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: 350px;
  `,
  Options: styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 0.5em;
  `,
};

export const StyledUser = {
  Active: styled.p`
    color: silver;
    font-size: small;
  `,
  Container: {
    Details: styled.div`
      align-items: center;
      display: flex;
      flex-direction: column;
    `,
    Main: styled.div`
      align-items: center;
      align-self: center;
      display: flex;
      flex-direction: column;
      gap: 0.5em;
      padding-top: 1em;
    `,
  },
  DisplayedName: styled.p`
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    color: ${Colors.Platinum};
    display: -webkit-box;
    font-weight: 500;
    line-clamp: 1;
    overflow: hidden;
    white-space: pre-wrap;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  `,
};
