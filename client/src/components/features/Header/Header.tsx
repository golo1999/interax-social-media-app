import { IconItem } from "components";
import { useAuthenticationStore, useSettingsStore } from "store";

import { AuthenticatedHeader } from "./AuthenticatedHeader";
import { Container } from "./Header.style";
import { NotAuthenticatedHeader } from "./NotAuthenticatedHeader";

interface Props {
  items: IconItem[];
  selectedItem: IconItem | null;
}

export function Header({ items, selectedItem }: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();

  const isAuthenticated = !!authenticatedUser;

  const themeProps = { isAuthenticated, theme };

  return (
    <Container.Main {...themeProps}>
      <Container.Top {...themeProps}>
        {isAuthenticated ? (
          <AuthenticatedHeader
            authenticatedUser={authenticatedUser}
            items={items}
            selectedItem={selectedItem}
          />
        ) : (
          <NotAuthenticatedHeader />
        )}
      </Container.Top>
    </Container.Main>
  );
}
