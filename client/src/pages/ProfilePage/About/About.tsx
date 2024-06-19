import { Divider } from "@mui/material";

import { useCallback, useState } from "react";

import { Container } from "components";
import { FriendshipStatus } from "enums";
import { Colors } from "environment";
import {
  CollegeEducation,
  HighSchoolEducation,
  Place,
  User,
  Work,
} from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

import {
  Container as StyledContainer,
  List,
  ListItem,
  Title,
} from "./About.style";
import { Overview } from "./Overview";
import { PlacesLived } from "./PlacesLived";
import { WorkEducation } from "./WorkEducation";

const NAVBAR_ITEMS = [
  "OVERVIEW",
  "WORK_AND_EDUCATION",
  "PLACES_LIVED",
  "CONTACT_AND_BASIC_INFO",
];

interface Props {
  filteredEducationHistory: (CollegeEducation | HighSchoolEducation)[];
  filteredPlacesHistory: Place[];
  filteredWorkHistory: Work[];
  friendshipStatus: FriendshipStatus;
  user: User;
}

export function About({
  filteredEducationHistory,
  filteredPlacesHistory,
  filteredWorkHistory,
  friendshipStatus,
  user,
}: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();
  const [isAddCollegeVisible, setIsAddCollegeVisible] = useState(false);
  const [isAddHighSchoolVisible, setIsAddHighSchoolVisible] = useState(false);
  const [isAddPlaceVisible, setIsAddPlaceVisible] = useState(false);
  const [isAddRelationshipStatusVisible, setIsAddRelationshipStatusVisible] =
    useState(false);
  const [isAddWorkplaceVisible, setIsAddWorkplaceVisible] = useState(false);
  const [selectedNavbarItem, setSelectedNavbarItem] = useState(NAVBAR_ITEMS[0]);

  const closeAddCollege = useCallback(() => setIsAddCollegeVisible(false), []);
  const closeAddHighSchool = useCallback(
    () => setIsAddHighSchoolVisible(false),
    []
  );
  const closeAddPlace = useCallback(() => setIsAddPlaceVisible(false), []);
  const closeAddRelationshipStatus = useCallback(
    () => setIsAddRelationshipStatusVisible(false),
    []
  );
  const closeAddWorkplace = useCallback(
    () => setIsAddWorkplaceVisible(false),
    []
  );
  const openAddCollege = useCallback(() => setIsAddCollegeVisible(true), []);
  const openAddHighSchool = useCallback(
    () => setIsAddHighSchoolVisible(true),
    []
  );
  const openAddPlace = useCallback(() => setIsAddPlaceVisible(true), []);
  const openAddRelationshipStatus = useCallback(
    () => setIsAddRelationshipStatusVisible(true),
    []
  );
  const openAddWorkplace = useCallback(
    () => setIsAddWorkplaceVisible(true),
    []
  );

  const handleTitleClick = useCallback(() => {
    if (window.scrollY > 0) {
      window.scrollTo({ behavior: "smooth", top: 0 });
    }
  }, []);

  const dividerColor: keyof typeof Colors =
    !!authenticatedUser && theme === "DARK" ? "Arsenic" : "LightGray";

  return (
    <Container padding="0.5em">
      <StyledContainer.Start>
        <Title
          $isAuthenticated={!!authenticatedUser}
          $theme={theme}
          onClick={handleTitleClick}
        >
          About
        </Title>
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
              closeAddCollege();
              closeAddHighSchool();
              closeAddPlace();
              closeAddRelationshipStatus();
              closeAddWorkplace();
            }

            return (
              <ListItem
                $isAuthenticated={!!authenticatedUser}
                $theme={theme}
                isSelected={isSelected}
                key={index}
                onClick={handleItemClick}
              >
                {text}
              </ListItem>
            );
          })}
        </List>
      </StyledContainer.Start>
      <Divider
        flexItem
        orientation="vertical"
        sx={{ borderColor: Colors[dividerColor] }}
      />
      <StyledContainer.End>
        {(() => {
          switch (selectedNavbarItem) {
            case "CONTACT_AND_BASIC_INFO":
              return <></>;
            case "OVERVIEW":
              return (
                <Overview
                  filteredEducationHistory={filteredEducationHistory}
                  filteredPlacesHistory={filteredPlacesHistory}
                  filteredWorkHistory={filteredWorkHistory}
                  friendshipStatus={friendshipStatus}
                  isAddCollegeVisible={isAddCollegeVisible}
                  isAddHighSchoolVisible={isAddHighSchoolVisible}
                  isAddPlaceVisible={isAddPlaceVisible}
                  isAddRelationshipStatusVisible={
                    isAddRelationshipStatusVisible
                  }
                  isAddWorkplaceVisible={isAddWorkplaceVisible}
                  user={user}
                  closeAddCollege={closeAddCollege}
                  closeAddHighSchool={closeAddHighSchool}
                  closeAddPlace={closeAddPlace}
                  closeAddRelationshipStatus={closeAddRelationshipStatus}
                  closeAddWorkplace={closeAddWorkplace}
                  openAddCollege={openAddCollege}
                  openAddHighSchool={openAddHighSchool}
                  openAddPlace={openAddPlace}
                  openAddRelationshipStatus={openAddRelationshipStatus}
                  openAddWorkplace={openAddWorkplace}
                />
              );
            case "PLACES_LIVED":
              return (
                <PlacesLived
                  filteredPlacesHistory={filteredPlacesHistory}
                  friendshipStatus={friendshipStatus}
                  isAddPlaceVisible={isAddPlaceVisible}
                  user={user}
                  closeAddPlace={closeAddPlace}
                  openAddPlace={openAddPlace}
                />
              );
            case "WORK_AND_EDUCATION":
              return (
                <WorkEducation
                  filteredEducationHistory={filteredEducationHistory}
                  filteredWorkHistory={filteredWorkHistory}
                  friendshipStatus={friendshipStatus}
                  isAddCollegeVisible={isAddCollegeVisible}
                  isAddHighSchoolVisible={isAddHighSchoolVisible}
                  isAddWorkplaceVisible={isAddWorkplaceVisible}
                  user={user}
                  closeAddCollege={closeAddCollege}
                  closeAddHighSchool={closeAddHighSchool}
                  closeAddWorkplace={closeAddWorkplace}
                  openAddCollege={openAddCollege}
                  openAddHighSchool={openAddHighSchool}
                  openAddWorkplace={openAddWorkplace}
                />
              );
          }
        })()}
      </StyledContainer.End>
    </Container>
  );
}
