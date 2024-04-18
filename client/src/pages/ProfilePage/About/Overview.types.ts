import { SetStateAction } from "react";

import { User } from "models";

type ConditionalProps =
  | {
      isAddCollegeVisible?: never;
      isAddHighSchoolVisible?: never;
      isAddPlaceVisible?: never;
      isAddRelationshipStatusVisible?: never;
      isAddWorkplaceVisible?: never;
      isReadonly: true;
      onEditDetailsClick: () => void;
      setIsAddCollegeVisible?: never;
      setIsAddHighSchoolVisible?: never;
      setIsAddPlaceVisible?: never;
      setIsAddRelationshipStatusVisible?: never;
      setIsAddWorkplaceVisible?: never;
    }
  | {
      isAddCollegeVisible: boolean;
      isAddHighSchoolVisible: boolean;
      isAddPlaceVisible: boolean;
      isAddRelationshipStatusVisible: boolean;
      isAddWorkplaceVisible: boolean;
      isReadonly?: false | never;
      onEditDetailsClick?: never;
      setIsAddCollegeVisible: (value: SetStateAction<boolean>) => void;
      setIsAddHighSchoolVisible: (value: SetStateAction<boolean>) => void;
      setIsAddPlaceVisible: (value: SetStateAction<boolean>) => void;
      setIsAddRelationshipStatusVisible: (
        value: SetStateAction<boolean>
      ) => void;
      setIsAddWorkplaceVisible: (value: SetStateAction<boolean>) => void;
    };

type UserProps = { user: User };

export type OverviewProps = ConditionalProps & UserProps;
