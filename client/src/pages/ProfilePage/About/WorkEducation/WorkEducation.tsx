import { MdAddCircleOutline } from "react-icons/md";

import {
  AddCollege,
  AddData,
  AddHighSchool,
  AddWorkplace,
  EducationHistory,
  WorkHistory,
} from "components";
import { EducationLevel, FriendshipStatus } from "enums";
import { Colors } from "environment";
import { CollegeEducation, HighSchoolEducation, User, Work } from "models";
import { useAuthenticationStore } from "store";

interface Props {
  filteredEducationHistory: (CollegeEducation | HighSchoolEducation)[];
  filteredWorkHistory: Work[];
  friendshipStatus: FriendshipStatus;
  isAddCollegeVisible: boolean;
  isAddHighSchoolVisible: boolean;
  isAddWorkplaceVisible: boolean;
  user: User;
  closeAddCollege: () => void;
  closeAddHighSchool: () => void;
  closeAddWorkplace: () => void;
  openAddCollege: () => void;
  openAddHighSchool: () => void;
  openAddWorkplace: () => void;
}

export function WorkEducation({
  filteredEducationHistory,
  filteredWorkHistory,
  friendshipStatus,
  isAddCollegeVisible,
  isAddHighSchoolVisible,
  isAddWorkplaceVisible,
  user,
  closeAddCollege,
  closeAddHighSchool,
  closeAddWorkplace,
  openAddCollege,
  openAddHighSchool,
  openAddWorkplace,
}: Props) {
  const { authenticatedUser } = useAuthenticationStore();

  const userIsAuthenticatedUser = user.id === authenticatedUser?.id;

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5em",
        }}
      >
        <h4 style={{ color: Colors.LightGray }}>Work</h4>
        {userIsAuthenticatedUser && (
          <>
            {!isAddWorkplaceVisible ? (
              <AddData
                icon={MdAddCircleOutline}
                text="Add a workplace"
                textFontWeight="500"
                onClick={openAddWorkplace}
              />
            ) : (
              <AddWorkplace
                user={user}
                onCancelClick={closeAddWorkplace}
                onSaveClick={closeAddWorkplace}
              />
            )}
          </>
        )}
        <WorkHistory
          data={filteredWorkHistory}
          friendshipStatus={friendshipStatus}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5em",
        }}
      >
        <h4 style={{ color: Colors.LightGray }}>College</h4>
        {userIsAuthenticatedUser && (
          <>
            {!isAddCollegeVisible ? (
              <AddData
                icon={MdAddCircleOutline}
                text="Add college"
                textFontWeight="500"
                onClick={openAddCollege}
              />
            ) : (
              <AddCollege
                user={user}
                onCancelClick={closeAddCollege}
                onSaveClick={closeAddCollege}
              />
            )}
          </>
        )}
        <EducationHistory
          data={filteredEducationHistory}
          friendshipStatus={friendshipStatus}
          level={EducationLevel.COLLEGE}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5em",
        }}
      >
        <h4 style={{ color: Colors.LightGray }}>High school</h4>
        {userIsAuthenticatedUser && (
          <>
            {!isAddHighSchoolVisible ? (
              <AddData
                icon={MdAddCircleOutline}
                text="Add high school"
                textFontWeight="500"
                onClick={openAddHighSchool}
              />
            ) : (
              <AddHighSchool
                user={user}
                onCancelClick={closeAddHighSchool}
                onSaveClick={closeAddHighSchool}
              />
            )}
          </>
        )}
        <EducationHistory
          data={filteredEducationHistory}
          friendshipStatus={friendshipStatus}
          level={EducationLevel.HIGH_SCHOOL}
        />
      </div>
    </>
  );
}
