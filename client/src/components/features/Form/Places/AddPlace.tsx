import { useMutation } from "@apollo/client";
import { Divider } from "@mui/material";

import { useMemo, useState } from "react";
import { Controller, Resolver, SubmitHandler, useForm } from "react-hook-form";

import { Dropdown, VisibilityModal } from "components";
import { Permission } from "enums";
import { Colors } from "environment";
import {
  AddUserPlaceData,
  ADD_USER_PLACE,
  GET_USER_BY_USERNAME,
} from "helpers";
import { usePeriodDropdownItems, useVisibilityModalItems } from "hooks";
import { Date as CustomDate, User } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

import { Button, Container, Form, Input, Label } from "../Form.style";

type FormValues = {
  city: string;
  from: CustomDate;
  isCurrent: boolean;
  to: CustomDate;
  visibility: Permission;
};

const DEFAULT_FORM_VALUES: FormValues = {
  city: "",
  from: { day: "DAY", month: "MONTH", year: "YEAR" },
  isCurrent: true,
  to: { day: "DAY", month: "MONTH", year: "YEAR" },
  visibility: Permission.PUBLIC,
};

const resolver: Resolver<FormValues> = async (values) => {
  let errors: {
    city?: { message: string };
    from?: {
      day?: { message: string };
      month?: { message: string };
      year?: { message: string };
    };
    to?: {
      day?: { message: string };
      month?: { message: string };
      year?: { message: string };
    };
  } = {};

  if (!values.city) {
    errors = { ...errors, city: { message: "City is required" } };
  }

  if (values.from.year === "YEAR") {
    errors = {
      ...errors,
      from: { ...errors.from, year: { message: "Year is required" } },
    };
  }

  if (values.from.month === "MONTH") {
    errors = {
      ...errors,
      from: { ...errors.from, month: { message: "Month is required" } },
    };
  }

  if (values.from.day === "DAY") {
    errors = {
      ...errors,
      from: { ...errors.from, day: { message: "Day is required" } },
    };
  }

  if (values.to.year === "YEAR" && !values.isCurrent) {
    errors = {
      ...errors,
      to: { ...errors.to, year: { message: "Year is required" } },
    };
  }

  if (values.to.month === "MONTH" && !values.isCurrent) {
    errors = {
      ...errors,
      to: { ...errors.to, month: { message: "Month is required" } },
    };
  }

  if (values.to.day === "DAY" && !values.isCurrent) {
    errors = {
      ...errors,
      to: { ...errors.to, day: { message: "Day is required" } },
    };
  }

  return { errors, values };
};

interface Props {
  user: User;
  onCancelClick: () => void;
  onSaveClick: () => void;
}

