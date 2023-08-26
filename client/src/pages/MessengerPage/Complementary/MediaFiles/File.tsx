import { FiFileText } from "react-icons/fi";

import { Divider } from "components";
import { Colors } from "environment";
import { File as FileModel } from "models";

import { formatSize } from "./File.helpers";
import { Container, Name, Size } from "./File.style";

interface Props {
  isDividerVisible: boolean;
  item: FileModel;
}

export function File({ isDividerVisible, item }: Props) {
  const { name, size } = item;

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
      {isDividerVisible && <Divider />}
    </>
  );
}
