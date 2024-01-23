import { useMemo } from "react";
import { AiFillShop } from "react-icons/ai";
import { HiUsers, HiUserGroup } from "react-icons/hi";
import { MdOndemandVideo } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { Header, Navigation } from "components";
import { useHeaderItems } from "hooks";
import { NavigationItem } from "models";
import { Posts } from "sections";
import { useAuthenticationStore, useSettingsStore } from "store";

import { Complementary } from "../Complementary";

import { Container } from "./AuthenticatedHomePage.style";

export function AuthenticatedHomePage() {
  const { authenticatedUser } = useAuthenticationStore();
  const navigate = useNavigate();
  const { theme } = useSettingsStore();

  const NAVIGATION_ITEMS = useMemo<NavigationItem[]>(
    () => [
      {
        name: "FRIENDS",
        startIcon: HiUsers,
        onClick: () => navigate("/friends"),
      },
      {
        name: "GROUPS",
        startIcon: HiUserGroup,
        onClick: () => navigate("/groups/feed"),
      },
      { name: "MARKETPLACE", startIcon: AiFillShop },
      {
        name: "WATCH",
        startIcon: MdOndemandVideo,
        onClick: () => navigate("/watch"),
      },
    ],
    [navigate]
  );

  const headerItems = useHeaderItems();

  return (
    <Container.Main isAuthenticated={!!authenticatedUser} theme={theme}>
      <Header items={headerItems} selectedItem={headerItems[0]} />
      <Container.Content>
        <Navigation.NonSelectable
          items={NAVIGATION_ITEMS}
          selectedItem={null}
        />
        <Container.Posts>
          <Posts />
        </Container.Posts>
        <Complementary />
      </Container.Content>
    </Container.Main>
  );
}
