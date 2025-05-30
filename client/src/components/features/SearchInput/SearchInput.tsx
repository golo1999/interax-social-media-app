import { forwardRef } from "react";
import { MdSearch } from "react-icons/md";

import { Colors } from "environment";
import { useAuthenticationStore, useSettingsStore } from "store";

import { Container, Input } from "./SearchInput.style";

interface Props {
  iconSize?: number | string;
  placeholder?: string;
  onSearchClick?: () => void;
  onTextChange?: (text: string) => void;
}

export const SearchInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      iconSize = 20,
      placeholder = "Search Interax",
      onSearchClick,
      onTextChange,
    },
    inputRef
  ) => {
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
        <Input
          {...themeProps}
          placeholder={placeholder}
          ref={inputRef}
          spellCheck={false}
          onChange={({ target: { value } }) => {
            onTextChange?.(value);
          }}
        />
      </Container>
    );
  }
);
