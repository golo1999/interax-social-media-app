import styled from "styled-components";

import { Colors } from "environment";

export const Header = styled.div`
  align-items: center;
  display: flex;
  gap: 1em;
`;

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

export const ButtonsContainer = styled.div`
  align-items: center;
  display: flex;
  position: relative;
`;

export const PostOwnerContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  gap: 1em;
`;

export const PostOwnerName = styled.p`
  color: ${Colors.LightGray};
  font-weight: bold;
  max-width: 60ch;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
  white-space: nowrap;
`;

export const PostText = styled.span`
  color: ${Colors.LightGray};
`;
