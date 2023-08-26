import { useLazyQuery } from "@apollo/client";

import { useEffect, useMemo, useState } from "react";
import { HiUserAdd } from "react-icons/hi";
import { HiUsers } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";

import { Divider, Header, Navigation } from "components";
import {
  GET_AUTHENTICATED_USER,
  GET_FRIENDSHIP_SUGGESTIONS_BY_ID,
  GetAuthenticatedUserData,
  GetFriendshipSuggestionsByIdData,
} from "helpers";
import { useHeaderItems } from "hooks";
import { NavigationItem } from "models";

import { FriendRequests } from "./FriendRequests";
import { Container, NavigationTitle } from "./FriendsPage.style";
import { Home } from "./Home";
import { Suggestions } from "./Suggestions";

const INITIALLY_DISPLAYED_FRIENDSHIP_REQUESTS = 7;
const INITIALLY_DISPLAYED_SUGGESTIONS = 7;

export function FriendsPage() {
  const [
    fetchAuthenticatedUser,
    { data: authenticatedUserData = { authenticatedUser: null } },
  ] = useLazyQuery<GetAuthenticatedUserData>(GET_AUTHENTICATED_USER);
  const [
    fetchFriendshipSuggestionsById,
    { data: friendshipSuggestions = { friendshipSuggestionsById: null } },
  ] = useLazyQuery<GetFriendshipSuggestionsByIdData>(
    GET_FRIENDSHIP_SUGGESTIONS_BY_ID
  );

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
    fetchAuthenticatedUser();

    if (authenticatedUserData.authenticatedUser) {
      fetchFriendshipSuggestionsById({
        variables: { id: authenticatedUserData.authenticatedUser.id },
      });
    }
  }, [
    authenticatedUserData.authenticatedUser,
    fetchAuthenticatedUser,
    fetchFriendshipSuggestionsById,
  ]);

  const { friendshipRequests } = { ...authenticatedUserData.authenticatedUser };
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

  return (
    <Container.Main>
      <Header items={headerItems} selectedItem={null} />
      <Container.Content>
        <Container.Navigation>
          <NavigationTitle>Friends</NavigationTitle>
          <Navigation.Selectable
            items={NAVIGATION_ITEMS}
            selectedItem={selectedNavigationItem}
            onItemSelected={handleNavigationItemClick}
          />
        </Container.Navigation>
        <Divider vertical />
        <Container.NavigationItem>
          {selectedNavigationItem === NAVIGATION_ITEMS[1] ? (
            <FriendRequests
              authenticatedUser={authenticatedUserData.authenticatedUser}
              displayedRequests={displayedFriendshipRequests}
              friendshipRequests={friendshipRequests || null}
              onSeeAllClick={() => handleSeeAllClick("FRIEND_REQUESTS")}
              onSeeMoreClick={() => handleSeeMoreClick("FRIEND_REQUESTS")}
            />
          ) : selectedNavigationItem === NAVIGATION_ITEMS[2] ? (
            <Suggestions
              authenticatedUser={authenticatedUserData.authenticatedUser}
              displayedSuggestions={displayedSuggestions}
              suggestions={suggestions}
              onSeeAllClick={() => handleSeeAllClick("SUGGESTIONS")}
              onSeeMoreClick={() => handleSeeMoreClick("SUGGESTIONS")}
            />
          ) : (
            <Home
              authenticatedUser={authenticatedUserData.authenticatedUser}
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
