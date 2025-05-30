import { useMutation } from "@apollo/client";
import { Divider } from "@mui/material";

import { Controller, Resolver, SubmitHandler, useForm } from "react-hook-form";

import { Dropdown, VisibilityModal } from "components";
import { Permission, RelationshipStatusType } from "enums";
import { Colors } from "environment";
import { ADD_USER_RELATIONSHIP_STATUS } from "helpers";
import {
  useRelationshipStatusDropdownItems,
  useScrollLock,
  useVisibilityModalItems,
} from "hooks";
import { RelationshipStatus, User } from "models";
import { useAuthenticationStore, useModalStore, useSettingsStore } from "store";

import { Button, Container, Form } from "../Form.style";

type FormValues = {
  status: RelationshipStatus | "STATUS";
  visibility: Permission;
};

const DEFAULT_FORM_VALUES: FormValues = {
  status: "STATUS",
  visibility: Permission.PUBLIC,
};

const resolver: Resolver<FormValues> = async (values) => {
  let errors: {
    status?: { message: string };
  } = {};

  if (values.status === "STATUS") {
    errors = { ...errors, status: { message: "Status is required" } };
  }

  return { errors, values };
};

interface Props {
  user: User;
  onCancelClick: () => void;
  onSaveClick: () => void;
}

export function AddRelationshipStatus({
  user,
  onCancelClick,
  onSaveClick,
}: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const { isVisibilityModalOpen, closeVisibilityModal, openVisibilityModal } =
    useModalStore();
  const [addRelationshipStatus] = useMutation(ADD_USER_RELATIONSHIP_STATUS, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          relationshipStatus: (existingRelationshipStatus) => {
            if (!data) {
              return existingRelationshipStatus;
            }

            return data.addUserRelationshipStatus;
          },
        },
        id: cache.identify({ ...authenticatedUser }),
      });
    },
  });
  const { lockScroll, unlockScroll } = useScrollLock();
  const { theme } = useSettingsStore();

  const {
    control,
    formState: { isValid },
    getValues,
    handleSubmit,
    setValue,
  } = useForm<FormValues>({
    defaultValues: DEFAULT_FORM_VALUES,
    mode: "onChange",
    resolver,
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    const { status, visibility } = data;
    const { id: userId } = user;

    if (status !== "STATUS") {
      addRelationshipStatus({
        variables: {
          input: { status, userId, visibility },
        },
        onCompleted: () => {
          onSaveClick();
        },
      });
    }
  };

  const dropdownItems = useRelationshipStatusDropdownItems();
  const visibilityModalItems = useVisibilityModalItems();

  const dividerColor =
    !!authenticatedUser && theme === "DARK" ? "Arsenic" : "LightGray";

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="status"
        render={({ field: { value, onChange } }) => {
          function handleItemChanged(item: string) {
            onChange(item);

            if (
              (Object.values(RelationshipStatusType).includes(
                item as RelationshipStatusType
              ) ||
                item === "STATUS") &&
              item !== value
            ) {
              setValue("status", item as RelationshipStatus | "STATUS", {
                shouldValidate: true,
              });
            }
          }

          return (
            <Dropdown
              direction="BOTTOM"
              displayedItems={5}
              itemHeight={41}
              items={dropdownItems}
              onItemSelected={(item) => handleItemChanged(item)}
            />
          );
        }}
      />
      <Divider sx={{ borderColor: Colors[dividerColor] }} />
      <Container.Buttons.Element>
        <Controller
          control={control}
          name="visibility"
          render={({ field: { value } }) => {
            const formattedValue = value
              .substring(0, 1)
              .concat(value.substring(1).replaceAll("_", " ").toLowerCase());
            const Icon = visibilityModalItems.find(
              (item) => item.title === value
            )?.icon;

            return (
              <Button.Visibility
                onClick={() => {
                  lockScroll();
                  openVisibilityModal();
                }}
              >
                {Icon && <Icon />}
                {formattedValue}
              </Button.Visibility>
            );
          }}
        />
        <Container.Buttons.Decision>
          <Button.Cancel
            onClick={() => {
              onCancelClick();
            }}
          >
            Cancel
          </Button.Cancel>
          <Button.Submit disabled={!isValid} value="Save" />
        </Container.Buttons.Decision>
      </Container.Buttons.Element>
      {isVisibilityModalOpen && (
        <VisibilityModal
          items={visibilityModalItems}
          selectedItem={getValues("visibility")}
          onCloseClick={() => {
            unlockScroll();
            closeVisibilityModal();
          }}
          onDoneClick={(item) => {
            setValue("visibility", item, { shouldValidate: true });
          }}
        />
      )}
    </Form>
  );
}
