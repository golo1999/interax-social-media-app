import { Fragment } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { User } from "models";

import {
  List,
  SectionHeader,
  SectionNoData,
  SectionTitle,
  SeeButton,
} from "../FriendsPage.style";

import { Item } from "./Item";
import { Button, Container } from "./Suggestions.style";

interface Props {
  authenticatedUser: User | null;
  displayedSuggestions: number;
  suggestions: User[] | null;
  onSeeAllClick: () => void;
  onSeeMoreClick: () => void;
}

export function Suggestions({
  authenticatedUser,
  displayedSuggestions,
  suggestions,
  onSeeAllClick,
  onSeeMoreClick,
}: Props) {
  const navigate = useNavigate();

  const suggestionsCount = suggestions?.length || 0;

  function handleAddFriendClick(userId: string | null) {
    // TODO
  }

  function handleItemClick(username: string) {
    navigate(`/${username}`);
  }

  function handleRemoveClick(userId: string | null) {
    // TODO
  }

  return (
    <Container.Main>
      <SectionHeader>
        <SectionTitle>People You May Know</SectionTitle>
        {suggestions &&
          suggestionsCount > 0 &&
          displayedSuggestions < suggestionsCount && (
            <SeeButton onClick={onSeeAllClick}>See all</SeeButton>
          )}
      </SectionHeader>
      {suggestions && suggestionsCount > 0 ? (
        <>
          <List>
            {suggestions.map((user, index) => {
              // displaying the next requests only after the "See more" button was pressed
              if (
                index >= displayedSuggestions &&
                displayedSuggestions < suggestionsCount
              ) {
                return <Fragment key={index} />;
              }

              return (
                <Item
                  key={index}
                  authenticatedUser={authenticatedUser}
                  user={user}
                  onAddFriendClick={handleAddFriendClick}
                  onItemClick={handleItemClick}
                  onRemoveClick={handleRemoveClick}
                />
              );
            })}
          </List>
          {displayedSuggestions < suggestionsCount && (
            <Button.SeeMore onClick={onSeeMoreClick}>
              See more
              <MdArrowDropDown size={24} />
            </Button.SeeMore>
          )}
        </>
      ) : (
        <SectionNoData>
          There are no friendship suggestions to show.
        </SectionNoData>
      )}
    </Container.Main>
  );
}
