const ConversationTheme = {
  BLOOD: "BLOOD",
  CHINESE_YELLOW: "CHINESE_YELLOW",
  DEFAULT: "DEFAULT",
  INDIGO: "INDIGO",
  MAXIMUM_BLUE_PURPLE: "MAXIMUM_BLUE_PURPLE",
  OCEAN_BLUE: "OCEAN_BLUE",
  PURPLE_PIZZAZZ: "PURPLE_PIZZAZZ",
  RED: "RED",
  SUNSET_ORANGE: "SUNSET_ORANGE",
  SWEET_BROWN: "SWEET_BROWN",
  VERY_LIGH_BLUE: "VERY_LIGH_BLUE",
  VIVID_MALACHITE: "VIVID_MALACHITE",
};
const EducationLevel = { COLLEGE: "COLLEGE", HIGH_SCHOOL: "HIGH_SCHOOL" };
const Emoji = { LIKE: "LIKE", LOVE: "LOVE" };
const MediaType = { PHOTO: "PHOTO", VIDEO: "VIDEO" };
const Permission = {
  FRIENDS: "FRIENDS",
  ONLY_ME: "ONLY_ME",
  PUBLIC: "PUBLIC",
};
const RelationshipStatus = {
  SINGLE: "SINGLE",
  IN_A_RELATIONSHIP: "IN_A_RELATIONSHIP",
  ENGAGED: "ENGAGED",
  MARRIED: "MARRIED",
  IN_A_CIVIL_UNION: "IN_A_CIVIL_UNION",
  IN_A_DOMESTIC_PARTNERSHIP: "IN_A_DOMESTIC_PARTNERSHIP",
  IN_AN_OPEN_RELATIONSHIP: "IN_AN_OPEN_RELATIONSHIP",
  IT_IS_COMPLICATED: "IT_IS_COMPLICATED",
  SEPARATED: "SEPARATED",
  DIVORCED: "DIVORCED",
  WIDOWED: "WIDOWED",
};

const BLOCKED_USERS_LIST = [];

