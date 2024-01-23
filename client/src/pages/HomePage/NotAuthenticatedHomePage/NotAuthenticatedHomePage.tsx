import { Controller, Resolver, SubmitHandler, useForm } from "react-hook-form";

import { Divider, Input, TertiaryButton } from "components";

import {
  Button,
  Container,
  Form,
  Subtitle,
  Text,
  Title,
} from "./NotAuthenticatedHomePage.style";

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

export function NotAuthenticatedHomePage() {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<FormValues>({
    defaultValues: DEFAULT_FORM_VALUES,
    mode: "onChange",
    resolver,
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // const { email, password } = data;
    console.log(data);
    // TODO: LOG IN
    reset();
  };

  return (
    <Container.Main>
      <Container.TitleSubtitle>
        <Title>Interax</Title>
        <Subtitle>
          Interax helps you connect and share with the people in your life.
        </Subtitle>
      </Container.TitleSubtitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
        {errors.password && <Text.Error>{errors.password.message}</Text.Error>}
        <TertiaryButton
          disabled={!isValid}
          fontSize="20px"
          lineHeight="48px"
          type="submit"
          value="Log in"
        />
        <Text.ForgottenPassword>Forgotten password?</Text.ForgottenPassword>
        <Divider color="AmericanSilver" />
        <Container.CreateAccountButton>
          <Button.CreateAccount>Create new account</Button.CreateAccount>
        </Container.CreateAccountButton>
      </Form>
    </Container.Main>
  );
}
