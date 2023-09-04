import { useLazyQuery, useMutation } from "@apollo/client";

import { useEffect } from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { MdBlock } from "react-icons/md";
import { VscCloseAll } from "react-icons/vsc";

import { Divider, Tab } from "components";
import {
  GET_USER_SAVED_POSTS,
  GetUserSavedPostsData,
  SAVE_POST,
  SavePostData,
  UNSAVE_POST,
  UnsavePostData,
} from "helpers";
import { User } from "models";
import { useAuthenticationStore } from "store";

import { Container } from "./PostOptionsList.style";

interface Props {
  postId: string;
  postOwner: User;
}

export function PostOptionsList({ postId, postOwner: { firstName } }: Props) {
  const { authenticatedUser } = useAuthenticationStore();
  const [fetchSavedPosts, { data: savedPosts, loading: isFetchingSavedPosts }] =
    useLazyQuery<GetUserSavedPostsData>(GET_USER_SAVED_POSTS);
  const [savePost] = useMutation<SavePostData>(SAVE_POST);
  const [unsavePost] = useMutation<UnsavePostData>(UNSAVE_POST);

  useEffect(() => {
    fetchSavedPosts({
      variables: { id: authenticatedUser?.id },
    });
  }, [authenticatedUser?.id, fetchSavedPosts]);

  const blockProfileText = firstName.endsWith("s")
    ? `Block ${firstName}' profile`
    : `Block ${firstName}'s profile`;
  const unfollowText = `Unfollow ${firstName}`;

  const isSaved = !!savedPosts?.userSavedPosts?.find(
    (post) => post.id === postId
  );

  if (isFetchingSavedPosts && !savedPosts?.userSavedPosts) {
    return <Container.Main>Loading...</Container.Main>;
  }

  return (
    <Container.Main>
      {isSaved ? (
        <Tab
          description="Remove this from your saved items"
          name="Unsave post"
          startIcon={IoBookmark}
          onClick={() => {
            unsavePost({
              variables: { input: { postId, userId: authenticatedUser?.id } },
              refetchQueries: [
                {
                  query: GET_USER_SAVED_POSTS,
                  variables: { id: authenticatedUser?.id },
                },
              ],
            });
          }}
        />
      ) : (
        <Tab
          description="Add this to your saved items."
          name="Save post"
          startIcon={IoBookmarkOutline}
          onClick={() => {
            savePost({
              variables: {
                input: { postId, userId: authenticatedUser?.id },
              },
              refetchQueries: [
                {
                  query: GET_USER_SAVED_POSTS,
                  variables: { id: authenticatedUser?.id },
                },
              ],
            });
          }}
        />
      )}
      <Divider margin="8px 0" />
      <Tab
        description="See fewer posts like this."
        name="Hide post"
        startIcon={AiOutlineCloseSquare}
      />
      <Tab
        description="Stop seeing posts but stay friends."
        name={unfollowText}
        startIcon={VscCloseAll}
      />
      <Tab
        description="You won't be able to see or contact each other."
        name={blockProfileText}
        startIcon={MdBlock}
      />
    </Container.Main>
  );
}
