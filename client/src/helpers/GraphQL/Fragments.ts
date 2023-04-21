import { gql } from "@apollo/client";

export const COMMENT_DATA = gql`
  fragment CommentData on Comment {
    dateTime
    id
    owner {
      email
      firstName
      id
      lastName
      profilePhotos {
        id
        isCurrent
        ownerId
        url
        visibility
      }
      username
    }
    ownerId
    postId
    reactions {
      dateTime
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
        email
        firstName
        id
        lastName
        profilePhotos {
          id
          isCurrent
          ownerId
          url
          visibility
        }
        username
      }
      text
    }
    text
  }
`;

export const CONVERSATION_DATA = gql`
  fragment ConversationData on Conversation {
    emoji
    first
    firstNickname
    second
    secondNickname
    theme
  }
`;

export const PLACE_DATA = gql`
  fragment PlaceData on Place {
    city
    from
    id
    isCurrent
    to
    visibility
  }
`;

export const POST_DATA = gql`
  fragment PostData on Post {
    canComment
    canReact
    canShare
    comments {
      ...CommentData
    }
    dateTime
    id
    owner {
      firstName
      id
      lastName
      profilePhotos {
        comments {
          ...CommentData
        }
        dateTime
        description
        isCurrent
        id
        ownerId
        url
        visibility
      }
      username
    }
    ownerId
    parentId
    photos {
      id
      ownerId
      postId
      text
      url
    }
    reactions {
      id
      owner {
        firstName
        id
        lastName
        username
      }
      type
    }
    receiverId
    shares {
      owner {
        firstName
        lastName
        username
      }
    }
    text
    video
    visibility
  }
`;

export const USER_DATA = gql`
  fragment UserData on User {
    biography
    birthDate
    coverPhotos {
      comments {
        ...CommentData
      }
      dateTime
      description
      isCurrent
      id
      ownerId
      url
      visibility
    }
    educationHistory {
      degree
      from
      graduated
      id
      level
      school
      to
      visibility
    }
    email
    firstName
    friends {
      firstName
      friends {
        firstName
        id
        lastName
        username
      }
      id
      lastName
      profilePhotos {
        comments {
          ...CommentData
        }
        dateTime
        description
        isCurrent
        id
        ownerId
        url
        visibility
      }
      username
    }
    friendshipRequests {
      receiver
      sender
    }
    id
    lastName
    messages {
      dateTime
      id
      parentId
      reactions {
        dateTime
        id
        owner {
          firstName
          id
          lastName
          username
        }
        type
      }
      receiverId
      replies {
        dateTime
        id
        reactions {
          dateTime
          id
          owner {
            firstName
            id
            lastName
            username
          }
          type
        }
        receiverId
        senderId
        text
      }
      senderId
      text
    }
    placesHistory {
      ...PlaceData
    }
    posts {
      ...PostData
    }
    profilePhotos {
      comments {
        ...CommentData
      }
      dateTime
      description
      isCurrent
      id
      ownerId
      url
      visibility
    }
    relationshipStatus {
      status
      visibility
    }
    username
    workHistory {
      company
      from
      id
      position
      to
      visibility
    }
  }
`;
