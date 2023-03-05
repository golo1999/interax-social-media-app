import { Fragment, MutableRefObject, useEffect, useRef, useState } from "react";
import { MdMoreHoriz, MdWork } from "react-icons/md";

import { useVisibilityModalItems } from "hooks";
import { Permission, User, Work } from "models";

import { History } from "../Form.style";

interface Props {
  authenticatedUser: User | null;
  data: Work[] | null;
  user: User;
}

export function WorkHistory({ authenticatedUser, data, user }: Props) {
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
            const { visibility } = work;

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

            const period = work.to
              ? `From ${work.from.year} to ${work.to.year}`
              : `From ${work.from.year} to present`;

            const VisibilityIcon = visibilities.find(
              (v) => v.title === visibility
            )?.icon;

            return (
              <Item key={index}>
                <MdWork color="#8d8f93" size={24} />
                <div style={{ flex: 1 }}>
                  <p>{`${work.position} at ${work.company}`}</p>
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
                        backgroundColor: "#3a3b3c",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        padding: "0.25em",
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
          <MdWork color="#8d8f93" size={24} />
          <NoDataText>No workplaces to show</NoDataText>
        </Container.NoData>
      )}
    </>
  );
}
