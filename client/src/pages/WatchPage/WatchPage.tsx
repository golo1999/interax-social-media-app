import { useLazyQuery } from "@apollo/client";

import { useEffect, useMemo, useState } from "react";
import { BsSaveFill } from "react-icons/bs";
import { MdOndemandVideo, MdPlayCircle } from "react-icons/md";

import { Divider, Header, Navigation } from "components";
import { GET_AUTHENTICATED_USER, GetAuthenticatedUserData } from "helpers";
import { useHeaderItems } from "hooks";
import { NavigationItem } from "models";

import { Container } from "./WatchPage.style";

export function WatchPage() {
  const [
    fetchAuthenticatedUser,
    { data: authenticatedUserData = { authenticatedUser: null } },
  ] = useLazyQuery<GetAuthenticatedUserData>(GET_AUTHENTICATED_USER);

  const headerItems = useHeaderItems();
  const NAVIGATION_ITEMS = useMemo<NavigationItem[]>(
    () => [
      { name: "HOME", startIcon: MdOndemandVideo },
      { name: "REELS", startIcon: MdPlayCircle },
      { name: "SAVED_VIDEOS", startIcon: BsSaveFill },
    ],
    []
  );

  const [selectedNavigationItem, setSelectedNavigationItem] = useState(
    NAVIGATION_ITEMS[0]
  );

  useEffect(() => {
    fetchAuthenticatedUser();
  }, [fetchAuthenticatedUser]);

  function handleNavigationItemClick(item: NavigationItem) {
    if (item !== selectedNavigationItem) {
      setSelectedNavigationItem(item);
    }
  }

  return (
    <Container.Main>
      <Header
        authenticatedUser={authenticatedUserData.authenticatedUser}
        items={headerItems}
        selectedItem={headerItems[1]}
      />
      <Container.Content>
        <Container.Navigation>
          <Navigation.Selectable
            items={NAVIGATION_ITEMS}
            selectedItem={selectedNavigationItem}
            onItemSelected={handleNavigationItemClick}
          />
        </Container.Navigation>
        <Divider thickness="1px" vertical />
        <Container.NavigationItem></Container.NavigationItem>
      </Container.Content>
    </Container.Main>
  );
}
