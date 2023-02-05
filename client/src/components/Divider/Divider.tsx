import { CSSProperties } from "react";

const dividerStyle: CSSProperties = {
  height: "2px",
  backgroundColor: "#383a3c",
};

export function Divider() {
  return <hr style={dividerStyle} />;
}
