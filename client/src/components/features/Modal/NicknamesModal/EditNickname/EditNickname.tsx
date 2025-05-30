import { KeyboardEvent, MutableRefObject, useRef, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { RiEdit2Fill } from "react-icons/ri";

import { UserPhoto } from "components";
import { Colors } from "environment";
import { User } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

import { Container, Input, Text } from "./EditNickname.style";

interface Props {
  name: string;
  nickname: string | null;
  user: User | null | undefined;
  onSaveClick: (id: string, nickname: string) => void;
}

export function EditNickname({ name, nickname, user, onSaveClick }: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  const { id: userId } = { ...user };

  function handleIconContainerClick() {
    if (isEditing && userId) {
      const inputText = inputRef.current.value;

      onSaveClick(userId, inputText);
    }

    setIsEditing((value) => !value);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleIconContainerClick();
    } else if (e.key === "Escape") {
      setIsEditing((value) => !value);
    }
  }

  const Icon = isEditing ? FiCheck : RiEdit2Fill;

  const iconColor: keyof typeof Colors =
    !!authenticatedUser && theme === "DARK" ? "Platinum" : "VampireBlack";

  return (
    <Container.Main>
      <UserPhoto user={user} />
      {isEditing ? (
        <Input
          $isAuthenticated={!!authenticatedUser}
          $theme={theme}
          autoFocus
          defaultValue={nickname || ""}
          ref={inputRef}
          spellCheck={false}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <Container.User>
          <Text.Nickname $isAuthenticated={!!authenticatedUser} $theme={theme}>
            {nickname}
          </Text.Nickname>
          <Text.Name $isAuthenticated={!!authenticatedUser} $theme={theme}>
            {name}
          </Text.Name>
        </Container.User>
      )}
      <Container.Icon
        $isAuthenticated={!!authenticatedUser}
        $theme={theme}
        onClick={handleIconContainerClick}
      >
        <Icon color={Colors[iconColor]} size={20} />
      </Container.Icon>
    </Container.Main>
  );
}
