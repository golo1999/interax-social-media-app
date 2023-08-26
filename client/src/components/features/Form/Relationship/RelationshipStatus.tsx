import { AiFillHeart } from "react-icons/ai";
import { MdMoreHoriz } from "react-icons/md";

import { Colors } from "environment";
import { useVisibilityModalItems } from "hooks";
import { Permission, RelationshipStatus as Status, User } from "models";

import { History } from "../Form.style";

interface Props {
  authenticatedUser: User | null;
  data: Status | null;
  user: User;
}

export function RelationshipStatus({ authenticatedUser, data, user }: Props) {
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
          <div style={{ flex: 1 }}>
            <p>{text}</p>
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
        </Container.MainHorizontal>
      ) : (
        <Container.NoData>
          <AiFillHeart color={Colors.PhilippineGray} size={24} />
          <NoDataText>No relationship info to show</NoDataText>
        </Container.NoData>
      )}
    </>
  );
}
