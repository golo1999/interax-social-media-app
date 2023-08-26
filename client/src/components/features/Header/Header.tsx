import { Divider, IconItem } from "components";
import { useAuthenticationStore } from "store";

import { AuthenticatedHeader } from "./AuthenticatedHeader";
import { Container } from "./Header.style";
import { NotAuthenticatedHeader } from "./NotAuthenticatedHeader";

interface Props {
  items: IconItem[];
  selectedItem: IconItem | null;
}

export function Header({ items, selectedItem }: Props) {
  const { authenticatedUser } = useAuthenticationStore();

  const isUserAuthenticated = !!authenticatedUser;

  return (
    <Container.Main isUserAuthenticated={isUserAuthenticated}>
      <Container.Top>
        {isUserAuthenticated ? (
          <AuthenticatedHeader
            authenticatedUser={authenticatedUser}
            items={items}
            selectedItem={selectedItem}
          />
        ) : (
          <NotAuthenticatedHeader />
        )}
      </Container.Top>
      <Divider />
    </Container.Main>
  );
}
