import { useLazyQuery } from "@apollo/client";

import { useEffect } from "react";

import { UserFriend } from "../../components";
import { GET_AUTHENTICATED_USER } from "../../helpers";
import { User } from "../../models";
import { Friends, Posts } from "../../sections";

interface GetAuthenticatedUserData {
  authenticatedUser: User;
}

export function HomePage() {
  const [fetchAuthenticatedUser, { data: authenticatedUserData }] =
    useLazyQuery<GetAuthenticatedUserData>(GET_AUTHENTICATED_USER);

  useEffect(() => {
    fetchAuthenticatedUser();
  }, [fetchAuthenticatedUser]);

  return (
    <div
      style={{
        backgroundColor: "inherit",
        display: "flex",
        flex: 1,
        flexDirection: "column",
      }}
    >
      <div>Navbar</div>
      <div style={{ display: "flex", gap: "5em", padding: "1em 0" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {authenticatedUserData?.authenticatedUser && (
            <UserFriend friend={authenticatedUserData?.authenticatedUser} />
          )}
          <p>Friends</p>
          <p>Groups</p>
        </div>
        <Posts style={{ flex: 1 }} />
        <Friends />
      </div>
    </div>
  );
}
