import { CSSProperties, MutableRefObject, useRef } from "react";
import { MdCancel, MdSend } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { UserPhoto } from "components";
import { Colors } from "environment";
import { useAuthenticationStore, useSettingsStore } from "store";
import { Theme } from "types";

interface ThemeProps {
  $isAuthenticated: boolean;
  $theme: Theme;
}

const Container = styled.div`
  align-items: center;
  display: flex;
  gap: 0.5em;
`;

const iconStyle: CSSProperties = { userSelect: "none" };

const Input = styled.input<ThemeProps>`
  background-color: ${({ $isAuthenticated, $theme }) =>
    $isAuthenticated && $theme === "DARK"
      ? Colors.BlackOlive
      : Colors.AntiFlashWhite};
  border-radius: 20px;
  color: ${({ $isAuthenticated, $theme }) =>
    $isAuthenticated && $theme === "DARK"
      ? Colors.MetallicSilver
      : Colors.DarkLiver};
  flex: 1;
  padding: 10px 15px;

  &:hover {
    background-color: ${({ $isAuthenticated, $theme }) =>
      $isAuthenticated && $theme === "DARK"
        ? Colors.DarkLiver
        : Colors.Platinum};
  }
`;

interface Props {
  autoFocus?: boolean;
  placeholder: string;
  style?: CSSProperties;
  onCancelClick?: () => void;
  onSendClick: (text: string) => void;
}

export function WriteComment({
  autoFocus = false,
  placeholder,
  style,
  onCancelClick,
  onSendClick,
}: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const navigate = useNavigate();
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const { theme } = useSettingsStore();

  function handleSendClick() {
    const comment = inputRef.current.value;

    if (comment.length > 0) {
      onSendClick(comment);
      inputRef.current.value = "";
      inputRef.current.focus();
    } else {
      alert("Please enter a text");
    }
  }

  return (
    <Container style={style}>
      <UserPhoto
        user={authenticatedUser}
        onPhotoClick={() => navigate(`/${authenticatedUser?.username}`)}
      />
      <Input
        $isAuthenticated={!!authenticatedUser}
        $theme={theme}
        autoFocus={autoFocus}
        placeholder={placeholder}
        ref={inputRef}
        type="text"
      />
      {onCancelClick && (
        <MdCancel
          color={Colors.PhilippineGray}
          size="1.5em"
          style={iconStyle}
          onClick={onCancelClick}
        />
      )}
      <MdSend
        color={Colors.PhilippineGray}
        size="1.5em"
        style={iconStyle}
        onClick={handleSendClick}
      />
    </Container>
  );
}
