import { Divider } from "@mui/material";

import { FiFileText } from "react-icons/fi";

import { Colors } from "environment";
import { File as FileModel } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

import { formatSize } from "./File.helpers";
import { Container, Name, Size } from "./File.style";

interface Props {
  isDividerVisible: boolean;
  item: FileModel;
}

export function File({ isDividerVisible, item }: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();

  const { name, size } = item;

  const dividerColor =
    !!authenticatedUser && theme === "DARK" ? "Arsenic" : "LightGray";

  return (
    <>
      <Container.Main>
        <Container.Icon>
          <FiFileText color={Colors.Platinum} />
        </Container.Icon>
        <Container.Details>
          <Name>{name}</Name>
          <Size>{formatSize(size)}</Size>
        </Container.Details>
      </Container.Main>
      {isDividerVisible && (
        <Divider sx={{ borderColor: Colors[dividerColor] }} />
      )}
    </>
  );
}
