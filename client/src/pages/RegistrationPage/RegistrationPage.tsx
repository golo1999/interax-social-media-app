import { Divider } from "@mui/material";

import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { CSSProperties } from "react";
import { Controller, Resolver, SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";

import { Input, RadioButton } from "components";
import { Colors } from "environment";
import {
  emailValidation,
  firebaseAuth,
  firestoreDb,
  passwordValidation,
} from "helpers";
import { useAuthenticationStore } from "store";
import { Gender } from "types";

import {
  Button,
  Container,
  Form,
  GenderText,
  Link,
  Logo,
  Text,
  Title,
} from "./RegistrationPage.style";

type FormValues = {
  email: string;
  emailConfirmation: string;
  firstName: string;
  gender: Gender | null;
  lastName: string;
  password: string;
};

interface Data {
  email: string;
  firstName: string;
  gender: Gender | null;
  id: string;
  lastName: string;
  username: string;
}

const DEFAULT_FORM_VALUES: FormValues = {
  email: "",
  emailConfirmation: "",
  firstName: "",
  gender: null,
  lastName: "",
  password: "",
};

const resolver: Resolver<FormValues> = async (values) => {
  let errors: {
    email?: { message: string };
    emailConfirmation?: { message: string };
    firstName?: { message: string };
    gender?: { message: string };
    lastName?: { message: string };
    password?: { message: string };
  } = {};
  const { email, emailConfirmation, firstName, gender, lastName, password } =
    values;

  if (!email || !emailValidation(email)) {
    errors = {
      ...errors,
      email: {
        message:
          "You'll use this when you log in and if you ever need to reset your password.",
      },
    };
  }

  if (!emailConfirmation || email !== emailConfirmation) {
    errors = {
      ...errors,
      emailConfirmation: { message: "Please re-enter your email address." },
    };
  }

  if (!firstName) {
    errors = { ...errors, firstName: { message: "What's your name?" } };
  }

  if (!gender) {
    errors = {
      ...errors,
      gender: {
        message:
          "Please choose a gender. You can change who can see this later.",
      },
    };
  }

  if (!lastName) {
    errors = { ...errors, lastName: { message: "What's your name?" } };
  }

  if (!passwordValidation(password)) {
    errors = {
      ...errors,
      password: {
        message:
          "Enter a combination of at least eight numbers, letters and symbols (such as ! and &).",
      },
    };
  }

  return {
    errors,
    values,
  };
};

export function RegistrationPage() {
  const { authenticatedUser, isFinishedLoading } = useAuthenticationStore();
  const {
    control,
    formState,
    getFieldState,
    getValues,
    handleSubmit,
    setError,
    setValue,
  } = useForm<FormValues>({
    defaultValues: DEFAULT_FORM_VALUES,
    mode: "onChange",
    resolver,
  });
  const navigate = useNavigate();

  function handleLinkClick() {
    navigate("/login");
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { email, firstName, gender, lastName, password } = data;

    try {
      const { user } = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      await sendEmailVerification(user).then(() => {
        console.log("Please check your mail for more details");
      });
      const firestoreUser: Data = {
        email,
        firstName,
        gender,
        id: user.uid,
        lastName,
        username: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${new Date().getTime()}`,
      };
      await setDoc(
        doc(firestoreDb, "users", firestoreUser.id),
        firestoreUser
      ).then(() => {
        console.log("ADDED INTO DATABASE");
      });
      await signOut(firebaseAuth).then(() => {
        console.log("SIGNED OUT");
      });
      navigate("/login");
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error.message);
        setError("email", { message: error.message });
      } else if (error instanceof Error) {
        console.log(error.message);
        setError("email", { message: error.message });
      }
    }
  };

  const { errors, isValid } = formState;
  const { invalid: isEmailFieldInvalid, isDirty: isEmailFieldDirty } =
    getFieldState("email", formState);
  const { gender } = getValues();

  const radioButtonLabelStyle: CSSProperties = {
    color: Colors.DarkJungleGreen,
    fontSize: "15px",
  };
  const radioButtonWrapperStyle: CSSProperties = {
    border: `1px solid ${Colors.LightGray}`,
    borderRadius: "4px",
    flex: 1,
    padding: "10px",
  };

  if (!isFinishedLoading) {
    return <>Loading...</>;
  }

  if (!!authenticatedUser) {
    return <Navigate to="/" />;
  }

  return (
    <Container.Main>
      <Logo>Interax</Logo>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>Create a new account</Title>
        <Divider color="LightGray" />
        <Container.TopInputs>
          <Container.NameInputs.Outer>
            <Container.NameInputs.Inner>
              <Container.FullWidth>
                <Controller
                  control={control}
                  name="firstName"
                  render={({ field: { onChange }, fieldState: { error } }) => (
                    <Input
                      borderColor={error ? "Red" : "LightGray"}
                      borderStyle="solid"
                      borderWidth="1px"
                      color="DarkJungleGreen"
                      fontSize="15px"
                      fontWeight="400"
                      padding="11px"
                      placeholder="First name"
                      placeholderColor="PhilippineSilver"
                      spellCheck="false"
                      type="text"
                      width="194px"
                      onChange={onChange}
                    />
                  )}
                />
              </Container.FullWidth>
              <Container.FullWidth>
                <Controller
                  control={control}
                  name="lastName"
                  render={({ field: { onChange }, fieldState: { error } }) => (
                    <Input
                      borderColor={error ? "Red" : "LightGray"}
                      borderStyle="solid"
                      borderWidth="1px"
                      color="DarkJungleGreen"
                      fontSize="15px"
                      fontWeight="400"
                      padding="11px"
                      placeholder="Last name"
                      placeholderColor="PhilippineSilver"
                      spellCheck="false"
                      type="text"
                      width="194px"
                      onChange={onChange}
                    />
                  )}
                />
              </Container.FullWidth>
            </Container.NameInputs.Inner>
            {(errors.firstName || errors.lastName) && (
              <Text.Error>
                {errors.firstName
                  ? errors.firstName.message
                  : errors.lastName?.message}
              </Text.Error>
            )}
          </Container.NameInputs.Outer>
          <Container.Controller>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange }, fieldState: { error } }) => (
                <Input
                  borderColor={error ? "Red" : "LightGray"}
                  borderStyle="solid"
                  borderWidth="1px"
                  color="DarkJungleGreen"
                  fontSize="15px"
                  fontWeight="400"
                  padding="11px"
                  placeholder="Email address"
                  placeholderColor="PhilippineSilver"
                  spellCheck="false"
                  type="email"
                  onChange={onChange}
                />
              )}
            />
            {errors.email && <Text.Error>{errors.email.message}</Text.Error>}
          </Container.Controller>
          {isEmailFieldDirty && !isEmailFieldInvalid && (
            <Container.Controller>
              <Controller
                control={control}
                name="emailConfirmation"
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <Input
                    borderColor={error ? "Red" : "LightGray"}
                    borderStyle="solid"
                    borderWidth="1px"
                    color="DarkJungleGreen"
                    fontSize="15px"
                    fontWeight="400"
                    padding="11px"
                    placeholder="Re-enter email address"
                    placeholderColor="PhilippineSilver"
                    spellCheck="false"
                    type="email"
                    onChange={onChange}
                  />
                )}
              />
              {errors.emailConfirmation && (
                <Text.Error>{errors.emailConfirmation.message}</Text.Error>
              )}
            </Container.Controller>
          )}
          <Container.Controller>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange }, fieldState: { error } }) => (
                <Input
                  borderColor={error ? "Red" : "LightGray"}
                  borderStyle="solid"
                  borderWidth="1px"
                  color="DarkJungleGreen"
                  fontSize="15px"
                  fontWeight="400"
                  padding="11px"
                  placeholder="Password"
                  placeholderColor="PhilippineSilver"
                  spellCheck="false"
                  type="password"
                  onChange={onChange}
                />
              )}
            />
            {errors.password && (
              <Text.Error>{errors.password.message}</Text.Error>
            )}
          </Container.Controller>
        </Container.TopInputs>
        <GenderText>Gender</GenderText>
        <Container.Genders>
          <Controller
            control={control}
            name="gender"
            render={() => {
              function handleChange() {
                if (gender !== "Female") {
                  setValue("gender", "Female", { shouldValidate: true });
                }
              }

              return (
                <RadioButton
                  color="SonicSilver"
                  isChecked={gender === "Female"}
                  label="Female"
                  labelPosition="start"
                  labelStyle={radioButtonLabelStyle}
                  wrapperStyle={radioButtonWrapperStyle}
                  onChange={handleChange}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="gender"
            render={() => {
              function handleChange() {
                if (gender !== "Male") {
                  setValue("gender", "Male", { shouldValidate: true });
                }
              }

              return (
                <RadioButton
                  color="SonicSilver"
                  isChecked={gender === "Male"}
                  label="Male"
                  labelPosition="start"
                  labelStyle={radioButtonLabelStyle}
                  wrapperStyle={radioButtonWrapperStyle}
                  onChange={handleChange}
                />
              );
            }}
          />
        </Container.Genders>
        <Container.Button>
          <Button disabled={!isValid} value="Register" />
        </Container.Button>
        <Container.Link>
          <Link onClick={handleLinkClick}>Already have an account?</Link>
        </Container.Link>
      </Form>
    </Container.Main>
  );
}
