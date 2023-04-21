import { useMutation } from "@apollo/client";

import { useState } from "react";
import { Controller, Resolver, SubmitHandler, useForm } from "react-hook-form";

import { Divider, Dropdown, VisibilityModal } from "components";
import {
  AddRelationshipStatusData,
  ADD_USER_RELATIONSHIP_STATUS,
  GET_USER_BY_USERNAME,
} from "helpers";
import {
  useRelationshipStatusDropdownItems,
  useVisibilityModalItems,
} from "hooks";
import {
  Permission,
  RelationshipStatus,
  RelationshipStatusType,
  User,
} from "models";

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
  const [addRelationshipStatus] = useMutation<AddRelationshipStatusData>(
    ADD_USER_RELATIONSHIP_STATUS
  );

  const [isVisibilityModalOpen, setIsVisibilityModalOpen] = useState(false);

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
    const { id: userId, username } = user;

    addRelationshipStatus({
      variables: {
        input: { status, userId, visibility },
      },
      onCompleted: () => {
        onSaveClick();
      },
      refetchQueries: [
        { query: GET_USER_BY_USERNAME, variables: { username } },
      ],
    });
  };

  const dropdownItems = useRelationshipStatusDropdownItems();
  const visibilityModalItems = useVisibilityModalItems();

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
      <Divider thickness="2px" />
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
                  setIsVisibilityModalOpen((prev) => !prev);
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
            setIsVisibilityModalOpen((prev) => !prev);
          }}
          onDoneClick={(item) => {
            setValue("visibility", item, { shouldValidate: true });
          }}
        />
      )}
    </Form>
  );
}
