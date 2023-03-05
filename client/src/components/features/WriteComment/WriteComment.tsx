import { CSSProperties, MutableRefObject, useRef } from "react";
import { MdCancel, MdSend } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { UserPhoto } from "components";
import { User } from "models";

const containerStyle: CSSProperties = {
  alignItems: "center",
  display: "flex",
  gap: "0.5em",
};

const iconStyle: CSSProperties = { userSelect: "none" };

const inputStyle: CSSProperties = {
  backgroundColor: "#3a3b3c",
  borderRadius: "20px",
  color: "#cfd1d5",
  flex: 1,
  padding: "10px 15px",
};

interface Props {
  autoFocus?: boolean;
  placeholder: string;
  user?: User;
  style?: CSSProperties;
  onCancelClick?: () => void;
  onSendClick: (text: string) => void;
}

export function WriteComment({
  autoFocus = false,
  placeholder,
  user,
  style,
  onCancelClick,
  onSendClick,
}: Props) {
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  const navigate = useNavigate();

  function handleSendClick() {
    const comment = inputRef.current.value;

    if (comment.length > 0) {
      onSendClick(comment);
      inputRef.current.value = "";
      inputRef.current.focus();
    } else {
      alert("Please enter a text");
    }
  }

  return (
    <div style={{ ...containerStyle, ...style }}>
      <UserPhoto
        user={user}
        onPhotoClick={() => navigate(`/${user?.username}`)}
      />
      <input
        autoFocus={autoFocus}
        placeholder={placeholder}
        ref={inputRef}
        style={inputStyle}
        type="text"
      />
      {onCancelClick && (
        <MdCancel
          color="#8d8f93"
          size="1.5em"
          style={iconStyle}
          onClick={onCancelClick}
        />
      )}
      <MdSend
        color="#8d8f93"
        size="1.5em"
        style={iconStyle}
        onClick={handleSendClick}
      />
    </div>
  );
}
