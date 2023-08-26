import { UserPhoto } from "components";
import { User } from "models";

import { Container } from "./CreatePost.style";

interface Props {
  authenticatedUser: User | null;
  text: string;
  onTextContainerClick: () => void;
}

export function CreatePost({
  authenticatedUser,
  text,
  onTextContainerClick,
}: Props) {
  if (!authenticatedUser) {
    return <></>;
  }

  return (
    <Container.Main>
      <Container.Items>
        <UserPhoto user={authenticatedUser} />
        <Container.Text onClick={onTextContainerClick}>{text}</Container.Text>
      </Container.Items>
    </Container.Main>
  );
}
