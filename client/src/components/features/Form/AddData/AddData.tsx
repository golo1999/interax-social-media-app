import { IconType } from "react-icons";
import styled from "styled-components";

import { Colors } from "environment";

const Container = styled.div`
  align-items: center;
  color: ${Colors.BrilliantAzure};
  display: flex;
  gap: 0.5em;
`;

interface TextProps {
  fontWeight?: string;
}

const Text = styled.p<TextProps>`
  ${(props) => props.fontWeight && `font-weight: ${props.fontWeight};`};
  user-select: none;
`;

interface Props {
  icon: IconType;
  iconSize?: number;
  text: string;
  textFontWeight?: string;
  onClick: () => void;
}

export function AddData({
  icon: Icon,
  iconSize = 24,
  text,
  textFontWeight,
  onClick,
}: Props) {
  return (
    <Container onClick={onClick}>
      <Icon size={iconSize} />
      <Text fontWeight={textFontWeight}>{text}</Text>
    </Container>
  );
}
