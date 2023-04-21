import styled from "styled-components";

import { Colors } from "environment";

interface MediaContainerProps {
  itemsCount: number;
}

export const Container = {
  Files: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 0.5em;
  `,
  Main: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 0.5em;
    overflow: auto;
    padding: 1em;
  `,
  Media: styled.div<MediaContainerProps>`
    display: ${(props) => (props.itemsCount > 0 ? "grid" : "flex")};
    ${(props) => props.itemsCount === 0 && "flex: 1;"};
    gap: 0.25em;
    ${(props) =>
      props.itemsCount > 0 &&
      "grid-template-columns: repeat(3, minmax(0, 1fr));"};
  `,
  NoData: styled.div`
    align-items: center;
    color: silver;
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 0.5em;
    justify-content: center;
    text-align: center;
  `,
  Unavailable: styled.div`
    display: flex;
    height: fit-content;
    justify-content: center;
    width: 100%;
  `,
};

export const Header = styled.div`
  align-items: center;
  color: ${Colors.Platinum};
  display: flex;
  gap: 0.5em;
`;

export const Media = styled.img`
  aspect-ratio: 1 / 1;
  max-width: 100%;
  object-fit: cover;
`;

export const Title = styled.p`
  font-weight: 500;
`;