export function AddPlace({ user, onCancelClick, onSaveClick }: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const [addUserPlace] = useMutation<AddUserPlaceData>(ADD_USER_PLACE);
  const { theme } = useSettingsStore();
  const [isVisibilityModalOpen, setIsVisibilityModalOpen] = useState(false);

  const {
    control,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    mode: "onChange",
    resolver,
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { city, from, isCurrent, to, visibility } = data;
    const { id: userId, username } = user;

    const fromMonthAsNumber =
      new Date(`${from.month} ${from.day}, ${from.year}`).getMonth() + 1;
    const toMonthAsNumber = to
      ? new Date(`${to.month} ${to.day}, ${to.year}`).getMonth() + 1
      : null;
    const parsedFrom = new Date(
      new Date(
        parseInt(from.year),
        fromMonthAsNumber,
        parseInt(from.day)
      ).setUTCHours(0, 0, 0, 0)
    )
      .getTime()
      .toString();
    const parsedTo = toMonthAsNumber
      ? new Date(
          new Date(
            parseInt(to.year),
            toMonthAsNumber,
            parseInt(to.day)
          ).setUTCHours(0, 0, 0, 0)
        )
          .getTime()
          .toString()
      : null;

    addUserPlace({
      variables: {
        input: {
          city,
          from: parsedFrom,
          isCurrent,
          to: parsedTo,
          userId,
          visibility,
        },
      },
      onCompleted: () => {
        reset();
        onSaveClick();
      },
      refetchQueries: [
        {
          query: GET_USER_BY_USERNAME,
          variables: {
            input: { authenticatedUserId: authenticatedUser?.id, username },
          },
        },
      ],
    });
  };

  const { from, isCurrent, to } = getValues();

  const fromMemoized = useMemo(() => {
    return { month: from.month, year: from.year };
  }, [from.month, from.year]);
  const toMemoized = useMemo(() => {
    return { month: to.month, year: to.year };
  }, [to.month, to.year]);

  const { daysFrom, daysTo, months, years } = usePeriodDropdownItems({
    from: fromMemoized,
    to: toMemoized,
  });
  const visibilityModalItems = useVisibilityModalItems();

  const dividerColor =
    !!authenticatedUser && theme === "DARK" ? "Arsenic" : "LightGray";

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("city", { required: true })}
        isValid={!errors.city}
        placeholder="City"
      />
      <b>
        <Label>Time Period</Label>
      </b>
      <Container.Checkbox>
        <input
          {...register("isCurrent")}
          type="checkbox"
          onChange={(e) => {
            const isChecked = e.target.checked;

            setValue("isCurrent", isChecked, { shouldValidate: true });

            if (isChecked) {
              setValue(
                "to",
                { day: "DAY", month: "MONTH", year: "YEAR" },
                { shouldValidate: true }
              );
            }
          }}
        />
        <b>
          <Label>I currently live here</Label>
        </b>
      </Container.Checkbox>
      <Container.Dates>
        <Label>From</Label>
        <Controller
          control={control}
          name="from.year"
          render={({ field: { value, onChange } }) => {
            function handleItemChanged(item: string) {
              onChange(item);

              if (item !== value) {
                setValue("from.year", item, { shouldValidate: true });

                if (item === "YEAR") {
                  if (from.month !== "MONTH") {
                    setValue("from.day", "DAY", { shouldValidate: true });
                  }
                  setValue("from.month", "MONTH", { shouldValidate: true });
                } else if (from.month !== "MONTH") {
                  setValue("from.day", "DAY", { shouldValidate: true });
                }
              }
            }

            return (
              <Dropdown
                direction="TOP"
                displayedItems={5}
                itemHeight={41}
                items={years}
                onItemSelected={(item) => handleItemChanged(item)}
              />
            );
          }}
        />
        {from.year !== "YEAR" && (
          <Controller
            control={control}
            name="from.month"
            render={({ field: { value, onChange } }) => {
              function handleItemChanged(item: string) {
                onChange(item);

                if (item !== value) {
                  setValue("from.month", item, { shouldValidate: true });
                  setValue("from.day", "DAY", { shouldValidate: true });
                }
              }

              return (
                <Dropdown
                  displayedItems={5}
                  itemHeight={41}
                  items={months}
                  onItemSelected={(item) => handleItemChanged(item)}
                />
              );
            }}
          />
        )}
        {from.year !== "YEAR" && from.month !== "MONTH" && (
          <Controller
            control={control}
            name="from.day"
            render={({ field: { value, onChange } }) => {
              function handleItemChanged(item: string) {
                onChange(item);

                if (item !== value) {
                  setValue("from.day", item, { shouldValidate: true });
                }
              }

              return (
                <Dropdown
                  displayedItems={5}
                  itemHeight={41}
                  items={daysFrom}
                  onItemSelected={(item) => handleItemChanged(item)}
                />
              );
            }}
          />
        )}
        {!isCurrent && (
          <>
            <Label>to</Label>
            <Controller
              control={control}
              name="to.year"
              render={({ field: { value, onChange } }) => {
                function handleItemChanged(item: string) {
                  onChange(item);

                  if (item !== value) {
                    setValue("to.year", item, { shouldValidate: true });

                    if (item === "YEAR") {
                      if (to.month !== "MONTH") {
                        setValue("to.day", "DAY", { shouldValidate: true });
                      }
                      setValue("to.month", "MONTH", { shouldValidate: true });
                    } else if (to.month !== "MONTH") {
                      setValue("to.day", "DAY", { shouldValidate: true });
                    }
                  }
                }

                return (
                  <Dropdown
                    displayedItems={5}
                    itemHeight={41}
                    items={years}
                    onItemSelected={(item) => handleItemChanged(item)}
                  />
                );
              }}
            />
            {to.year !== "YEAR" && (
              <Controller
                control={control}
                name="to.month"
                render={({ field: { value, onChange } }) => {
                  function handleItemChanged(item: string) {
                    onChange(item);

                    if (item !== value) {
                      setValue("to.month", item, { shouldValidate: true });
                      setValue("to.day", "DAY", { shouldValidate: true });
                    }
                  }

                  return (
                    <Dropdown
                      displayedItems={5}
                      itemHeight={41}
                      items={months}
                      onItemSelected={(item) => handleItemChanged(item)}
                    />
                  );
                }}
              />
            )}
            {to.year !== "YEAR" && to.month !== "MONTH" && (
              <Controller
                control={control}
                name="to.day"
                render={({ field: { value, onChange } }) => {
                  function handleItemChanged(item: string) {
                    onChange(item);

                    if (item !== value) {
                      setValue("to.day", item, { shouldValidate: true });
                    }
                  }

                  return (
                    <Dropdown
                      displayedItems={5}
                      itemHeight={41}
                      items={daysTo}
                      onItemSelected={(item) => handleItemChanged(item)}
                    />
                  );
                }}
              />
            )}
          </>
        )}
      </Container.Dates>
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
              reset();
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
