import { useLazyQuery } from "@apollo/client";
import { Divider } from "@mui/material";

import { useEffect, useMemo, useState } from "react";
import { HiUserAdd } from "react-icons/hi";
import { HiUsers } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";
import { Navigate } from "react-router-dom";

import { Header, Navigation } from "components";
import {
  GET_FRIENDSHIP_SUGGESTIONS_BY_ID,
  GetFriendshipSuggestionsByIdData,
} from "helpers";
import { useHeaderItems } from "hooks";
import { NavigationItem, User } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

import { FriendRequests } from "./FriendRequests";
import { Container, NavigationTitle } from "./FriendsPage.style";
import { Home } from "./Home";
import { Suggestions } from "./Suggestions";

const INITIALLY_DISPLAYED_FRIENDSHIP_REQUESTS = 7;
const INITIALLY_DISPLAYED_SUGGESTIONS = 7;

export function FriendsPage() {
  const { authenticatedUser, isFinishedLoading } = useAuthenticationStore();

  if (!isFinishedLoading) {
    return <>Loading...</>;
  }

  return !!authenticatedUser ? (
    <AuthenticatedFriendsPage authenticatedUser={authenticatedUser} />
  ) : (
    <NotAuthenticatedFriendsPage />
  );
}

interface AuthenticatedFriendsPageProps {
  authenticatedUser: User;
}

function AuthenticatedFriendsPage({
  authenticatedUser,
}: AuthenticatedFriendsPageProps) {
  const [
    fetchFriendshipSuggestionsById,
    { data: friendshipSuggestions = { friendshipSuggestionsById: null } },
  ] = useLazyQuery<GetFriendshipSuggestionsByIdData>(
    GET_FRIENDSHIP_SUGGESTIONS_BY_ID
  );
  const { theme } = useSettingsStore();

  const headerItems = useHeaderItems();
  const NAVIGATION_ITEMS = useMemo<NavigationItem[]>(
    () => [
      { name: "HOME", startIcon: HiUsers },
      {
        endIcon: IoIosArrowForward,
        name: "FRIEND_REQUESTS",
        startIcon: HiUserAdd,
      },
      { endIcon: IoIosArrowForward, name: "SUGGESTIONS", startIcon: HiUserAdd },
    ],
    []
  );

  const [displayedFriendshipRequests, setDisplayedFriendshipRequests] =
    useState(2 * INITIALLY_DISPLAYED_FRIENDSHIP_REQUESTS);
  const [displayedSuggestions, setDisplayedSuggestions] = useState(
    2 * INITIALLY_DISPLAYED_SUGGESTIONS
  );
  const [selectedNavigationItem, setSelectedNavigationItem] = useState(
    NAVIGATION_ITEMS[0]
  );

  useEffect(() => {
    fetchFriendshipSuggestionsById({
      variables: { id: authenticatedUser.id },
    });
  }, [authenticatedUser, fetchFriendshipSuggestionsById]);

  const { friendshipRequests } = authenticatedUser;
  const friendshipRequestsCount = friendshipRequests?.length || 0;
  const suggestions = friendshipSuggestions.friendshipSuggestionsById;
  const suggestionsCount = suggestions?.length || 0;

  function handleNavigationItemClick(item: NavigationItem) {
    if (item !== selectedNavigationItem) {
      setSelectedNavigationItem(item);
    }
  }

  function handleSeeAllClick(type: "FRIEND_REQUESTS" | "SUGGESTIONS") {
    if (
      type === "FRIEND_REQUESTS" &&
      displayedFriendshipRequests < friendshipRequestsCount
    ) {
      setDisplayedFriendshipRequests(friendshipRequestsCount);
    } else if (
      type === "SUGGESTIONS" &&
      displayedSuggestions < suggestionsCount
    ) {
      setDisplayedSuggestions(suggestionsCount);
    }
  }

  function handleSeeMoreClick(type: "FRIEND_REQUESTS" | "SUGGESTIONS") {
    if (!suggestions || suggestionsCount === 0) {
      return;
    }

    if (type === "FRIEND_REQUESTS") {
      if (
        displayedFriendshipRequests +
          2 * INITIALLY_DISPLAYED_FRIENDSHIP_REQUESTS <=
        friendshipRequestsCount
      ) {
        setDisplayedFriendshipRequests(
          (req) => req + 2 * INITIALLY_DISPLAYED_FRIENDSHIP_REQUESTS
        );
      } else {
        setDisplayedFriendshipRequests(
          (req) => req + (friendshipRequestsCount - displayedFriendshipRequests)
        );
      }
    } else if (type === "SUGGESTIONS") {
      if (
        displayedSuggestions + 2 * INITIALLY_DISPLAYED_SUGGESTIONS <=
        suggestionsCount
      ) {
        setDisplayedSuggestions(
          (req) => req + 2 * INITIALLY_DISPLAYED_SUGGESTIONS
        );
      } else {
        setDisplayedSuggestions(
          (req) => req + (suggestionsCount - displayedSuggestions)
        );
      }
    }
  }

  const themeProps = { $isAuthenticated: !!authenticatedUser, $theme: theme };

  const dividerColor =
    !!authenticatedUser && theme === "DARK" ? "Arsenic" : "LightGray";

  return (
    <Container.Main>
      <Header items={headerItems} selectedItem={null} />
      <Container.Content>
        <Container.Navigation {...themeProps}>
          <NavigationTitle {...themeProps}>Friends</NavigationTitle>
          <Navigation.Selectable
            items={NAVIGATION_ITEMS}
            selectedItem={selectedNavigationItem}
            onItemSelected={handleNavigationItemClick}
          />
        </Container.Navigation>
        <Divider color={dividerColor} orientation="vertical" />
        <Container.NavigationItem {...themeProps}>
          {selectedNavigationItem === NAVIGATION_ITEMS[1] ? (
            <FriendRequests
              displayedRequests={displayedFriendshipRequests}
              friendshipRequests={friendshipRequests || null}
              onSeeAllClick={() => handleSeeAllClick("FRIEND_REQUESTS")}
              onSeeMoreClick={() => handleSeeMoreClick("FRIEND_REQUESTS")}
            />
          ) : selectedNavigationItem === NAVIGATION_ITEMS[2] ? (
            <Suggestions
              displayedSuggestions={displayedSuggestions}
              suggestions={suggestions}
              onSeeAllClick={() => handleSeeAllClick("SUGGESTIONS")}
              onSeeMoreClick={() => handleSeeMoreClick("SUGGESTIONS")}
            />
          ) : (
            <Home
              displayedRequests={displayedFriendshipRequests}
              displayedSuggestions={displayedSuggestions}
              friendshipRequests={friendshipRequests || null}
              suggestions={suggestions}
              onFriendRequestsSeeAllClick={() =>
                handleSeeAllClick("FRIEND_REQUESTS")
              }
              onFriendRequestsSeeMoreClick={() =>
                handleSeeMoreClick("FRIEND_REQUESTS")
              }
              onSuggestionsSeeAllClick={() => handleSeeAllClick("SUGGESTIONS")}
              onSuggestionsSeeMoreClick={() =>
                handleSeeMoreClick("SUGGESTIONS")
              }
            />
          )}
        </Container.NavigationItem>
      </Container.Content>
    </Container.Main>
  );
}

function NotAuthenticatedFriendsPage() {
  return <Navigate state={{ next: "/friends" }} to="/login" />;
}
