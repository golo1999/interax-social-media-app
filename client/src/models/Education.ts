import { EducationLevel, Permission } from "enums";

type EducationCommonTypes = {
  id: string;
  from: string;
  school: string;
  userId: string;
  visibility: Permission;
};

type EducationConditionalTypes =
  | { graduated: true; to: string }
  | { graduated: false; to?: never };

type Education = EducationCommonTypes & EducationConditionalTypes;

type CollegeEducationCommonTypes = {
  __typename?: "CollegeEducation";
  degree: string;
  level: EducationLevel.COLLEGE;
};

export type CollegeEducation = Education & CollegeEducationCommonTypes;

type HighSchoolEducationCommonTypes = {
  __typename?: "HighSchoolEducation";
  level: EducationLevel.HIGH_SCHOOL;
};

export type HighSchoolEducation = Education & HighSchoolEducationCommonTypes;
