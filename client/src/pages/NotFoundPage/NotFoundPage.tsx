import { useLazyQuery } from "@apollo/client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "components";
import { GET_AUTHENTICATED_USER, GetAuthenticatedUserData } from "helpers";
import { useHeaderItems } from "hooks";

import {
  Button,
  Container,
  ContentUnavailable,
  GoBack,
  Icon,
} from "./NotFoundPage.style";

export function NotFoundPage() {
  const [fetchAuthenticatedUser] = useLazyQuery<GetAuthenticatedUserData>(
    GET_AUTHENTICATED_USER
  );

  const headerItems = useHeaderItems();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAuthenticatedUser();
  }, [fetchAuthenticatedUser]);

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
