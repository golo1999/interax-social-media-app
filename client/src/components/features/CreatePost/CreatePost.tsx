import { UserPhoto } from "components";
import { useAuthenticationStore } from "store";

import { Container } from "./CreatePost.style";

interface Props {
  text: string;
  onTextContainerClick: () => void;
}

export function CreatePost({ text, onTextContainerClick }: Props) {
  const { authenticatedUser } = useAuthenticationStore();

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
