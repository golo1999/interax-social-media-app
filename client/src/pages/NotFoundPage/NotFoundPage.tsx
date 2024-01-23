import { Navigate, useNavigate, useParams } from "react-router-dom";

import { Header } from "components";
import { useHeaderItems } from "hooks";
import { useAuthenticationStore } from "store";

import {
  Button,
  Container,
  ContentUnavailable,
  GoBack,
  Icon,
} from "./NotFoundPage.style";

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
  const headerItems = useHeaderItems();
  const navigate = useNavigate();

  return (
    <Container.Main>
      <Header items={headerItems} selectedItem={null} />
      <Container.Content>
        <Icon size={72} />
        <ContentUnavailable>
          This content isn't available right now
        </ContentUnavailable>
        <Button onClick={() => navigate("/")}>Go to News Feed</Button>
        <GoBack onClick={() => navigate(-1)}>Go Back</GoBack>
      </Container.Content>
    </Container.Main>
  );
}

function NotAuthenticatedNotFoundPage() {
  const { userId } = useParams<{ userId: string }>();

  return <Navigate state={{ next: `/${userId}` }} to="/login" />;
}
