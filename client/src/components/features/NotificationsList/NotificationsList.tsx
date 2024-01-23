import {
  Fragment,
  MutableRefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { MdMoreHoriz } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { Colors } from "environment";
import { Notification as NotificationModel } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

import { Notification } from "./Notification";
import { Container, Header, Option, SeeAll } from "./NotificationsList.style";
import { Popup } from "./Popup";

interface Props {
  isModal?: boolean;
}

export function NotificationsList({ isModal }: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const navigate = useNavigate();
  const notificationsListRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { theme, closeNotificationsList } = useSettingsStore();
  const [content, setContent] = useState<"ALL" | "UNREAD">("ALL");
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  function handleMoreOptionsIconClick() {
    setIsPopupVisible((value) => !value);
  }

  const handleSeeAllClick = useCallback(() => {
    closeNotificationsList();
    navigate("/notifications");
  }, [closeNotificationsList, navigate]);

  const themeProps = { $isAuthenticated: !!authenticatedUser, $theme: theme };

  const notifications: NotificationModel[] = useMemo(
    () => [
      {
        dateTime: "1695674902000",
        eventProducerId: "0",
        isRead: false,
        type: "POST_ADDED",
      },
      {
        dateTime: "1695551302000",
        eventProducerId: "0",
        isRead: true,
        type: "COMMENT",
      },
      {
        dateTime: "1694799737000",
        eventProducerId: "0",
        isRead: false,
        type: "POST_REACTED",
      },
      {
        dateTime: "1693783669000",
        eventProducerId: "0",
        isRead: true,
        type: "BIRTHDAY",
      },
      {
        dateTime: "1695835104000",
        eventProducerId: "0",
        isRead: false,
        type: "GROUP/WELCOME",
      },
      {
        dateTime: "1695881483000",
        eventProducerId: "3",
        isRead: false,
        type: "GROUP/POST_ADDED",
      },
      {
        dateTime: "1695881483000",
        eventProducerId: "3",
        isRead: false,
        type: "GROUP/POST_ADDED",
      },
      {
        dateTime: "1695881483000",
        eventProducerId: "3",
        isRead: false,
        type: "GROUP/POST_ADDED",
      },
      {
        dateTime: "1695881483000",
        eventProducerId: "3",
        isRead: false,
        type: "GROUP/POST_ADDED",
      },
      {
        dateTime: "1695881483000",
        eventProducerId: "3",
        isRead: false,
        type: "GROUP/POST_ADDED",
      },
      {
        dateTime: "1695881483000",
        eventProducerId: "3",
        isRead: false,
        type: "GROUP/POST_ADDED",
      },
      {
        dateTime: "1695881483000",
        eventProducerId: "3",
        isRead: false,
        type: "GROUP/POST_ADDED",
      },
      {
        dateTime: "1695881483000",
        eventProducerId: "3",
        isRead: false,
        type: "GROUP/POST_ADDED",
      },
      {
        dateTime: "1695881483000",
        eventProducerId: "3",
        isRead: false,
        type: "GROUP/POST_ADDED",
      },
    ],
    []
  );

  const renderedNotifications = useMemo(
    () =>
      notifications
        .sort(
          (n1, n2) =>
            +new Date(Number(n2.dateTime) - +new Date(Number(n1.dateTime)))
        )
        .map((notification, index) => {
          if (content === "UNREAD" && notification.isRead) {
            return <Fragment key={index} />;
          }

          return (
            <Notification
              key={index}
              notification={notification}
              onClick={() => {
                // TODO
              }}
            />
          );
        }),
    [content, notifications]
  );

  const moreOptionsIconColor =
    !!authenticatedUser && theme === "DARK"
      ? Colors.PhilippineSilver
      : Colors.GraniteGray;

  return (
    <Container.Main.Outer
      {...themeProps}
      isModal={isModal}
      ref={notificationsListRef}
    >
      <Container.Main.Inner {...themeProps} isModal={isModal}>
        <Header.Element>
          <Header.Title {...themeProps}>Notifications</Header.Title>
          <Header.IconsContainer>
            <Container.Icon
              {...themeProps}
              onClick={handleMoreOptionsIconClick}
            >
              <MdMoreHoriz color={moreOptionsIconColor} size="20px" />
            </Container.Icon>
          </Header.IconsContainer>
          {/* {isPopupVisible && <Popup isModal={isModal} />} */}
        </Header.Element>
        <Container.Options>
          <Option
            {...themeProps}
            isSelected={content === "ALL"}
            onClick={() => {
              if (content !== "ALL") {
                setContent("ALL");
              }
            }}
          >
            All
          </Option>
          <Option
            {...themeProps}
            isSelected={content === "UNREAD"}
            onClick={() => {
              if (content !== "UNREAD") {
                setContent("UNREAD");
              }
            }}
          >
            Unread
          </Option>
        </Container.Options>
        <Container.Content>
          {isModal && (
            <Container.SeeAll>
              <SeeAll {...themeProps} onClick={handleSeeAllClick}>
                See all
              </SeeAll>
            </Container.SeeAll>
          )}
          <ul>{renderedNotifications}</ul>
        </Container.Content>
      </Container.Main.Inner>
      {isPopupVisible && <Popup isModal={isModal} />}
    </Container.Main.Outer>
  );
}
