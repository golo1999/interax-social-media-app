import styled from "styled-components";

import { Colors } from "environment";

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
  Save: styled.button.attrs({ type: "button" })`
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

export const Default = styled.div`
  align-items: center;
  border-radius: 50%;
  display: flex;
  justify-content: center;
`;

export const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  height: fit-content;
  list-style-type: none;
`;

interface ListItemProps {
  isSelected: boolean;
}

export const ListItem = styled.li<ListItemProps>`
  ${({ isSelected }) =>
    isSelected && `background-color: ${Colors.BlackOlive};`};
  border-radius: 15px;
  padding: 0.5em;

  &:hover {
    ${({ isSelected }) =>
      !isSelected && `background-color: ${Colors.BlackOlive};`}
  }
`;

interface ThemeProps {
  color: keyof typeof Colors;
}

export const Theme = styled.div<ThemeProps>`
  background-color: ${({ color }) => Colors[color]};
  border-radius: 50%;
  height: 3em;
  width: 3em;
`;
