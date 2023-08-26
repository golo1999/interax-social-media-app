import { IoPlayCircleOutline } from "react-icons/io5";
import styled from "styled-components";

import { Colors } from "environment";

export const Container = {
  Duration: styled.div`
    background-color: black;
    border-radius: 5px;
    bottom: 0.5em;
    padding: 0.25em;
    position: absolute;
    right: 0.5em;
  `,
  Main: styled.div`
    display: flex;
    position: relative;
  `,
};

export const Duration = styled.p`
  color: ${Colors.Platinum};
  font-size: x-small;
`;

export const Icon = styled(IoPlayCircleOutline)`
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const Video = styled.video`
  aspect-ratio: 1 / 1;
  max-width: 100%;
  object-fit: cover;
`;
