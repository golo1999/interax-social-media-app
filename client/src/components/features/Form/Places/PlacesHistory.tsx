import { useMutation } from "@apollo/client";

import { MdHouse, MdMoreHoriz } from "react-icons/md";

import { FriendshipStatus, Permission } from "enums";
import { Colors } from "environment";
import {
  GET_USER_BY_USERNAME,
  UpdateUserPlaceData,
  UPDATE_USER_PLACE,
} from "helpers";
import { useVisibilityModalItems } from "hooks";
import { Place, User } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

import { History } from "../Form.style";
import {
  Container as StyledContainer,
  Text as StyledText,
} from "../InformationContainer.style";

interface Props {
  data: Place[];
  friendshipStatus: FriendshipStatus;
  readonly?: boolean;
  user: User;
}

export function PlacesHistory({
  data,
  friendshipStatus,
  readonly = false,
  user: { username },
}: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const [updateUserPlace] = useMutation<UpdateUserPlaceData>(UPDATE_USER_PLACE);
  const { theme } = useSettingsStore();

  const { Container, Item, NoDataText } = History;

  const visibilities = useVisibilityModalItems();

  if (data.length === 0) {
    return (
      <Container.NoData>
        <MdHouse color={Colors.PhilippineGray} size={24} />
        <NoDataText isAuthenticated={!!authenticatedUser} theme={theme}>
          No places to show
        </NoDataText>
      </Container.NoData>
    );
  }

  return (
    <Container.Main>
      {data.map(({ city, from, id, isCurrent, to, visibility }) => {
        const parsedFrom = new Date(Number(from));
        const parsedTo = !isCurrent ? new Date(Number(to)) : null;
        const period = parsedTo
          ? `From ${parsedFrom.getUTCFullYear()} to ${parsedTo.getUTCFullYear()}`
          : `From ${parsedFrom.getUTCFullYear()} to present`;

        const VisibilityIcon = visibilities.find(
          (v) => v.title === visibility
        )?.icon;

        return (
          <Item key={id}>
            <MdHouse color={Colors.PhilippineGray} size={24} />
            <StyledContainer.Text>
              <StyledText.Normal
                isAuthenticated={!!authenticatedUser}
                theme={theme}
              >
                {parsedTo ? (
                  <>
                    Lived in&nbsp;
                    <StyledText.SemiBold>{city}</StyledText.SemiBold>
                  </>
                ) : (
                  <>
                    Lives in&nbsp;
                    <StyledText.SemiBold>{city}</StyledText.SemiBold>
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
            {friendshipStatus === FriendshipStatus.ME && !readonly && (
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
                    const isCurrent = false;
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
                          placeId: id,
                          to: parsedTo,
                          userId: "1",
                          visibility: Permission.ONLY_ME,
                        },
                      },
                      refetchQueries: [
                        {
                          query: GET_USER_BY_USERNAME,
                          variables: {
                            input: {
                              authenticatedUserId: authenticatedUser?.id,
                              username,
                            },
                          },
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
  );
}
