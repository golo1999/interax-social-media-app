import { ReactionType } from "../../models";

interface Props {
  onReactionClick: (reactionType: ReactionType) => void;
}

export function ReactionEmojis({ onReactionClick }: Props) {
  return (
    <div
      style={{
        backgroundColor: "#242526",
        border: "2px solid #383a3c",
        borderRadius: "20px",
        display: "flex",
        gap: "0.5em",
        padding: "0.5em",
        position: "absolute",
        top: "-45px",
      }}
    >
      <p onClick={() => onReactionClick(ReactionType.LIKE)}>Like</p>
      <p onClick={() => onReactionClick(ReactionType.LOVE)}>Love</p>
      <p onClick={() => onReactionClick(ReactionType.CARE)}>Care</p>
      <p onClick={() => onReactionClick(ReactionType.HAHA)}>Haha</p>
      <p onClick={() => onReactionClick(ReactionType.WOW)}>Wow</p>
      <p onClick={() => onReactionClick(ReactionType.SAD)}>Sad</p>
      <p onClick={() => onReactionClick(ReactionType.ANGRY)}>Angry</p>
    </div>
  );
}
