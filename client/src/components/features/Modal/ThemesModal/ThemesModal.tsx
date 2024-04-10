import { Divider } from "@mui/material";

import { useMemo, useState } from "react";
import { IconType } from "react-icons";
import { MdBlock, MdClose } from "react-icons/md";

import { Modal } from "components";
import { Colors } from "environment";
import { ConversationTheme } from "models";

import { Button, Default, List, ListItem, Theme } from "./ThemesModal.style";

interface DefaultItem {
  color?: never;
  icon: IconType;
}

interface ThemeItem {
  color: keyof typeof Colors;
  icon?: never;
}

type Item = { name: ConversationTheme } & (DefaultItem | ThemeItem);

interface Props {
  selectedItem: ConversationTheme | undefined;
  onCloseClick: () => void;
  onSaveClick: (name: ConversationTheme) => void;
}

export function ThemesModal({
  selectedItem: initiallySelectedItem,
  onCloseClick,
  onSaveClick,
}: Props) {
  const ITEMS = useMemo<Item[]>(
    () => [
      { icon: MdBlock, name: ConversationTheme.DEFAULT },
      { color: "Blood", name: ConversationTheme.BLOOD },
      { color: "ChineseYellow", name: ConversationTheme.CHINESE_YELLOW },
      { color: "Indigo", name: ConversationTheme.INDIGO },
      {
        color: "MaximumBluePurple",
        name: ConversationTheme.MAXIMUM_BLUE_PURPLE,
      },
      { color: "OceanBlue", name: ConversationTheme.OCEAN_BLUE },
      { color: "PurplePizzazz", name: ConversationTheme.PURPLE_PIZZAZZ },
      { color: "Red", name: ConversationTheme.RED },
      { color: "SunsetOrange", name: ConversationTheme.SUNSET_ORANGE },
      { color: "SweetBrown", name: ConversationTheme.SWEET_BROWN },
      { color: "VeryLightBlue", name: ConversationTheme.VERY_LIGH_BLUE },
      { color: "VividMalachite", name: ConversationTheme.VIVID_MALACHITE },
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
        title="Themes"
        onRightIconClick={onCloseClick}
      />
      <Divider color="Onyx" />
      <Modal.Body padding="1.5em">
        <List>
          {ITEMS.map((item, index) => {
            const { color, icon: Icon } = item;
            const isSelected = item === selectedItem;

            // Default item
            if (Icon) {
              return (
                <ListItem
                  key={index}
                  isSelected={isSelected}
                  onClick={() => handleItemClick(item)}
                >
                  <Default>
                    <Icon color={Colors.Platinum} size="3em" />
                  </Default>
                </ListItem>
              );
            }

            return (
              <ListItem
                key={index}
                isSelected={isSelected}
                onClick={() => handleItemClick(item)}
              >
                <Theme color={color} />
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
