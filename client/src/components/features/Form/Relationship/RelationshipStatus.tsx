import { AiFillHeart } from "react-icons/ai";
import { MdMoreHoriz } from "react-icons/md";

import { FriendshipStatus } from "enums";
import { Colors } from "environment";
import { useVisibilityModalItems } from "hooks";
import { RelationshipStatus as Status } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

import { History } from "../Form.style";
import {
  Container as StyledContainer,
  Text as StyledText,
} from "../InformationContainer.style";

interface Props {
  data: Status | null;
  friendshipStatus: FriendshipStatus;
  readonly?: boolean;
}

export function RelationshipStatus({
  data,
  friendshipStatus,
  readonly = false,
}: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();

  const { Container, NoDataText } = History;

  const visibilities = useVisibilityModalItems();

  const VisibilityIcon = visibilities.find(
    (v) => v.title === data?.visibility
  )?.icon;

  if (!data) {
    return (
      <Container.NoData>
        <AiFillHeart color={Colors.PhilippineGray} size={24} />
        <NoDataText isAuthenticated={!!authenticatedUser} theme={theme}>
          No relationship info to show
        </NoDataText>
      </Container.NoData>
    );
  }

  const { status } = data;

  const formattedText = status
    .substring(0, 1)
    .concat(status.substring(1).replaceAll("_", " ").toLowerCase());

  return (
    <Container.MainHorizontal>
      <AiFillHeart color={Colors.PhilippineGray} size={24} />
      <StyledContainer.Text>
        <StyledText.Normal isAuthenticated={!!authenticatedUser} theme={theme}>
          {formattedText}
        </StyledText.Normal>
      </StyledContainer.Text>
      {friendshipStatus === FriendshipStatus.ME && !readonly && (
        <StyledContainer.Visibility>
          {VisibilityIcon && <VisibilityIcon size={18} />}
          <StyledContainer.MoreOptionsIcon>
            <MdMoreHoriz color={Colors.Platinum} size={24} />
          </StyledContainer.MoreOptionsIcon>
        </StyledContainer.Visibility>
      )}
    </Container.MainHorizontal>
  );
}
