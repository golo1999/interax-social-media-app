import { memo } from "react";
import { IoMdMoon } from "react-icons/io";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";

import { Tab } from "components";
import { Colors } from "environment";
import { useAuthenticationStore, useSettingsStore } from "store";

import { Header } from "../Header";

import { Container, Description, Subtitle } from "./Display.style";

interface Props {
  onBackIconClick: () => void;
  onDarkModeOffTabClick: () => void;
  onDarkModeOnTabClick: () => void;
}

export const Display = memo(function Display({
  onBackIconClick,
  onDarkModeOffTabClick,
  onDarkModeOnTabClick,
}: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();

  const themeProps = { $isAuthenticated: !!authenticatedUser, $theme: theme };

  const moonIconColor =
    !!authenticatedUser && theme === "DARK"
      ? Colors.Platinum
      : Colors.VampireBlack;

  const OffTabEndIcon =
    theme === "DARK" ? MdRadioButtonUnchecked : MdRadioButtonChecked;
  const OnTabEndIcon =
    theme === "DARK" ? MdRadioButtonChecked : MdRadioButtonUnchecked;

  const offTabEndIconColor: keyof typeof Colors =
    theme === "DARK" ? "PhilippineSilver" : "TrueBlue";
  const onTabEndIconColor: keyof typeof Colors =
    theme === "DARK" ? "FrenchSkyBlue" : "GraniteGray";
  const tabHoverBackgroundColor: keyof typeof Colors =
    !!authenticatedUser && theme === "DARK" ? "BlackOlive" : "AntiFlashWhite";

  return (
    <>
      <Header title="Display" onBackIconClick={onBackIconClick} />
      <Container.Main>
        <div>
          <Container.MoonIcon {...themeProps}>
            <IoMdMoon color={moonIconColor} size={20} />
          </Container.MoonIcon>
        </div>
        <Container.Content>
          <Subtitle {...themeProps}>Dark Mode</Subtitle>
          <Description {...themeProps}>
            Adjust the appearance of Interax to reduce glare and give your eyes
            a break.
          </Description>
          <Container.Tabs>
            <Tab
              endIcon={OffTabEndIcon}
              endIconColor={offTabEndIconColor}
              name="Off"
              selectedBackgroundColor={tabHoverBackgroundColor}
              onClick={onDarkModeOffTabClick}
            />
            <Tab
              endIcon={OnTabEndIcon}
              endIconColor={onTabEndIconColor}
              name="On"
              selectedBackgroundColor={tabHoverBackgroundColor}
              onClick={onDarkModeOnTabClick}
            />
          </Container.Tabs>
        </Container.Content>
      </Container.Main>
    </>
  );
});
