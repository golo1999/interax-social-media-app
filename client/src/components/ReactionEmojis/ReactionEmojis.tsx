import { CSSProperties } from "react";

import { ReactionType } from "../../models";

import { REACTIONS } from "./ReactionEmojis.consts";

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
  function getContainerStyle(): CSSProperties {
    return {
      ...{
        alignItems: "center",
        backgroundColor: "#242526",
        border: "2px solid #383a3c",
        borderRadius: "20px",
        display: "flex",
        gap: "0.5em",
        padding: "0.5em",
        position: "absolute",
      },
      ...style,
    };
  }

  return (
    <div
      style={getContainerStyle()}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {REACTIONS.map((reaction, index) => (
        <img
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
    </div>
  );
}
