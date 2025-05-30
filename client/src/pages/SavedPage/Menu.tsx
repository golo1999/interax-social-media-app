import { Delete, Edit } from "@mui/icons-material";

import styled from "styled-components";

import { Colors } from "environment";

const Container = {
  Item: styled.div`
    align-items: center;
    border-radius: 3px;
    display: flex;
    gap: 0.5em;
    height: 36px;
    padding: 0.5em;

    &:hover {
      background-color: ${Colors.AntiFlashWhite};
    }
  `,
  Main: styled.div`
    background-color: ${Colors.White};
    border-radius: 0.5em;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 28px 0px,
      rgba(0, 0, 0, 0.1) 0px 2px 4px 0px;
    display: flex;
    flex-direction: column;
    padding: 0.5em;
    position: absolute;
    right: 0;
    top: 48px;
    user-select: none;
    width: 250px;
  `,
};

interface Props {
  onDeleteClick: () => void;
  onRenameClick: () => void;
}

export function Menu({ onDeleteClick, onRenameClick }: Props) {
  return (
    <Container.Main>
      <Container.Item onClick={onRenameClick}>
        <Edit sx={{ fontSize: "18px" }} />
        <p>Rename collection</p>
      </Container.Item>
      <Container.Item onClick={onDeleteClick}>
        <Delete sx={{ fontSize: "18px" }} />
        <p>Delete collection</p>
      </Container.Item>
    </Container.Main>
  );
}
