import { EducationLevel, Permission } from "enums";
import {
  CollegeEducation,
  HighSchoolEducation,
  Place,
  RelationshipStatus,
  Work,
} from "models";

export const MOCKED_EDUCATION_HISTORY:
  | (CollegeEducation | HighSchoolEducation)[]
  | null = [
  {
    id: "0",
    degree: "MOCKED_DOMAIN",
    from: "1666656000000",
    graduated: false,
    level: EducationLevel.COLLEGE,
    school: "MOCKED_COLLEGE",
    userId: "MOCKED_USER_ID",
    visibility: Permission.PUBLIC,
  },
  {
    id: "1",
    degree: "MOCKED_DOMAIN",
    from: "1540252800000",
    graduated: true,
    level: EducationLevel.COLLEGE,
    school: "MOCKED_COLLEGE",
    to: "1658275200000",
    userId: "MOCKED_USER_ID",
    visibility: Permission.FRIENDS,
  },
  {
    id: "2",
    from: "1413244800000",
    graduated: true,
    level: EducationLevel.HIGH_SCHOOL,
    school: "MOCKED_HIGH_SCHOOL",
    to: "1530316800000",
    userId: "MOCKED_USER_ID",
    visibility: Permission.ONLY_ME,
  },
];

export const MOCKED_PLACES_HISTORY: Place[] = [
  {
    id: "0",
    city: "MOCKED_CITY",
    from: "1659312000000",
    isCurrent: true,
    visibility: Permission.PUBLIC,
  },
];

export const MOCKED_RELATIONSHIP_STATUS: RelationshipStatus | null = null;

export const MOCKED_WORK_HISTORY: Work[] = [
  {
    id: "0",
    company: "MOCKED_COMPANY",
    from: "1659312000000",
    isCurrent: false,
    position: "MOCKED_POSITION_1",
    to: "1675209600000",
    visibility: Permission.FRIENDS,
  },
  {
    id: "1",
    company: "MOCKED_COMPANY",
    from: "1675296000000",
    isCurrent: true,
    position: "MOCKED_POSITION_2",
    visibility: Permission.ONLY_ME,
  },
];

export const NAVBAR_ITEMS = ["POSTS", "ABOUT", "FRIENDS", "PHOTOS"];
