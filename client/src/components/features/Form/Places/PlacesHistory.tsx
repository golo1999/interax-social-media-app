import { useMutation } from "@apollo/client";

import { Fragment, MutableRefObject, useEffect, useRef, useState } from "react";
import { MdHouse, MdMoreHoriz } from "react-icons/md";

import { GET_USER_BY_USERNAME, UPDATE_USER_PLACE } from "helpers";
import { useVisibilityModalItems } from "hooks";
import { Permission, Place, User } from "models";

import { History } from "../Form.style";

interface UpdateUserPlaceData {
  updateUserPlace: Place | null;
}

interface Props {
  authenticatedUser: User | null;
  data: Place[] | null;
  user: User;
}

export function PlacesHistory({ authenticatedUser, data, user }: Props) {
  const [updateUserPlace] = useMutation<UpdateUserPlaceData>(UPDATE_USER_PLACE);

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
          {data.map((place, index) => {
            const { visibility } = place;

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

            const VisibilityIcon = visibilities.find(
              (v) => v.title === visibility
            )?.icon;

            return (
              <Item key={index}>
                <MdHouse color="#8d8f93" size={24} />
                <div style={{ flex: 1 }}>
                  {place.to ? (
                    <>
                      <p>{`Lived in ${place.city}`}</p>
                      <p>{`From ${place.from.year} to ${place.to.year}`}</p>
                    </>
                  ) : (
                    <>
                      <p>{`Lives in ${place.city}`}</p>
                      <p>{`From ${place.from.year} to present`}</p>
                    </>
                  )}
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
                        backgroundColor: "#3a3b3c",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        padding: "0.25em",
                      }}
                      onClick={() => {
                        const city = "UPDATED_CITY";
                        const fromDay = "25";
                        const fromMonth = "April";
                        const fromYear = "2008";
                        const isCurrent = null;
                        const toDay: string = "31";
                        const toMonth: string = "August";
                        const toYear: string = "2015";

                        updateUserPlace({
                          variables: {
                            input: {
                              city,
                              fromDay: parseInt(fromDay),
                              fromMonth:
                                new Date(
                                  `${fromMonth} ${fromDay}, ${fromYear}`
                                ).getMonth() + 1,
                              fromYear: parseInt(fromYear),
                              isCurrent,
                              placeId: place.id,
                              toDay: toDay !== "DAY" ? parseInt(toDay) : null,
                              toMonth:
                                toMonth !== "MONTH"
                                  ? new Date(
                                      `${toMonth} ${toDay}, ${toYear}`
                                    ).getMonth() + 1
                                  : null,
                              toYear:
                                toYear !== "YEAR" ? parseInt(toYear) : null,
                              userId: "1",
                              visibility: Permission.ONLY_ME,
                            },
                          },
                          refetchQueries: [
                            {
                              query: GET_USER_BY_USERNAME,
                              variables: { username: "darius.fieraru" },
                            },
                          ],
                        });
                      }}
                    >
                      <MdMoreHoriz color="#dfe1e5" size={24} />
                    </div>
                  </div>
                )}
              </Item>
            );
          })}
        </Container.Main>
      ) : (
        <Container.NoData>
          <MdHouse color="#8d8f93" size={24} />
          <NoDataText>No places to show</NoDataText>
        </Container.NoData>
      )}
    </>
  );
}
