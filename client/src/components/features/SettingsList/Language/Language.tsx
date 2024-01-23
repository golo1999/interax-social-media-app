import { memo } from "react";

import { Header } from "../Header";

interface Props {
  onBackIconClick: () => void;
}

export const Language = memo(function Language({ onBackIconClick }: Props) {
  return (
    <>
      <Header title="Language" onBackIconClick={onBackIconClick} />
      <div></div>
    </>
  );
});
