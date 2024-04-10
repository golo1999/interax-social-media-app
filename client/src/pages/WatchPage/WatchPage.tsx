import { useLazyQuery } from "@apollo/client";
import { Divider } from "@mui/material";

import { useEffect, useMemo, useState } from "react";
import { BsSaveFill } from "react-icons/bs";
import { MdOndemandVideo, MdPlayCircle } from "react-icons/md";

import { Header, Navigation } from "components";
import { useHeaderItems } from "hooks";
import { NavigationItem } from "models";
import { useAuthenticationStore } from "store";

import { Container } from "./WatchPage.style";

export function WatchPage() {
  const { authenticatedUser } = useAuthenticationStore();

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

  function handleNavigationItemClick(item: NavigationItem) {
    if (item !== selectedNavigationItem) {
      setSelectedNavigationItem(item);
    }
  }

  return (
    <Container.Main>
      <Header items={headerItems} selectedItem={headerItems[1]} />
      <Container.Content>
        <Container.Navigation>
          <Navigation.Selectable
            items={NAVIGATION_ITEMS}
            selectedItem={selectedNavigationItem}
            onItemSelected={handleNavigationItemClick}
          />
        </Container.Navigation>
        <Divider color="Onyx" orientation="vertical" />
        <Container.NavigationItem></Container.NavigationItem>
      </Container.Content>
    </Container.Main>
  );
}
