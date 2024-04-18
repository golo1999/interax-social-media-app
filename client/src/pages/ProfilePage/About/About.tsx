import { Divider } from "@mui/material";

import { useMemo, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";

import {
  AddCollege,
  AddData,
  AddHighSchool,
  AddPlace,
  AddWorkplace,
  Container,
  EducationHistory,
  PlacesHistory,
  WorkHistory,
} from "components";
import { EducationLevel, FriendshipStatus, Permission } from "enums";
import { Colors } from "environment";
import { User } from "models";
import { useAuthenticationStore } from "store";

import { List, ListItem } from "./About.style";
import { Overview } from "./Overview";

const NAVBAR_ITEMS = [
  "OVERVIEW",
  "WORK_AND_EDUCATION",
  "PLACES_LIVED",
  "CONTACT_AND_BASIC_INFO",
];

interface Props {
  user: User;
}

export function About({ user }: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const [isAddCollegeVisible, setIsAddCollegeVisible] = useState(false);
  const [isAddHighSchoolVisible, setIsAddHighSchoolVisible] = useState(false);
  const [isAddPlaceVisible, setIsAddPlaceVisible] = useState(false);
  const [isAddRelationshipStatusVisible, setIsAddRelationshipStatusVisible] =
    useState(false);
  const [isAddWorkplaceVisible, setIsAddWorkplaceVisible] = useState(false);
  const [selectedNavbarItem, setSelectedNavbarItem] = useState(NAVBAR_ITEMS[0]);

  const {
    educationHistory,
    id: userId,
    placesHistory,
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

  const filteredEducationHistory = useMemo(() => {
    switch (friendshipStatus) {
      case FriendshipStatus.FRIEND:
        return educationHistory.filter(
          ({ visibility }) =>
            visibility === Permission.FRIENDS ||
            visibility === Permission.PUBLIC
        );
      case FriendshipStatus.ME:
        return educationHistory;
      case FriendshipStatus.FRIEND_REQUEST_RECEIVED:
      case FriendshipStatus.FRIEND_REQUEST_SENT:
      case FriendshipStatus.NOT_FRIEND:
        return educationHistory.filter(
          ({ visibility }) => visibility === Permission.PUBLIC
        );
    }
  }, [educationHistory, friendshipStatus]);

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

  const userIsAuthenticatedUser = authenticatedUser?.id === userId || false;

  return (
    <Container padding="0.5em">
      <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        <h3 style={{ color: Colors.LightGray }}>About</h3>
        <List>
          {NAVBAR_ITEMS.map((item, index) => {
            const isSelected = selectedNavbarItem === item;
            const text = item
              .substring(0, 1)
              .concat(item.substring(1).replaceAll("_", " ").toLowerCase());

            function handleItemClick() {
              if (selectedNavbarItem === item) {
                return;
              }

              setSelectedNavbarItem(item);

              if (isAddCollegeVisible) {
                setIsAddCollegeVisible((prev) => !prev);
              }
              if (isAddHighSchoolVisible) {
                setIsAddHighSchoolVisible((prev) => !prev);
              }
              if (isAddPlaceVisible) {
                setIsAddPlaceVisible((prev) => !prev);
              }
              if (isAddRelationshipStatusVisible) {
                setIsAddRelationshipStatusVisible((prev) => !prev);
              }
              if (isAddWorkplaceVisible) {
                setIsAddWorkplaceVisible((prev) => !prev);
              }
            }

            return (
              <ListItem
                key={index}
                isSelected={isSelected}
                onClick={handleItemClick}
              >
                {text}
              </ListItem>
            );
          })}
        </List>
      </div>
      <Divider color="Onyx" orientation="vertical" />
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          gap: "0.5em",
        }}
      >
        {selectedNavbarItem === "OVERVIEW" ? (
          <Overview
            isAddCollegeVisible={isAddCollegeVisible}
            isAddHighSchoolVisible={isAddHighSchoolVisible}
            isAddPlaceVisible={isAddPlaceVisible}
            isAddRelationshipStatusVisible={isAddRelationshipStatusVisible}
            isAddWorkplaceVisible={isAddWorkplaceVisible}
            user={user}
            setIsAddCollegeVisible={setIsAddCollegeVisible}
            setIsAddHighSchoolVisible={setIsAddHighSchoolVisible}
            setIsAddPlaceVisible={setIsAddPlaceVisible}
            setIsAddRelationshipStatusVisible={
              setIsAddRelationshipStatusVisible
            }
            setIsAddWorkplaceVisible={setIsAddWorkplaceVisible}
          />
        ) : selectedNavbarItem === "WORK_AND_EDUCATION" ? (
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
                      onClick={() => {
                        setIsAddHighSchoolVisible((prev) => !prev);
                      }}
                    />
                  ) : (
                    <AddHighSchool
                      user={user}
                      onCancelClick={() =>
                        setIsAddHighSchoolVisible((prev) => !prev)
                      }
                      onSaveClick={() =>
                        setIsAddHighSchoolVisible((prev) => !prev)
                      }
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
        ) : selectedNavbarItem === "PLACES_LIVED" ? (
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5em",
              }}
            >
              <h4 style={{ color: Colors.LightGray }}>Places lived</h4>
              {userIsAuthenticatedUser && (
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
              )}
              <PlacesHistory
                data={filteredPlacesHistory}
                friendshipStatus={friendshipStatus}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </Container>
  );
}
