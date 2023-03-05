import { gql } from "@apollo/client";

export const ADD_COMMENT_REACTION = gql`
  mutation AddCommentReaction($input: AddCommentReactionInput!) {
    addCommentReaction(input: $input) {
      id
      dateTime
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

export const ADD_COMMENT_REPLY = gql`
  mutation AddCommentReply($input: AddCommentReplyInput!) {
    addCommentReply(input: $input) {
      dateTime
      id
      owner {
        firstName
        id
        lastName
        username
      }
      text
    }
  }
`;

export const ADD_POST_COMMENT = gql`
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

export const ADD_POST_REACTION = gql`
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

export const ADD_USER_COLLEGE_EDUCATION = gql`
  mutation AddUserCollegeEducation($input: AddUserCollegeEducationInput!) {
    addUserCollegeEducation(input: $input) {
      degree
      from {
        day
        month
        year
      }
      graduated
      id
      level
      school
      to {
        day
        month
        year
      }
      visibility
    }
  }
`;

export const ADD_USER_HIGH_SCHOOL_EDUCATION = gql`
  mutation AddUserHighSchoolEducation(
    $input: AddUserHighSchoolEducationInput!
  ) {
    addUserHighSchoolEducation(input: $input) {
      degree
      from {
        day
        month
        year
      }
      graduated
      id
      level
      school
      to {
        day
        month
        year
      }
      visibility
    }
  }
`;

export const ADD_USER_PLACE = gql`
  mutation AddUserPlace($input: AddUserPlaceInput!) {
    addUserPlace(input: $input) {
      city
      from {
        day
        month
        year
      }
      id
      isCurrent
      to {
        day
        month
        year
      }
      visibility
    }
  }
`;

export const ADD_USER_RELATIONSHIP_STATUS = gql`
  mutation AddUserRelationshipStatus($input: AddUserRelationshipStatusInput!) {
    addUserRelationshipStatus(input: $input) {
      status
      visibility
    }
  }
`;

export const ADD_USER_WORKPLACE = gql`
  mutation AddUserWorkplace($input: AddUserWorkplaceInput!) {
    addUserWorkplace(input: $input) {
      company
      from {
        day
        month
        year
      }
      id
      position
      to {
        day
        month
        year
      }
      visibility
    }
  }
`;

export const GET_AUTHENTICATED_USER = gql`
  query GetAuthenticatedUser {
    authenticatedUser {
      email
      firstName
      id
      lastName
      username
    }
  }
`;

export const GET_AUTHENTICATED_USER_WITH_FRIENDS = gql`
  query GetAuthenticatedUser {
    authenticatedUser {
      email
      firstName
      friends {
        firstName
        id
        lastName
        username
      }
      id
      lastName
      username
    }
  }
`;

export const GET_COMMENT = gql`
  fragment CommentData on Comment {
    dateTime
    id
    owner {
      email
      firstName
      id
      lastName
      username
    }
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
        username
      }
      text
    }
    text
  }

  query GetComment($id: ID!) {
    comment(id: $id) {
      ...CommentData
    }
  }
`;

export const GET_COMMENT_REPLIES = gql`
  fragment CommentData on Comment {
    dateTime
    id
    owner {
      email
      firstName
      id
      lastName
      username
    }
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
        username
      }
      text
    }
    text
  }

  query GetCommentReplies($commentId: ID!) {
    commentReplies(commentId: $commentId) {
      ...CommentData
    }
  }
`;

export const GET_FRIENDS_POSTS_BY_USER_ID = gql`
  fragment CommentData on Comment {
    dateTime
    id
    owner {
      email
      firstName
      id
      lastName
      username
    }
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
        username
      }
      text
    }
    text
  }

  query GetFriendsPostsByOwnerId($ownerId: ID!) {
    friendsPostsByOwnerId(ownerId: $ownerId) {
      canComment
      canReact
      canShare
      canView
      comments {
        ...CommentData
      }
      dateTime
      id
      owner {
        firstName
        id
        lastName
        username
      }
      parentId
      photos {
        id
        ownerId
        postId
        text
        url
      }
      reactions {
        owner {
          firstName
          id
          lastName
          username
        }
        type
      }
      shares {
        owner {
          firstName
          lastName
          username
        }
      }
      text
      video
    }
  }
