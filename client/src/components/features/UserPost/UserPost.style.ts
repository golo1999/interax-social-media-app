import styled from "styled-components";

import { Colors } from "environment";

export const Button = styled.button`
  align-items: center;
  background-color: transparent;
  border-radius: 5px;
  display: flex;
  flex: 1;
  gap: 0.5em;
  justify-content: center;
  font-size: 1em;
  font-weight: bold;
  padding: 0.5em 0;

  &:hover {
    background-color: ${Colors.BlackOlive};
  }
`;

export const Container = {
  Buttons: styled.div`
    align-items: center;
    display: flex;
    position: relative;
  `,
  MoreOptionsIcon: styled.div`
    align-items: center;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    padding: 0.25em;

    &:hover {
      background-color: ${Colors.BlackOlive};
    }
  `,
  PostOwner: styled.div`
    align-items: center;
    display: flex;
    flex: 1;
    gap: 1em;
  `,
};

export const Header = styled.div`
  align-items: center;
  display: flex;
  gap: 1em;
`;

export const PostOwnerName = styled.p`
  color: ${Colors.LightGray};
  cursor: pointer;
  font-weight: bold;
  max-width: 60ch;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`;

export const PostText = styled.span`
  color: ${Colors.LightGray};
`;
