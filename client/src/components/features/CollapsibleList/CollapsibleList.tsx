import { useState } from "react";
import { IconType } from "react-icons";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import { Colors } from "environment";

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
  const [isCollapsed, setIsCollapsed] = useState(false);

  function handleClick() {
    setIsCollapsed((value) => !value);
  }

  const LabelIcon = isCollapsed ? MdKeyboardArrowUp : MdKeyboardArrowDown;

  return (
    <>
      <Label.Container onClick={handleClick}>
        <Label.Text>{label}</Label.Text>
        <LabelIcon color="silver" size={24} />
      </Label.Container>
      {isCollapsed && (
        <List>
          {items.map((item, index) => {
            const { icon: Icon, iconColor, text, onClick } = item;

            return (
              <ListItem key={index} onClick={onClick}>
                <Icon
                  color={
                    typeof iconColor !== "undefined"
                      ? Colors[iconColor]
                      : undefined
                  }
                />
                <p>{text}</p>
              </ListItem>
            );
          })}
        </List>
      )}
    </>
  );
}
