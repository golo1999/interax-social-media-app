import styled from "styled-components";

import { Divider } from "components";
import { FriendshipRequest, User } from "models";

import { FriendRequests } from "../FriendRequests";
import { Suggestions } from "../Suggestions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

interface Props {
  authenticatedUser: User | null;
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
  authenticatedUser,
  displayedRequests,
  displayedSuggestions,
  friendshipRequests,
  suggestions,
  onFriendRequestsSeeAllClick,
  onFriendRequestsSeeMoreClick,
  onSuggestionsSeeAllClick,
  onSuggestionsSeeMoreClick,
}: Props) {
  return (
    <Container>
      <FriendRequests
        authenticatedUser={authenticatedUser}
        displayedRequests={displayedRequests}
        friendshipRequests={friendshipRequests}
        onSeeAllClick={onFriendRequestsSeeAllClick}
        onSeeMoreClick={onFriendRequestsSeeMoreClick}
      />
      <Divider />
      <Suggestions
        authenticatedUser={authenticatedUser}
        displayedSuggestions={displayedSuggestions}
        suggestions={suggestions}
        onSeeAllClick={onSuggestionsSeeAllClick}
        onSeeMoreClick={onSuggestionsSeeMoreClick}
      />
    </Container>
  );
}
