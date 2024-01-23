import { useAuthenticationStore } from "store";

import { AuthenticatedHomePage } from "./AuthenticatedHomePage";
import { NotAuthenticatedHomePage } from "./NotAuthenticatedHomePage";

export function HomePage() {
  const { authenticatedUser, isFinishedLoading } = useAuthenticationStore();

  if (!isFinishedLoading) {
    return <>Loading...</>;
  }

  return !!authenticatedUser ? (
    <AuthenticatedHomePage />
  ) : (
    <NotAuthenticatedHomePage />
  );
}
