import { MdMoreHoriz, MdWork } from "react-icons/md";

import { FriendshipStatus } from "enums";
import { Colors } from "environment";
import { useVisibilityModalItems } from "hooks";
import { Work } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

import { History } from "../Form.style";
import {
  Container as StyledContainer,
  Text as StyledText,
} from "../InformationContainer.style";

interface Props {
  data: Work[];
  friendshipStatus: FriendshipStatus;
  readonly?: boolean;
}

export function WorkHistory({
  data,
  friendshipStatus,
  readonly = false,
}: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();

  const { Container, Item, NoDataText } = History;

  const visibilities = useVisibilityModalItems();

  if (data.length === 0) {
    return (
      <Container.NoData>
        <MdWork color={Colors.PhilippineGray} size={24} />
        <NoDataText isAuthenticated={!!authenticatedUser} theme={theme}>
          No workplaces to show
        </NoDataText>
      </Container.NoData>
    );
  }

  return (
    <Container.Main>
      {data.map(
        ({ company, from, id, isCurrent, position, to, visibility }) => {
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
              <MdWork color={Colors.PhilippineGray} size={24} />
              <StyledContainer.Text>
                <StyledText.Normal
                  isAuthenticated={!!authenticatedUser}
                  theme={theme}
                >
                  {position} at&nbsp;
                  <StyledText.SemiBold>{company}</StyledText.SemiBold>
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
                  <StyledContainer.MoreOptionsIcon>
                    <MdMoreHoriz color={Colors.Platinum} size={24} />
                  </StyledContainer.MoreOptionsIcon>
                </StyledContainer.Visibility>
              )}
            </Item>
          );
        }
      )}
    </Container.Main>
  );
}
