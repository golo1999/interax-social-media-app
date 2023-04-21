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
    background-color: ${(props) =>
      props.isModalVisible ? Colors.JapaneseIndigo : Colors.BlackOlive};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    padding: 0.5em;

    &:hover {
      background-color: ${(props) =>
        props.isModalVisible ? Colors.PoliceBlue : Colors.DarkLiver};
    }
  `,
  Icons: styled.div`
    align-items: center;
    display: flex;
    gap: 0.5em;
  `,
  Main: styled.div`
    background-color: ${Colors.RaisinBlack};
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100%;
    z-index: 1;
  `,
  Top: styled.div`
    align-items: center;
    display: flex;
    flex: 1;
    justify-content: space-between;
    padding: 0 0.75em;
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
