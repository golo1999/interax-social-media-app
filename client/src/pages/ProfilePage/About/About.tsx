import { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";

import {
  AddCollege,
  AddData,
  AddHighSchool,
  AddPlace,
  AddWorkplace,
  Container,
  Divider,
  EducationHistory,
  PlacesHistory,
  WorkHistory,
} from "components";
import { Colors } from "environment";
import { EducationLevel, User } from "models";

import { List, ListItem } from "./About.style";
import { Overview } from "./Overview";

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

  const { educationHistory, id: userId, placesHistory, workHistory } = user;

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
      <Divider thickness="2px" vertical />
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
            authenticatedUser={authenticatedUser}
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
                authenticatedUser={authenticatedUser}
                data={educationHistory}
                level={EducationLevel.HIGH_SCHOOL}
                user={user}
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
                authenticatedUser={authenticatedUser}
                data={placesHistory}
                user={user}
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
