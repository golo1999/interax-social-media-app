import styled from "styled-components";

export const Header = styled.div`
  align-items: center;
  display: flex;
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
    background-color: #3a3b3c;
  }
`;

export const ButtonsContainer = styled.div`
  align-items: center;
  display: flex;
  position: relative;
`;

export const MainContainer = styled.div`
  background-color: #242526;
  border-radius: 5px;
  color: #abadb1;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
`;

export const PostOwnerContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  gap: 1em;
`;

export const PostOwnerName = styled.p`
  color: #cfd1d5;
  font-weight: bold;
  user-select: none;
`;

export const PostText = styled.span`
  color: #cfd1d5;
`;
