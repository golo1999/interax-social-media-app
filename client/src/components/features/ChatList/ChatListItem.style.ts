import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "types";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

export const Container = {
  DateTime: styled.div`
    align-items: center;
    display: flex;
    flex: 1;
    gap: 0.25em;
  `,
  Details: styled.div`
    display: flex;
    flex-direction: column;
    min-width: 0;
  `,
  Message: styled.div<ThemeProps>`
    align-items: center;
    color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.PhilippineSilver
        : Colors.GraniteGray};
    font-size: 13px;
    display: flex;
    gap: 0.25em;
  `,
};

export const DisplayedName = styled.span<ThemeProps>`
  color: ${({ $isAuthenticated, $theme }) =>
    $isAuthenticated && $theme === "DARK"
      ? Colors.Platinum
      : Colors.VampireBlack};
  font-size: 15px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

type ListItemProps = {
  isModal?: boolean;
  isSelected?: boolean;
} & ThemeProps;

export const ListItem = styled.ul<ListItemProps>`
  align-items: center;
  ${({ $isAuthenticated, $theme, isModal, isSelected }) =>
    !isModal &&
    isSelected &&
    `background-color: ${
      $isAuthenticated && $theme === "DARK" ? Colors.GunMetal : Colors.AliceBlue
    };`};
  border-radius: 5px;
  display: flex;
  gap: 0.5em;
  padding: 0.5em;

  &:hover {
    ${({ $isAuthenticated, $theme, isSelected }) =>
      !isSelected &&
      `background-color: ${
        $isAuthenticated && $theme === "DARK"
          ? Colors.BlackOlive
          : Colors.AntiFlashWhite
      };`};
  }
`;

export const Message = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TimePassed = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
