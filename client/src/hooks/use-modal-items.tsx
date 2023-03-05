import { useMemo } from "react";
import { MdLock, MdPeople, MdPublic } from "react-icons/md";

import { VisibilityItem } from "components";
import { Permission } from "models";

export function useVisibilityModalItems() {
  const items: VisibilityItem[] = useMemo(
    () => [
      {
        description: "Anyone on or off Interax",
        icon: MdPublic,
        title: Permission.PUBLIC,
      },
      {
        description: "Your friends on Interax",
        icon: MdPeople,
        title: Permission.FRIENDS,
      },
      { icon: MdLock, title: Permission.ONLY_ME },
    ],
    []
  );

  return items;
}
