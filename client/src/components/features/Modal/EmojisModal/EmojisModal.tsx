import { Divider } from "@mui/material";

import { useMemo, useState } from "react";
import { IconType } from "react-icons";
import { HiHeart, HiThumbUp } from "react-icons/hi";
import { MdClose } from "react-icons/md";

import { Modal } from "components";
import { Emoji } from "enums";
import { Colors } from "environment";
import { useAuthenticationStore, useSettingsStore } from "store";

import { Button, List, ListItem } from "./EmojisModal.style";

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
  const { authenticatedUser } = useAuthenticationStore();
  const ITEMS = useMemo<Item[]>(
    () => [
      { icon: HiThumbUp, name: Emoji.LIKE },
      { icon: HiHeart, name: Emoji.LOVE },
    ],
    []
  );
  const { theme } = useSettingsStore();
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

  const dividerColor: keyof typeof Colors =
    !!authenticatedUser && theme === "DARK" ? "Arsenic" : "LightGray";
  const emojiColor: keyof typeof Colors =
    !!authenticatedUser && theme === "DARK" ? "Platinum" : "DarkJungleGreen";
  const iconColor: keyof typeof Colors =
    !!authenticatedUser && theme === "DARK" ? "Platinum" : "PhilippineGray";
  const titleColor: keyof typeof Colors =
    !!authenticatedUser && theme === "DARK" ? "Platinum" : "VampireBlack";

  return (
    <Modal>
      <Modal.Header
        iconColor={iconColor}
        isTemplate
        rightIcon={MdClose}
        title="Emoji"
        titleColor={titleColor}
        onRightIconClick={onCloseClick}
      />
      <Divider sx={{ borderColor: Colors[dividerColor] }} />
      <Modal.Body padding="1.5em">
        <List>
          {ITEMS.map((item, index) => {
            const { icon: Icon } = item;
            const isSelected = item === selectedItem;

            return (
              <ListItem
                $isAuthenticated={!!authenticatedUser}
                $theme={theme}
                isSelected={isSelected}
                key={index}
                onClick={() => handleItemClick(item)}
              >
                <Icon color={Colors[emojiColor]} size={24} />
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
        <Button.Cancel
          $isAuthenticated={!!authenticatedUser}
          $theme={theme}
          onClick={onCloseClick}
        >
          Cancel
        </Button.Cancel>
        <Button.Save onClick={handleSaveClick}>Save</Button.Save>
      </Modal.Footer>
    </Modal>
  );
}
