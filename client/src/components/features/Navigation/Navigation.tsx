import { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";

import { Tab, UserTab } from "components";
import { useAuthenticationStore, useSettingsStore } from "store";

import { Container, List } from "./Navigation.style";
import { Colors } from "environment";

export interface NavigationItem {
  endIcon?: IconType;
  name: string;
  startIcon: IconType;
  onClick?: () => void;
}

// interface Props {
//   authenticatedUser?: User | null;
//   items: NavigationItem[];
//   selectedItem: NavigationItem | null;
//   onItemSelected: (item: NavigationItem) => void;
// }

// export function Navigation({
//   authenticatedUser,
//   items,
//   selectedItem,
//   onItemSelected,
// }: Props) {
//   const navigate = useNavigate();

//   const { firstName, lastName, username } = { ...authenticatedUser };

//   return (
//     <Container.Main>
//       {authenticatedUser && (
//         <Container.User
//           isSelected={false}
//           onClick={() => {
//             navigate(`/${username}`);
//           }}
//         >
//           <UserPhoto
//             containerSize="24px"
//             iconSize="12px"
//             user={authenticatedUser}
//           />
//           <UserDisplayedName>
//             {firstName} {lastName}
//           </UserDisplayedName>
//         </Container.User>
//       )}
//       <List>
//         {items.map((item, index) => {
//           const { endIcon: EndIcon, name, startIcon: StartIcon } = item;

//           const formattedName = name
//             .substring(0, 1)
//             .concat(name.substring(1).toLowerCase())
//             .replaceAll("_", " ");
//           const isSelected = item === selectedItem;

//           return (
//             <ListItem
//               key={index}
//               isSelected={isSelected}
//               onClick={() => onItemSelected(item)}
//             >
//               <StartIcon color={Colors.Platinum} size={24} />
//               <ListItemName>{formattedName}</ListItemName>
//               {EndIcon && <EndIcon color={Colors.PhilippineGray} size={24} />}
//             </ListItem>
//           );
//         })}
//       </List>
//     </Container.Main>
//   );
// }

// interface AuthenticatedUserProps {
//   authenticatedUser: User | null;
//   items: NavigationItem[];
//   selectedItem: NavigationItem | "AUTHENTICATED_USER";
//   onItemSelected: (item: NavigationItem) => void;
// }

// function AuthenticatedUser({
//   authenticatedUser,
//   items,
//   selectedItem,
//   onItemSelected,
// }: AuthenticatedUserProps) {
//   const navigate = useNavigate();

//   const { firstName, lastName, username } = { ...authenticatedUser };

//   return (
//     <Container.Main>
//       {authenticatedUser && (
//         <Container.User
//           isSelected={selectedItem === "AUTHENTICATED_USER"}
//           onClick={() => {
//             navigate(`/${username}`);
//           }}
//         >
//           <UserPhoto
//             containerSize="24px"
//             iconSize="12px"
//             user={authenticatedUser}
//           />
//           <UserDisplayedName>
//             {firstName} {lastName}
//           </UserDisplayedName>
//         </Container.User>
//       )}
//       <List>
//         {items.map((item, index) => {
//           const { endIcon: EndIcon, name, startIcon: StartIcon } = item;

//           const formattedName = name
//             .substring(0, 1)
//             .concat(name.substring(1).toLowerCase())
//             .replaceAll("_", " ");
//           const isSelected =
//             selectedItem !== "AUTHENTICATED_USER" && item === selectedItem;

//           return (
//             <ListItem
//               key={index}
//               isSelected={isSelected}
//               onClick={() => onItemSelected(item)}
//             >
//               <StartIcon color={Colors.Platinum} size={24} />
//               <ListItemName>{formattedName}</ListItemName>
//               {EndIcon && <EndIcon color={Colors.PhilippineGray} size={24} />}
//             </ListItem>
//           );
//         })}
//       </List>
//     </Container.Main>
//   );
// }

// interface DefaultProps {
//   items: NavigationItem[];
//   selectedItem: NavigationItem;
//   onItemSelected: (item: NavigationItem) => void;
// }

// function Default({ items, selectedItem, onItemSelected }: DefaultProps) {
//   return (
//     <Container.Main>
//       <List>
//         {items.map((item, index) => {
//           const { endIcon: EndIcon, name, startIcon: StartIcon } = item;

//           const formattedName = name
//             .substring(0, 1)
//             .concat(name.substring(1).toLowerCase())
//             .replaceAll("_", " ");
//           const isSelected = item === selectedItem;

//           return (
//             <ListItem
//               key={index}
//               isSelected={isSelected}
//               onClick={() => onItemSelected(item)}
//             >
//               <StartIcon color={Colors.Platinum} size={24} />
//               <ListItemName>{formattedName}</ListItemName>
//               {EndIcon && <EndIcon color={Colors.PhilippineGray} size={24} />}
//             </ListItem>
//           );
//         })}
//       </List>
//     </Container.Main>
//   );
// }

// export function Navigation() {
//   return null;
// }

// Navigation.AuthenticatedUser = AuthenticatedUser;
// Navigation.Default = Default;

interface NonSelectableProps {
  items: NavigationItem[];
  selectedItem: NavigationItem | null;
}

function NonSelectable({ items, selectedItem }: NonSelectableProps) {
  const { authenticatedUser } = useAuthenticationStore();
  const navigate = useNavigate();
  const { theme } = useSettingsStore();

  const { username } = { ...authenticatedUser };

  const hoverBackgroundColor: keyof typeof Colors | undefined =
    !!authenticatedUser && theme === "DARK" ? undefined : "Platinum";
  const startIconColor: keyof typeof Colors | undefined =
    !!authenticatedUser && theme === "DARK" ? undefined : "VampireBlack";

  return (
    <Container.Main>
      {authenticatedUser && (
        <UserTab
          user={authenticatedUser || null}
          onClick={() => navigate(`/${username}`)}
        />
      )}
      <List>
        {items.map((item, index) => {
          const { endIcon, name, startIcon, onClick } = item;

          const formattedName = name
            .substring(0, 1)
            .concat(name.substring(1).toLowerCase())
            .replaceAll("_", " ");
          const isSelected = item === selectedItem;

          return (
            <Tab
              endIcon={endIcon}
              isSelected={isSelected}
              key={index}
              name={formattedName}
              selectedBackgroundColor={hoverBackgroundColor}
              startIcon={startIcon}
              startIconColor={startIconColor}
              onClick={onClick}
            />
          );
        })}
      </List>
    </Container.Main>
  );
}

interface SelectableProps {
  isUserTabVisible?: boolean;
  items: NavigationItem[];
  selectedItem: NavigationItem | null;
  onItemSelected: (item: NavigationItem) => void;
}

function Selectable({
  isUserTabVisible = false,
  items,
  selectedItem,
  onItemSelected,
}: SelectableProps) {
  const { authenticatedUser } = useAuthenticationStore();
  const navigate = useNavigate();
  const { theme } = useSettingsStore();

  const { username } = { ...authenticatedUser };

  const endIconColor: keyof typeof Colors | undefined =
    !!authenticatedUser && theme === "DARK" ? undefined : "DarkJungleGreen";
  const hoverBackgroundColor: keyof typeof Colors | undefined =
    !!authenticatedUser && theme === "DARK" ? undefined : "AntiFlashWhite";
  const startIconColor: keyof typeof Colors | undefined =
    !!authenticatedUser && theme === "DARK" ? undefined : "VampireBlack";

  return (
    <Container.Main>
      {authenticatedUser && isUserTabVisible && (
        <UserTab
          user={authenticatedUser}
          onClick={() => navigate(`/${username}`)}
        />
      )}
      <List>
        {items.map((item, index) => {
          const { endIcon, name, startIcon } = item;

          const formattedName = name
            .substring(0, 1)
            .concat(name.substring(1).toLowerCase())
            .replaceAll("_", " ");
          const isSelected = item === selectedItem;

          return (
            <Tab
              endIcon={endIcon}
              endIconColor={endIconColor}
              isSelected={isSelected}
              key={index}
              name={formattedName}
              selectedBackgroundColor={hoverBackgroundColor}
              startIcon={startIcon}
              startIconColor={startIconColor}
              textSize={17}
              onClick={() => onItemSelected(item)}
            />
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
