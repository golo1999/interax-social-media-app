import { useMutation } from "@apollo/client";
import { Divider } from "@mui/material";

import { useState } from "react";
import { Controller, Resolver, SubmitHandler, useForm } from "react-hook-form";
import { MdArrowDropDown, MdClose, MdKeyboardBackspace } from "react-icons/md";

import { Modal, UserPhoto, VisibilityModal } from "components";
import { Colors } from "environment";
import { CreatePostData, CREATE_POST, GET_USER_BY_USERNAME } from "helpers";
import { useVisibilityModalItems } from "hooks";
import { Permission, User } from "models";
import { useAuthenticationStore } from "store";

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

type ModalType = "CREATE_POST" | "POST_VISIBILITY";

interface Props {
  user: User;
  onCloseClick: () => void;
  onPostClick: () => void;
}

export function CreatePostModal({ user, onCloseClick, onPostClick }: Props) {
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
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { text, visibility } = data;

    createPost({
      variables: {
        input: {
          parentId: null,
          receiverId: user.id,
          receiverUsername: user.username,
          text,
          userId: authenticatedUser?.id,
          visibility,
        },
      },
      refetchQueries: [
        {
          query: GET_USER_BY_USERNAME,
          variables: { username: user.username },
        },
      ],
      onCompleted: onPostClick,
    });
  };

  const visibilityModalItems = useVisibilityModalItems();

  if (!authenticatedUser) {
    return <></>;
  }

  if (modalType === "POST_VISIBILITY") {
    const bodyDescription = (
      <div style={{ padding: "1em 1em 0 1em" }}>
        <h4 style={{ color: Colors.Platinum }}>Who can see your post?</h4>
        <p style={{ fontSize: "medium" }}>
          Your post will show up in Feed, on your profile and in search results.
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal minHeight="50vh" width="550px">
        <Modal.Header
          alignItems="center"
          color="Platinum"
          gap="0.5em"
          justifyContent="space-between"
          padding="0.75em"
        >
          <Container.Icon isHidden>
            <MdClose size={24} />
          </Container.Icon>
          <b>
            <Title>Create Post</Title>
          </b>
          <Container.Icon onClick={onCloseClick}>
            <MdClose color={Colors.PhilippineGray} size={24} />
          </Container.Icon>
        </Modal.Header>
        <Divider color="Onyx" />
        <Modal.Body direction="column" gap="1em" padding="1em">
          <div style={{ alignItems: "center", display: "flex", gap: "0.5em" }}>
            <UserPhoto user={authenticatedUser} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ color: Colors.Platinum }}>
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
