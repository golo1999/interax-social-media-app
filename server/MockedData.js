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
        id: "post-0-comment-0",
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
            id: "post-0-comment-0-reaction-0",
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
            id: "post-0-comment-0-reply-0",
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
                id: "post-0-comment-0-reply-0-reply-0",
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
              {
                id: "post-0-comment-0-reply-0-reply-1",
                dateTime: "Tue, 24 Jan 2023 16:29:51 GMT",
                owner: {
                  id: "1",
                  email: "darius.fieraru@mail.com",
                  firstName: "Darius",
                  lastName: "Fieraru",
                  username: "darius.fieraru",
                },
                reactions: null,
                replies: null,
                text: "lejerrr",
              },
            ],
            text: "TY",
          },
        ],
        text: "So beautiful...",
      },
      {
        id: "post-0-comment-1",
        dateTime: "Tue, 24 Jan 2023 08:26:02 GMT",
        owner: {
          id: "0",
          email: "olivia.constantin@mail.com",
          firstName: "Olivia",
          lastName: "Constantin",
          username: "olivia.constantin",
        },
        reactions: null,
        replies: null,
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
    photos: [
      {
        id: "post-0-photo-0",
        comments: null,
        ownerID: "0",
        postID: "post-0",
        reactions: null,
        shares: null,
        text: null,
        url: "https://cdn.britannica.com/82/195482-050-2373E635/Amalfi-Italy.jpg",
      },
      {
        id: "post-0-photo-1",
        comments: null,
        ownerID: "0",
        postID: "post-0",
        reactions: null,
        shares: null,
        text: null,
        url: "https://static.independent.co.uk/2021/08/10/15/iStock-1271579758.jpg",
      },
      {
        id: "post-0-photo-2",
        comments: null,
        ownerID: "0",
        postID: "post-0",
        reactions: null,
        shares: null,
        text: null,
        url: "https://deih43ym53wif.cloudfront.net/amalfi-italy-shutterstock_759048709_bdda191300.jpeg",
      },
      {
        id: "post-0-photo-3",
        comments: null,
        ownerID: "0",
        postID: "post-0",
        reactions: null,
        shares: null,
        text: null,
        url: "https://i0.wp.com/handluggageonly.co.uk/wp-content/uploads/2016/03/Positano-Weather.jpg?fit=1600%2C1066&ssl=1",
      },
      {
        id: "post-0-photo-4",
        comments: null,
        ownerID: "0",
        postID: "post-0",
        reactions: null,
        shares: null,
        text: null,
        url: "https://wise.com/imaginary/pros-and-cons-living-in-italy.jpg",
      },
    ],
    reactions: [
      {
        id: "post-0-reaction-0",
        owner: {
          id: "0",
          email: "olivia.constantin@mail.com",
          firstName: "Olivia",
          lastName: "Constantin",
          username: "olivia.constantin",
        },
        type: "LOVE",
      },
      {
        id: "post-0-reaction-1",
        owner: {
          id: "0",
          email: "olivia.constantin@mail.com",
          firstName: "Olivia",
          lastName: "Constantin",
          username: "olivia.constantin",
        },
        type: "LOVE",
      },
      {
        id: "post-0-reaction-2",
        owner: {
          id: "0",
          email: "olivia.constantin@mail.com",
          firstName: "Olivia",
          lastName: "Constantin",
          username: "olivia.constantin",
        },
        type: "LOVE",
      },
      {
        id: "post-0-reaction-3",
        owner: {
          id: "0",
          email: "olivia.constantin@mail.com",
          firstName: "Olivia",
          lastName: "Constantin",
          username: "olivia.constantin",
        },
        type: "LOVE",
      },
      {
        id: "post-0-reaction-4",
        owner: {
          id: "0",
          email: "olivia.constantin@mail.com",
          firstName: "Olivia",
          lastName: "Constantin",
          username: "olivia.constantin",
        },
        type: "LOVE",
      },
      {
        id: "post-0-reaction-5",
        owner: {
          id: "0",
          email: "olivia.constantin@mail.com",
          firstName: "Olivia",
          lastName: "Constantin",
          username: "olivia.constantin",
        },
        type: "LOVE",
      },
      {
        id: "post-0-reaction-6",
        owner: {
          id: "0",
          email: "olivia.constantin@mail.com",
          firstName: "Olivia",
          lastName: "Constantin",
          username: "olivia.constantin",
        },
        type: "LOVE",
      },
      {
        id: "post-0-reaction-7",
        owner: {
          id: "0",
          email: "olivia.constantin@mail.com",
          firstName: "Olivia",
          lastName: "Constantin",
          username: "olivia.constantin",
        },
        type: "LOVE",
      },
      {
        id: "post-0-reaction-8",
        owner: {
          id: "0",
          email: "olivia.constantin@mail.com",
          firstName: "Olivia",
          lastName: "Constantin",
          username: "olivia.constantin",
        },
        type: "LOVE",
      },
      {
        id: "post-0-reaction-9",
        owner: {
          id: "0",
          email: "olivia.constantin@mail.com",
          firstName: "Olivia",
          lastName: "Constantin",
          username: "olivia.constantin",
        },
        type: "LOVE",
      },
      {
        id: "post-0-reaction-10",
        owner: {
          id: "0",
          email: "olivia.constantin@mail.com",
          firstName: "Olivia",
          lastName: "Constantin",
          username: "olivia.constantin",
        },
        type: "LOVE",
      },
      {
        id: "post-0-reaction-11",
        owner: {
          id: "0",
          email: "olivia.constantin@mail.com",
          firstName: "Olivia",
          lastName: "Constantin",
          username: "olivia.constantin",
        },
        type: "LOVE",
      },
      {
        id: "post-0-reaction-12",
        owner: {
          id: "0",
          email: "olivia.constantin@mail.com",
          firstName: "Olivia",
          lastName: "Constantin",
          username: "olivia.constantin",
        },
        type: "LOVE",
      },
      {
        id: "post-0-reaction-13",
        owner: {
          id: "0",
          email: "olivia.constantin@mail.com",
          firstName: "Olivia",
          lastName: "Constantin",
          username: "olivia.constantin",
        },
        type: "LOVE",
      },
      {
        id: "post-0-reaction-14",
        owner: {
          id: "0",
          email: "olivia.constantin@mail.com",
          firstName: "Olivia",
          lastName: "Constantin",
          username: "olivia.constantin",
        },
        type: "LOVE",
      },
      {
        id: "post-0-reaction-15",
        owner: {
          id: "0",
          email: "olivia.constantin@mail.com",
          firstName: "Olivia",
          lastName: "Constantin",
          username: "olivia.constantin",
        },
        type: "LOVE",
      },
      {
        id: "post-0-reaction-16",
        owner: {
          id: "0",
          email: "olivia.constantin@mail.com",
          firstName: "Olivia",
          lastName: "Constantin",
          username: "olivia.constantin",
        },
        type: "SAD",
      },
      {
        id: "post-0-reaction-17",
        owner: {
          id: "0",
          email: "olivia.constantin@mail.com",
          firstName: "Olivia",
          lastName: "Constantin",
          username: "olivia.constantin",
        },
        type: "LIKE",
      },
      {
        id: "post-0-reaction-18",
        owner: {
          id: "0",
          email: "olivia.constantin@mail.com",
          firstName: "Olivia",
          lastName: "Constantin",
          username: "olivia.constantin",
        },
        type: "WOW",
      },
      {
        id: "post-0-reaction-19",
        owner: {
          id: "0",
          email: "olivia.constantin@mail.com",
          firstName: "Olivia",
          lastName: "Constantin",
          username: "olivia.constantin",
        },
        type: "HAHA",
      },
      {
        id: "post-0-reaction-20",
        owner: {
          id: "0",
          email: "olivia.constantin@mail.com",
          firstName: "Olivia",
          lastName: "Constantin",
          username: "olivia.constantin",
        },
        type: "HAHA",
      },
      {
        id: "post-0-reaction-21",
        owner: {
          id: "0",
          email: "olivia.constantin@mail.com",
          firstName: "Olivia",
          lastName: "Constantin",
          username: "olivia.constantin",
        },
        type: "LOVE",
      },
      {
        id: "post-0-reaction-22",
        owner: {
          id: "0",
          email: "olivia.constantin@mail.com",
          firstName: "Olivia",
          lastName: "Constantin",
          username: "olivia.constantin",
        },
        type: "LOVE",
      },
      {
        id: "post-0-reaction-23",
        owner: {
          id: "0",
          email: "olivia.constantin@mail.com",
          firstName: "Olivia",
          lastName: "Constantin",
          username: "olivia.constantin",
        },
        type: "LOVE",
      },
      {
        id: "post-0-reaction-24",
        owner: {
          id: "0",
          email: "olivia.constantin@mail.com",
          firstName: "Olivia",
          lastName: "Constantin",
          username: "olivia.constantin",
        },
        type: "WOW",
      },
      {
        id: "post-0-reaction-25",
        owner: {
          id: "0",
          email: "olivia.constantin@mail.com",
          firstName: "Olivia",
          lastName: "Constantin",
          username: "olivia.constantin",
        },
        type: "LOVE",
      },
      {
        id: "post-0-reaction-26",
        owner: {
          id: "0",
          email: "olivia.constantin@mail.com",
          firstName: "Olivia",
          lastName: "Constantin",
          username: "olivia.constantin",
        },
        type: "LOVE",
      },
      {
        id: "post-0-reaction-27",
        owner: {
          id: "0",
          email: "olivia.constantin@mail.com",
          firstName: "Olivia",
          lastName: "Constantin",
          username: "olivia.constantin",
        },
        type: "LOVE",
      },
    ],
    shares: [
      {
        id: "post-0-share-0",
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
  {
    id: "post-1",
    canComment: "FRIENDS",
    canReact: "FRIENDS",
    canShare: "FRIENDS",
    canView: "FRIENDS",
    comments: null,
    dateTime: "Thu, 02 Feb 2023 08:21:49 GMT",
    owner: {
      id: "0",
      email: "olivia.constantin@mail.com",
      firstName: "Olivia",
      lastName: "Constantin",
      username: "olivia.constantin",
    },
    photos: null,
    reactions: null,
    shares: null,
    text: "Hello World!",
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
