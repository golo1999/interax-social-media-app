import {
  List,
  ListItem,
  ListItemBottomBorder,
  ListItemContainer,
} from "./Navbar.style";

const NAVBAR_ITEMS = ["POSTS", "ABOUT", "FRIENDS", "PHOTOS"];

interface Props {
  selectedItem: string;
  onItemSelected: (item: string) => void;
}

export function Navbar({ selectedItem, onItemSelected }: Props) {
  return (
    <List>
      {NAVBAR_ITEMS.map((item, index) => {
        const text = item
          .substring(0, 1)
          .concat(item.substring(1).toLowerCase());

        return (
          <ListItemContainer key={index}>
            <ListItem
              isSelected={item === selectedItem}
              onClick={() => onItemSelected(item)}
            >
              {text}
            </ListItem>
            <ListItemBottomBorder isSelected={item === selectedItem} />
          </ListItemContainer>
        );
      })}
    </List>
  );
}
