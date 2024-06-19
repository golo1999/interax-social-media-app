import { useMutation, useQuery } from "@apollo/client";

import { useMemo, useState } from "react";

import { UserComment } from "components";
import {
  GET_COMMENT_REPLIES,
  GET_POST,
  RemoveCommentData,
  REMOVE_COMMENT,
  GetPostCommentsData,
  GET_POST_COMMENTS,
} from "helpers";
import { Comment, Post } from "models";

import { Container, Text } from "./PostComments.style";

interface Props {
  post: Post;
}

export function PostComments({
  post: {
    id: postId,
    owner: { id: postOwnerId },
    topLevelCommentsCount,
  },
}: Props) {
  const [postCommentsResponse, setPostCommentsResponse] = useState<Comment[]>(
    []
  );
  const { loading, fetchMore } = useQuery<GetPostCommentsData>(
    GET_POST_COMMENTS,
    {
      notifyOnNetworkStatusChange: true,
      variables: { input: { first: 2, postId } },
      onCompleted: ({ postComments: { edges, pageInfo } }) =>
        setPostCommentsResponse(edges.map(({ node }) => node)),
    }
  );
  const [removeComment] = useMutation<RemoveCommentData>(REMOVE_COMMENT);

  return useMemo(() => {
    function handleDeleteClick(commentId: string) {
      removeComment({
        variables: { id: commentId },
        refetchQueries: [
          {
            query: GET_POST,
            variables: { id: postId },
          },
          { query: GET_COMMENT_REPLIES, variables: { commentId } },
        ],
      });
    }

    const postCommentsResponseLength = postCommentsResponse.length;
    const remainingRepliesCount =
      topLevelCommentsCount - postCommentsResponseLength;
    const remainingRepliesText =
      remainingRepliesCount !== 1
        ? `Show ${remainingRepliesCount} more comments`
        : `Show ${remainingRepliesCount} more comment`;

    return (
      <Container.Main>
        <div>
          {postCommentsResponse.map(({ id }) => (
            <UserComment
              key={id}
              commentId={id}
              isTopLevel
              postId={postId}
              postOwnerId={postOwnerId}
              onDeleteClick={(replyId) => handleDeleteClick(replyId)}
            />
          ))}
        </div>
        {postCommentsResponseLength < topLevelCommentsCount && (
          <Container.Comments>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <Text.ShowMoreReplies
                onClick={() => {
                  fetchMore({
                    variables: {
                      input: {
                        after:
                          postCommentsResponse[postCommentsResponseLength - 1]
                            .id,
                        first: 5,
                        postId,
                      },
                    },
                    updateQuery: (previousResult, { fetchMoreResult }) => ({
                      postComments: {
                        ...previousResult.postComments,
                        edges: [
                          ...previousResult.postComments.edges,
                          ...fetchMoreResult.postComments.edges,
                        ],
                        pageInfo: fetchMoreResult.postComments.pageInfo,
                        totalCount:
                          previousResult.postComments.totalCount +
                          fetchMoreResult.postComments.totalCount,
                      },
                    }),
                  });
                }}
              >
                {remainingRepliesText}
              </Text.ShowMoreReplies>
            )}
          </Container.Comments>
        )}
      </Container.Main>
    );
  }, [
    loading,
    postCommentsResponse,
    postId,
    postOwnerId,
    topLevelCommentsCount,
    fetchMore,
    removeComment,
  ]);
}
