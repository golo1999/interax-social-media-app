import { MdSearch } from "react-icons/md";

import { Colors } from "environment";
import { useAuthenticationStore, useSettingsStore } from "store";

import { Container, Input } from "./SearchInput.style";

interface Props {
  iconSize?: number | string;
  placeholder?: string;
  onSearchClick?: () => void;
}

export function SearchInput({
  iconSize = 20,
  placeholder = "Search Interax",
  onSearchClick,
}: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();

  const themeProps = { $isAuthenticated: !!authenticatedUser, $theme: theme };

  const iconColor =
    !!authenticatedUser && theme === "DARK"
      ? Colors.PhilippineSilver
      : Colors.GraniteGray;

  return (
    <Container {...themeProps}>
      <MdSearch color={iconColor} size={iconSize} onClick={onSearchClick} />
      <Input placeholder={placeholder} spellCheck={false} />
    </Container>
  );
}
