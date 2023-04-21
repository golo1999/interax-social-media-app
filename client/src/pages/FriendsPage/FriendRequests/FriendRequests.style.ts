import styled from "styled-components";

import { Colors } from "environment";

export const Button = {
  Confirm: styled.button.attrs({ type: "button" })`
    background-color: ${Colors.BrightNavyBlue};
    border-radius: 5px;
    color: white;
    font-weight: 600;
    padding: 0.5em;

    &:hover {
      background-color: ${Colors.BleuDeFrance};
    }
  `,
  Remove: styled.button.attrs({ type: "button" })`
    background-color: ${Colors.BlackOlive};
    border-radius: 5px;
    color: ${Colors.Platinum};
    font-weight: 600;
    padding: 0.5em;

    &:hover {
      background-color: ${Colors.DarkLiver};
    }
  `,
  SeeMore: styled.button.attrs({ type: "button" })`
    align-items: center;
    background-color: inherit;
    border-radius: 5px;
    color: ${Colors.BleuDeFrance};
    display: flex;
    font-size: medium;
    font-weight: 600;
    justify-content: center;
    padding: 0.5em 0;

    &:hover {
      background-color: ${Colors.DarkCharcoal};
    }
  `,
};

interface DisplayedNameContainerProps {
  mutualFriendsCount: number;
}

export const Container = {
  DisplayedName: styled.div<DisplayedNameContainerProps>`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    ${(props) => props.mutualFriendsCount === 0 && "padding-bottom: 0.25em;"};
  `,
  Main: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
  `,
  MutualFriends: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25em;
    padding: 0 0.5em 0.5em 0.5em;
    flex: 1;
    justify-content: flex-end;
  `,
};

export const DisplayedName = styled.p`
  color: ${Colors.Platinum};
  font-weight: 500;
  overflow: hidden;
  padding: 0 0.5em 0.25em 0.5em;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MutualFriends = styled.p`
  color: ${Colors.PhilippineGray};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
