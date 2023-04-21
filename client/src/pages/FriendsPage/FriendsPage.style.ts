import styled from "styled-components";

import { Colors } from "environment";

export const Container = {
  Content: styled.div`
    display: flex;
    flex: 1;
    margin-top: 55px;
    max-height: calc(100vh - 55px);
  `,
  Main: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
  `,
  Navigation: styled.div`
    background-color: ${Colors.RaisinBlack};
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    padding: 1em 0.5em;
    width: 350px;
  `,
  NavigationItem: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;
    padding: 2em;
  `,
};

export const List = styled.ul`
  display: grid;
  gap: 0.5em;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  list-style-type: none;
`;

export const ListItem = styled.li`
  background-color: ${Colors.RaisinBlack};
  border-radius: 5px;
  border: 1px solid ${Colors.Onyx};
  display: flex;
  flex-direction: column;
`;

export const NavigationTitle = styled.h2`
  color: ${Colors.Platinum};
  padding: 0 0.5em;
`;

export const SectionHeader = styled.div`
  align-items: center;
  display: flex;
  gap: 1em;
  justify-content: space-between;
`;

export const SectionNoData = styled.p`
  color: ${Colors.Platinum};
`;

export const SectionTitle = styled.h3`
  color: ${Colors.Platinum};
`;

export const SeeButton = styled.button.attrs({ type: "button" })`
  background-color: inherit;
  border-radius: 5px;
  color: ${Colors.TuftsBlue};
  font-size: medium;
  padding: 0.5em;
  user-select: none;

  &:hover {
    background-color: ${Colors.BlackOlive};
  }
`;
