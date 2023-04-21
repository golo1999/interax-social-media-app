import { SetStateAction } from "react";
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
import { Colors } from "environment";
import { User } from "models";

import { Button } from "../ProfilePage.style";

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

type UserProps = { authenticatedUser: User | null; user: User };

type Props = ConditionalProps & UserProps;

export function Overview({
  authenticatedUser,
  isAddCollegeVisible,
  isAddHighSchoolVisible,
  isAddPlaceVisible,
  isAddRelationshipStatusVisible,
  isAddWorkplaceVisible,
  isReadonly,
  user,
  onEditDetailsClick,
  setIsAddCollegeVisible,
  setIsAddHighSchoolVisible,
  setIsAddPlaceVisible,
  setIsAddRelationshipStatusVisible,
  setIsAddWorkplaceVisible,
}: Props) {
  const { educationHistory, placesHistory, relationshipStatus, workHistory } =
    user;

  const userIsAuthenticatedUser = authenticatedUser?.id === user.id || false;

  if (isReadonly) {
    return (
      <>
        <WorkHistory
          authenticatedUser={authenticatedUser}
          data={workHistory}
          user={user}
        />
        <EducationHistory
          authenticatedUser={authenticatedUser}
          data={educationHistory}
          user={user}
        />
        <PlacesHistory
          authenticatedUser={authenticatedUser}
          data={placesHistory}
          user={user}
        />
        <RelationshipStatus
          authenticatedUser={authenticatedUser}
          data={relationshipStatus}
          user={user}
        />
        {userIsAuthenticatedUser && (
          <Button
            backgroundColor={Colors.BlackOlive}
            color="white"
            hoverBackgroundColor={Colors.DarkLiver}
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
      {userIsAuthenticatedUser && !workHistory ? (
        <>
          {!isAddWorkplaceVisible ? (
            <AddData
              icon={MdAddCircleOutline}
              text="Add a workplace"
              textFontWeight="500"
              onClick={() => {
                setIsAddWorkplaceVisible((prev) => !prev);
              }}
            />
          ) : (
            <AddWorkplace
              user={user}
              onCancelClick={() => {
                setIsAddWorkplaceVisible((prev) => !prev);
              }}
              onSaveClick={() => {
                setIsAddWorkplaceVisible((prev) => !prev);
              }}
            />
          )}
        </>
      ) : (
        <WorkHistory
          authenticatedUser={authenticatedUser}
          data={workHistory}
          user={user}
        />
      )}
      {userIsAuthenticatedUser && !educationHistory ? (
        <>
          {!isAddCollegeVisible ? (
            <AddData
              icon={MdAddCircleOutline}
              text="Add a college"
              textFontWeight="500"
              onClick={() => {
                setIsAddCollegeVisible((prev) => !prev);
              }}
            />
          ) : (
            <AddCollege
              user={user}
              onCancelClick={() => {
                setIsAddCollegeVisible((prev) => !prev);
              }}
              onSaveClick={() => {
                setIsAddCollegeVisible((prev) => !prev);
              }}
            />
          )}
          {!isAddHighSchoolVisible ? (
            <AddData
              icon={MdAddCircleOutline}
              text="Add a high school"
              textFontWeight="500"
              onClick={() => {
                setIsAddHighSchoolVisible((prev) => !prev);
              }}
            />
          ) : (
            <AddHighSchool
              user={user}
              onCancelClick={() => setIsAddHighSchoolVisible((prev) => !prev)}
              onSaveClick={() => setIsAddHighSchoolVisible((prev) => !prev)}
            />
          )}
        </>
      ) : (
        <EducationHistory
          authenticatedUser={authenticatedUser}
          data={educationHistory}
          user={user}
        />
      )}
      {userIsAuthenticatedUser && !placesHistory ? (
        <>
          {!isAddPlaceVisible ? (
            <AddData
              icon={MdAddCircleOutline}
              text="Add a city"
              textFontWeight="500"
              onClick={() => {
                setIsAddPlaceVisible((prev) => !prev);
              }}
            />
          ) : (
            <AddPlace
              user={user}
              onCancelClick={() => {
                setIsAddPlaceVisible((prev) => !prev);
              }}
              onSaveClick={() => {
                setIsAddPlaceVisible((prev) => !prev);
              }}
            />
          )}
        </>
      ) : (
        <PlacesHistory
          authenticatedUser={authenticatedUser}
          data={placesHistory}
          user={user}
        />
      )}
      {userIsAuthenticatedUser && !relationshipStatus ? (
        <>
          {!isAddRelationshipStatusVisible ? (
            <AddData
              icon={MdAddCircleOutline}
              text="Add a relationship status"
              textFontWeight="500"
              onClick={() => {
                setIsAddRelationshipStatusVisible((prev) => !prev);
              }}
            />
          ) : (
            <AddRelationshipStatus
              user={user}
              onCancelClick={() => {
                setIsAddRelationshipStatusVisible((prev) => !prev);
              }}
              onSaveClick={() => {
                setIsAddRelationshipStatusVisible((prev) => !prev);
              }}
            />
          )}
        </>
      ) : (
        <RelationshipStatus
          authenticatedUser={authenticatedUser}
          data={relationshipStatus}
          user={user}
        />
      )}
    </>
  );
}
