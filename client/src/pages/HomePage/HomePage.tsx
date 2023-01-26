import { Posts } from "../../sections";

export function HomePage() {
  return (
    <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
      <Posts />
    </div>
  );
}
