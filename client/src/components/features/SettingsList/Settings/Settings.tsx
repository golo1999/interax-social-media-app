import { memo } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { MdHistory, MdLanguage, MdSettings } from "react-icons/md";

import { Tab } from "components";
import { Colors } from "environment";
import { useAuthenticationStore, useSettingsStore } from "store";

import { Header } from "../Header";

interface Props {
  onBackIconClick: () => void;
  onLanguageTabClick: () => void;
}

export const Settings = memo(function Settings({
  onBackIconClick,
  onLanguageTabClick,
}: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();

  const themeProps = { $isAuthenticated: !!authenticatedUser, $theme: theme };

  const tabEndIconColor: keyof typeof Colors =
    !!authenticatedUser && theme === "DARK"
      ? "PhilippineSilver"
      : "GraniteGray";
  const tabHoverBackgroundColor: keyof typeof Colors =
    !!authenticatedUser && theme === "DARK" ? "BlackOlive" : "AntiFlashWhite";
  const tabStartIconColor: keyof typeof Colors =
    !!authenticatedUser && theme === "DARK" ? "Platinum" : "DarkJungleGreen";

  return (
    <>
      <Header title="Settings" onBackIconClick={onBackIconClick} />
      <div>
        <Tab
          name="Settings"
          selectedBackgroundColor={tabHoverBackgroundColor}
          startIcon={MdSettings}
          startIconColor={tabStartIconColor}
          onClick={() => {
            // TODO
            console.log("Settings");
          }}
        />
        <Tab
          endIcon={IoIosArrowForward}
          endIconColor={tabEndIconColor}
          name="Language"
          selectedBackgroundColor={tabHoverBackgroundColor}
          startIcon={MdLanguage}
          startIconColor={tabStartIconColor}
          onClick={onLanguageTabClick}
        />
        <Tab
          name="Activity log"
          selectedBackgroundColor={tabHoverBackgroundColor}
          startIcon={MdHistory}
          startIconColor={tabStartIconColor}
          onClick={() => {
            // TODO
            console.log("Activity log");
          }}
        />
      </div>
    </>
  );
});
