import { useState } from "react";
import { IconType } from "react-icons";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import { Colors } from "environment";
import { useAuthenticationStore, useSettingsStore } from "store";

import { Label, List, ListItem } from "./CollapsibleList.style";

export interface CollapsibleListItem {
  icon: IconType;
  iconColor?: keyof typeof Colors;
  text: string;
  onClick: () => void;
}

interface Props {
  items: CollapsibleListItem[];
  label: string;
}

export function CollapsibleList({ items, label }: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  function handleClick() {
    setIsCollapsed((value) => !value);
  }

  const LabelIcon = isCollapsed ? MdKeyboardArrowUp : MdKeyboardArrowDown;

  const themeProps = { $isAuthenticated: !!authenticatedUser, $theme: theme };

  const labelIconColor =
    !!authenticatedUser && theme === "DARK"
      ? Colors.PhilippineSilver
      : Colors.DarkJungleGreen;

  return (
    <>
      <Label.Container {...themeProps} onClick={handleClick}>
        <Label.Text {...themeProps}>{label}</Label.Text>
        <LabelIcon color={labelIconColor} size={24} />
      </Label.Container>
      {isCollapsed && (
        <List {...themeProps}>
          {items.map((item, index) => {
            const { icon: Icon, iconColor, text, onClick } = item;

            return (
              <ListItem.Container {...themeProps} key={index} onClick={onClick}>
                <Icon
                  color={
                    typeof iconColor !== "undefined"
                      ? Colors[iconColor]
                      : undefined
                  }
                  size={24}
                />
                <ListItem.Text>{text}</ListItem.Text>
              </ListItem.Container>
            );
          })}
        </List>
      )}
    </>
  );
}
