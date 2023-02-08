import { gql, useMutation } from "@apollo/client";

import {
  Fragment,
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AiOutlineLike } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { MdMoreHoriz } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import {
  Divider,
  PostPhotos,
  ReactionEmojis,
  UserComment,
  UserPhoto,
  WriteComment,
} from "../../components";
import { getTimeFromDate } from "../../helpers";
import { Post, ReactionType, User } from "../../models";
import { GET_FRIENDS_POSTS_BY_USER_ID } from "../../sections/Posts/Posts";

import {
  getCommentsText,
  getInitialHasReacted,
  getPostReactionsCount,
  getReactionButtonText,
  getReactionButtonTextColor,
  getReactionIcon,
  getSharesText,
  getUserPostReaction,
} from "./UserPost.helpers";
import {
  Button,
  ButtonsContainer,
  Header,
  MainContainer,
  PostOwnerContainer,
  PostOwnerName,
  PostText,
} from "./UserPost.style";

const ADD_POST_COMMENT = gql`
  mutation AddPostComment($input: AddPostCommentInput!) {
    addPostComment(input: $input) {
      dateTime
      id
      owner {
        email
        firstName
        id
        lastName
        username
      }
      reactions {
        type
      }
      replies {
        text
      }
      text
    }
  }
`;

const ADD_POST_REACTION = gql`
  mutation AddPostReaction($input: AddPostReactionInput!) {
    addPostReaction(input: $input) {
      id
      owner {
        email
        firstName
        id
        lastName
        username
      }
      type
    }
  }
`;

// const GET_USER_POST_REACTION = gql`
//   query GetUserPostReaction($input: GetUserPostReactionInput!) {
//     userPostReaction(input: $input) {
//       id
//       owner {
//         email
//         firstName
//         id
//         lastName
//         username
//       }
//       type
//     }
//   }
// `;

const REMOVE_POST_COMMENT = gql`
  mutation RemovePostComment($input: RemovePostCommentInput!) {
    removePostComment(input: $input) {
      dateTime
      id
      owner {
        email
        firstName
        id
        lastName
        username
      }
      reactions {
        id
        owner {
          email
          firstName
          id
          lastName
          username
        }
        type
      }
      replies {
        dateTime
        id
        owner {
          username
        }
        reactions {
          type
        }
        replies {
          text
        }
        text
      }
      text
    }
  }
`;

const REMOVE_POST_REACTION = gql`
  mutation RemovePostReaction($input: RemovePostReactionInput!) {
    removePostReaction(input: $input) {
      id
      owner {
        username
      }
      type
    }
  }
`;

const UPDATE_POST_REACTION = gql`
  mutation UpdatePostReaction($input: UpdatePostReactionInput!) {
    updatePostReaction(input: $input) {
      id
      owner {
        email
        firstName
        id
        lastName
        username
      }
      type
    }
  }
`;

enum ButtonTypes {
  COMMENT,
  REACTION,
  SHARE,
}

// interface GetUserPostReactionData {
//   userPostReaction: Reaction;
// }

interface PostReactionCount {
  count: number;
  icon: string;
  type: ReactionType;
}

interface Props {
  authenticatedUser?: User;
  post: Post;
}

