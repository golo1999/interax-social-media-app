import { useMutation } from "@apollo/client";
import { Divider } from "@mui/material";

import { useState } from "react";
import { Controller, Resolver, SubmitHandler, useForm } from "react-hook-form";

import { Dropdown, VisibilityModal } from "components";
import {
  AddHighSchoolEducationData,
  ADD_USER_HIGH_SCHOOL_EDUCATION,
  GET_USER_BY_USERNAME,
} from "helpers";
import { usePeriodDropdownItems, useVisibilityModalItems } from "hooks";
import { Date as CustomDate, Permission, User } from "models";

import { Button, Container, Form, Input, Label } from "../Form.style";

type FormValues = {
  from: CustomDate;
  graduated: boolean;
  school: string;
  to: CustomDate;
  visibility: Permission;
};

const DEFAULT_FORM_VALUES: FormValues = {
  from: { day: "DAY", month: "MONTH", year: "YEAR" },
  graduated: true,
  school: "",
  to: { day: "DAY", month: "MONTH", year: "YEAR" },
  visibility: Permission.PUBLIC,
};

const resolver: Resolver<FormValues> = async (values) => {
  let errors: {
    from?: {
      day?: { message: string };
      month?: { message: string };
      year?: { message: string };
    };
    school?: { message: string };
    to?: {
      day?: { message: string };
      month?: { message: string };
      year?: { message: string };
    };
  } = {};

  if (!values.school) {
    errors = { ...errors, school: { message: "School is required" } };
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

  if (values.to.year === "YEAR" && values.graduated) {
    errors = {
      ...errors,
      to: { ...errors.to, year: { message: "Year is required" } },
    };
  }

  if (values.to.month === "MONTH" && values.graduated) {
    errors = {
      ...errors,
      to: { ...errors.to, month: { message: "Month is required" } },
    };
  }

  if (values.to.day === "DAY" && values.graduated) {
    errors = {
      ...errors,
      to: { ...errors.to, day: { message: "Day is required" } },
    };
  }

  return {
    errors,
    values,
  };
};

interface Props {
  user: User;
  onCancelClick: () => void;
  onSaveClick: () => void;
}

export function AddHighSchool({ user, onCancelClick, onSaveClick }: Props) {
  const [addHighSchoolEducation] = useMutation<AddHighSchoolEducationData>(
    ADD_USER_HIGH_SCHOOL_EDUCATION
  );

  const [isVisibilityModalOpen, setIsVisibilityModalOpen] = useState(false);
  const [selectedDropdownItems, setSelectedDropdownItems] = useState({
    from: {
      month: DEFAULT_FORM_VALUES.from.month,
      year: DEFAULT_FORM_VALUES.from.year,
    },
    to: {
      month: DEFAULT_FORM_VALUES.to.month,
      year: DEFAULT_FORM_VALUES.to.year,
    },
  });

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
    const { from, graduated, school, to, visibility } = data;
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

    addHighSchoolEducation({
      variables: {
        input: {
          from: parsedFrom,
          graduated,
          school,
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
        { query: GET_USER_BY_USERNAME, variables: { username } },
      ],
    });
  };

  const { daysFrom, daysTo, months, years } = usePeriodDropdownItems({
    from: selectedDropdownItems.from,
    to: selectedDropdownItems.to,
  });
  const visibilityModalItems = useVisibilityModalItems();

  const { graduated } = getValues();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("school", { required: true })}
        isValid={!errors.school}
        placeholder="School"
      />
      <b>
        <Label>Time Period</Label>
      </b>
      <Container.Dates>
        <Label>From</Label>
        <Controller
          control={control}
          name="from.year"
          render={({ field: { onChange } }) => {
            function handleItemChanged(item: string) {
              onChange(item);

              if (item !== selectedDropdownItems.from.year) {
                setSelectedDropdownItems((value) => {
                  return {
                    ...value,
                    from: { ...value.from, year: item },
                  };
                });
                if (selectedDropdownItems.from.month !== "MONTH") {
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
        {selectedDropdownItems.from.year !== "YEAR" && (
          <Controller
            control={control}
            name="from.month"
            render={({ field: { onChange } }) => {
              function handleItemChanged(item: string) {
                onChange(item);

                if (item !== selectedDropdownItems.from.month) {
                  setSelectedDropdownItems((value) => {
                    return {
                      ...value,
                      from: { ...value.from, month: item },
                    };
                  });
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
        {selectedDropdownItems.from.year !== "YEAR" &&
          selectedDropdownItems.from.month !== "MONTH" && (
            <Controller
              control={control}
              name="from.day"
              render={({ field: { onChange } }) => {
                function handleItemChanged(item: string) {
                  onChange(item);
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
        {graduated && (
          <>
            <Label>to</Label>
            <Controller
              control={control}
              name="to.year"
              render={({ field: { onChange } }) => {
                function handleItemChanged(item: string) {
                  onChange(item);

                  if (item !== selectedDropdownItems.to.year) {
                    setSelectedDropdownItems((value) => {
                      return {
                        ...value,
                        to: { ...value.to, year: item },
                      };
                    });
                    if (selectedDropdownItems.to.month !== "MONTH") {
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
            {selectedDropdownItems.to.year !== "YEAR" && (
              <Controller
                control={control}
                name="to.month"
                render={({ field: { onChange } }) => {
                  function handleItemChanged(item: string) {
                    onChange(item);

                    if (item !== selectedDropdownItems.to.month) {
                      setSelectedDropdownItems((value) => {
                        return { ...value, to: { ...value.to, month: item } };
                      });
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
            {selectedDropdownItems.to.year !== "YEAR" &&
              selectedDropdownItems.to.month !== "MONTH" && (
                <Controller
                  control={control}
                  name="to.day"
                  render={({ field: { onChange } }) => {
                    function handleItemChanged(item: string) {
                      onChange(item);
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
      <Container.Checkbox>
        <input
          {...register("graduated")}
          type="checkbox"
          onChange={(e) => {
            const isChecked = e.target.checked;

            setValue("graduated", isChecked, { shouldValidate: true });

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
          <Label>Graduated</Label>
        </b>
      </Container.Checkbox>
      <Divider color="Onyx" />
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
