import { Divider } from "@mui/material";

import styled from "styled-components";

import { Colors } from "environment";
import { FriendshipRequest, User } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

import { FriendRequests } from "../FriendRequests";
import { Suggestions } from "../Suggestions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

interface Props {
  displayedRequests: number;
  displayedSuggestions: number;
  friendshipRequests: FriendshipRequest[] | null;
  suggestions: User[] | null;
  onFriendRequestsSeeAllClick: () => void;
  onFriendRequestsSeeMoreClick: () => void;
  onSuggestionsSeeAllClick: () => void;
  onSuggestionsSeeMoreClick: () => void;
}

export function Home({
  displayedRequests,
  displayedSuggestions,
  friendshipRequests,
  suggestions,
  onFriendRequestsSeeAllClick,
  onFriendRequestsSeeMoreClick,
  onSuggestionsSeeAllClick,
  onSuggestionsSeeMoreClick,
}: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();

  const dividerColor =
    !!authenticatedUser && theme === "DARK" ? "Arsenic" : "LightGray";

  return (
    <Container>
      <FriendRequests
        displayedRequests={displayedRequests}
        friendshipRequests={friendshipRequests}
        onSeeAllClick={onFriendRequestsSeeAllClick}
        onSeeMoreClick={onFriendRequestsSeeMoreClick}
      />
      <Divider sx={{ borderColor: Colors[dividerColor] }} />
      <Suggestions
        displayedSuggestions={displayedSuggestions}
        suggestions={suggestions}
        onSeeAllClick={onSuggestionsSeeAllClick}
        onSeeMoreClick={onSuggestionsSeeMoreClick}
      />
    </Container>
  );
}