export function UserPost({ authenticatedUser, post }: Props) {
  const [addPostComment] = useMutation(ADD_POST_COMMENT, {
    refetchQueries: [
      {
        query: GET_FRIENDS_POSTS_BY_USER_ID,
        variables: { ownerId: authenticatedUser?.id },
      },
    ],
  });
  const [addPostReaction] = useMutation(ADD_POST_REACTION, {
    refetchQueries: [
      {
        query: GET_FRIENDS_POSTS_BY_USER_ID,
        variables: { ownerId: authenticatedUser?.id },
      },
    ],
  });
  // const [fetchUserPostReaction, { data: userPostReactionData }] =
  //   useLazyQuery<GetUserPostReactionData>(GET_USER_POST_REACTION);
  const [removePostComment] = useMutation(REMOVE_POST_COMMENT, {
    refetchQueries: [
      {
        query: GET_FRIENDS_POSTS_BY_USER_ID,
        variables: { ownerId: authenticatedUser?.id },
      },
    ],
  });
  const [removePostReaction] = useMutation(REMOVE_POST_REACTION, {
    refetchQueries: [
      {
        query: GET_FRIENDS_POSTS_BY_USER_ID,
        variables: { ownerId: authenticatedUser?.id },
      },
    ],
  });
  const [updatePostReaction] = useMutation(UPDATE_POST_REACTION, {
    refetchQueries: [
      {
        query: GET_FRIENDS_POSTS_BY_USER_ID,
        variables: { ownerId: authenticatedUser?.id },
      },
    ],
  });

  const {
    comments,
    dateTime,
    id: postId,
    owner,
    photos,
    reactions,
    shares,
    text,
  } = post;

  const navigate = useNavigate();
  const emojisAndReactionsContainerRef =
    useRef() as MutableRefObject<HTMLInputElement>;
  const emojisContainerRef = useRef() as MutableRefObject<HTMLInputElement>;
  const textContainerRef = useRef() as MutableRefObject<HTMLDivElement>;

  const [hasReacted, setHasReacted] = useState<boolean>(
    getInitialHasReacted({ currentUserId: authenticatedUser?.id, reactions })
  );
  const [isHoveringOverEmojis, setIsHoveringOverEmojis] = useState(false);
  const [isHoveringOverReactionButton, setIsHoveringOverReactionButton] =
    useState(false);
  const [isTextCompletelyVisible, setIsTextCompletelyVisible] = useState(false);
  const [isWriteCommentVisible, setIsWriteCommentVisible] = useState(false);
  const [postReactionsCount, setPostReactionsCount] = useState<
    PostReactionCount[]
  >([]);

  useEffect(() => {
    const textContainerHeight = textContainerRef.current.offsetHeight;
    const textContainerLineHeight = parseInt(
      textContainerRef.current.style.lineHeight
    );
    const numberOfLines = textContainerHeight / textContainerLineHeight;

    setIsTextCompletelyVisible(numberOfLines <= 5);
  }, []);

  useEffect(() => {
    const count = getPostReactionsCount(reactions);
    setPostReactionsCount(count);
  }, [reactions]);

  useEffect(() => {
    const emojisCount = emojisContainerRef.current?.childNodes.length;
    const gap = emojisCount > 1 ? "1em" : "0.75em";

    if (emojisCount > 0) {
      emojisAndReactionsContainerRef.current.style.gap = gap;
    }
  }, [postReactionsCount]);

  let postReactionTimer: ReturnType<typeof setTimeout>;

  function getButtonColor(buttonType: ButtonTypes): string {
    return buttonType === ButtonTypes.REACTION && hasReacted
      ? getReactionButtonTextColor({
          currentUserId: authenticatedUser?.id,
          reactions,
        })
      : "#8d8f93";
  }

  function handleCommentClick() {
    setIsWriteCommentVisible((prev) => !prev);
  }

  function handleMoreOptionsClick() {
    console.log("more options clicked");
  }

  function handleReactionClick() {
    if (hasReacted) {
      removePostReaction({
        variables: { input: { ownerId: authenticatedUser?.id, postId } },
      });
    } else {
      addPostReaction({
        variables: {
          input: {
            postId,
            reactionOwnerId: authenticatedUser?.id,
            reactionType: ReactionType.LIKE,
          },
        },
      });
    }

    setHasReacted((prev) => !prev);

    if (postReactionTimer) {
      clearTimeout(postReactionTimer);
      return;
    }

    if (isHoveringOverEmojis) {
      setIsHoveringOverEmojis((prev) => !prev);
    }
    if (isHoveringOverReactionButton) {
      setIsHoveringOverReactionButton((prev) => !prev);
    }
  }

  function handleReactionEmojisClick(reactionType: ReactionType) {
    const currentReaction = getUserPostReaction({
      currentUserId: authenticatedUser?.id,
      reactions,
    });

    if (!currentReaction) {
      addPostReaction({
        variables: {
          input: {
            postId,
            reactionOwnerId: authenticatedUser?.id,
            reactionType,
          },
        },
      });
      if (!hasReacted) {
        setHasReacted((prev) => !prev);
      }
    } else if (currentReaction.type !== reactionType) {
      updatePostReaction({
        variables: {
          input: {
            ownerId: authenticatedUser?.id,
            postId,
            reactionType,
          },
        },
      });
    } else {
      removePostReaction({
        variables: {
          input: { ownerId: authenticatedUser?.id, postId },
        },
      });
      if (hasReacted) {
        setHasReacted((prev) => !prev);
      }
    }
  }

  const postComments = useMemo(() => {
    return comments?.map((comment, index) => (
      <UserComment
        key={index}
        authenticatedUser={authenticatedUser}
        comment={comment}
        postOwnerId={owner.id}
        onDeleteClick={() => {
          removePostComment({
            variables: { input: { commentId: comment.id, postId } },
          });
        }}
      />
    ));
  }, [authenticatedUser, comments, owner.id, postId, removePostComment]);

  const postReactionsEmojis = useMemo(() => {
    return postReactionsCount.map((postReaction, index) => {
      if (index > 2) {
        return <Fragment key={index} />;
      } else if (index > 0) {
        // if the index is 1 or 2 and any previous type has at least 10 times more reactions than the current type
        // then an emoji should not be displayed
        for (let counter = 0; counter < index; ++counter) {
          if (postReactionsCount[counter].count / postReaction.count > 10) {
            return <Fragment key={index} />;
          }
        }
      }

      const alt = postReaction.type
        .slice(0, 1)
        .concat(postReaction.type.slice(1).toLowerCase());

      return <img key={index} alt={alt} src={postReaction.icon} />;
    });
  }, [postReactionsCount]);

  const postOwnerNameText = `${owner.firstName} ${owner.lastName}`;

  return (
    <MainContainer>
      <Header>
        <PostOwnerContainer>
          <UserPhoto
            user={owner}
            onPhotoClick={() => navigate(`/${owner.username}`)}
          />
          <div>
            <PostOwnerName onClick={() => navigate(`/${owner.username}`)}>
              {postOwnerNameText}
            </PostOwnerName>
            <p>{getTimeFromDate(dateTime)}</p>
          </div>
        </PostOwnerContainer>
        <MdMoreHoriz
          color="#8d8f93"
          size="1.5em"
          onClick={handleMoreOptionsClick}
        />
      </Header>
      <div ref={textContainerRef} style={{ lineHeight: "21px" }}>
        <PostText
          style={
            !isTextCompletelyVisible
              ? {
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 5,
                  WebkitBoxOrient: "vertical",
                }
              : undefined
          }
        >
          {text}
        </PostText>
        {!isTextCompletelyVisible && (
          <span
            onClick={() => {
              setIsTextCompletelyVisible((prev) => !prev);
            }}
          >
            See more
          </span>
        )}
      </div>
      {photos && <PostPhotos photos={photos} />}
      {((comments && comments?.length > 0) ||
        (reactions && reactions?.length > 0) ||
        (shares && shares?.length > 0)) && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            ref={emojisAndReactionsContainerRef}
            style={{
              display: "flex",
            }}
          >
            <div
              ref={emojisContainerRef}
              style={{ display: "flex", gap: "0.25em" }}
            >
              {postReactionsEmojis}
            </div>
            {reactions && <p>{reactions.length}</p>}
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            {comments && <p>{getCommentsText(comments.length)}</p>}
            {shares && <p>{getSharesText(shares.length)}</p>}
          </div>
        </div>
      )}
      <Divider />
      <ButtonsContainer>
        <Button
          style={{ color: getButtonColor(ButtonTypes.REACTION) }}
          onClick={handleReactionClick}
          onMouseEnter={() => {
            postReactionTimer = setTimeout(() => {
              setIsHoveringOverReactionButton((prev) => !prev);
            }, 500);
          }}
          onMouseLeave={() => {
            if (postReactionTimer) {
              clearTimeout(postReactionTimer);
              return;
            }

            if (isHoveringOverReactionButton) {
              setTimeout(() => {
                setIsHoveringOverReactionButton((prev) => !prev);
              }, 500);
            }
          }}
        >
          {getUserPostReaction({
            currentUserId: authenticatedUser?.id,
            reactions,
          }) ? (
            <img
              alt="Emoji"
              src={getReactionIcon({
                reactionType: getUserPostReaction({
                  currentUserId: authenticatedUser?.id,
                  reactions,
                })?.type,
              })}
              height={24}
              width={24}
            />
          ) : (
            <AiOutlineLike size={24} />
          )}
          {getReactionButtonText({
            hasReacted,
            reactions,
            currentUserId: authenticatedUser?.id,
          })}
        </Button>
        {(isHoveringOverEmojis || isHoveringOverReactionButton) && (
          <ReactionEmojis
            size={32}
            style={{
              left: "-5px",
              top: "-52px",
            }}
            onMouseEnter={() => {
              setIsHoveringOverEmojis((prev) => !prev);
            }}
            onMouseLeave={() => {
              setTimeout(() => {
                setIsHoveringOverEmojis((prev) => !prev);
              }, 500);
            }}
            onReactionClick={(reactionType) => {
              handleReactionEmojisClick(reactionType);
              if (isHoveringOverEmojis) {
                setIsHoveringOverEmojis((prev) => !prev);
              }
            }}
          />
        )}
        <Button
          style={{ color: getButtonColor(ButtonTypes.COMMENT) }}
          onClick={handleCommentClick}
        >
          <BiComment size={24} />
          Comment
        </Button>
        <Button style={{ color: getButtonColor(ButtonTypes.SHARE) }}>
          <RiShareForwardLine size={24} />
          Share
        </Button>
      </ButtonsContainer>
      {((comments && comments?.length > 0) || isWriteCommentVisible) && (
        <Divider />
      )}
      {isWriteCommentVisible && (
        <WriteComment
          placeholder="Write a comment..."
          user={authenticatedUser}
          onCancelClick={handleCommentClick}
          onSendClick={(commentText) => {
            addPostComment({
              variables: {
                input: {
                  commentOwnerId: authenticatedUser?.id,
                  postId,
                  text: commentText,
                },
              },
            });
          }}
        />
      )}
      {comments && <div>{postComments}</div>}
    </MainContainer>
  );
}
