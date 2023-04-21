import { Fragment, MutableRefObject, useEffect, useRef, useState } from "react";
import { MdMoreHoriz, MdSchool } from "react-icons/md";

import { Colors } from "environment";
import { useVisibilityModalItems } from "hooks";
import { Education, EducationLevel, Permission, User } from "models";

import { History } from "../Form.style";

interface Props {
  authenticatedUser: User | null;
  data: Education[] | null;
  level?: EducationLevel;
  user: User;
}

export function EducationHistory({
  authenticatedUser,
  data,
  level,
  user,
}: Props) {
  // True if the data is not empty or null, but there is no visible data for the current user
  // i.e: the current user's data private or the data is visible only for friends
  const [isFilteredDataEmpty, setIsFilteredDataEmpty] = useState(false);

  const containerRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const displayedItems = containerRef.current?.childNodes.length;

    if (data && data.length > 0 && displayedItems === 0) {
      setIsFilteredDataEmpty(true);
    }
  }, [data]);

  const { Container, Item, NoDataText } = History;

  const visibilities = useVisibilityModalItems();

  const userIsAuthenticatedUser =
    authenticatedUser && authenticatedUser.id === user.id;

  return (
    <>
      {!isFilteredDataEmpty && data && data.length > 0 ? (
        <Container.Main ref={containerRef}>
          {data.map((education, index) => {
            const { from, graduated, to, visibility } = education;

            if (level && education.level !== level) {
              return <Fragment key={index} />;
            }

            if (
              visibility === Permission.FRIENDS &&
              !user.friends?.find(
                (friend) => friend.id === authenticatedUser?.id
              ) &&
              !userIsAuthenticatedUser
            ) {
              return <Fragment key={index} />;
            }

            if (visibility === Permission.ONLY_ME && !userIsAuthenticatedUser) {
              return <Fragment key={index} />;
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
              <Item key={index}>
                <MdSchool color={Colors.PhilippineGray} size={24} />
                <div style={{ flex: 1 }}>
                  {education.level === EducationLevel.COLLEGE ? (
                    <p>
                      {education.graduated
                        ? `Studied ${education.degree} at ${education.school}`
                        : `Studies ${education.degree} at ${education.school}`}
                    </p>
                  ) : (
                    <p>
                      {education.graduated
                        ? `Went to ${education.school}`
                        : `At ${education.school}`}
                    </p>
                  )}
                  <p>{period}</p>
                </div>
                {userIsAuthenticatedUser && (
                  <div
                    style={{
                      alignItems: "center",
                      display: "flex",
                      gap: "1em",
                    }}
                  >
                    {VisibilityIcon && <VisibilityIcon size={18} />}
                    <div
                      style={{
                        alignItems: "center",
                        backgroundColor: Colors.BlackOlive,
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        padding: "0.25em",
                      }}
                    >
                      <MdMoreHoriz color={Colors.Platinum} size={24} />
                    </div>
                  </div>
                )}
              </Item>
            );
          })}
        </Container.Main>
      ) : (
        <Container.NoData>
          <MdSchool color={Colors.PhilippineGray} size={24} />
          <NoDataText>No schools to show</NoDataText>
        </Container.NoData>
      )}
    </>
  );
}
