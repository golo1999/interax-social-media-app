import { Divider, IconItem } from "components";
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

  const dividerColor =
    !!authenticatedUser && theme === "DARK" ? "Arsenic" : "AmericanSilver";

  return (
    <Container.Main isAuthenticated={isAuthenticated} theme={theme}>
      <Container.Top>
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
      <Divider color={dividerColor} />
    </Container.Main>
  );
}
