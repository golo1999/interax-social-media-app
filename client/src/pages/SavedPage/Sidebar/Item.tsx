import { Colors } from "environment";
import { useVisibilityModalItems } from "hooks";
import { SavedPostCollection } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

import { Container, Text } from "./Item.style";

interface Props {
  collection: SavedPostCollection;
  isSelected: boolean;
  onClick: () => void;
}

export function Item({
  collection: { name, visibility },
  isSelected,
  onClick,
}: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();
  const visibilityModalItems = useVisibilityModalItems();

  const themeProps = { $isAuthenticated: !!authenticatedUser, $theme: theme };

  const formattedVisibility = visibility
    .substring(0, 1)
    .concat(visibility.substring(1).replaceAll("_", " ").toLowerCase());
  const Icon = visibilityModalItems.find(
    (item) => item.title === visibility
  )?.icon;

  return (
    <Container.Main {...themeProps} $isSelected={isSelected} onClick={onClick}>
      <div
        style={{
          alignItems: "center",
          aspectRatio: "1 / 1",
          backgroundColor: Colors.Gainsboro,
          borderRadius: "5px",
          color: Colors.VampireBlack,
          display: "flex",
          fontSize: "16px",
          fontWeight: 500,
          height: "100%",
          justifyContent: "center",
        }}
      >
        <div>{name[0].toUpperCase()}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Text.Name {...themeProps}>{name}</Text.Name>
        <Text.Visibility {...themeProps}>
          {Icon && <Icon />}
          {formattedVisibility}
        </Text.Visibility>
      </div>
    </Container.Main>
  );
}
