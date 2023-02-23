import styled from "styled-components";

export const InnerContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 0.5em;
  margin-top: 0.5em;
`;

export const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const OwnerDetails = {
  Badge: styled.p`
    font-size: 0.6em;
  `,
  Container: styled.div`
    background-color: #3a3b3c;
    border-radius: 20px;
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 5px 10px;
  `,
  Name: styled.p`
    font-weight: bold;
    user-select: none;
  `,
};

export const Reactions = {
  Container: styled.div`
    align-items: center;
    display: flex;
    font-size: 0.7em;
    gap: 0.5em;
    position: relative;
    user-select: none;
  `,
};
