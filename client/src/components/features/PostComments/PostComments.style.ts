import styled from "styled-components";

export const Container = {
  Comments: styled.div`
    padding-top: 5px;
  `,
  Main: styled.div`
    display: flex;
    flex-direction: column;
  `,
};

export const Text = {
  ShowMoreReplies: styled.p`
    cursor: pointer;
    width: fit-content;

    &:hover {
      text-decoration: underline;
    }
  `,
};
