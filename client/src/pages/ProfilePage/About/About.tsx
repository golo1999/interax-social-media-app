import { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";

import {
  AddCollege,
  AddData,
  AddHighSchool,
  AddPlace,
  AddRelationshipStatus,
  AddWorkplace,
  Container,
  Divider,
  EducationHistory,
  PlacesHistory,
  RelationshipStatus,
  WorkHistory,
} from "components";
import { EducationLevel, User } from "models";

import { List, ListItem } from "./About.style";

const NAVBAR_ITEMS = [
  "OVERVIEW",
  "WORK_AND_EDUCATION",
  "PLACES_LIVED",
  "CONTACT_AND_BASIC_INFO",
];

interface Props {
  authenticatedUser: User | null;
  user: User;
}

export function About({ authenticatedUser, user }: Props) {
  const [isAddCollegeVisible, setIsAddCollegeVisible] = useState(false);
  const [isAddHighSchoolVisible, setIsAddHighSchoolVisible] = useState(false);
  const [isAddPlaceVisible, setIsAddPlaceVisible] = useState(false);
  const [isAddRelationshipStatusVisible, setIsAddRelationshipStatusVisible] =
    useState(false);
  const [isAddWorkplaceVisible, setIsAddWorkplaceVisible] = useState(false);
  const [selectedNavbarItem, setSelectedNavbarItem] = useState(NAVBAR_ITEMS[0]);

  const { educationHistory, placesHistory, relationshipStatus, workHistory } =
    user;

  const userIsAuthenticatedUser =
    authenticatedUser && authenticatedUser.id === user.id;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        margin: "1em",
      }}
    >
      <Container padding="0.5em">
        <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
          <h3 style={{ color: "#cfd1d5" }}>About</h3>
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
        <Divider vertical />
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            gap: "0.5em",
          }}
        >
          {selectedNavbarItem === "OVERVIEW" ? (
            <>
              {userIsAuthenticatedUser && !workHistory ? (
                <>
                  {!isAddWorkplaceVisible ? (
                    <AddData
                      icon={MdAddCircleOutline}
                      text="Add a workplace"
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
          ) : selectedNavbarItem === "WORK_AND_EDUCATION" ? (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5em",
                }}
              >
                <h4 style={{ color: "#cfd1d5" }}>Work</h4>
                {userIsAuthenticatedUser && (
                  <>
                    {!isAddWorkplaceVisible ? (
                      <AddData
                        icon={MdAddCircleOutline}
                        text="Add a workplace"
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
                  authenticatedUser={authenticatedUser}
                  data={workHistory}
                  user={user}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5em",
                }}
              >
                <h4 style={{ color: "#cfd1d5" }}>College</h4>
                {userIsAuthenticatedUser && (
                  <>
                    {!isAddCollegeVisible ? (
                      <AddData
                        icon={MdAddCircleOutline}
                        text="Add college"
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
                  authenticatedUser={authenticatedUser}
                  data={educationHistory}
                  level={EducationLevel.COLLEGE}
                  user={user}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5em",
                }}
              >
                <h4 style={{ color: "#cfd1d5" }}>High school</h4>
                {userIsAuthenticatedUser && (
                  <>
                    {!isAddHighSchoolVisible ? (
                      <AddData
                        icon={MdAddCircleOutline}
                        text="Add high school"
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
                  authenticatedUser={authenticatedUser}
                  data={educationHistory}
                  level={EducationLevel.HIGH_SCHOOL}
                  user={user}
                />
              </div>
            </>
          ) : selectedNavbarItem === "PLACES_LIVED" ? (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5em",
                }}
              >
                <h4 style={{ color: "#cfd1d5" }}>Places lived</h4>
                {userIsAuthenticatedUser && (
                  <>
                    {!isAddPlaceVisible ? (
                      <AddData
                        icon={MdAddCircleOutline}
                        text="Add a city"
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
                  authenticatedUser={authenticatedUser}
                  data={placesHistory}
                  user={user}
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </Container>
    </div>
  );
}
