import { MdSearch } from "react-icons/md";

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
  return (
    <Container>
      <MdSearch color="silver" size={iconSize} onClick={onSearchClick} />
      <Input placeholder={placeholder} spellCheck={false} />
    </Container>
  );
}
