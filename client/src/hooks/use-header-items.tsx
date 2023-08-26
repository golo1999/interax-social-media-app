import { useMemo } from "react";
import {
  AiFillHome,
  AiFillShop,
  AiOutlineHome,
  AiOutlineShop,
} from "react-icons/ai";
import { HiOutlineUserGroup, HiUserGroup } from "react-icons/hi";
import { MdOndemandVideo, MdOutlineOndemandVideo } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { IconItem } from "components";

export function useHeaderItems() {
  const navigate = useNavigate();

  return useMemo<IconItem[]>(
    () => [
      {
        icon: {
          NotSelectedIcon: AiOutlineHome,
          SelectedIcon: AiFillHome,
        },
        name: "HOME",
        onClick: () => navigate("/"),
      },
      {
        icon: {
          NotSelectedIcon: MdOutlineOndemandVideo,
          SelectedIcon: MdOndemandVideo,
        },
        name: "WATCH",
        onClick: () => navigate("/watch"),
      },
      {
        icon: {
          NotSelectedIcon: AiOutlineShop,
          SelectedIcon: AiFillShop,
        },
        name: "MARKETPLACE",
        onClick: () => {
          // TODO
        },
      },
      {
        icon: {
          NotSelectedIcon: HiOutlineUserGroup,
          SelectedIcon: HiUserGroup,
        },
        name: "GROUPS",
        onClick: () => {
          // TODO
        },
      },
    ],
    [navigate]
  );
}
