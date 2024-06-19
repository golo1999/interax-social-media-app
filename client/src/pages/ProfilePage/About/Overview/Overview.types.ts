import { FriendshipStatus } from "enums";
import {
  CollegeEducation,
  HighSchoolEducation,
  Place,
  User,
  Work,
} from "models";

type CommonProps = {
  filteredEducationHistory: (CollegeEducation | HighSchoolEducation)[];
  filteredPlacesHistory: Place[];
  filteredWorkHistory: Work[];
  friendshipStatus: FriendshipStatus;
  user: User;
};

type ConditionalProps =
  | {
      isAddCollegeVisible?: never;
      isAddHighSchoolVisible?: never;
      isAddPlaceVisible?: never;
      isAddRelationshipStatusVisible?: never;
      isAddWorkplaceVisible?: never;
      isReadonly: true;
      closeAddCollege?: never;
      closeAddHighSchool?: never;
      closeAddPlace?: never;
      closeAddRelationshipStatus?: never;
      closeAddWorkplace?: never;
      onEditDetailsClick: () => void;
      openAddCollege?: never;
      openAddHighSchool?: never;
      openAddPlace?: never;
      openAddRelationshipStatus?: never;
      openAddWorkplace?: never;
    }
  | {
      isAddCollegeVisible: boolean;
      isAddHighSchoolVisible: boolean;
      isAddPlaceVisible: boolean;
      isAddRelationshipStatusVisible: boolean;
      isAddWorkplaceVisible: boolean;
      isReadonly?: false | never;
      closeAddCollege: () => void;
      closeAddHighSchool: () => void;
      closeAddPlace: () => void;
      closeAddRelationshipStatus: () => void;
      closeAddWorkplace: () => void;
      onEditDetailsClick?: never;
      openAddCollege: () => void;
      openAddHighSchool: () => void;
      openAddPlace: () => void;
      openAddRelationshipStatus: () => void;
      openAddWorkplace: () => void;
    };

export type OverviewProps = CommonProps & ConditionalProps;
