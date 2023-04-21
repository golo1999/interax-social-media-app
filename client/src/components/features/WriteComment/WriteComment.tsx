import { CSSProperties, MutableRefObject, useRef } from "react";
import { MdCancel, MdSend } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { UserPhoto } from "components";
import { Colors } from "environment";
import { User } from "models";

const containerStyle: CSSProperties = {
  alignItems: "center",
  display: "flex",
  gap: "0.5em",
};

const iconStyle: CSSProperties = { userSelect: "none" };

const inputStyle: CSSProperties = {
  backgroundColor: Colors.BlackOlive,
  borderRadius: "20px",
  color: Colors.LightGray,
  flex: 1,
  padding: "10px 15px",
};

interface Props {
  authenticatedUser: User | null;
  autoFocus?: boolean;
  placeholder: string;
  style?: CSSProperties;
  onCancelClick?: () => void;
  onSendClick: (text: string) => void;
}

export function WriteComment({
  authenticatedUser,
  autoFocus = false,
  placeholder,
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
        user={authenticatedUser}
        onPhotoClick={() => navigate(`/${authenticatedUser?.username}`)}
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
          color={Colors.PhilippineGray}
          size="1.5em"
          style={iconStyle}
          onClick={onCancelClick}
        />
      )}
      <MdSend
        color={Colors.PhilippineGray}
        size="1.5em"
        style={iconStyle}
        onClick={handleSendClick}
      />
    </div>
  );
}
