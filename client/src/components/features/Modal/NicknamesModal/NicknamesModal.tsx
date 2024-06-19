import { MdClose } from "react-icons/md";

import { Modal } from "components";
import { Colors } from "environment";
import { Conversation, User } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

import { EditNickname } from "./EditNickname";

interface Props {
  conversation: Conversation | null;
  user: User | null;
  onCloseClick: () => void;
  onSaveClick: (id: string, nickname: string) => void;
}

export function NicknamesModal({
  conversation,
  user,
  onCloseClick,
  onSaveClick,
}: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();

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

  const iconColor: keyof typeof Colors =
    !!authenticatedUser && theme === "DARK" ? "Platinum" : "PhilippineGray";
  const titleColor: keyof typeof Colors =
    !!authenticatedUser && theme === "DARK" ? "Platinum" : "VampireBlack";

  return (
    <Modal width="50vw">
      <Modal.Header
        iconColor={iconColor}
        isTemplate
        rightIcon={MdClose}
        title="Nicknames"
        titleColor={titleColor}
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
