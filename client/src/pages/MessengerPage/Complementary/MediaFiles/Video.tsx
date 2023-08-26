import { MutableRefObject, useRef, useState } from "react";

import { Colors } from "environment";

import { getFormattedDuration } from "./MediaFiles.helpers";
import { Container, Duration, Icon, Video as StyledVideo } from "./Video.style";

interface Props {
  url: string;
}

export function Video({ url }: Props) {
  const [duration, setDuration] = useState<number | null>(null);

  const videoRef = useRef() as MutableRefObject<HTMLVideoElement>;

  function handleLoadedMetadata() {
    const newDuration = videoRef.current.duration;

    if (newDuration && newDuration !== duration) {
      setDuration(newDuration);
    }
  }

  return (
    <Container.Main>
      <Icon color={Colors.Platinum} size={48} />
      {duration && (
        <Container.Duration>
          <Duration>{getFormattedDuration(duration)}</Duration>
        </Container.Duration>
      )}
      <StyledVideo ref={videoRef} onLoadedMetadata={handleLoadedMetadata}>
        <source src={url} type="video/mp4" />
        Sorry, your browser doesn't support embedded videos.
      </StyledVideo>
    </Container.Main>
  );
}
