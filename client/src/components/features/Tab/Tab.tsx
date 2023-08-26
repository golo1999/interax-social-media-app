import { IconType } from "react-icons";

import { Colors } from "environment";

import { Container, Description, Name } from "./Tab.style";

interface Props {
  as?: undefined;
  description?: string;
  endIcon?: IconType;
  endIconColor?: keyof typeof Colors;
  endIconSize?: number | string;
  isSelected?: boolean;
  name: string;
  selectedBackgroundColor?: keyof typeof Colors;
  startIcon?: IconType;
  startIconColor?: keyof typeof Colors;
  startIconSize?: number | string;
  onClick?: () => void;
}

export function Tab({
  as,
  description,
  endIcon: EndIcon,
  endIconColor = "PhilippineGray",
  endIconSize = 24,
  isSelected,
  name,
  selectedBackgroundColor = "BlackOlive",
  startIcon: StartIcon,
  startIconColor = "Platinum",
  startIconSize = 24,
  onClick,
}: Props) {
  return (
    <Container.Main
      as={as}
      containsDescription={!!description}
      isSelected={isSelected}
      selectedBackgroundColor={selectedBackgroundColor}
      onClick={onClick}
    >
      {StartIcon && (
        <StartIcon color={Colors[startIconColor]} size={startIconSize} />
      )}
      <Container.Texts>
        <Name>{name}</Name>
        {description && <Description>{description}</Description>}
      </Container.Texts>
      {EndIcon && <EndIcon color={Colors[endIconColor]} size={endIconSize} />}
    </Container.Main>
  );
}
