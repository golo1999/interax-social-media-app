import styled from "styled-components";

import { Colors } from "environment";

export const Container = {
  Chat: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
  `,
  ChatHeader: styled.div`
    align-items: center;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    display: flex;
    gap: 0.5em;
    justify-content: space-between;
    padding: 0.5em;
    user-select: none;
  `,
  Content: styled.div`
    display: flex;
    flex: 1;
    margin-top: 55px;
    max-height: calc(100vh - 55px);
  `,
  Icon: styled.div`
    align-items: center;
    border-radius: 50%;
    display: flex;
    padding: 0.25em;

    &:hover {
      background-color: ${Colors.BlackOlive};
    }
  `,
  Icons: styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
  `,
  Main: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
  `,
  User: styled.div`
    align-items: center;
    border-radius: 5px;
    display: flex;
    gap: 0.5em;
    padding: 0.25em;

    &:hover {
      background-color: ${Colors.BlackOlive};
    }
  `,
};

export const User = {
  Active: styled.div`
    color: silver;
    font-size: small;
  `,
  DetailsContainer: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Name: styled.div`
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    color: ${Colors.Platinum};
    display: -webkit-box;
    font-weight: 500;
    line-clamp: 1;
    overflow: hidden;
    white-space: pre-wrap;
  `,
};
