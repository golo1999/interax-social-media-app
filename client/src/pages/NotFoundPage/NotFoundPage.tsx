import { Navigate, useNavigate, useParams } from "react-router-dom";

import { Header } from "components";
import { useHeaderItems } from "hooks";
import { useAuthenticationStore, useSettingsStore } from "store";

import { Button, Container, Icon, Text } from "./NotFoundPage.style";

export function NotFoundPage() {
  const { authenticatedUser, isFinishedLoading } = useAuthenticationStore();

  if (!isFinishedLoading) {
    return <>Loading...</>;
  }

  return !!authenticatedUser ? (
    <AuthenticatedNotFoundPage />
  ) : (
    <NotAuthenticatedNotFoundPage />
  );
}

function AuthenticatedNotFoundPage() {
  const { authenticatedUser } = useAuthenticationStore();
  const headerItems = useHeaderItems();
  const navigate = useNavigate();
  const { theme } = useSettingsStore();

  const themeProps = { $isAuthenticated: !!authenticatedUser, $theme: theme };

  return (
    <Container.Main {...themeProps}>
      <Header items={headerItems} selectedItem={null} />
      <Container.Content>
        <Icon {...themeProps} size={72} />
        <Text.ContentUnavailable {...themeProps}>
          This content isn't available right now
        </Text.ContentUnavailable>
        <Container.Navigation>
          <Button onClick={() => navigate("/")}>Go to News Feed</Button>
          <Text.GoBack {...themeProps} onClick={() => navigate(-1)}>
            Go Back
          </Text.GoBack>
        </Container.Navigation>
      </Container.Content>
    </Container.Main>
  );
}

function NotAuthenticatedNotFoundPage() {
  const { userId } = useParams<{ userId: string }>();

  return <Navigate state={{ next: `/${userId}` }} to="/login" />;
}
