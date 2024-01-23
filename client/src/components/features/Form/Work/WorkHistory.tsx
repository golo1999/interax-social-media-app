import { Fragment, MutableRefObject, useEffect, useRef, useState } from "react";
import { MdMoreHoriz, MdWork } from "react-icons/md";

import { Colors } from "environment";
import { useVisibilityModalItems } from "hooks";
import { Permission, User, Work } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

import { History } from "../Form.style";
import {
  Container as StyledContainer,
  Text as StyledText,
} from "../InformationContainer.style";

interface Props {
  data: Work[] | null;
  readonly?: boolean;
  user: User;
}

export function WorkHistory({ data, readonly = false, user }: Props) {
  const { authenticatedUser } = useAuthenticationStore();
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
          {data.map((work, index) => {
            const { from, isCurrent, to, visibility } = work;

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
                <MdWork color={Colors.PhilippineGray} size={24} />
                <StyledContainer.Text>
                  <StyledText.Normal
                    isAuthenticated={!!authenticatedUser}
                    theme={theme}
                  >
                    {work.position} at&nbsp;
                    <StyledText.SemiBold>{work.company}</StyledText.SemiBold>
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
                    <StyledContainer.MoreOptionsIcon>
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
          <MdWork color={Colors.PhilippineGray} size={24} />
          <NoDataText isAuthenticated={!!authenticatedUser} theme={theme}>
            No workplaces to show
          </NoDataText>
        </Container.NoData>
      )}
    </>
  );
}
