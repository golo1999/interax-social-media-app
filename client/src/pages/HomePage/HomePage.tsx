import { useLazyQuery } from "@apollo/client";

import { useEffect, useMemo } from "react";
import { AiFillShop } from "react-icons/ai";
import { HiUsers, HiUserGroup } from "react-icons/hi";
import { MdOndemandVideo } from "react-icons/md";
import { useNavigate } from "react-router";

import { Header, Navigation } from "components";
import { GetAuthenticatedUserData, GET_AUTHENTICATED_USER } from "helpers";
import { useHeaderItems } from "hooks";
import { NavigationItem } from "models";
import { Posts } from "sections";

import { Complementary } from "./Complementary";
import { Container } from "./HomePage.style";

export function HomePage() {
  const [
    fetchAuthenticatedUser,
    { data: authenticatedUserData = { authenticatedUser: null } },
  ] = useLazyQuery<GetAuthenticatedUserData>(GET_AUTHENTICATED_USER);

  useEffect(() => {
    fetchAuthenticatedUser();
  }, [fetchAuthenticatedUser]);

  const navigate = useNavigate();

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
    <Container.Main>
      <Header
        authenticatedUser={authenticatedUserData.authenticatedUser}
        items={headerItems}
        selectedItem={headerItems[0]}
      />
      <Container.Content>
        <Navigation.NonSelectable
          authenticatedUser={authenticatedUserData.authenticatedUser}
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
