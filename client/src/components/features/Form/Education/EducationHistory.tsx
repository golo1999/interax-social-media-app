import { Fragment } from "react";
import { MdMoreHoriz, MdSchool } from "react-icons/md";

import { EducationLevel, FriendshipStatus } from "enums";
import { Colors } from "environment";
import { useVisibilityModalItems } from "hooks";
import { CollegeEducation, HighSchoolEducation } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

import { History } from "../Form.style";
import {
  Container as StyledContainer,
  Text as StyledText,
} from "../InformationContainer.style";

interface Props {
  data: (CollegeEducation | HighSchoolEducation)[];
  friendshipStatus: FriendshipStatus;
  level?: EducationLevel;
  readonly?: boolean;
}

export function EducationHistory({
  data,
  friendshipStatus,
  level: filteredLevel,
  readonly = false,
}: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();

  const { Container, Item, NoDataText } = History;

  const visibilities = useVisibilityModalItems();

  if (data.length === 0) {
    return (
      <Container.NoData>
        <MdSchool color={Colors.PhilippineGray} size={24} />
        <NoDataText isAuthenticated={!!authenticatedUser} theme={theme}>
          No schools to show
        </NoDataText>
      </Container.NoData>
    );
  }

  return (
    <Container.Main>
      {data.map((education) => {
        const { from, graduated, id, level, school, to, visibility } =
          education;

        if (filteredLevel && level !== filteredLevel) {
          return <Fragment key={id} />;
        }

        const parsedFrom = new Date(Number(from));
        const parsedTo = graduated ? new Date(Number(to)) : null;
        const period = parsedTo
          ? `From ${parsedFrom.getUTCFullYear()} to ${parsedTo.getUTCFullYear()}`
          : `From ${parsedFrom.getUTCFullYear()} to present`;

        const VisibilityIcon = visibilities.find(
          (v) => v.title === visibility
        )?.icon;

        return (
          <Item key={id}>
            <MdSchool color={Colors.PhilippineGray} size={24} />
            <StyledContainer.Text>
              {level === EducationLevel.COLLEGE ? (
                <StyledText.Normal
                  isAuthenticated={!!authenticatedUser}
                  theme={theme}
                >
                  {graduated ? (
                    <>
                      Studied {education.degree} at&nbsp;
                      <StyledText.SemiBold>{school}</StyledText.SemiBold>
                    </>
                  ) : (
                    <>
                      Studies {education.degree} at&nbsp;
                      <StyledText.SemiBold>{school}</StyledText.SemiBold>
                    </>
                  )}
                </StyledText.Normal>
              ) : (
                <StyledText.Normal
                  isAuthenticated={!!authenticatedUser}
                  theme={theme}
                >
                  {graduated ? (
                    <>
                      Went to&nbsp;
                      <StyledText.SemiBold>{school}</StyledText.SemiBold>
                    </>
                  ) : (
                    <>
                      At&nbsp;
                      <StyledText.SemiBold>{school}</StyledText.SemiBold>
                    </>
                  )}
                </StyledText.Normal>
              )}
              <StyledText.Period
                isAuthenticated={!!authenticatedUser}
                theme={theme}
              >
                {period}
              </StyledText.Period>
            </StyledContainer.Text>
            {friendshipStatus === FriendshipStatus.ME && !readonly && (
              <StyledContainer.Visibility>
                {VisibilityIcon && <VisibilityIcon size={18} />}
                <StyledContainer.MoreOptionsIcon>
                  <MdMoreHoriz color={Colors.Platinum} size={24} />
                </StyledContainer.MoreOptionsIcon>
              </StyledContainer.Visibility>
            )}
          </Item>
        );
      })}
    </Container.Main>
  );
}
