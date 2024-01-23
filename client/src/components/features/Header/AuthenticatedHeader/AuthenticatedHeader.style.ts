import { MdNotifications } from "react-icons/md";
import { RiMessengerFill } from "react-icons/ri";
import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "models";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

type IconContainerProps = {
  isModalOpen: boolean;
} & ThemeProps;

export const Container = {
  Icon: styled.span<IconContainerProps>`
    align-items: center;
    background-color: ${({ $isAuthenticated, $theme, isModalOpen }) =>
      isModalOpen
        ? $isAuthenticated && $theme === "DARK"
          ? // isModalOpen & dark theme
            Colors.JapaneseIndigo
          : // isModalOpen & light theme
            Colors.AliceBlue
        : $isAuthenticated && $theme === "DARK"
        ? // !isModalOpen & dark theme
          Colors.BlackOlive
        : // !isModalOpen & light theme
          Colors.Platinum};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    padding: 0.5em;

    &:hover {
      background-color: ${({ $isAuthenticated, $theme, isModalOpen }) =>
        isModalOpen
          ? $isAuthenticated && $theme === "DARK"
            ? // // isModalOpen & dark theme
              Colors.PoliceBlue
            : // isModalOpen & light theme
              Colors.AzureishWhite
          : $isAuthenticated && $theme === "DARK"
          ? // !isModalOpen & dark theme
            Colors.DarkLiver
          : // !isModalOpen & light theme
            Colors.Gainsboro};
    }
  `,
  Icons: styled.div`
    align-items: center;
    display: flex;
    gap: 0.5em;
  `,
};

export const Icon = {
  Messenger: styled(RiMessengerFill)`
    border-radius: 50%;
  `,
  Notifications: styled(MdNotifications)`
    border-radius: 50%;
  `,
};
