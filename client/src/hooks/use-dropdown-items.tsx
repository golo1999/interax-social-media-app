import { useMemo } from "react";

import { Month, RelationshipStatusType } from "enums";
import { getNumbersBetween } from "helpers";
import { DropdownItem } from "models";

type PeriodProps = {
  from: {
    month: string;
    year: string;
  };
  to: {
    month: string;
    year: string;
  };
};

export function usePeriodDropdownItems({ from, to }: PeriodProps) {
  const daysFrom = useMemo(() => {
    const defaultItem: DropdownItem = { key: "DAY", value: "Day" };

    return [
      defaultItem,
      ...getNumbersBetween(
        1,
        new Date(
          +from.year,
          new Date(`${from.month} 1, ${from.year}`).getMonth() + 1,
          0
        ).getDate()
      ).map((number) => {
        return { key: number, value: number };
      }),
    ];
  }, [from]);
  const daysTo = useMemo(() => {
    const defaultItem: DropdownItem = { key: "DAY", value: "Day" };

    return [
      defaultItem,
      ...getNumbersBetween(
        1,
        new Date(
          +to.year,
          new Date(`${to.month} 1, ${to.year}`).getMonth() + 1,
          0
        ).getDate()
      ).map((number) => {
        return { key: number, value: number };
      }),
    ];
  }, [to]);
  const months = useMemo(() => {
    const defaultItem: DropdownItem = { key: "MONTH", value: "Month" };

    return [
      defaultItem,
      ...Object.values(Month).map((item) => {
        const value = item
          .substring(0, 1)
          .concat(item.substring(1).toLowerCase());

        return { key: item, value };
      }),
    ];
  }, []);
  const years = useMemo(() => {
    const defaultItem: DropdownItem = { key: "YEAR", value: "Year" };

    return [
      defaultItem,
      ...getNumbersBetween(2010, 2030).map((number) => {
        return { key: number, value: number };
      }),
    ];
  }, []);

  return { daysFrom, daysTo, months, years };
}

export function useRelationshipStatusDropdownItems() {
  const relationshipStatus = useMemo(() => {
    const defaultItem: DropdownItem = { key: "STATUS", value: "Status" };

    return [
      defaultItem,
      ...Object.values(RelationshipStatusType).map((item) => {
        const value = item
          .substring(0, 1)
          .concat(item.substring(1).replaceAll("_", " ").toLowerCase());

        return { key: item, value };
      }),
    ];
  }, []);

  return relationshipStatus;
}
