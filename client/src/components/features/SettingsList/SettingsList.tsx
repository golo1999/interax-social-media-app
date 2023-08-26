import { ImExit } from "react-icons/im";
import { useNavigate } from "react-router-dom";

import { Tab, UserTab } from "components";
import { useAuthenticationStore, useSettingsStore } from "store";

import { Container } from "./SettingsList.style";

export function SettingsList() {
  const { authenticatedUser, setAuthenticatedUser } = useAuthenticationStore();
  const navigate = useNavigate();
  const { closeSettingsList } = useSettingsStore();

  const { username } = { ...authenticatedUser };

  function handleUserTabClick() {
    closeSettingsList();
    navigate(`/${username}`);
  }

  function handleLogOutTabClick() {
    // TODO
    closeSettingsList();
    setAuthenticatedUser(null);
  }

  return (
    <Container.Main>
      <UserTab user={authenticatedUser} onClick={handleUserTabClick} />
      <Tab name="Log Out" startIcon={ImExit} onClick={handleLogOutTabClick} />
    </Container.Main>
  );
}
