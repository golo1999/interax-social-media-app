import { MdAddCircleOutline } from "react-icons/md";

import {
  AddCollege,
  AddData,
  AddHighSchool,
  AddPlace,
  AddRelationshipStatus,
  AddWorkplace,
  EducationHistory,
  PlacesHistory,
  RelationshipStatus,
  WorkHistory,
} from "components";
import { FriendshipStatus } from "enums";

import { Button } from "../../ProfilePage.style";

import { OverviewProps } from "./Overview.types";

export function Overview({
  filteredEducationHistory,
  filteredPlacesHistory,
  filteredWorkHistory,
  friendshipStatus,
  isAddCollegeVisible,
  isAddHighSchoolVisible,
  isAddPlaceVisible,
  isAddRelationshipStatusVisible,
  isAddWorkplaceVisible,
  isReadonly,
  user,
  closeAddCollege,
  closeAddHighSchool,
  closeAddPlace,
  closeAddRelationshipStatus,
  closeAddWorkplace,
  onEditDetailsClick,
  openAddCollege,
  openAddHighSchool,
  openAddPlace,
  openAddRelationshipStatus,
  openAddWorkplace,
}: OverviewProps) {
  const { relationshipStatus } = user;

  if (isReadonly) {
    return (
      <>
        <WorkHistory
          data={filteredWorkHistory}
          friendshipStatus={friendshipStatus}
          readonly
        />
        <EducationHistory
          data={filteredEducationHistory}
          friendshipStatus={friendshipStatus}
          readonly
        />
        <PlacesHistory
          data={filteredPlacesHistory}
          friendshipStatus={friendshipStatus}
          readonly
          user={user}
        />
        <RelationshipStatus
          data={relationshipStatus}
          friendshipStatus={friendshipStatus}
        />
        {friendshipStatus === FriendshipStatus.ME && (
          <Button
            backgroundColor="BlackOlive"
            color="White"
            hoverBackgroundColor="DarkLiver"
            onClick={onEditDetailsClick}
          >
            Edit details
          </Button>
        )}
      </>
    );
  }

  return (
    <>
      {friendshipStatus === FriendshipStatus.ME &&
      filteredWorkHistory.length === 0 ? (
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
      ) : (
        <WorkHistory
          data={filteredWorkHistory}
          friendshipStatus={friendshipStatus}
        />
      )}
      {friendshipStatus === FriendshipStatus.ME &&
      filteredEducationHistory.length === 0 ? (
        <>
          {!isAddCollegeVisible ? (
            <AddData
              icon={MdAddCircleOutline}
              text="Add a college"
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
          {!isAddHighSchoolVisible ? (
            <AddData
              icon={MdAddCircleOutline}
              text="Add a high school"
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
      ) : (
        <EducationHistory
          data={filteredEducationHistory}
          friendshipStatus={friendshipStatus}
        />
      )}
      {friendshipStatus === FriendshipStatus.ME &&
      filteredPlacesHistory.length === 0 ? (
        <>
          {!isAddPlaceVisible ? (
            <AddData
              icon={MdAddCircleOutline}
              text="Add a city"
              textFontWeight="500"
              onClick={openAddPlace}
            />
          ) : (
            <AddPlace
              user={user}
              onCancelClick={closeAddPlace}
              onSaveClick={closeAddPlace}
            />
          )}
        </>
      ) : (
        <PlacesHistory
          data={filteredPlacesHistory}
          friendshipStatus={friendshipStatus}
          user={user}
        />
      )}
      {friendshipStatus === FriendshipStatus.ME && !relationshipStatus ? (
        <>
          {!isAddRelationshipStatusVisible ? (
            <AddData
              icon={MdAddCircleOutline}
              text="Add a relationship status"
              textFontWeight="500"
              onClick={openAddRelationshipStatus}
            />
          ) : (
            <AddRelationshipStatus
              user={user}
              onCancelClick={closeAddRelationshipStatus}
              onSaveClick={closeAddRelationshipStatus}
            />
          )}
        </>
      ) : (
        <RelationshipStatus
          data={relationshipStatus}
          friendshipStatus={friendshipStatus}
        />
      )}
    </>
  );
}