const COMMENTS_LIST = [
  {
    id: "post-0-comment-0",
    dateTime: "1674410567000",
    owner: {
      id: "1",
      email: "darius.fieraru@mail.com",
      firstName: "Darius",
      lastName: "Fieraru",
      username: "darius.fieraru",
    },
    ownerId: "1",
    postId: "post-0",
    reactions: [
      {
        id: "post-0-comment-0-reaction-0",
        dateTime: "1674417699000",
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
        dateTime: "1674482507000",
        owner: {
          id: "0",
          email: "olivia.constantin@mail.com",
          firstName: "Olivia",
          lastName: "Constantin",
          username: "olivia.constantin",
        },
        ownerId: "0",
        postId: "post-0",
        reactions: null,
        replies: [
          {
            id: "post-0-comment-0-reply-0-reply-0",
            dateTime: "1674574078000",
            owner: {
              id: "1",
              email: "darius.fieraru@mail.com",
              firstName: "Darius",
              lastName: "Fieraru",
              username: "darius.fieraru",
            },
            ownerId: "1",
            postId: "post-0",
            reactions: null,
            replies: null,
            text: "ez",
          },
          {
            id: "post-0-comment-0-reply-0-reply-1",
            dateTime: "1674577791000",
            owner: {
              id: "1",
              email: "darius.fieraru@mail.com",
              firstName: "Darius",
              lastName: "Fieraru",
              username: "darius.fieraru",
            },
            ownerId: "1",
            postId: "post-0",
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
    dateTime: "1674548762000",
    owner: {
      id: "0",
      email: "olivia.constantin@mail.com",
      firstName: "Olivia",
      lastName: "Constantin",
      username: "olivia.constantin",
    },
    ownerId: "0",
    postId: "post-0",
    reactions: null,
    replies: null,
    text: "The best trip ever!",
  },
];

/* COMMENTS_LIST with parentId
const COMMENTS_LIST = [
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
    parentId: null,
    postId: "post-0",
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
    parentId: null,
    postId: "post-0",
    reactions: null,
    replies: null,
    text: "The best trip ever!",
  },
  {
    id: "post-0-comment-2",
    dateTime: "Mon, 23 Jan 2023 14:01:47 GMT",
    owner: {
      id: "0",
      email: "olivia.constantin@mail.com",
      firstName: "Olivia",
      lastName: "Constantin",
      username: "olivia.constantin",
    },
    parentId: "post-0-comment-0",
    postId: "post-0",
    reactions: null,
    text: "TY",
  },
  {
    id: "post-0-comment-3",
    dateTime: "Tue, 24 Jan 2023 15:27:58 GMT",
    owner: {
      id: "1",
      email: "darius.fieraru@mail.com",
      firstName: "Darius",
      lastName: "Fieraru",
      username: "darius.fieraru",
    },
    parentId: "post-0-comment-2",
    postId: "post-0",
    reactions: null,
    replies: null,
    text: "ez",
  },
  {
    id: "post-0-comment-4",
    dateTime: "Tue, 24 Jan 2023 16:29:51 GMT",
    owner: {
      id: "1",
      email: "darius.fieraru@mail.com",
      firstName: "Darius",
      lastName: "Fieraru",
      username: "darius.fieraru",
    },
    parentId: "post-0-comment-2",
    postId: "post-0",
    reactions: null,
    replies: null,
    text: "lejerrr",
  },
];
*/

const CommentReactionsList = [];

const CommentRepliesList = [];

const CONVERSATIONS_LIST = [
  {
    emoji: Emoji.LOVE,
    files: [
      { name: "FILE1.docx", size: 130840 },
      { name: "FILE2.pdf", size: 149533 },
      { name: "FILE3.c", size: 1072 },
      {
        name: "FILE4.tsx",
        size: 500,
      },
    ],
    first: "0",
    firstNickname: "Oliviaaa",
    media: [
      {
        type: MediaType.PHOTO,
        url: "https://cdn.britannica.com/82/195482-050-2373E635/Amalfi-Italy.jpg",
      },
      {
        type: MediaType.PHOTO,
        url: "https://deih43ym53wif.cloudfront.net/amalfi-italy-shutterstock_759048709_bdda191300.jpeg",
      },
      {
        type: MediaType.PHOTO,
        url: "https://i0.wp.com/handluggageonly.co.uk/wp-content/uploads/2016/03/Positano-Weather.jpg?fit=1600%2C1066&ssl=1",
      },
      {
        type: MediaType.PHOTO,
        url: "https://wise.com/imaginary/pros-and-cons-living-in-italy.jpg",
      },
      {
        type: MediaType.VIDEO,
        url: "https://ia800300.us.archive.org/17/items/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
      },
      {
        type: MediaType.PHOTO,
        url: "https://i0.wp.com/www.nothingfamiliar.com/wp-content/uploads/2022/02/Things-to-do-in-Venice-Italy.jpg",
      },
      {
        type: MediaType.PHOTO,
        url: "https://static.independent.co.uk/2021/08/10/15/iStock-1271579758.jpg",
      },
    ],
    second: "1",
    secondNickname: "Dariusss",
    theme: ConversationTheme.VIVID_MALACHITE,
  },
];

/*
emoji: Emoji!
    first: ID!
    firstNickname: String
    second: ID!
    secondNickname: String
    theme: ConversationTheme!
*/

const FOLLOWING_USERS_LIST = [
  {
    followingUsers: [
      "1",
      "3",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
      "32",
      "33",
      "34",
      "35",
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "47",
      "48",
      "49",
      "50",
    ],
    userId: "0",
  },
  { followingUsers: ["0"], userId: "1" },
  { followingUsers: ["0", "4"], userId: "3" },
  { followingUsers: ["3"], userId: "4" },
  { followingUsers: ["0"], userId: "6" },
  { followingUsers: ["0"], userId: "7" },
  { followingUsers: ["0"], userId: "8" },
  { followingUsers: ["0"], userId: "9" },
  { followingUsers: ["0"], userId: "10" },
];

const FRIEND_REQUESTS_LIST = [
  { receiver: "1", sender: "2" },
  { receiver: "1", sender: "3" },
  { receiver: "1", sender: "4" },
  { receiver: "1", sender: "6" },
  { receiver: "1", sender: "7" },
  { receiver: "1", sender: "8" },
  { receiver: "1", sender: "9" },
  { receiver: "1", sender: "10" },
  { receiver: "1", sender: "11" },
  { receiver: "1", sender: "12" },
  { receiver: "1", sender: "13" },
  { receiver: "1", sender: "14" },
  { receiver: "1", sender: "15" },
  { receiver: "1", sender: "16" },
  { receiver: "1", sender: "17" },
  { receiver: "1", sender: "18" },
  { receiver: "1", sender: "19" },
  { receiver: "1", sender: "20" },
  { receiver: "1", sender: "21" },
  { receiver: "1", sender: "22" },
  { receiver: "1", sender: "23" },
  { receiver: "1", sender: "24" },
  { receiver: "1", sender: "25" },
  { receiver: "1", sender: "26" },
  { receiver: "1", sender: "27" },
  { receiver: "1", sender: "28" },
  { receiver: "1", sender: "29" },
  { receiver: "1", sender: "30" },
  { receiver: "1", sender: "31" },
  { receiver: "5", sender: "1" },
];

const FRIENDS_LIST = [
  { first: "0", second: "1" },
  { first: "0", second: "3" },
  { first: "3", second: "4" },
  { first: "0", second: "6" },
  { first: "0", second: "7" },
  { first: "0", second: "8" },
  { first: "0", second: "9" },
  { first: "0", second: "10" },
  { first: "0", second: "11" },
  { first: "0", second: "12" },
  { first: "0", second: "13" },
  { first: "0", second: "14" },
  { first: "0", second: "15" },
  { first: "0", second: "16" },
  { first: "0", second: "17" },
  { first: "0", second: "18" },
  { first: "0", second: "19" },
  { first: "0", second: "20" },
  { first: "0", second: "21" },
  { first: "0", second: "22" },
  { first: "0", second: "23" },
  { first: "0", second: "24" },
  { first: "0", second: "25" },
  { first: "0", second: "26" },
  { first: "0", second: "27" },
  { first: "0", second: "28" },
  { first: "0", second: "29" },
  { first: "0", second: "30" },
  { first: "0", second: "31" },
  { first: "0", second: "32" },
  { first: "0", second: "33" },
  { first: "0", second: "34" },
  { first: "0", second: "35" },
  { first: "0", second: "36" },
  { first: "0", second: "37" },
  { first: "0", second: "38" },
  { first: "0", second: "39" },
  { first: "0", second: "40" },
  { first: "0", second: "41" },
  { first: "0", second: "42" },
  { first: "0", second: "43" },
  { first: "0", second: "44" },
  { first: "0", second: "45" },
  { first: "0", second: "46" },
  { first: "0", second: "47" },
  { first: "0", second: "48" },
  { first: "0", second: "49" },
  { first: "0", second: "50" },
];

const HIDDEN_POSTS_LIST = [];

const MESSAGES_LIST = [
  {
    id: `message-0`,
    dateTime: "1679322704000",
    reactions: null,
    receiverId: "0",
    replies: null,
    senderId: "1",
    text: "Hello, Olivia!",
  },
  {
    id: `message-1`,
    dateTime: "1679322715000",
    reactions: null,
    receiverId: "0",
    replies: null,
    senderId: "1",
    text: "How was your trip?",
  },
  {
    id: `message-2`,
    dateTime: "1679323443000",
    reactions: null,
    receiverId: "1",
    replies: null,
    senderId: "0",
    text: "Hey! It was beautiful!",
  },
];

const POST_PHOTOS_LIST = [
  {
    id: "post-0-photo-0",
    comments: null,
    ownerId: "0",
    postId: "post-0",
    reactions: null,
    shares: null,
    text: null,
    url: "https://cdn.britannica.com/82/195482-050-2373E635/Amalfi-Italy.jpg",
  },
  {
    id: "post-0-photo-1",
    comments: null,
    ownerId: "0",
    postId: "post-0",
    reactions: null,
    shares: null,
    text: null,
    url: "https://static.independent.co.uk/2021/08/10/15/iStock-1271579758.jpg",
  },
  {
    id: "post-0-photo-2",
    comments: null,
    ownerId: "0",
    postId: "post-0",
    reactions: null,
    shares: null,
    text: null,
    url: "https://deih43ym53wif.cloudfront.net/amalfi-italy-shutterstock_759048709_bdda191300.jpeg",
  },
  {
    id: "post-0-photo-3",
    comments: null,
    ownerId: "0",
    postId: "post-0",
    reactions: null,
    shares: null,
    text: null,
    url: "https://i0.wp.com/handluggageonly.co.uk/wp-content/uploads/2016/03/Positano-Weather.jpg?fit=1600%2C1066&ssl=1",
  },
  {
    id: "post-0-photo-4",
    comments: null,
    ownerId: "0",
    postId: "post-0",
    reactions: null,
    shares: null,
    text: null,
    url: "https://wise.com/imaginary/pros-and-cons-living-in-italy.jpg",
  },
  {
    id: "post-0-photo-5",
    comments: null,
    ownerId: "0",
    postId: "post-0",
    reactions: null,
    shares: null,
    text: null,
    url: "https://i0.wp.com/www.nothingfamiliar.com/wp-content/uploads/2022/02/Things-to-do-in-Venice-Italy.jpg",
  },
];

const PostReactionsList = [];

const PostSharesList = [];

const POSTS_LIST = [
  {
    id: "post-0",
    canComment: "FRIENDS",
    canReact: "FRIENDS",
    canShare: "FRIENDS",
    dateTime: "1674409387000",
    owner: {
      id: "0",
      email: "olivia.constantin@mail.com",
      firstName: "Olivia",
      lastName: "Constantin",
      username: "olivia.constantin",
    },
    ownerId: "0",
    parentId: null,
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
    ],
    receiverId: "0",
    receiverUsername: "olivia.constantin",
    shares: [
      {
        id: "post-0-share-0",
        dateTime: "1674416706000",
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
    visibility: Permission.FRIENDS,
  },
  {
    id: "post-1",
    canComment: "FRIENDS",
    canReact: "FRIENDS",
    canShare: "FRIENDS",
    dateTime: "1675326109000",
    owner: {
      id: "0",
      email: "olivia.constantin@mail.com",
      firstName: "Olivia",
      lastName: "Constantin",
      username: "olivia.constantin",
    },
    ownerId: "0",
    parentId: null,
    photos: null,
    reactions: null,
    receiverId: "0",
    receiverUsername: "olivia.constantin",
    shares: null,
    text: "Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!",
    video: null,
    visibility: Permission.PUBLIC,
  },
];

const SAVED_POSTS_LIST = [{ savedPosts: ["post-0"], userId: "1" }];

const USERS_LIST = [
  {
    id: "0",
    biography:
      "She's eager, responsible, polite and perhaps a little too uncontrolled.",
    birthDate: "1016755200000",
    coverPhotos: [
      {
        id: "cover-photo-0",
        dateTime: "1678091206000",
        isCurrent: true,
        ownerId: "1",
        reactions: null,
        shares: null,
        url: "https://images.squarespace-cdn.com/content/v1/5982fa4fe58c62cb28091fa4/1567505544067-0M3OWGQ6TJ9J33WYXHGO/image-asset.jpeg",
        visibility: Permission.PUBLIC,
      },
      {
        id: "cover-photo-1",
        dateTime: "1677534451000",
        ownerId: "1",
        reactions: null,
        shares: null,
        url: "https://s27363.pcdn.co/wp-content/uploads/2022/12/Northern-Italy-Itinerary.jpg.optimal.jpg",
        visibility: Permission.PUBLIC,
      },
    ],
    educationHistory: [
      {
        id: "0",
        degree: "MOCKED_DOMAIN",
        from: "1666656000000",
        level: EducationLevel.COLLEGE,
        school: "MOCKED_COLLEGE",
        visibility: Permission.PUBLIC,
      },
      {
        id: "1",
        degree: "MOCKED_DOMAIN",
        from: "1540252800000",
        graduated: true,
        level: EducationLevel.COLLEGE,
        school: "MOCKED_COLLEGE",
        to: "1658275200000",
        visibility: Permission.FRIENDS,
      },
      {
        id: "2",
        from: "1413244800000",
        graduated: true,
        level: EducationLevel.HIGH_SCHOOL,
        school: "MOCKED_HIGH_SCHOOL",
        to: "1530316800000",
        visibility: Permission.ONLY_ME,
      },
    ],
    email: "olivia.constantin@mail.com",
    firstName: "Olivia",
    lastName: "Constantin",
    placesHistory: [
      {
        id: "0",
        city: "MOCKED_CITY",
        from: "1659312000000",
        isCurrent: true,
        visibility: Permission.PUBLIC,
      },
    ],
    profilePhotos: [
      {
        id: "profile-photo-0",
        dateTime: "1677963742000",
        isCurrent: true,
        ownerId: "1",
        reactions: null,
        shares: null,
        url: "https://theworldpursuit.com/wp-content/uploads/2021/10/Grindelwald-switzerland.jpeg",
        visibility: Permission.PUBLIC,
      },
    ],
    relationshipStatus: {
      status: RelationshipStatus.IT_IS_COMPLICATED,
      visibility: Permission.FRIENDS,
    },
    username: "olivia.constantin",
    workHistory: [
      {
        id: "0",
        company: "MOCKED_COMPANY",
        from: "1659312000000",
        position: "MOCKED_POSITION_1",
        to: "1675209600000",
        visibility: Permission.FRIENDS,
      },
      {
        id: "1",
        company: "MOCKED_COMPANY",
        from: "1675296000000",
        isCurrent: true,
        position: "MOCKED_POSITION_2",
        visibility: Permission.ONLY_ME,
      },
    ],
  },
  {
    id: "1",
    birthDate: "1021248000000",
    email: "darius.fieraru@mail.com",
    firstName: "Darius",
    lastName: "Fieraru",
    username: "darius.fieraru",
  },
  {
    id: "2",
    biography: "She was born in a loving family in an average port.",
    birthDate: "1107043200000",
    email: "augustina.stanca@mail.com",
    firstName: "Augustina",
    lastName: "Stanca",
    username: "augustina.stanca",
  },
  {
    id: "3",
    biography:
      "He's pensive, clever and independent. This is to be expected from somebody with his terrible past.",
    birthDate: "946684800000",
    email: "gogu.filotti@mail.com",
    firstName: "Gogu",
    lastName: "Filotti",
    username: "gogu.filotti",
  },
  {
    id: "4",
    biography:
      "With the lessons of the past, he now works on travelling and surviving of nature.",
    birthDate: "887414400000",
    email: "jean.rosetti@mail.com",
    firstName: "Jean",
    lastName: "Rosetti",
    username: "jean.rosetti",
  },
  {
    id: "5",
    biography:
      "She lost her father in an act of terrorism and was shunned. With a childhood friend she had to survive in a wicked world.",
    birthDate: "875404800000",
    email: "tereza.teodorescu@mail.com",
    firstName: "Tereza",
    lastName: "Teodorescu",
    username: "tereza.teodorescu",
  },
  {
    id: "6",
    birthDate: "984787200000",
    email: "laura.dita@mail.com",
    firstName: "Laura",
    lastName: "Dita",
    username: "laura.dita",
  },
  {
    id: "7",
    birthDate: "1015804800000",
    email: "silvia.voiculescu@mail.com",
    firstName: "Silvia",
    lastName: "Voiculescu",
    username: "silvia.voiculescu",
  },
  {
    id: "8",
    birthDate: "947894400000",
    email: "antonio.stancu@mail.com",
    firstName: "Antonio",
    lastName: "Stancu",
    username: "antonio.stancu",
  },
  {
    id: "9",
    birthDate: "963792000000",
    email: "dan.manea@mail.com",
    firstName: "Dan",
    lastName: "Manea",
    username: "dan.manea",
  },
  {
    id: "10",
    birthDate: "1063756800000",
    email: "viorela.raducan@mail.com",
    firstName: "Viorela",
    lastName: "Raducan",
    username: "viorela.raducan",
  },
  {
    id: "11",
    birthDate: "1063756800000",
    email: "anton.morariu@mail.com",
    firstName: "Anton",
    lastName: "Morariu",
    username: "anton.morariu",
  },
  {
    id: "12",
    birthDate: "1063756800000",
    email: "anatolie.celibidache@mail.com",
    firstName: "Anatolie",
    lastName: "Celibidache",
    username: "anatolie.celibidache",
  },
  {
    id: "13",
    birthDate: "1063756800000",
    email: "emanuel.serban@mail.com",
    firstName: "Emanuel",
    lastName: "Serban",
    username: "emanuel.serban",
  },
  {
    id: "14",
    birthDate: "1063756800000",
    email: "carmen.petran@mail.com",
    firstName: "Carmen",
    lastName: "Petran",
    username: "carmen.petran",
  },
  {
    id: "15",
    birthDate: "1063756800000",
    email: "beatrix.chirila@mail.com",
    firstName: "Beatrix",
    lastName: "Chirila",
    username: "beatrix.chirila",
  },
  {
    id: "16",
    birthDate: "1063756800000",
    email: "felicia.cernea@mail.com",
    firstName: "Felicia",
    lastName: "Cernea",
    username: "felicia.cernea",
  },
  {
    id: "17",
    birthDate: "1063756800000",
    email: "atanasia.constantin@mail.com",
    firstName: "Atanasia",
    lastName: "Constantin",
    username: "atanasia.constantin",
  },
  {
    id: "18",
    birthDate: "1063756800000",
    email: "anica.ungureanu@mail.com",
    firstName: "Anica",
    lastName: "Ungureanu",
    username: "anica.ungureanu",
  },
  {
    id: "19",
    birthDate: "1063756800000",
    email: "sanda.amanar@mail.com",
    firstName: "Sanda",
    lastName: "Amanar",
    username: "sanda.amanar",
  },
  {
    id: "20",
    birthDate: "1063756800000",
    email: "cosmina.ripnu@mail.com",
    firstName: "Cosmina",
    lastName: "Ripnu",
    username: "cosmina.ripnu",
  },
  {
    id: "21",
    birthDate: "1063756800000",
    email: "ihrin.preda@mail.com",
    firstName: "Ihrin",
    lastName: "Preda",
    username: "ihrin.preda",
  },
  {
    id: "22",
    birthDate: "1063756800000",
    email: "juana.vlaicu@mail.com",
    firstName: "Juana",
    lastName: "Vlaicu",
    username: "juana.vlaicu",
  },
  {
    id: "23",
    birthDate: "1063756800000",
    email: "maria.goga@mail.com",
    firstName: "Maria",
    lastName: "Goga",
    username: "maria.goga",
  },
  {
    id: "24",
    birthDate: "1063756800000",
    email: "catalena.muresan@mail.com",
    firstName: "Catalena",
    lastName: "Muresan",
    username: "catalena.muresan",
  },
  {
    id: "25",
    birthDate: "1063756800000",
    email: "florica.saguna@mail.com",
    firstName: "Florica",
    lastName: "Saguna",
    username: "florica.saguna",
  },
  {
    id: "26",
    birthDate: "1063756800000",
    email: "mirela.tismaneanu@mail.com",
    firstName: "Mirela",
    lastName: "Tismaneanu",
    username: "mirela.tismaneanu",
  },
  {
    id: "27",
    birthDate: "1063756800000",
    email: "antonio.voinea@mail.com",
    firstName: "Antonio",
    lastName: "Voinea",
    username: "antonio.voinea",
  },
  {
    id: "28",
    birthDate: "1063756800000",
    email: "rares.donceanu@mail.com",
    firstName: "Rares",
    lastName: "Donceanu",
    username: "rares.donceanu",
  },
  {
    id: "29",
    birthDate: "1063756800000",
    email: "skender.stefanescu@mail.com",
    firstName: "Skender",
    lastName: "Stefanescu",
    username: "skender.stefanescu",
  },
  {
    id: "30",
    birthDate: "1063756800000",
    email: "victor.moculescu@mail.com",
    firstName: "Victor",
    lastName: "Moculescu",
    username: "victor.moculescu",
  },
  {
    id: "31",
    birthDate: "1063756800000",
    email: "virgil.oprea@mail.com",
    firstName: "Virgil",
    lastName: "Oprea",
    username: "virgil.oprea",
  },
  {
    id: "32",
    birthDate: "1063756800000",
    email: "sebastian.alecsandri@mail.com",
    firstName: "Sebastian",
    lastName: "Alecsandri",
    username: "sebastian.alecsandri",
  },
  {
    id: "33",
    birthDate: "1063756800000",
    email: "brindusa.poenaru@mail.com",
    firstName: "Brindusa",
    lastName: "Poenaru",
    username: "brindusa.poenaru",
  },
  {
    id: "34",
    birthDate: "1063756800000",
    email: "michaela.vasiliu@mail.com",
    firstName: "Michaela",
    lastName: "Vasiliu",
    username: "michaela.vasiliu",
  },
  {
    id: "35",
    birthDate: "1063756800000",
    email: "marica.filipescu@mail.com",
    firstName: "Marica ",
    lastName: "Filipescu",
    username: "marica.filipescu",
  },
  {
    id: "36",
    birthDate: "1063756800000",
    email: "rahela.nemes@mail.com",
    firstName: "Rahela",
    lastName: "Nemes",
    username: "rahela.nemes",
  },
  {
    id: "37",
    birthDate: "1063756800000",
    email: "amalia.moldovanu@mail.com",
    firstName: "Amalia",
    lastName: "Moldovanu",
    username: "amalia.moldovanu",
  },
  {
    id: "38",
    birthDate: "1063756800000",
    email: "sorana.tugurlan@mail.com",
    firstName: "Sorana",
    lastName: "Tugurlan",
    username: "sorana.tugurlan",
  },
  {
    id: "39",
    birthDate: "1063756800000",
    email: "marta.constantin@mail.com",
    firstName: "Marta",
    lastName: "Constantin",
    username: "marta.constantin",
  },
  {
    id: "40",
    birthDate: "1063756800000",
    email: "ioanela.toma@mail.com",
    firstName: "Ioanela",
    lastName: "Toma",
    username: "ioanela.toma",
  },
  {
    id: "41",
    birthDate: "1063756800000",
    email: "alin.stanasila@mail.com",
    firstName: "Alin",
    lastName: "Stanasila",
    username: "alin.stanasila",
  },
  {
    id: "42",
    birthDate: "1063756800000",
    email: "dragoslav.macedonski@mail.com",
    firstName: "Dragoslav",
    lastName: "Macedonski",
    username: "dragoslav.macedonski",
  },
  {
    id: "43",
    birthDate: "1063756800000",
    email: "sandu.stancu@mail.com",
    firstName: "Sandu",
    lastName: "Stancu",
    username: "sandu.stancu",
  },
  {
    id: "44",
    birthDate: "1063756800000",
    email: "catarino.costiniu@mail.com",
    firstName: "Catarino",
    lastName: "Costiniu",
    username: "catarino.costiniu",
  },
  {
    id: "45",
    birthDate: "1063756800000",
    email: "dimitry.barbu@mail.com",
    firstName: "Dimitry",
    lastName: "Barbu",
    username: "dimitry.barbu",
  },
  {
    id: "46",
    birthDate: "1063756800000",
    email: "catalina.lucescu@mail.com",
    firstName: "Catalina",
    lastName: "Lucescu",
    username: "catalina.lucescu",
  },
  {
    id: "47",
    birthDate: "1063756800000",
    email: "tatiana.radu@mail.com",
    firstName: "Tatiana",
    lastName: "Radu",
    username: "tatiana.radu",
  },
  {
    id: "48",
    birthDate: "1063756800000",
    email: "bianca.cojocaru@mail.com",
    firstName: "Bianca",
    lastName: "Cojocaru",
    username: "bianca.cojocaru",
  },
  {
    id: "49",
    birthDate: "1063756800000",
    email: "dominique.pirvulescu@mail.com",
    firstName: "Dominique",
    lastName: "Pîrvulescu",
    username: "dominique.pirvulescu",
  },
  {
    id: "50",
    birthDate: "1063756800000",
    email: "marilena.noica@mail.com",
    firstName: "Marilena",
    lastName: "Noica",
    username: "marilena.noica",
  },
];

module.exports = {
  BLOCKED_USERS_LIST,
  COMMENTS_LIST,
  CONVERSATIONS_LIST,
  ConversationTheme,
  Emoji,
  FOLLOWING_USERS_LIST,
  FRIEND_REQUESTS_LIST,
  FRIENDS_LIST,
  HIDDEN_POSTS_LIST,
  MESSAGES_LIST,
  POST_PHOTOS_LIST,
  POSTS_LIST,
  SAVED_POSTS_LIST,
  USERS_LIST,
};
