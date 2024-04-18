import { Permission } from "enums";

type PlaceCommonTypes = {
  __typename?: "Place";
  id: string;
  city: string;
  from: string;
  visibility: Permission;
};

type PlaceConditionalTypes =
  | { isCurrent: true; to?: never }
  | { isCurrent: false; to: string };

export type Place = PlaceCommonTypes & PlaceConditionalTypes;
