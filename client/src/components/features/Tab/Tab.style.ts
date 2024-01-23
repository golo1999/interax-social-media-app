import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "models";

interface MainContainerProps {
  containsDescription: boolean;
  gap: number | string;
  isSelected: boolean;
  padding: number | string;
  selectedBackgroundColor?: keyof typeof Colors;
}

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

export const Container = {
  Main: styled.div<MainContainerProps>`
    align-items: ${({ containsDescription }) =>
      containsDescription ? "flex-start" : "center"};
    border-radius: 5px;
    ${({ isSelected, selectedBackgroundColor }) =>
      isSelected &&
      selectedBackgroundColor &&
      `background-color: ${Colors[selectedBackgroundColor]};`};
    cursor: pointer;
    display: flex;
    gap: ${({ gap }) => (typeof gap === "number" ? `${gap}px` : gap)};
    padding: ${({ padding }) =>
      typeof padding === "number" ? `${padding}px` : padding};
    user-select: none;

    &:hover {
      ${({ isSelected, selectedBackgroundColor }) =>
        !isSelected &&
        selectedBackgroundColor &&
        `background-color: ${Colors[selectedBackgroundColor]};`};
    }
  `,
  Texts: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
  `,
};

export const Description = styled.span`
  color: ${Colors.PhilippineSilver};
  font-size: 12px;
  font-weight: 400;
`;

type NameProps = { textSize: number | string } & ThemeProps;

export const Name = styled.span<NameProps>`
  color: ${({ $isAuthenticated, $theme }) =>
    $isAuthenticated && $theme === "DARK"
      ? Colors.Platinum
      : Colors.VampireBlack};
  flex: 1;
  font-size: ${({ textSize }) =>
    typeof textSize === "number" ? `${textSize}px` : textSize};
  font-weight: 500;
`;
