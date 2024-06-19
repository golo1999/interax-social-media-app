import { useMutation } from "@apollo/client";
import { Divider } from "@mui/material";

import { MutableRefObject, createRef, useState } from "react";
import { Controller, Resolver, SubmitHandler, useForm } from "react-hook-form";
import { MdArrowDropDown, MdClose, MdKeyboardBackspace } from "react-icons/md";

import { Modal, UserPhoto, VisibilityModal } from "components";
import { Permission } from "enums";
import { Colors } from "environment";
import { CreatePostData, CREATE_POST, GET_USER_BY_USERNAME } from "helpers";
import { useOutsideClick, useVisibilityModalItems } from "hooks";
import { User } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";
import { ModalType } from "types";

import { Button, Container, TextArea, Title } from "./CreatePostModal.style";

type FormValues = {
  text: string;
  visibility: Permission;
};

const DEFAULT_FORM_VALUES: FormValues = {
  text: "",
  visibility: Permission.ONLY_ME,
};

const resolver: Resolver<FormValues> = async (values) => {
  let errors: { text?: { message: string } } = {};

  if (!values.text) {
    errors = { ...errors, text: { message: "Text is required" } };
  }

  return {
    errors,
    values,
  };
};

interface Props {
  user: User;
  onCloseClick: () => void;
  onPostCreated: () => void;
}

export function CreatePostModal({ user, onCloseClick, onPostCreated }: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const [createPost] = useMutation<CreatePostData>(CREATE_POST);

  const [modalType, setModalType] = useState<ModalType>("CREATE_POST");

  const {
    control,
    formState: { isValid },
    getValues,
    handleSubmit,
    register,
    setValue,
  } = useForm<FormValues>({
    defaultValues: DEFAULT_FORM_VALUES,
    mode: "onChange",
    resolver,
  });
  const { theme } = useSettingsStore();
  const modalContainerRef = createRef<HTMLDivElement>();

  useOutsideClick({
    ref: modalContainerRef as MutableRefObject<HTMLElement>,
    handle: onCloseClick,
  });

  const onSubmit: SubmitHandler<FormValues> = ({ text, visibility }) => {
    createPost({
      variables: {
        input: {
          ownerId: authenticatedUser?.id,
          parentId: null,
          receiverId: user.id,
          text,
          visibility,
        },
      },
      refetchQueries: [
        {
          query: GET_USER_BY_USERNAME,
          variables: {
            input: {
              authenticatedUserId: authenticatedUser?.id,
              username: user.username,
            },
          },
        },
      ],
      onCompleted: onPostCreated,
    });
  };

  const visibilityModalItems = useVisibilityModalItems();

  if (!authenticatedUser) {
    return <></>;
  }

  if (modalType === "POST_VISIBILITY") {
    const titleColor: keyof typeof Colors =
      !!authenticatedUser && theme === "DARK" ? "Platinum" : "VampireBlack";

    const bodyDescription = (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          padding: "1em 1em 0 1em",
        }}
      >
        <h4
          style={{
            color:
              !!authenticatedUser && theme === "DARK"
                ? Colors.Platinum
                : Colors.VampireBlack,
          }}
        >
          Who can see your post?
        </h4>
        <p style={{ fontSize: "medium" }}>
          Your post will show up in Feed, on your profile and in search results.
        </p>
        <p style={{ fontSize: "medium" }}>
          Your default audience is set to{" "}
          <span style={{ fontWeight: 500 }}>Only me</span>, but you can change
          the audience of this specific post.
        </p>
      </div>
    );

    return (
      <VisibilityModal
        bodyDescription={bodyDescription}
        header={
          <Modal.Header
            isTemplate
            leftIcon={MdKeyboardBackspace}
            title="Post Audience"
            titleColor={titleColor}
            onLeftIconClick={() => setModalType("CREATE_POST")}
          />
        }
        items={visibilityModalItems}
        selectedItem={getValues("visibility")}
        onCloseClick={() => setModalType("CREATE_POST")}
        onDoneClick={(item) => {
          setValue("visibility", item, { shouldValidate: true });
        }}
      />
    );
  }

  const { firstName, lastName } = authenticatedUser;

  const dividerColor: keyof typeof Colors =
    !!authenticatedUser && theme === "DARK" ? "Arsenic" : "LightGray";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal minHeight="50vh" ref={modalContainerRef} width="550px">
        <Modal.Header
          alignItems="center"
          color="Platinum"
          gap="0.5em"
          justifyContent="space-between"
          padding="0.75em"
        >
          <Container.Icon
            $isAuthenticated={!!authenticatedUser}
            $theme={theme}
            isHidden
          >
            <MdClose size={24} />
          </Container.Icon>
          <b>
            <Title $isAuthenticated={!!authenticatedUser} $theme={theme}>
              Create Post
            </Title>
          </b>
          <Container.Icon
            $isAuthenticated={!!authenticatedUser}
            $theme={theme}
            onClick={onCloseClick}
          >
            <MdClose color={Colors.PhilippineGray} size={24} />
          </Container.Icon>
        </Modal.Header>
        <Divider sx={{ borderColor: Colors[dividerColor] }} />
        <Modal.Body direction="column" gap="1em" padding="1em">
          <div style={{ alignItems: "center", display: "flex", gap: "0.5em" }}>
            <UserPhoto user={authenticatedUser} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p
                style={{
                  color:
                    !!authenticatedUser && theme === "DARK"
                      ? Colors.Platinum
                      : Colors.VampireBlack,
                }}
              >
                {firstName} {lastName}
              </p>
              <Controller
                control={control}
                name="visibility"
                render={({ field: { value } }) => {
                  const formattedValue = value
                    .substring(0, 1)
                    .concat(
                      value.substring(1).replaceAll("_", " ").toLowerCase()
                    );
                  const Icon = visibilityModalItems.find(
                    (item) => item.title === value
                  )?.icon;

                  return (
                    <Container.Visibility
                      $isAuthenticated={!!authenticatedUser}
                      $theme={theme}
                      onClick={() => setModalType("POST_VISIBILITY")}
                    >
                      {Icon && <Icon />}
                      <span style={{ fontSize: "small", fontWeight: "500" }}>
                        {formattedValue}
                      </span>
                      <MdArrowDropDown />
                    </Container.Visibility>
                  );
                }}
              />
            </div>
          </div>
          <TextArea
            $isAuthenticated={!!authenticatedUser}
            $theme={theme}
            {...register("text", { required: true })}
            placeholder="What's on your mind?"
            spellCheck={false}
          />
        </Modal.Body>
        <Modal.Footer padding="1em">
          <Button disabled={!isValid} value="Post" />
        </Modal.Footer>
      </Modal>
    </form>
  );
}
