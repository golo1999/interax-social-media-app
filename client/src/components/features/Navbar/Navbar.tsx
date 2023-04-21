import { IconType } from "react-icons";

import { Colors } from "environment";

import {
  List,
  ListItem,
  ListItemBottomBorder,
  ListItemContainer,
} from "./Navbar.style";

export interface IconItem {
  icon: { NotSelectedIcon: IconType; SelectedIcon: IconType };
  name: string;
  onClick: () => void;
}

interface DefaultProps {
  items: string[];
  selectedItem: string | null;
  onItemSelected: (selectedItem: string) => void;
}

function Default({ items, selectedItem, onItemSelected }: DefaultProps) {
  return (
    <List>
      {items.map((item, index) => {
        const isSelected = item === selectedItem;
        const text = item
          .substring(0, 1)
          .concat(item.substring(1).replaceAll("_", " ").toLowerCase());

        return (
          <ListItemContainer key={index}>
            <ListItem
              isSelected={isSelected}
              onClick={() => onItemSelected(item)}
            >
              {text}
            </ListItem>
            <ListItemBottomBorder isSelected={isSelected} />
          </ListItemContainer>
        );
      })}
    </List>
  );
}

interface IconsProps {
  items: IconItem[];
  selectedItem: IconItem | null;
  onItemSelected: (selectedItem: IconItem) => void;
}

function Icons({ items, selectedItem, onItemSelected }: IconsProps) {
  return (
    <List>
      {items.map((item, index) => {
        const {
          icon: { NotSelectedIcon, SelectedIcon },
        } = item;

        const isSelected = item === selectedItem;

        return (
          <ListItemContainer key={index}>
            <ListItem
              isSelected={isSelected}
              onClick={() => onItemSelected(item)}
            >
              {isSelected ? (
                <SelectedIcon color={Colors.BrilliantAzure} size={24} />
              ) : (
                <NotSelectedIcon color="silver" size={24} />
              )}
            </ListItem>
            <ListItemBottomBorder isSelected={isSelected} />
          </ListItemContainer>
        );
      })}
    </List>
  );
}

export function Navbar() {
  return null;
}

Navbar.Default = Default;
Navbar.Icons = Icons;
