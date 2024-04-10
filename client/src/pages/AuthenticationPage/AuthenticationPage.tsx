import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { Controller, Resolver, SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";

import { Divider, Input, TertiaryButton } from "components";
import { useAuthenticationStore } from "store";

import {
  Button,
  Container,
  Form,
  Subtitle,
  Text,
  Title,
} from "./AuthenticationPage.style";
import { FirebaseError } from "firebase/app";

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

  if (email.length === 0) {
    errors = { ...errors, email: { message: "The email must not be empty" } };
  }

  if (password.length === 0) {
    errors = {
      ...errors,
      password: { message: "The password must not be empty." },
    };
  } else if (password.length < 8) {
    errors = {
      ...errors,
      password: { message: "The password must have at least 8 characters." },
    };
  }

  return {
    errors,
    values,
  };
};

export function AuthenticationPage() {
  const auth = getAuth();
  const { authenticatedUser, isFinishedLoading } = useAuthenticationStore();
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    setError,
  } = useForm<FormValues>({
    defaultValues: DEFAULT_FORM_VALUES,
    mode: "onChange",
    resolver,
  });
  const navigate = useNavigate();

  if (!isFinishedLoading) {
    return <>Loading...</>;
  }

  if (!!authenticatedUser) {
    return <Navigate to="/" />;
  }

  function handleCreateNewAccountClick() {
    navigate("/registration");
  }

  function handleForgottenPasswordClick() {
    navigate("/forgot-password");
  }

  const onSubmit: SubmitHandler<FormValues> = async ({ email, password }) => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (!user.emailVerified) {
        await signOut(auth);
        throw new Error("Please verify your email first.");
      }
      console.log({ user });
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error.message);
        setError("email", { message: error.message });
      } else if (error instanceof Error) {
        console.log({ error });
        setError("email", { message: error.message });
      }
    }

    // TODO: LOG IN
    // reset();
  };

  console.log({ errors });

  return (
    <Container.Main>
      <Container.TitleSubtitle>
        <Title>Interax</Title>
        <Subtitle>
          Interax helps you connect and share with the people in your life.
        </Subtitle>
      </Container.TitleSubtitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Container.Controller>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                borderColor={errors.email ? "RedCrayola" : "LightGray"}
                borderStyle="solid"
                borderWidth="1px"
                color="DarkJungleGreen"
                focusedBorderColor={
                  errors.email ? "RedCrayola" : "BrightNavyBlue"
                }
                focusedPlaceholderColor="LightGray"
                fontSize="17px"
                hoveredBorderColor={errors.email ? "RedCrayola" : "SonicSilver"}
                padding="14px 16px"
                placeholder="Email address"
                placeholderColor="PhilippineSilver"
                spellCheck="false"
                type="email"
                value={value}
                onChange={onChange}
              />
            )}
          />
          {errors.email && <Text.Error>{errors.email.message}</Text.Error>}
        </Container.Controller>
        <Container.Controller>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                borderColor={errors.password ? "RedCrayola" : "LightGray"}
                borderStyle="solid"
                borderWidth="1px"
                color="DarkJungleGreen"
                focusedBorderColor={
                  errors.password ? "RedCrayola" : "BrightNavyBlue"
                }
                focusedPlaceholderColor="LightGray"
                fontSize="17px"
                hoveredBorderColor={
                  errors.password ? "RedCrayola" : "SonicSilver"
                }
                padding="14px 16px"
                placeholder="Password"
                placeholderColor="PhilippineSilver"
                spellCheck="false"
                type="password"
                value={value}
                onChange={onChange}
              />
            )}
          />
          {errors.password && (
            <Text.Error>{errors.password.message}</Text.Error>
          )}
        </Container.Controller>
        <TertiaryButton
          disabled={!isValid}
          fontSize="20px"
          lineHeight="48px"
          type="submit"
          value="Log in"
        />
        <Text.ForgottenPassword onClick={handleForgottenPasswordClick}>
          Forgotten password?
        </Text.ForgottenPassword>
        <Divider color="AmericanSilver" />
        <Container.CreateAccountButton>
          <Button.CreateAccount onClick={handleCreateNewAccountClick}>
            Create new account
          </Button.CreateAccount>
        </Container.CreateAccountButton>
      </Form>
    </Container.Main>
  );
}
