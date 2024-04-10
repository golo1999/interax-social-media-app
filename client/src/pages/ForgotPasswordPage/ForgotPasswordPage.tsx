import { Divider } from "@mui/material";

import { Controller, Resolver, SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { Input } from "components";
import { useAuthenticationStore } from "store";

import {
  Button,
  Container,
  Description,
  Form,
  Title,
} from "./ForgotPasswordPage.style";

type FormValues = {
  email: string;
};

const DEFAULT_FORM_VALUES: FormValues = {
  email: "",
};

const resolver: Resolver<FormValues> = async (values) => {
  let errors: {
    email?: { message: string };
  } = {};
  const { email } = values;

  if (!email) {
    errors = { ...errors, email: { message: "Email is required" } };
  }

  return {
    errors,
    values,
  };
};

export function ForgotPasswordPage() {
  const { authenticatedUser, isFinishedLoading } = useAuthenticationStore();

  if (!isFinishedLoading) {
    return <>Loading...</>;
  }

  return !!authenticatedUser ? (
    <AuthenticatedForgotPasswordPage />
  ) : (
    <NotAuthenticatedForgotPasswordPage />
  );
}

function AuthenticatedForgotPasswordPage() {
  return <Navigate to="/" />;
}

function NotAuthenticatedForgotPasswordPage() {
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
  const { key: locationKey } = useLocation();
  const navigate = useNavigate();

  function handleCancelClick() {
    // If the history stack is empty (there is no previous route) => redirecting to the Home page
    if (locationKey === "default") {
      navigate("/");
    } else {
      navigate(-1);
    }
  }

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // const { email } = data;
    console.log(data);
    // TODO
    reset();
  };

  return (
    <Container.Main>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>Reset your password</Title>
        <Divider color="LightGray" />
        <Container.Input>
          <Description>
            Please enter your email address to search for your account.
          </Description>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                borderColor="LightGray"
                borderStyle="solid"
                borderWidth="1px"
                color="DarkJungleGreen"
                focusedPlaceholderColor="LightGray"
                fontSize="16px"
                fontWeight="400"
                padding="16px"
                placeholder="Email address"
                placeholderColor="PhilippineSilver"
                spellCheck="false"
                type="email"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </Container.Input>
        <Divider color="LightGray" />
        <Container.Buttons>
          <Button.Cancel onClick={handleCancelClick}>Cancel</Button.Cancel>
          <Button.Search disabled={!isValid} value="Search" />
        </Container.Buttons>
      </Form>
    </Container.Main>
  );
}
