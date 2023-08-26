import { KeyboardEvent, MutableRefObject, useRef, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import styled from "styled-components";

import { Modal, UserPhoto } from "components";
import { Colors } from "environment";
import { Conversation, User } from "models";

interface Props {
  authenticatedUser: User | null;
  conversation: Conversation | null;
  user: User | null;
  onCloseClick: () => void;
  onSaveClick: (id: string, nickname: string) => void;
}

export function NicknamesModal({
  authenticatedUser,
  conversation,
  user,
  onCloseClick,
  onSaveClick,
}: Props) {
  const {
    firstName: authenticatedUserFirstName,
    id: authenticatedUserId,
    lastName: authenticatedUserLastName,
  } = {
    ...authenticatedUser,
  };
  const { first, firstNickname, secondNickname } = { ...conversation };
  const {
    firstName: userFirstName,
    id: userId,
    lastName: userLastName,
  } = { ...user };

  const authenticatedUserNickname =
    authenticatedUserId === first ? firstNickname : secondNickname;
  const userIsAuthenticatedUser = authenticatedUserId === userId;
  const userNickname =
    authenticatedUserNickname === first ? secondNickname : firstNickname;

  return (
    <Modal width="550px">
      <Modal.Header
        isTemplate
        rightIcon={MdClose}
        title="Nicknames"
        onRightIconClick={onCloseClick}
      />
      <Modal.Body direction="column" gap="1em" padding="1.5em">
        <EditNickname
          name={`${authenticatedUserFirstName} ${authenticatedUserLastName}`}
          nickname={authenticatedUserNickname || null}
          user={authenticatedUser}
          onSaveClick={onSaveClick}
        />
        {!userIsAuthenticatedUser && (
          <EditNickname
            name={`${userFirstName} ${userLastName}`}
            nickname={userNickname || null}
            user={user}
            onSaveClick={onSaveClick}
          />
        )}
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

const Container = {
  Icon: styled.span`
    align-items: center;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    padding: 0.5em 10px;

    &:hover {
      background-color: ${Colors.BlackOlive};
    }
  `,
  Main: styled.div`
    align-items: center;
    display: flex;
    gap: 0.5em;
    user-select: none;
  `,
  User: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
  `,
};

const Input = styled.input.attrs({ type: "text" })`
  background-color: ${Colors.BlackOlive};
  border: 1px solid transparent;
  border-radius: 5px;
  color: ${Colors.Platinum};
  flex: 1;
  padding: 0.75em 1em;

  &:focus {
    background-color: inherit;
    border-color: ${Colors.BrightNavyBlue};
  }
`;

const Text = {
  Name: styled.p`
    color: silver;
    font-size: small;
  `,
  Nickname: styled.p`
    color: ${Colors.Platinum};
    font-weight: 500;
  `,
};

interface EditNicknameProps {
  name: string;
  nickname: string | null;
  user: User | null;
  onSaveClick: (id: string, nickname: string) => void;
}

function EditNickname({
  name,
  nickname,
  user,
  onSaveClick,
}: EditNicknameProps) {
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

  return (
    <Container.Main>
      <UserPhoto user={user} />
      {isEditing ? (
        <Input
          autoFocus
          defaultValue={nickname || ""}
          ref={inputRef}
          spellCheck={false}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <Container.User>
          <Text.Nickname>{nickname}</Text.Nickname>
          <Text.Name>{name}</Text.Name>
        </Container.User>
      )}
      <Container.Icon onClick={handleIconContainerClick}>
        <Icon color={Colors.Platinum} size={20} />
      </Container.Icon>
    </Container.Main>
  );
}
