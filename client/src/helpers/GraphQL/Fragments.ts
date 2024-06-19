import { gql } from "@apollo/client";

export const COLLEGE_EDUCATION_DATA = gql`
  fragment CollegeEducationData on CollegeEducation {
    degree
    from
    graduated
    id
    level
    school
    to
    userId
    visibility
  }
`;

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
    parentId
    post {
      id
    }
    postId
    reactions {
      commentId
      dateTime
      id
      reactionType
      userId
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
    repliesCount
    text
    topLevelParentId
  }
`;

export const CONVERSATION_DATA = gql`
  fragment ConversationData on Conversation {
    emoji
    first
    firstNickname
    id
    second
    secondNickname
    theme
  }
`;

export const HIGH_SCHOOL_EDUCATION_DATA = gql`
  fragment HighSchoolEducationData on HighSchoolEducation {
    from
    graduated
    id
    level
    school
    to
    userId
    visibility
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
    commentsCount
    dateTime
    id
    owner {
      firstName
      id
      lastName
      profilePhoto {
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
      dateTime
      id
      postId
      reactionType
      userId
    }
    receiver {
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
    receiverId
    shares {
      owner {
        firstName
        lastName
        username
      }
    }
    text
    topLevelCommentsCount
    video
    visibility
  }
`;

export const USER_DATA = gql`
  fragment UserData on User {
    biography
    birthDate
    blockedUsers {
      firstName
      id
      lastName
      username
    }
    coverPhoto {
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
      ... on CollegeEducation {
        ...CollegeEducationData
      }
      ... on HighSchoolEducation {
        ...HighSchoolEducationData
      }
    }
    email
    firstName
    followingUsers {
      id
      username
    }
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
      profilePhoto {
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
    hiddenPosts {
      ...PostData
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
    photos {
      comments {
        ...CommentData
      }
      dateTime
      description
      id
      ownerId
      url
      visibility
    }
    placesHistory {
      ...PlaceData
    }
    posts {
      ...PostData
    }
    profilePhoto {
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
    savedPosts {
      ...PostData
    }
    username
    workHistory {
      company
      from
      id
      isCurrent
      position
      to
      visibility
    }
  }
`;
