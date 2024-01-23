import { useNavigate } from "react-router-dom";

import { User } from "models";

import { Button, Container, Text } from "./Footer.style";

interface Props {
  user: User;
}

export function Footer({ user }: Props) {
  const navigate = useNavigate();

  function handleCreateNewAccountButtonClick() {
    navigate("/registration");
  }

  function handleLoginButtonClick() {
    navigate("/login");
  }

  const { firstName, lastName } = user;

  return (
    <Container.Main>
      <Text.Title>
        Connect with {firstName} {lastName} on Interax
      </Text.Title>
      <Container.Buttons>
        <Button.Login onClick={handleLoginButtonClick}>Log in</Button.Login>
        <Text.Or>or</Text.Or>
        <Button.CreateNewAccount onClick={handleCreateNewAccountButtonClick}>
          Create new account
        </Button.CreateNewAccount>
      </Container.Buttons>
    </Container.Main>
  );
}
