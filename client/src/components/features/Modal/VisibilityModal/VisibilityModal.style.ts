import styled from "styled-components";

import { Colors } from "environment";

interface Props {
  isSelected: boolean;
}

export const Button = {
  Cancel: styled.button.attrs({ type: "button" })`
    background-color: inherit;
    border-radius: 5px;
    color: ${Colors.BrightNavyBlue};
    font-weight: bold;
    padding: 0.5em 1em;

    &:hover {
      background-color: ${Colors.BlackOlive};
    }
  `,
  Done: styled.button.attrs({ type: "button" })`
    background-color: ${Colors.BrightNavyBlue};
    border-radius: 5px;
    color: ${Colors.Platinum};
    font-weight: bold;
    padding: 0.5em 2em;

    &:hover {
      background-color: ${Colors.BleuDeFrance};
    }
  `,
};

type IconContainerProps = { isHidden?: boolean };

export const IconContainer = styled.span<IconContainerProps>`
  align-items: center;
  background-color: ${Colors.BlackOlive};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  padding: 0.25em;
  ${(props) => props.isHidden && "visibility: hidden;"};
  width: fit-content;

  &:hover {
    background-color: ${Colors.DarkLiver};
  }
`;

export const List = styled.ul`
  display: flex;
  flex: 1;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0.5em;
  user-select: none;
`;

export const ListItem = {
  DetailsContainer: styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
  `,
  Element: styled.li<Props>`
    align-items: center;
    ${(props) => props.isSelected && `background-color: ${Colors.GunMetal};`};
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    gap: 1em;
    padding: 0.5em;

    &:hover {
      ${(props) =>
        !props.isSelected && `background-color: ${Colors.BlackOlive};`}
    }
  `,
  IconContainer: styled.div<Props>`
    align-items: center;
    background-color: ${(props) =>
      props.isSelected ? Colors.Arsenic : Colors.DarkLiver};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    padding: 1em;
  `,
  Title: styled.p`
    color: ${Colors.Platinum};
    font-weight: 500;
  `,
};

export const Title = styled.p`
  font-size: larger;
`;
