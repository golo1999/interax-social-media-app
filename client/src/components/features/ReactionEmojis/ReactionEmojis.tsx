import { CSSProperties } from "react";

import { ReactionType } from "models";
import { useAuthenticationStore, useSettingsStore } from "store";

import { REACTIONS } from "./ReactionEmojis.consts";
import { Container, Emoji } from "./ReactionEmojis.style";

interface Props {
  size: number;
  style?: CSSProperties;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onReactionClick: (reactionType: ReactionType) => void;
}

export function ReactionEmojis({
  size,
  style,
  onMouseEnter,
  onMouseLeave,
  onReactionClick,
}: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const { theme } = useSettingsStore();

  return (
    <Container
      isAuthenticated={!!authenticatedUser}
      style={style}
      theme={theme}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {REACTIONS.map((reaction, index) => (
        <Emoji
          key={index}
          alt={reaction.type
            .slice(0, 1)
            .concat(reaction.type.slice(1).toLowerCase())}
          src={reaction.icon}
          height={size}
          width={size}
          onClick={() => onReactionClick(reaction.type)}
        />
      ))}
    </Container>
  );
}
