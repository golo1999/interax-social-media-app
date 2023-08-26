import { MdNotifications } from "react-icons/md";
import { RiMessengerFill } from "react-icons/ri";
import styled from "styled-components";

import { Colors } from "environment";

interface IconContainerProps {
  isModalVisible: boolean;
}

export const Container = {
  Icon: styled.span<IconContainerProps>`
    align-items: center;
    background-color: ${({ isModalVisible }) =>
      isModalVisible ? Colors.JapaneseIndigo : Colors.BlackOlive};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    padding: 0.5em;

    &:hover {
      background-color: ${({ isModalVisible }) =>
        isModalVisible ? Colors.PoliceBlue : Colors.DarkLiver};
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
