import { forwardRef } from "react";
import { MdClose, MdKeyboardBackspace } from "react-icons/md";

import { Colors } from "environment";
import { useAuthenticationStore, useSettingsStore } from "store";

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
    const { authenticatedUser } = useAuthenticationStore();
    const { scrollPosition, theme } = useSettingsStore();

    return (
      <Background
        $isAuthenticated={!!authenticatedUser}
        $theme={theme}
        $scrollPosition={scrollPosition}
      >
        <Container
          $isAuthenticated={!!authenticatedUser}
          $theme={theme}
          minHeight={minHeight}
          ref={containerRef}
          width={width}
        >
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
  iconColor = "PhilippineGray",
  iconSize = "24",
  isTemplate,
  justifyContent,
  leftIcon,
  padding,
  rightIcon,
  title,
  titleColor = "Platinum",
  onLeftIconClick,
  onRightIconClick,
}: HeaderProps) {
  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();

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
        {/* {LeftIcon ? (
          <IconContainer>
            <LeftIcon color={iconColor} size={iconSize} />
          </IconContainer>
        ) : (
          <IconContainer isHidden>
            <MdKeyboardBackspace color={iconColor} size={iconSize} />
          </IconContainer>
        )} */}
        <IconContainer
          $isAuthenticated={!!authenticatedUser}
          $theme={theme}
          isHidden={!leftIcon}
          onClick={onLeftIconClick}
        >
          <LeftIcon color={Colors[iconColor]} size={iconSize} />
        </IconContainer>
        <Title color={titleColor}>{title}</Title>
        <IconContainer
          $isAuthenticated={!!authenticatedUser}
          $theme={theme}
          isHidden={!rightIcon}
          onClick={onRightIconClick}
        >
          <RightIcon color={Colors[iconColor]} size={iconSize} />
        </IconContainer>
        {/* {RightIcon ? (
          <IconContainer>
            <RightIcon color={iconColor} size={iconSize} />
          </IconContainer>
        ) : (
          <IconContainer isHidden>
            <MdClose color={iconColor} size={iconSize} />
          </IconContainer>
        )} */}
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
