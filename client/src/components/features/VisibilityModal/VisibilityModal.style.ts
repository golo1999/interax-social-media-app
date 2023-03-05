import styled from "styled-components";

interface Props {
  isSelected: boolean;
}

export const Button = {
  Cancel: styled.button.attrs({ type: "button" })`
    background-color: inherit;
    border-radius: 5px;
    color: #2374e1;
    font-weight: bold;
    padding: 0.5em 1em;

    &:hover {
      background-color: #3a3b3c;
    }
  `,
  Done: styled.button.attrs({ type: "button" })`
    background-color: #2374e1;
    border-radius: 5px;
    color: #e4e6ea;
    font-weight: bold;
    padding: 0.5em 2em;

    &:hover {
      background-color: #3982e4;
    }
  `,
};

export const CloseIconContainer = styled.span`
  align-items: center;
  background-color: #3a3b3c;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  padding: 0.25em;
  width: fit-content;

  &:hover {
    background-color: #4e4f50;
  }
`;

export const Footer = styled.div`
  align-items: center;
  display: flex;
  gap: 0.5em;
  justify-content: flex-end;
  padding: 0.75em;
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  gap: 0.5em;
  justify-content: space-between;
  padding: 0.75em;
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
    ${(props) => props.isSelected && "background-color: #252f3c;"};
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    gap: 1em;
    padding: 0.5em;

    &:hover {
      ${(props) => !props.isSelected && "background-color: #3a3b3c;"}
    }
  `,
  IconContainer: styled.div<Props>`
    align-items: center;
    background-color: ${(props) => (props.isSelected ? "#3b4550" : "#4e4f50")};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    padding: 1em;
  `,
  Title: styled.p`
    color: #e4e6ea;
    font-weight: 500;
  `,
};

export const Title = styled.p`
  color: #e4e6ea;
  font-size: larger;
`;
