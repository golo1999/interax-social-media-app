import { Divider } from "@mui/material";

import { useMemo, useState } from "react";
import { IconType } from "react-icons";
import { MdBlock, MdClose } from "react-icons/md";

import { Modal } from "components";
import { ConversationTheme } from "enums";
import { Colors } from "environment";
import { useAuthenticationStore, useSettingsStore } from "store";

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
  const { authenticatedUser } = useAuthenticationStore();
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
        title="Themes"
        titleColor={titleColor}
        onRightIconClick={onCloseClick}
      />
      <Divider sx={{ borderColor: Colors[dividerColor] }} />
      <Modal.Body padding="1.5em">
        <List>
          {ITEMS.map((item, index) => {
            const { color, icon: Icon } = item;
            const isSelected = item === selectedItem;

            // Default item
            if (Icon) {
              const iconColor =
                !!authenticatedUser && theme === "DARK"
                  ? Colors.Platinum
                  : Colors.VampireBlack;
              return (
                <ListItem
                  $isAuthenticated={!!authenticatedUser}
                  $theme={theme}
                  isSelected={isSelected}
                  key={index}
                  onClick={() => handleItemClick(item)}
                >
                  <Default>
                    <Icon color={iconColor} size="3em" />
                  </Default>
                </ListItem>
              );
            }

            return (
              <ListItem
                $isAuthenticated={!!authenticatedUser}
                $theme={theme}
                isSelected={isSelected}
                key={index}
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
