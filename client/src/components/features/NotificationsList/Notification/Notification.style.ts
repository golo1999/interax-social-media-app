import styled from "styled-components";

import { Colors } from "environment";
import { NotificationType, Theme } from "types";

interface NotificationProps {
  isRead: boolean;
}

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

interface IconContainerProps {
  notificationType: NotificationType;
}

export const Container = {
  Content: styled.div`
    display: flex;
    flex: 1;
    gap: 20px;
    min-width: 0;
  `,
  Icon: styled.div<IconContainerProps>`
    background-color: ${({ notificationType }) =>
      notificationType === "BIRTHDAY"
        ? Colors.RoseBonbon
        : notificationType === "COMMENT"
        ? Colors.Emerald
        : Colors.DodgerBlue};
    border-radius: 50%;
    bottom: 4px;
    display: flex;
    padding: 5px;
    position: absolute;
    right: 4px;
  `,
  Main: styled.div<ThemeProps>`
    border-radius: 8px;
    display: flex;
    gap: 4px;
    /* padding: 12px 8px; */
    padding: 0 8px;
    user-select: none;

    &:hover {
      background-color: ${({ $isAuthenticated, $theme }) =>
        $isAuthenticated && $theme === "DARK"
          ? Colors.BlackOlive
          : Colors.AntiFlashWhite};
    }
  `,
  Texts: styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
  `,
  UnreadCircle: styled.div`
    align-items: center;
    display: flex;
  `,
  UserPhoto: styled.div`
    display: flex;
    padding: 8px 8px 8px 0;
    position: relative;
  `,
};

type TextProps = NotificationProps & ThemeProps;

export const Time = styled.span<TextProps>`
  color: ${({ $isAuthenticated, $theme, isRead }) =>
    isRead
      ? $isAuthenticated && $theme === "DARK"
        ? Colors.PhilippineSilver
        : Colors.GraniteGray
      : Colors.BrandeisBlue};
  font-size: 13px;
  ${({ isRead }) => !isRead && "font-weight: 600;"};
`;

export const Title = styled.span<TextProps>`
  color: ${({ $isAuthenticated, $theme, isRead }) =>
    $isAuthenticated && $theme === "DARK"
      ? isRead
        ? Colors.PhilippineSilver
        : Colors.Platinum
      : isRead
      ? Colors.GraniteGray
      : Colors.VampireBlack};
  font-size: 15px;
  overflow-wrap: break-word;
  word-break: break-word;
`;

export const UnreadCircle = styled.div`
  background-color: ${Colors.BrandeisBlue};
  border-radius: 50%;
  height: 12px;
  width: 12px;
`;
