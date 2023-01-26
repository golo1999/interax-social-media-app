const AUTHENTICATED_USER = {
  __typename: "User",
  id: "1",
  email: "darius.fieraru@mail.com",
  firstName: "Darius",
  lastName: "Fieraru",
  username: "darius.fieraru",
};

const PostsList = [
  {
    id: "post-0",
    canComment: "FRIENDS",
    canReact: "FRIENDS",
    canShare: "FRIENDS",
    canView: "FRIENDS",
    comments: [
      {
        id: "post-comment-0",
        dateTime: "Sun, 22 Jan 2023 18:02:47 GMT",
        owner: {
          id: "1",
          email: "darius.fieraru@mail.com",
          firstName: "Darius",
          lastName: "Fieraru",
          username: "darius.fieraru",
        },
        reactions: [
          {
            id: "post-comment-reaction-0",
            dateTime: "Sun, 22 Jan 2023 20:01:39 GMT",
            owner: {
              id: "0",
              email: "olivia.constantin@mail.com",
              firstName: "Olivia",
              lastName: "Constantin",
              username: "olivia.constantin",
            },
            type: "LIKE",
          },
        ],
        replies: [
          {
            id: "post-comment-reply-0",
            dateTime: "Mon, 23 Jan 2023 14:01:47 GMT",
            owner: {
              id: "0",
              email: "olivia.constantin@mail.com",
              firstName: "Olivia",
              lastName: "Constantin",
              username: "olivia.constantin",
            },
            reactions: null,
            replies: [
              {
                id: "post-comment-reply-0-1",
                dateTime: "Tue, 24 Jan 2023 15:27:58 GMT",
                owner: {
                  id: "1",
                  email: "darius.fieraru@mail.com",
                  firstName: "Darius",
                  lastName: "Fieraru",
                  username: "darius.fieraru",
                },
                reactions: null,
                replies: null,
                text: "ez",
              },
            ],
            text: "TY",
          },
        ],
        text: "So beautiful...",
      },
      {
        id: "post-comment-1",
        dateTime: "Tue, 24 Jan 2023 08:26:02 GMT",
        owner: {
          id: "0",
          email: "olivia.constantin@mail.com",
          firstName: "Olivia",
          lastName: "Constantin",
          username: "olivia.constantin",
        },
        reactions: null,
        text: "The best trip ever!",
      },
    ],
    dateTime: "Sun, 22 Jan 2023 17:43:07 GMT",
    owner: {
      id: "0",
      email: "olivia.constantin@mail.com",
      firstName: "Olivia",
      lastName: "Constantin",
      username: "olivia.constantin",
    },
    photo: null,
    reactions: [
      {
        id: "post-reaction-0",
        owner: {
          id: "1",
          email: "darius.fieraru@mail.com",
          firstName: "Darius",
          lastName: "Fieraru",
          username: "darius.fieraru",
        },
        type: "LOVE",
      },
    ],
    shares: [
      {
        id: "post-share-0",
        dateTime: "Sun, 22 Jan 2023 19:45:06 GMT",
        owner: {
          id: "1",
          email: "darius.fieraru@mail.com",
          firstName: "Darius",
          lastName: "Fieraru",
          username: "darius.fieraru",
        },
      },
    ],
    text: "Italy",
    video: null,
  },
];

const UsersList = [
  {
    id: "0",
    biography:
      "She's eager, responsible, polite and perhaps a little too uncontrolled.",
    birthDate: "22/03/2002",
    email: "olivia.constantin@mail.com",
    firstName: "Olivia",
    friends: [
      {
        id: "1",
        email: "darius.fieraru@mail.com",
        firstName: "Darius",
        lastName: "Fieraru",
        username: "darius.fieraru",
      },
      {
        id: "3",
        email: "gogu.filotti@mail.com",
        firstName: "Gogu",
        lastName: "Filotti",
        username: "gogu.filotti",
      },
    ],
    lastName: "Constantin",
    username: "olivia.constantin",
  },
  {
    id: "1",
    biography: null,
    birthDate: "13/05/2002",
    email: "darius.fieraru@mail.com",
    firstName: "Darius",
    friends: [
      {
        id: "0",
        email: "olivia.constantin@mail.com",
        firstName: "Olivia",
        lastName: "Constantin",
        username: "olivia.constantin",
      },
    ],
    lastName: "Fieraru",
    username: "darius.fieraru",
  },
  {
    id: "2",
    biography: "She was born in a loving family in an average port.",
    birthDate: "30/01/2005",
    email: "augustina.stanca@mail.com",
    firstName: "Augustina",
    friends: [],
    lastName: "Stanca",
    username: "augustina.stanca",
  },
  {
    id: "3",
    biography:
      "He's pensive, clever and independent. This is to be expected from somebody with his terrible past.",
    birthDate: "01/01/2000",
    email: "gogu.filotti@mail.com",
    firstName: "Gogu",
    friends: [
      {
        id: "0",
        email: "olivia.constantin@mail.com",
        firstName: "Olivia",
        lastName: "Constantin",
        username: "olivia.constantin",
      },
      {
        id: "4",
        email: "jean.rosetti@mail.com",
        firstName: "Jean",
        lastName: "Rosetti",
        username: "jean.rosetti",
      },
    ],
    lastName: "Filotti",
    username: "gogu.filotti",
  },
  {
    id: "4",
    biography:
      "With the lessons of the past, he now works on travelling and surviving of nature.",
    birthDate: "14/02/1998",
    email: "jean.rosetti@mail.com",
    firstName: "Jean",
    friends: [
      {
        id: "3",
        email: "gogu.filotti@mail.com",
        firstName: "Gogu",
        lastName: "Filotti",
        username: "gogu.filotti",
      },
    ],
    lastName: "Rosetti",
    username: "jean.rosetti",
  },
  {
    id: "5",
    biography:
      "She lost her father in an act of terrorism and was shunned. With a childhood friend she had to survive in a wicked world.",
    birthDate: "28/09/1997",
    email: "tereza.teodorescu@mail.com",
    firstName: "Tereza",
    friends: [],
    lastName: "Teodorescu",
    username: "tereza.teodorescu",
  },
];

module.exports = { AUTHENTICATED_USER, PostsList, UsersList };
