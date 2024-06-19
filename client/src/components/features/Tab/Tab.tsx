import { IconType } from "react-icons";

import { Colors } from "environment";
import { useAuthenticationStore, useSettingsStore } from "store";

import { Container, Description, Name } from "./Tab.style";

interface Props {
  as?: undefined;
  description?: string;
  endIcon?: IconType;
  endIconColor?: keyof typeof Colors;
  endIconSize?: number | string;
  gap?: number | string;
  isSelected?: boolean;
  name: string;
  padding?: number | string;
  selectedBackgroundColor?: keyof typeof Colors;
  startIcon?: IconType;
  startIconColor?: keyof typeof Colors;
  startIconSize?: number | string;
  textSize?: number | string;
  onClick?: () => void;
}

export function Tab({
  as,
  description,
  endIcon: EndIcon,
  endIconColor = "PhilippineGray",
  endIconSize = 24,
  gap = "8px",
  isSelected,
  name,
  padding = "12px",
  selectedBackgroundColor = "BlackOlive",
  startIcon: StartIcon,
  startIconColor = "Platinum",
  startIconSize = 24,
  textSize = 15,
  onClick,
}: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();

  const themeProps = { $isAuthenticated: !!authenticatedUser, $theme: theme };

  return (
    <Container.Main
      as={as}
      containsDescription={!!description}
      gap={gap}
      isSelected={isSelected}
      padding={padding}
      selectedBackgroundColor={selectedBackgroundColor}
      onClick={onClick}
    >
      {StartIcon && (
        <StartIcon color={Colors[startIconColor]} size={startIconSize} />
      )}
      <Container.Texts>
        <Name {...themeProps} textSize={textSize}>
          {name}
        </Name>
        {description && (
          <Description $isAuthenticated={!!authenticatedUser} $theme={theme}>
            {description}
          </Description>
        )}
      </Container.Texts>
      {EndIcon && <EndIcon color={Colors[endIconColor]} size={endIconSize} />}
    </Container.Main>
  );
}
