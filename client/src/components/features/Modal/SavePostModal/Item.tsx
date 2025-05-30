import { RadioButton } from "components";
import { Colors } from "environment";
import { useVisibilityModalItems } from "hooks";
import { SavedPostCollection } from "models";

import { Container } from "./Item.style";

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
  const visibilityModalItems = useVisibilityModalItems();

  const formattedVisibility = visibility
    .substring(0, 1)
    .concat(visibility.substring(1).replaceAll("_", " ").toLowerCase());
  const Icon = visibilityModalItems.find(
    (item) => item.title === visibility
  )?.icon;

  return (
    <Container.Main onClick={onClick}>
      <div
        style={{
          alignItems: "center",
          aspectRatio: "1 / 1",
          backgroundColor: Colors.Gainsboro,
          borderRadius: "5px",
          color: Colors.VampireBlack,
          display: "flex",
          fontSize: "20px",
          fontWeight: 500,
          height: "100%",
          justifyContent: "center",
        }}
      >
        <div>{name[0].toUpperCase()}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <p
          style={{
            color: Colors.VampireBlack,
            fontSize: "16px",
            fontWeight: 500,
          }}
        >
          {name}
        </p>
        <p
          style={{
            alignItems: "center",
            display: "flex",
            gap: "4px",
            color: Colors.GraniteGray,
            fontSize: "13px",
          }}
        >
          {Icon && <Icon />}
          {formattedVisibility}
        </p>
      </div>
      <div>
        <RadioButton
          color={isSelected ? "BrilliantAzure" : "PhilippineGray"}
          isChecked={isSelected}
          onChange={onClick}
        />
      </div>
    </Container.Main>
  );
}
