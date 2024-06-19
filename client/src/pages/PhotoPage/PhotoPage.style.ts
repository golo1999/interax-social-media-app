import { ArrowBack, ArrowForward } from "@mui/icons-material";

import styled from "styled-components";

interface NavigationContainerProps {
  $isVisible: boolean;
}

export const Container = {
  Image: styled.div`
    align-items: center;
    display: flex;
    flex: 1;
    justify-content: center;
  `,
  Main: styled.div`
    background-color: black;
    display: flex;
    flex: 1;
    position: relative;
  `,
  Navigation: {
    Left: styled.div<NavigationContainerProps>`
      align-items: center;
      bottom: 0;
      display: flex;
      justify-content: center;
      left: 0;
      opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
      position: absolute;
      top: 0;
      z-index: 1;
    `,
    Right: styled.div<NavigationContainerProps>`
      align-items: center;
      bottom: 0;
      display: flex;
      justify-content: center;
      opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
      position: absolute;
      right: 0;
      top: 0;
      z-index: 1;
    `,
  },
  NavigationIcon: styled.div`
    align-items: center;
    background-color: silver;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    margin: 0.75rem;
    padding: 0.5rem;
  `,
  Top: styled.div`
    display: flex;
    left: 0;
    padding: 0.8rem 1.35rem;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
  `,
  TopIcon: styled.div`
    align-items: center;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    padding: 0.25rem;
  `,
};

export const Icon = {
  Navigation: {
    Back: styled(ArrowBack)`
      color: black;
    `,
    Forward: styled(ArrowForward)`
      color: black;
    `,
  },
};
