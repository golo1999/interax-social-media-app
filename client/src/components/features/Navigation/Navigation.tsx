import { useNavigate } from "react-router-dom";

import { UserPhoto } from "components";
import { Colors } from "environment";
import { NavigationItem, User } from "models";

import {
  Container,
  List,
  ListItem,
  ListItemName,
  UserDisplayedName,
} from "./Navigation.style";

interface NonSelectableProps {
  authenticatedUser?: User | null;
  items: NavigationItem[];
  selectedItem: NavigationItem | null;
}

function NonSelectable({
  authenticatedUser,
  items,
  selectedItem,
}: NonSelectableProps) {
  const navigate = useNavigate();

  const { firstName, lastName, username } = { ...authenticatedUser };

  return (
    <Container.Main>
      {authenticatedUser && (
        <Container.User
          isSelected={false}
          onClick={() => {
            navigate(`/${username}`);
          }}
        >
          <UserPhoto
            containerSize="24px"
            iconSize="12px"
            user={authenticatedUser}
          />
          <UserDisplayedName>
            {firstName} {lastName}
          </UserDisplayedName>
        </Container.User>
      )}
      <List>
        {items.map((item, index) => {
          const {
            endIcon: EndIcon,
            name,
            startIcon: StartIcon,
            onClick,
          } = item;

          const formattedName = name
            .substring(0, 1)
            .concat(name.substring(1).toLowerCase())
            .replaceAll("_", " ");
          const isSelected = item === selectedItem;

          return (
            <ListItem key={index} isSelected={isSelected} onClick={onClick}>
              <StartIcon color={Colors.Platinum} size={24} />
              <ListItemName>{formattedName}</ListItemName>
              {EndIcon && <EndIcon color={Colors.PhilippineGray} size={24} />}
            </ListItem>
          );
        })}
      </List>
    </Container.Main>
  );
}

interface SelectableProps {
  authenticatedUser?: User | null;
  items: NavigationItem[];
  selectedItem: NavigationItem | null;
  onItemSelected: (item: NavigationItem) => void;
}

function Selectable({
  authenticatedUser,
  items,
  selectedItem,
  onItemSelected,
}: SelectableProps) {
  const navigate = useNavigate();

  const { firstName, lastName, username } = { ...authenticatedUser };

  return (
    <Container.Main>
      {authenticatedUser && (
        <Container.User
          isSelected={false}
          onClick={() => {
            navigate(`/${username}`);
          }}
        >
          <UserPhoto
            containerSize="24px"
            iconSize="12px"
            user={authenticatedUser}
          />
          <UserDisplayedName>
            {firstName} {lastName}
          </UserDisplayedName>
        </Container.User>
      )}
      <List>
        {items.map((item, index) => {
          const { endIcon: EndIcon, name, startIcon: StartIcon } = item;

          const formattedName = name
            .substring(0, 1)
            .concat(name.substring(1).toLowerCase())
            .replaceAll("_", " ");
          const isSelected = item === selectedItem;

          return (
            <ListItem
              key={index}
              isSelected={isSelected}
              onClick={() => onItemSelected(item)}
            >
              <StartIcon color={Colors.Platinum} size={24} />
              <ListItemName>{formattedName}</ListItemName>
              {EndIcon && <EndIcon color={Colors.PhilippineGray} size={24} />}
            </ListItem>
          );
        })}
      </List>
    </Container.Main>
  );
}

export function Navigation() {
  return null;
}

Navigation.NonSelectable = NonSelectable;
Navigation.Selectable = Selectable;
