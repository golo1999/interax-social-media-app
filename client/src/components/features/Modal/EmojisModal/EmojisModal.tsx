import { Divider } from "@mui/material";

import { useMemo, useState } from "react";
import { IconType } from "react-icons";
import { HiHeart, HiThumbUp } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import styled from "styled-components";

import { Modal } from "components";
import { Colors } from "environment";
import { Emoji } from "models";

const Button = {
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

const List = styled.ul`
  color: ${Colors.Platinum};
  display: grid;
  gap: 0.5em;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  height: fit-content;
  list-style-type: none;
`;

interface ListItemProps {
  isSelected: boolean;
}

const ListItem = styled.li<ListItemProps>`
  ${({ isSelected }) =>
    isSelected && `background-color: ${Colors.BlackOlive};`};
  border-radius: 10px;
  padding: 0.5em 10px;

  &:hover {
    ${({ isSelected }) =>
      !isSelected && `background-color: ${Colors.BlackOlive};`}
  }
`;

interface Item {
  icon: IconType;
  name: string;
}

interface Props {
  selectedItem: Emoji | undefined;
  onCloseClick: () => void;
  onSaveClick: (name: string) => void;
}

export function EmojisModal({
  selectedItem: initiallySelectedItem,
  onCloseClick,
  onSaveClick,
}: Props) {
  const ITEMS = useMemo<Item[]>(
    () => [
      { icon: HiThumbUp, name: Emoji.LIKE },
      { icon: HiHeart, name: Emoji.LOVE },
    ],
    []
  );

  const [selectedItem, setSelectedItem] = useState(
    ITEMS.find((item) => item.name === initiallySelectedItem) || ITEMS[0]
  );

  function handleItemClick(item: Item) {
    if (item !== selectedItem) {
      setSelectedItem(item);
    }
  }

  function handleSaveClick() {
    onSaveClick(selectedItem.name);
    onCloseClick();
  }

  return (
    <Modal>
      <Modal.Header
        isTemplate
        rightIcon={MdClose}
        title="Emoji"
        onRightIconClick={onCloseClick}
      />
      <Divider color="Onyx" />
      <Modal.Body padding="1.5em">
        <List>
          {ITEMS.map((item, index) => {
            const { icon: Icon } = item;
            const isSelected = item === selectedItem;

            return (
              <ListItem
                key={index}
                isSelected={isSelected}
                onClick={() => handleItemClick(item)}
              >
                <Icon size={24} />
              </ListItem>
            );
          })}
        </List>
      </Modal.Body>
      <Modal.Footer
        alignItems="center"
        gap="0.5em"
        justifyContent="flex-end"
        padding="0.75em"
      >
        <Button.Cancel onClick={onCloseClick}>Cancel</Button.Cancel>
        <Button.Save onClick={handleSaveClick}>Save</Button.Save>
      </Modal.Footer>
    </Modal>
  );
}
