import { useCallback } from "react";
import { MdCheck, MdSettings } from "react-icons/md";
import { useMatch, useNavigate } from "react-router-dom";

import { Tab } from "components";
import { Colors } from "environment";
import { useAuthenticationStore, useSettingsStore } from "store";

import { Container, Triangle } from "./Popup.style";

interface Props {
  isModal?: boolean;
}

export function Popup({ isModal }: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const isNotificationsRoute = useMatch("/notifications");
  const navigate = useNavigate();
  const { theme, closeNotificationsList } = useSettingsStore();

  const handleOpenNotificationsClick = useCallback(() => {
    closeNotificationsList();
    navigate("/notifications");
  }, [closeNotificationsList, navigate]);

  const themeProps = { $isAuthenticated: !!authenticatedUser, $theme: theme };

  const tabStartIconColor: keyof typeof Colors =
    theme === "DARK" ? "PhilippineSilver" : "DarkJungleGreen";
  const tabHoverBackgroundColor: keyof typeof Colors =
    !!authenticatedUser && theme === "DARK" ? "BlackOlive" : "AntiFlashWhite";

  return (
    <Container.Main>
      <Container.Triangle>
        <Triangle {...themeProps} />
      </Container.Triangle>
      <Container.Tabs {...themeProps}>
        <Tab
          gap="12px"
          name="Mark all as read"
          padding="8px"
          selectedBackgroundColor={tabHoverBackgroundColor}
          startIcon={MdCheck}
          startIconColor={tabStartIconColor}
          onClick={() => {
            // TODO
          }}
        />
        {!isNotificationsRoute && (
          <Tab
            gap="12px"
            name="Open Notifications"
            padding="8px"
            selectedBackgroundColor={tabHoverBackgroundColor}
            startIcon={MdSettings}
            startIconColor={tabStartIconColor}
            onClick={handleOpenNotificationsClick}
          />
        )}
      </Container.Tabs>
    </Container.Main>
  );
}
