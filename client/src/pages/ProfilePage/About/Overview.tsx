import { useMemo } from "react";
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
import { FriendshipStatus, Permission } from "enums";
import { useAuthenticationStore } from "store";

import { Button } from "../ProfilePage.style";

import { OverviewProps } from "./Overview.types";

export function Overview({
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
}: OverviewProps) {
  const { authenticatedUser } = useAuthenticationStore();

  const {
    educationHistory,
    placesHistory,
    relationshipStatus,
    username,
    workHistory,
  } = user;

  const friendshipStatus =
    username === authenticatedUser?.username
      ? FriendshipStatus.ME
      : authenticatedUser?.friends?.some(
          (friend) => friend.username === username
        )
      ? FriendshipStatus.FRIEND
      : user.friendshipRequests?.some(
          (request) =>
            request.receiver === authenticatedUser?.id &&
            request.sender === user.id
        )
      ? FriendshipStatus.FRIEND_REQUEST_RECEIVED
      : user.friendshipRequests?.some(
          (request) =>
            request.receiver === user.id &&
            request.sender === authenticatedUser?.id
        )
      ? FriendshipStatus.FRIEND_REQUEST_SENT
      : FriendshipStatus.NOT_FRIEND;

  const filteredPlacesHistory = useMemo(() => {
    switch (friendshipStatus) {
      case FriendshipStatus.FRIEND:
        return placesHistory.filter(
          ({ visibility }) =>
            visibility === Permission.FRIENDS ||
            visibility === Permission.PUBLIC
        );
      case FriendshipStatus.ME:
        return placesHistory;
      case FriendshipStatus.FRIEND_REQUEST_RECEIVED:
      case FriendshipStatus.FRIEND_REQUEST_SENT:
      case FriendshipStatus.NOT_FRIEND:
        return placesHistory.filter(
          ({ visibility }) => visibility === Permission.PUBLIC
        );
    }
  }, [friendshipStatus, placesHistory]);

  const filteredWorkHistory = useMemo(() => {
    switch (friendshipStatus) {
      case FriendshipStatus.FRIEND:
        return workHistory.filter(
          ({ visibility }) =>
            visibility === Permission.FRIENDS ||
            visibility === Permission.PUBLIC
        );
      case FriendshipStatus.ME:
        return workHistory;
      case FriendshipStatus.FRIEND_REQUEST_RECEIVED:
      case FriendshipStatus.FRIEND_REQUEST_SENT:
      case FriendshipStatus.NOT_FRIEND:
        return workHistory.filter(
          ({ visibility }) => visibility === Permission.PUBLIC
        );
    }
  }, [friendshipStatus, workHistory]);

  if (isReadonly) {
    return (
      <>
        <WorkHistory
          data={filteredWorkHistory}
          friendshipStatus={friendshipStatus}
          readonly
        />
        <EducationHistory
          data={educationHistory}
          friendshipStatus={friendshipStatus}
          readonly
        />
        <PlacesHistory
          data={filteredPlacesHistory}
          friendshipStatus={friendshipStatus}
          readonly
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
      {friendshipStatus === FriendshipStatus.ME && workHistory.length === 0 ? (
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
          data={filteredWorkHistory}
          friendshipStatus={friendshipStatus}
        />
      )}
      {friendshipStatus === FriendshipStatus.ME && !educationHistory ? (
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
          data={educationHistory}
          friendshipStatus={friendshipStatus}
        />
      )}
      {friendshipStatus === FriendshipStatus.ME && !placesHistory ? (
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
          data={filteredPlacesHistory}
          friendshipStatus={friendshipStatus}
        />
      )}
      {friendshipStatus === FriendshipStatus.ME && !relationshipStatus ? (
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
          data={relationshipStatus}
          friendshipStatus={friendshipStatus}
        />
      )}
    </>
  );
}
