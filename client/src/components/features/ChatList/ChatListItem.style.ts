import styled from "styled-components";

import { Colors } from "environment";

export const Container = {
  DateTime: styled.div`
    align-items: center;
    display: flex;
    flex: 1;
    gap: 0.25em;
  `,
  Details: styled.div`
    display: flex;
    flex-direction: column;
    min-width: 0;
  `,
  Message: styled.div`
    align-items: center;
    color: silver;
    display: flex;
    gap: 0.25em;
  `,
};

export const DisplayedName = styled.p`
  color: ${Colors.Platinum};
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface ListItemProps {
  isModal?: boolean;
  isSelected?: boolean;
}

export const ListItem = styled.ul<ListItemProps>`
  align-items: center;
  ${(props) =>
    !props.isModal &&
    props.isSelected &&
    `background-color: ${Colors.GunMetal};`};
  border-radius: 5px;
  display: flex;
  gap: 0.5em;
  padding: 0.5em;

  &:hover {
    ${(props) =>
      !props.isSelected && `background-color: ${Colors.BlackOlive};`};
  }
`;

export const Message = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TimePassed = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
