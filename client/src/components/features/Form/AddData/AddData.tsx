import { IconType } from "react-icons";
import styled from "styled-components";

const Container = styled.div`
  align-items: center;
  color: #2e89ff;
  display: flex;
  gap: 0.5em;
`;

const Text = styled.p`
  user-select: none;
`;

interface Props {
  icon: IconType;
  iconSize?: number;
  text: string;
  onClick: () => void;
}

export function AddData({ icon: Icon, iconSize = 24, text, onClick }: Props) {
  return (
    <Container onClick={onClick}>
      <Icon size={iconSize} />
      <b>
        <Text>{text}</Text>
      </b>
    </Container>
  );
}
