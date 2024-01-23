import { useMemo } from "react";

import { User } from "models";
import { useAuthenticationStore } from "store";

// Hook for getting the mutual friends between the authenticated user and a given user
export function useMutualFriends(user: User | null) {
  const { authenticatedUser } = useAuthenticationStore();

  const { friends: authenticatedUserFriends, id: authenticatedUserId } = {
    ...authenticatedUser,
  };
  const { friends: userFriends, id: userId } = { ...user };

  const isAuthenticatedUser = authenticatedUserId === userId;
  const isAuthenticatedUserFriend = authenticatedUserFriends?.find(
    (friend) => friend.id === userId
  );

  const mutualFriends: User[] = useMemo(() => {
    const list: User[] = [];

    if (!user) {
      return list;
    }

    if (!isAuthenticatedUser && !isAuthenticatedUserFriend) {
      userFriends?.forEach((userFriend) => {
        authenticatedUser?.friends?.forEach((authenticatedUserFriend) => {
          const { id: authenticatedUserFriendId } = authenticatedUserFriend;
          const { id: userFriendId } = userFriend;

          if (authenticatedUserFriendId === userFriendId) {
            list.push(authenticatedUserFriend);
          }
        });
      });
    }

    return list;
  }, [
    authenticatedUser?.friends,
    isAuthenticatedUser,
    isAuthenticatedUserFriend,
    user,
    userFriends,
  ]);
  const mutualFriendsText = useMemo(
    () =>
      mutualFriends.length === 0
        ? null
        : mutualFriends.length === 1
        ? "1 mutual friend"
        : `${mutualFriends.length} mutual friends`,
    [mutualFriends]
  );

  return { mutualFriends, mutualFriendsText };
}
