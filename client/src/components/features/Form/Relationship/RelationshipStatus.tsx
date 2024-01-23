import { AiFillHeart } from "react-icons/ai";
import { MdMoreHoriz } from "react-icons/md";

import { Colors } from "environment";
import { useVisibilityModalItems } from "hooks";
import { Permission, RelationshipStatus as Status, User } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

import { History } from "../Form.style";
import {
  Container as StyledContainer,
  Text as StyledText,
} from "../InformationContainer.style";

interface Props {
  data: Status | null;
  readonly?: boolean;
  user: User;
}

export function RelationshipStatus({ data, readonly = false, user }: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();

  const { Container, NoDataText } = History;

  const userIsAuthenticatedUser =
    authenticatedUser && authenticatedUser.id === user.id;
  const isVisibleToUser =
    (data?.visibility === Permission.FRIENDS &&
      (user.friends?.find((friend) => friend.id === authenticatedUser?.id) ||
        userIsAuthenticatedUser)) ||
    (data?.visibility === Permission.ONLY_ME && userIsAuthenticatedUser) ||
    data?.visibility === Permission.PUBLIC;
  const text = data
    ? data.status
        .substring(0, 1)
        .concat(data.status.substring(1).replaceAll("_", " ").toLowerCase())
    : "No relationship info to show";

  const visibilities = useVisibilityModalItems();

  const VisibilityIcon = visibilities.find(
    (v) => v.title === data?.visibility
  )?.icon;

  return (
    <>
      {data && data.status && isVisibleToUser ? (
        <Container.MainHorizontal>
          <AiFillHeart color={Colors.PhilippineGray} size={24} />
          <StyledContainer.Text>
            <StyledText.Normal
              isAuthenticated={!!authenticatedUser}
              theme={theme}
            >
              {text}
            </StyledText.Normal>
          </StyledContainer.Text>
          {userIsAuthenticatedUser && !readonly && (
            <StyledContainer.Visibility>
              {VisibilityIcon && <VisibilityIcon size={18} />}
              <StyledContainer.MoreOptionsIcon>
                <MdMoreHoriz color={Colors.Platinum} size={24} />
              </StyledContainer.MoreOptionsIcon>
            </StyledContainer.Visibility>
          )}
        </Container.MainHorizontal>
      ) : (
        <Container.NoData>
          <AiFillHeart color={Colors.PhilippineGray} size={24} />
          <NoDataText isAuthenticated={!!authenticatedUser} theme={theme}>
            No relationship info to show
          </NoDataText>
        </Container.NoData>
      )}
    </>
  );
}
