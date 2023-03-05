import { forwardRef, ReactNode } from "react";

import { Background, Container } from "./Modal.style";

interface ModalProps {
  children?: ReactNode;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ children }, containerRef) => {
    return (
      <Background>
        <Container ref={containerRef}>{children}</Container>
      </Background>
    );
  }
);
