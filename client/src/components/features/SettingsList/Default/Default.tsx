import { memo } from "react";
import { IoIosArrowForward, IoMdMoon } from "react-icons/io";
import { ImExit } from "react-icons/im";
import { MdSettings } from "react-icons/md";

import { Tab, UserTab } from "components";
import { Colors } from "environment";
import { useAuthenticationStore, useSettingsStore } from "store";

interface Props {
  onDisplayTabClick: () => void;
  onLogOutTabClick: () => void;
  onSettingsTabClick: () => void;
  onUserTabClick: () => void;
}

export const Default = memo(function Default({
  onDisplayTabClick,
  onLogOutTabClick,
  onSettingsTabClick,
  onUserTabClick,
}: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();

  const hoveredTabColor: keyof typeof Colors =
    !!authenticatedUser && theme === "DARK" ? "BlackOlive" : "AntiFlashWhite";
  const tabEndIconColor: keyof typeof Colors =
    !!authenticatedUser && theme === "DARK"
      ? "PhilippineSilver"
      : "GraniteGray";
  const tabStartIconColor: keyof typeof Colors =
    !!authenticatedUser && theme === "DARK" ? "Platinum" : "DarkJungleGreen";

  return (
    <>
      <UserTab user={authenticatedUser} onClick={onUserTabClick} />
      <Tab
        endIcon={IoIosArrowForward}
        endIconColor={tabEndIconColor}
        name="Settings"
        selectedBackgroundColor={hoveredTabColor}
        startIcon={MdSettings}
        startIconColor={tabStartIconColor}
        onClick={onSettingsTabClick}
      />
      <Tab
        endIcon={IoIosArrowForward}
        endIconColor={tabEndIconColor}
        name="Display"
        selectedBackgroundColor={hoveredTabColor}
        startIcon={IoMdMoon}
        startIconColor={tabStartIconColor}
        onClick={onDisplayTabClick}
      />
      <Tab
        name="Log Out"
        selectedBackgroundColor={hoveredTabColor}
        startIcon={ImExit}
        startIconColor={tabStartIconColor}
        onClick={onLogOutTabClick}
      />
    </>
  );
});
