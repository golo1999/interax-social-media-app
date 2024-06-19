import { UserPhoto } from "components";
import { useAuthenticationStore, useSettingsStore } from "store";

import { Container } from "./CreatePost.style";

interface Props {
  text: string;
  onTextContainerClick: () => void;
}

export function CreatePost({ text, onTextContainerClick }: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();

  if (!authenticatedUser) {
    return <></>;
  }

  return (
    <Container.Main>
      <Container.Items>
        <UserPhoto user={authenticatedUser} />
        <Container.Text
          $isAuthenticated={!!authenticatedUser}
          $theme={theme}
          onClick={onTextContainerClick}
        >
          {text}
        </Container.Text>
      </Container.Items>
    </Container.Main>
  );
}
