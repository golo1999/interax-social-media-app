import { CSSProperties, ReactNode } from "react";
import styled from "styled-components";

import { Colors } from "environment";
import { Theme } from "types";
import { useAuthenticationStore, useSettingsStore } from "store";

type CommonProps = {
  children?: ReactNode;
  style?: CSSProperties;
};

type ThemeProps = { isAuthenticated: boolean; theme: Theme };

type StyleProps = { gap?: string; padding?: string; vertical?: boolean };

type Props = CommonProps & StyleProps;

type StyledContainerProps = StyleProps & ThemeProps;

const StyledContainer = styled.div<StyledContainerProps>`
  background-color: ${({ isAuthenticated, theme }) =>
    isAuthenticated && theme === "DARK" ? Colors.RaisinBlack : Colors.White};
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;
  color: ${Colors.SilverChalice};
  display: flex;
  ${({ vertical }) => vertical && "flex-direction: column;"}
  gap: ${({ gap }) => (gap ||= "0.5em;")};
  padding: ${({ padding }) => padding || "1em"};
`;

export function Container({ children, gap, padding, style, vertical }: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();

  return (
    <StyledContainer
      gap={gap}
      isAuthenticated={!!authenticatedUser}
      padding={padding}
      vertical={vertical}
      style={style}
      theme={theme}
    >
      {children}
    </StyledContainer>
  );
}
