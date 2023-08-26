import { MdStars } from "react-icons/md";

import { Divider, Tab } from "components";
import { User } from "models";

import { Container } from "./PostOptionsList.style";

interface Props {
  postOwner: User;
}

export function PostOptionsList({ postOwner: { firstName } }: Props) {
  const blockProfileText = firstName[firstName.length - 1]
    ? `Block ${firstName}' profile`
    : `Block ${firstName}'s profile`;
  const unfollowText = `Unfollow ${firstName}`;

  return (
    <Container.Main>
      <Tab
        description="Add this to your saved items."
        endIcon={MdStars}
        name="Save post"
        startIcon={MdStars}
      />
      <Divider margin="8px 0" />
      <Tab
        description="See fewer posts like this."
        endIcon={MdStars}
        name="Hide post"
        startIcon={MdStars}
      />
      <Tab
        description="Stop seeing posts but stay friends."
        endIcon={MdStars}
        name={unfollowText}
        startIcon={MdStars}
      />
      <Tab
        description="You won't be able to see or contact each other."
        name={blockProfileText}
        startIcon={MdStars}
      />
    </Container.Main>
  );
}