`;

export const GET_POST = gql`
  fragment CommentData on Comment {
    dateTime
    id
    owner {
      email
      firstName
      id
      lastName
      username
    }
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
        username
      }
      text
    }
    text
  }

  fragment PostData on Post {
    canComment
    canReact
    canShare
    canView
    comments {
      ...CommentData
    }
    dateTime
    id
    owner {
      firstName
      id
      lastName
      username
    }
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
    shares {
      owner {
        firstName
        lastName
        username
      }
    }
    text
    video
  }

  query GetPost($id: ID!) {
    post(id: $id) {
      ...PostData
    }
  }
`;

export const GET_USER_BY_USERNAME = gql`
  fragment CommentData on Comment {
    dateTime
    id
    owner {
      email
      firstName
      id
      lastName
      username
    }
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
        username
      }
      text
    }
    text
  }

  fragment PlaceData on Place {
    city
    from {
      day
      month
      year
    }
    id
    isCurrent
    to {
      day
      month
      year
    }
    visibility
  }

  fragment PostData on Post {
    canComment
    canReact
    canShare
    canView
    comments {
      ...CommentData
    }
    dateTime
    id
    owner {
      firstName
      id
      lastName
      username
    }
    photos {
      id
      ownerId
      postId
      text
      url
    }
    reactions {
      owner {
        firstName
        id
        lastName
        username
      }
      type
    }
    shares {
      owner {
        firstName
        lastName
        username
      }
    }
    text
    video
  }

  query GetUserByUsername($username: String!) {
    userByUsername(username: $username) {
      biography
      birthDate
      educationHistory {
        degree
        from {
          day
          month
          year
        }
        graduated
        id
        level
        school
        to {
          day
          month
          year
        }
        visibility
      }
      email
      firstName
      friends {
        firstName
        id
        lastName
        username
      }
      id
      lastName
      placesHistory {
        ...PlaceData
      }
      posts {
        ...PostData
      }
      relationshipStatus {
        status
        visibility
      }
      username
      workHistory {
        company
        from {
          day
          month
          year
        }
        id
        position
        to {
          day
          month
          year
        }
        visibility
      }
    }
  }
`;

export const GET_USER_FRIENDS_BY_USERNAME = gql`
  query GetUserFriendsByUsername($username: String!) {
    userFriendsByUsername(username: $username) {
      firstName
      id
      lastName
      username
    }
  }
`;

export const REMOVE_COMMENT = gql`
  fragment CommentData on Comment {
    dateTime
    id
    owner {
      email
      firstName
      id
      lastName
      username
    }
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
        username
      }
      text
    }
    text
  }

  mutation RemoveComment($id: ID!) {
    removeComment(id: $id) {
      ...CommentData
    }
  }
`;

export const REMOVE_COMMENT_REACTION = gql`
  mutation RemoveCommentReaction($input: RemoveCommentReactionInput!) {
    removeCommentReaction(input: $input) {
      id
      dateTime
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

export const REMOVE_COMMENT_REPLY = gql`
  mutation RemoveCommentReply($input: RemoveCommentReplyInput!) {
    removeCommentReply(input: $input) {
      dateTime
      id
      owner {
        firstName
        id
        lastName
        username
      }
      text
    }
  }
`;

export const REMOVE_POST_REACTION = gql`
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

export const UPDATE_COMMENT_REACTION = gql`
  mutation UpdateCommentReaction($input: UpdateCommentReactionInput!) {
    updateCommentReaction(input: $input) {
      id
      dateTime
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

export const UPDATE_POST_REACTION = gql`
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

export const UPDATE_USER_PLACE = gql`
  fragment PlaceData on Place {
    city
    from {
      day
      month
      year
    }
    id
    isCurrent
    to {
      day
      month
      year
    }
    visibility
  }

  mutation UpdateUserPlace($input: UpdateUserPlaceInput!) {
    updateUserPlace(input: $input) {
      ...PlaceData
    }
  }
`;
