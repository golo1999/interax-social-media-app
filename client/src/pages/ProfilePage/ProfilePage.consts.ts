import {
  Education,
  EducationLevel,
  Permission,
  Place,
  RelationshipStatus,
  Work,
} from "models";

export const MOCKED_EDUCATION_HISTORY: Education[] | null = [
  {
    id: "0",
    degree: "MOCKED_DOMAIN",
    from: { day: "26", month: "9", year: "2022" },
    level: EducationLevel.COLLEGE,
    school: "MOCKED_COLLEGE",
    visibility: Permission.PUBLIC,
  },
  {
    id: "1",
    degree: "MOCKED_DOMAIN",
    from: { day: "24", month: "9", year: "2018" },
    graduated: true,
    level: EducationLevel.COLLEGE,
    school: "MOCKED_COLLEGE",
    to: { day: "21", month: "6", year: "2022" },
    visibility: Permission.FRIENDS,
  },
  {
    id: "2",
    from: { day: "15", month: "9", year: "2014" },
    graduated: true,
    level: EducationLevel.HIGH_SCHOOL,
    school: "MOCKED_HIGH_SCHOOL",
    to: { day: "31", month: "5", year: "2018" },
    visibility: Permission.ONLY_ME,
  },
];
// const MOCKED_EDUCATION_HISTORY: Education[] | null = null;

export const MOCKED_PLACES_HISTORY: Place[] | null = [
  {
    id: "0",
    city: "MOCKED_CITY",
    from: { day: "1", month: "8", year: "2022" },
    isCurrent: true,
    visibility: Permission.PUBLIC,
  },
];

export const MOCKED_RELATIONSHIP_STATUS: RelationshipStatus | null = null;

export const MOCKED_WORK_HISTORY: Work[] | null = [
  {
    id: "0",
    company: "MOCKED_COMPANY",
    from: { day: "1", month: "8", year: "2022" },
    position: "MOCKED_POSITION_1",
    to: { day: "1", month: "2", year: "2023" },
    visibility: Permission.FRIENDS,
  },
  {
    id: "1",
    company: "MOCKED_COMPANY",
    from: { day: "2", month: "2", year: "2023" },
    isCurrent: true,
    position: "MOCKED_POSITION_2",
    visibility: Permission.ONLY_ME,
  },
];

export const NAVBAR_ITEMS = ["POSTS", "ABOUT", "FRIENDS", "PHOTOS"];
