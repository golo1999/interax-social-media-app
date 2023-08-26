import { useMemo } from "react";

import { User } from "models";

interface Props {
  authenticatedUser: User | null;
  user: User | null;
}

export function useMutualFriends({ authenticatedUser, user }: Props) {
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
