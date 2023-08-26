import styled from "styled-components";

import { ChatHeads } from "components";
import { Contacts } from "sections";

const Container = styled.div.attrs({ role: "complementary" })`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  padding: 0 0.5em;
`;

export function Complementary() {
  return (
    <Container>
      <Contacts />
      <ChatHeads />
    </Container>
  );
}
