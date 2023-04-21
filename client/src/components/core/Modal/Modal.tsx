import { forwardRef } from "react";
import { MdClose, MdKeyboardBackspace } from "react-icons/md";

import { Colors } from "environment";

import {
  Background,
  Body as StyledBody,
  Container,
  Footer as StyledFooter,
  Header as StyledHeader,
  IconContainer,
  Title,
} from "./Modal.style";
import { BodyProps, FooterProps, HeaderProps, ModalProps } from "./Modal.types";

const BaseModal = forwardRef<HTMLDivElement, ModalProps>(
  ({ children, minHeight, width }, containerRef) => {
    return (
      <Background>
        <Container ref={containerRef} minHeight={minHeight} width={width}>
          {children}
        </Container>
      </Background>
    );
  }
);

function Body({
  alignItems,
  children,
  color,
  direction,
  gap,
  justifyContent,
  padding,
}: BodyProps) {
  return (
    <StyledBody
      alignItems={alignItems}
      color={color}
      direction={direction}
      gap={gap}
      justifyContent={justifyContent}
      padding={padding}
    >
      {children}
    </StyledBody>
  );
}

function Footer({
  alignItems,
  children,
  color,
  direction,
  gap,
  justifyContent,
  padding,
}: FooterProps) {
  return (
    <StyledFooter
      alignItems={alignItems}
      color={color}
      direction={direction}
      gap={gap}
      justifyContent={justifyContent}
      padding={padding}
    >
      {children}
    </StyledFooter>
  );
}

function Header({
  alignItems,
  children,
  color,
  direction,
  gap,
  iconColor = Colors.PhilippineGray,
  iconSize = "24",
  isTemplate,
  justifyContent,
  leftIcon,
  padding,
  rightIcon,
  title,
  titleColor = Colors.Platinum,
  onLeftIconClick,
  onRightIconClick,
}: HeaderProps) {
  if (isTemplate) {
    const LeftIcon = leftIcon || MdKeyboardBackspace;
    const RightIcon = rightIcon || MdClose;

    return (
      <div
        style={{
          alignItems: "center",
          display: "flex",
          gap: "0.5em",
          justifyContent: "space-between",
          padding: "0.75em",
        }}
      >
        <IconContainer isHidden={!leftIcon} onClick={onLeftIconClick}>
          <LeftIcon color={iconColor} size={iconSize} />
        </IconContainer>
        <Title color={titleColor}>{title}</Title>
        <IconContainer isHidden={!rightIcon} onClick={onRightIconClick}>
          <RightIcon color={iconColor} size={iconSize} />
        </IconContainer>
      </div>
    );
  }

  return (
    <StyledHeader
      alignItems={alignItems}
      color={color}
      direction={direction}
      gap={gap}
      justifyContent={justifyContent}
      padding={padding}
    >
      {children}
    </StyledHeader>
  );
}

const Modal = Object.assign(BaseModal, { Footer, Body, Header });

export { Modal };
