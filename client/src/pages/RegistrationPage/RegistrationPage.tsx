import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { CSSProperties, useMemo } from "react";
import { Controller, Resolver, SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";

import { Divider, RadioButton } from "components";
import { Colors } from "environment";
import { emailValidation, firebaseAuth, firestoreDb } from "helpers";
import { useAuthenticationStore } from "store";

import {
  Button,
  Container,
  Form,
  GenderText,
  Link,
  Logo,
  StyledInput,
  Title,
} from "./RegistrationPage.style";

type FormValues = {
  email: string;
  emailConfirmation: string;
  firstName: string;
  gender: Gender | null;
  password: string;
  surname: string;
};

type Gender = "Female" | "Male";

interface Data {
  email: string;
  firstName: string;
  gender: Gender | null;
  id: string;
  surname: string;
}

const DEFAULT_FORM_VALUES: FormValues = {
  email: "",
  emailConfirmation: "",
  firstName: "",
  gender: null,
  password: "",
  surname: "",
};

const resolver: Resolver<FormValues> = async (values) => {
  let errors: {
    email?: { message: string };
    emailConfirmation?: { message: string };
    firstName?: { message: string };
    gender?: { message: string };
    password?: { message: string };
    surname?: { message: string };
  } = {};
  const { email, emailConfirmation, firstName, gender, password, surname } =
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

  if (!password || password.length < 8) {
    errors = {
      ...errors,
      password: {
        message:
          "Enter a combination of at least eight numbers, letters and punctuation marks (such as ! and &).",
      },
    };
  }

  if (!surname) {
    errors = { ...errors, surname: { message: "What's your name?" } };
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
    register,
    reset,
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
    const { email, firstName, gender, password, surname } = data;

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
        surname,
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
      }
    }

    // console.log(data);
    // reset(DEFAULT_FORM_VALUES); // NOT WORKING FOR TOP INPUTS
    // TODO
  };

  const { isValid } = formState;
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

  const topInputsRowCount: number = useMemo(
    () => (!isEmailFieldDirty || isEmailFieldInvalid ? 3 : 4),
    [isEmailFieldDirty, isEmailFieldInvalid]
  );

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
        <Container.TopInputs rowCount={topInputsRowCount}>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange }, fieldState: { error } }) => (
              <StyledInput.FirstName
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
          <Controller
            control={control}
            name="surname"
            render={({ field: { onChange }, fieldState: { error } }) => (
              <StyledInput.Surname
                borderColor={error ? "Red" : "LightGray"}
                borderStyle="solid"
                borderWidth="1px"
                color="DarkJungleGreen"
                fontSize="15px"
                fontWeight="400"
                padding="11px"
                placeholder="Surname"
                placeholderColor="PhilippineSilver"
                spellCheck="false"
                type="text"
                width="194px"
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange }, fieldState: { error } }) => (
              <StyledInput.Email
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
          {isEmailFieldDirty && !isEmailFieldInvalid && (
            <Controller
              control={control}
              name="emailConfirmation"
              render={({ field: { onChange }, fieldState: { error } }) => (
                <StyledInput.EmailConfirmation
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
          )}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange }, fieldState: { error } }) => (
              <StyledInput.Password
                borderColor={error ? "Red" : "LightGray"}
                borderStyle="solid"
                borderWidth="1px"
                color="DarkJungleGreen"
                fontSize="15px"
                fontWeight="400"
                padding="11px"
                placeholder="Password"
                placeholderColor="PhilippineSilver"
                rowCount={topInputsRowCount}
                spellCheck="false"
                type="password"
                onChange={onChange}
              />
            )}
          />
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
