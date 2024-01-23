import { useMutation } from "@apollo/client";

import { Fragment, MutableRefObject, useEffect, useRef, useState } from "react";
import { MdHouse, MdMoreHoriz } from "react-icons/md";

import { Colors } from "environment";
import {
  GET_USER_BY_USERNAME,
  UpdateUserPlaceData,
  UPDATE_USER_PLACE,
} from "helpers";
import { useVisibilityModalItems } from "hooks";
import { Permission, Place, User } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

import { History } from "../Form.style";
import {
  Container as StyledContainer,
  Text as StyledText,
} from "../InformationContainer.style";

interface Props {
  data: Place[] | null;
  readonly?: boolean;
  user: User;
}

export function PlacesHistory({ data, readonly = false, user }: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const [updateUserPlace] = useMutation<UpdateUserPlaceData>(UPDATE_USER_PLACE);
  const { theme } = useSettingsStore();
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
            const { from, isCurrent, to, visibility } = place;

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
            const parsedTo = !isCurrent ? new Date(Number(to)) : null;
            const period = parsedTo
              ? `From ${parsedFrom.getUTCFullYear()} to ${parsedTo.getUTCFullYear()}`
              : `From ${parsedFrom.getUTCFullYear()} to present`;

            const VisibilityIcon = visibilities.find(
              (v) => v.title === visibility
            )?.icon;

            return (
              <Item key={index}>
                <MdHouse color={Colors.PhilippineGray} size={24} />
                <StyledContainer.Text>
                  <StyledText.Normal
                    isAuthenticated={!!authenticatedUser}
                    theme={theme}
                  >
                    {parsedTo ? (
                      <>
                        Lived in&nbsp;
                        <StyledText.SemiBold>{place.city}</StyledText.SemiBold>
                      </>
                    ) : (
                      <>
                        Lives in&nbsp;
                        <StyledText.SemiBold>{place.city}</StyledText.SemiBold>
                      </>
                    )}
                  </StyledText.Normal>
                  <StyledText.Period
                    isAuthenticated={!!authenticatedUser}
                    theme={theme}
                  >
                    {period}
                  </StyledText.Period>
                </StyledContainer.Text>
                {userIsAuthenticatedUser && !readonly && (
                  <StyledContainer.Visibility>
                    {VisibilityIcon && <VisibilityIcon size={18} />}
                    <StyledContainer.MoreOptionsIcon
                      onClick={() => {
                        const city = "UPDATED_CITY";
                        const from = {
                          day: "25",
                          month: "April",
                          year: "2008",
                        };
                        const isCurrent = null;
                        const to = { day: "31", month: "August", year: "2015" };

                        const fromMonthAsNumber =
                          new Date(
                            `${from.month} ${from.day}, ${from.year}`
                          ).getMonth() + 1;
                        const toMonthAsNumber = to
                          ? new Date(
                              `${to.month} ${to.day}, ${to.year}`
                            ).getMonth() + 1
                          : null;
                        const parsedFrom = new Date(
                          new Date(
                            parseInt(from.year),
                            fromMonthAsNumber,
                            parseInt(from.day)
                          ).setUTCHours(0, 0, 0, 0)
                        )
                          .getTime()
                          .toString();
                        const parsedTo = toMonthAsNumber
                          ? new Date(
                              new Date(
                                parseInt(to.year),
                                toMonthAsNumber,
                                parseInt(to.day)
                              ).setUTCHours(0, 0, 0, 0)
                            )
                              .getTime()
                              .toString()
                          : null;

                        updateUserPlace({
                          variables: {
                            input: {
                              city,
                              from: parsedFrom,
                              isCurrent,
                              placeId: place.id,
                              to: parsedTo,
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
                      <MdMoreHoriz color={Colors.Platinum} size={24} />
                    </StyledContainer.MoreOptionsIcon>
                  </StyledContainer.Visibility>
                )}
              </Item>
            );
          })}
        </Container.Main>
      ) : (
        <Container.NoData>
          <MdHouse color={Colors.PhilippineGray} size={24} />
          <NoDataText isAuthenticated={!!authenticatedUser} theme={theme}>
            No places to show
          </NoDataText>
        </Container.NoData>
      )}
    </>
  );
}
