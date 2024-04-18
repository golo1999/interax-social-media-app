import { signOut } from "firebase/auth";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { firebaseAuth } from "helpers";
import { useAuthenticationStore, useSettingsStore } from "store";
import { SettingsListContent } from "types";

import { Default } from "./Default";
import { Display } from "./Display";
import { Language } from "./Language";
import { Settings } from "./Settings";
import { Container } from "./SettingsList.style";

export function SettingsList() {
  const { authenticatedUser, setAuthenticatedUser } = useAuthenticationStore();
  const navigate = useNavigate();
  const mainContainerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { theme, changeTheme, closeSettingsList } = useSettingsStore();
  const [content, setContent] = useState<SettingsListContent>("DEFAULT");
  const [mainContainerHeight, setMainContainerHeight] = useState(0);

  useEffect(() => {
    setMainContainerHeight(mainContainerRef.current?.clientHeight);
  }, [content]);

  const { username } = { ...authenticatedUser };

  function handleBackIconClick(content: SettingsListContent) {
    if (content === "SETTINGS/LANGUAGE") {
      setContent("SETTINGS");
    } else {
      setContent("DEFAULT");
    }
  }

  function handleDarkModeOffTabClick() {
    // TODO
    if (theme === "DARK") {
      changeTheme("LIGHT");
    }
  }

  function handleDarkModeOnTabClick() {
    // TODO
    if (theme === "LIGHT") {
      changeTheme("DARK");
    }
  }

  function handleDisplayTabClick() {
    // TODO
    setContent("DISPLAY");
  }

  function handleLanguageTabClick() {
    // TODO
    setContent("SETTINGS/LANGUAGE");
  }

  async function handleLogOutTabClick() {
    await signOut(firebaseAuth);
    setAuthenticatedUser(null);
    closeSettingsList();
  }

  function handleSettingsTabClick() {
    // TODO
    setContent("SETTINGS");
  }

  function handleUserTabClick() {
    closeSettingsList();
    navigate(`/${username}`);
  }

  const themeProps = { $isAuthenticated: !!authenticatedUser, $theme: theme };

  return (
    <Container.Main
      {...themeProps}
      height={mainContainerHeight}
      ref={mainContainerRef}
    >
      {content === "DEFAULT" ? (
        <Default
          onDisplayTabClick={handleDisplayTabClick}
          onLogOutTabClick={handleLogOutTabClick}
          onSettingsTabClick={handleSettingsTabClick}
          onUserTabClick={handleUserTabClick}
        />
      ) : content === "DISPLAY" ? (
        <Display
          onBackIconClick={() => handleBackIconClick(content)}
          onDarkModeOffTabClick={handleDarkModeOffTabClick}
          onDarkModeOnTabClick={handleDarkModeOnTabClick}
        />
      ) : content === "SETTINGS" ? (
        <Settings
          onBackIconClick={() => handleBackIconClick(content)}
          onLanguageTabClick={handleLanguageTabClick}
        />
      ) : (
        <Language onBackIconClick={() => handleBackIconClick(content)} />
      )}
    </Container.Main>
  );
}
