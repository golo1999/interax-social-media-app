import { Controller, Resolver, SubmitHandler, useForm } from "react-hook-form";

import { Input, TertiaryButton } from "components";

import { Form, Logo } from "./NotAuthenticatedHeader.style";

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

export function NotAuthenticatedHeader() {
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
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // const { email, password } = data;
    console.log(data);
    // TODO
  };

  return (
    <>
      <Logo>Interax</Logo>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange } }) => (
            <Input
              borderColor="LightGray"
              borderStyle="solid"
              borderWidth="1px"
              color="DarkJungleGreen"
              focusedBorderColor="BrightNavyBlue"
              focusedPlaceholderColor="LightGray"
              fontSize="14px"
              fontWeight="700"
              height="40px"
              hoveredBorderColor="SonicSilver"
              padding="8px 12px"
              placeholder="Email"
              placeholderColor="PhilippineSilver"
              spellCheck="false"
              type="email"
              width="188px"
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
              focusedBorderColor="BrightNavyBlue"
              focusedPlaceholderColor="LightGray"
              fontSize="14px"
              fontWeight="700"
              height="40px"
              hoveredBorderColor="SonicSilver"
              padding="8px 12px"
              placeholder="Password"
              placeholderColor="PhilippineSilver"
              spellCheck="false"
              type="password"
              width="188px"
              onChange={onChange}
            />
          )}
        />
        <TertiaryButton
          disabled={!isValid}
          fontSize="16px"
          padding="10px"
          type="submit"
          value="Log in"
        />
      </Form>
    </>
  );
}
