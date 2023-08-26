import { Controller, Resolver, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Input, TertiaryButton } from "components";

import {
  Container,
  Form,
  Link,
  LinkSeparator,
  Logo,
  Title,
} from "./LoginPage.style";

type FormValues = {
  email: string;
  password: string;
};

const DEFAULT_FORM_VALUES: FormValues = {
  email: "",
  password: "",
};

const resolver: Resolver<FormValues> = async (values) => {
  let errors: {
    email?: { message: string };
    password?: { message: string };
  } = {};
  const { email, password } = values;

  if (!email) {
    errors = { ...errors, email: { message: "Email is required" } };
  }

  if (!password) {
    errors = { ...errors, password: { message: "Password is required" } };
  }

  return {
    errors,
    values,
  };
};

export function LoginPage() {
  const {
    control,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<FormValues>({
    defaultValues: DEFAULT_FORM_VALUES,
    mode: "onChange",
    resolver,
  });
  const navigate = useNavigate();

  function handleForgottenPasswordClick() {
    navigate("/forgot-password");
  }

  function handleRegisterClick() {
    navigate("/registration");
  }

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // const { email, password } = data;
    console.log(data);
    // TODO
  };

  return (
    <Container.Main>
      <Logo>Interax</Logo>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>Log in to Interax</Title>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange } }) => (
            <Input
              borderColor="LightGray"
              borderStyle="solid"
              borderWidth="1px"
              color="DarkJungleGreen"
              focusedPlaceholderColor="LightGray"
              fontSize="17px"
              fontWeight="500"
              padding="14px 16px"
              placeholder="Email address"
              placeholderColor="PhilippineSilver"
              spellCheck="false"
              type="email"
              onChange={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange } }) => (
            <Input
              borderColor="LightGray"
              borderStyle="solid"
              borderWidth="1px"
              color="DarkJungleGreen"
              focusedPlaceholderColor="LightGray"
              fontSize="17px"
              fontWeight="500"
              padding="14px 16px"
              placeholder="Password"
              placeholderColor="PhilippineSilver"
              spellCheck="false"
              type="password"
              onChange={onChange}
            />
          )}
        />
        <TertiaryButton
          disabled={!isValid}
          fontSize="20px"
          lineHeight="48px"
          type="submit"
          value="Log in"
        />
        <Container.Links>
          <Link onClick={handleForgottenPasswordClick}>
            Forgotten password?
          </Link>
          <LinkSeparator>&#183;</LinkSeparator>
          <Link onClick={handleRegisterClick}>Register</Link>
        </Container.Links>
      </Form>
    </Container.Main>
  );
}
