export const user = {
  name: "Tabish Ali Shamsi",
  role: "Full Stack Web Developer",
  email: "tabish@example.com",
  avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png",
  cover: "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg",
  username: "tabish-shamsi",
  location: "Karachi, Pakistan",
  friends: [
    {
      name: "Emily Carter",
      avatar:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&w=200&q=60",
      username: "emilycarter",
    },
    {
      name: "Michael Turner",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&w=200&q=60",
      username: "michaelturner",
    },
    {
      name: "Sophia Reyes",
      avatar:
        "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&w=200&q=60",
      username: "sophiareyes",
    },
    {
      name: "Daniel Brooks",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&w=200&q=60",
      username: "danielbrooks",
    },
    {
      name: "Ava Mitchell",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&w=200&q=60",
      username: "avamitchell",
    },
  ],
  socials: [
    {
      name: "Facebook",
      link: "https://www.facebook.com/info.tabish",
    },
    {
      name: "Instagram",
      link: "https://www.instagram.com/tabish.ashamsi",
    },
    {
      name: "Twitter",
      link: "https://x.com",
    },
  ],
};

export const interests = {
  hobbies:
    "Bike Riding, swimming, working out, design magazines, go to museums, watching tv shows",
  favourite_tv_shows:
    "Breaking Good, RedDevil, People of Interest, The Running Dead, Found, American Guy",
  favourite_movies:
    "Idiocratic, The Scarred Wizard and the Fire Crown, Crime Squad, Ferrum Man.",
  favourite_games:
    "The First of Us, Assassin’s Squad, Dark Asylum, NMAK16, Last Cause 4, Grand Snatch Auto.",
  favourite_music_artists:
    "Iron Maid, DC/AC, Megablow, The Ill, Kung Fighters, System of a Revenge.",
  favourite_books:
    "The Crime of the Century, Egyptian Mythology 101, The Scarred Wizard, Lord of the Wings, Amongst Gods, The Oracle, A Tale of Air and Water.",
  favourite_writers:
    "Martin T. Gergeston, Johnathan R. Token, Ivana Rowle, Alexandria Platt, Marcus Roth.",
  other_interests:
    "Swimming, Surfing, Scuba Diving, Anime, Photography, Tattoos, Street Art.",
};

export const educationAndEmployment = [
  {
    title: "Bachelor of Interactive Design – The New College of Design",
    timestamp: "2001 – 2006",
    description:
      "Completed a five-year intensive Bachelor of Interactive Design program at The New College of Design. Graduated with an A+ average.",
  },
  {
    title: "Digital Design Intern – Multimedz Agency",
    timestamp: "2006 – 2008",
    description:
      "Worked as a Digital Design Intern, responsible for client communication and supporting design projects.",
  },
  {
    title: "Digital Illustration Course – Rembrandt Institute",
    timestamp: "2008",
    description:
      "Completed a five-month Digital Illustration course under Professor Leonardo Stagg.",
  },
  {
    title: "UI/UX Designer – Daydreams Agency",
    timestamp: "2008 – 2013",
    description:
      "Worked as a UI/UX Designer, designing user interfaces and experiences for various client projects.",
  },
  {
    title: "Motion Graphics Course – The Digital College",
    timestamp: "2010",
    description:
      "Completed a six-month intensive Motion Graphics course focusing on After Effects and Premiere. Professor: Donatello Urtle.",
  },
  {
    title: "Senior UI/UX Designer – Daydreams Agency",
    timestamp: "2013 – Now",
    description:
      "Lead a team of ten designers, overseeing all projects, managing workflows, and communicating with potential clients.",
  },
];

export const personalInfo = {
  about_me:
    "Hi, I’m James, I’m 36 and I work as a Digital Designer for the “Daydreams” Agency in Pier 56.",
  birthday: new Date("2007, 9, 28"),
  birthplace: "Austin, Texas, USA",
  lives_in: "San Francisco, California, USA",
  occupation: "UI/UX Designer",
  joined: new Date("2025, 8, 29"),
  gender: "Male",
  status: "Married",
  website: "daydreamsagency.com",
};

export const posts = [
  {
    _id: "postId_1",
    content: "Had an amazing day exploring the city! 🌆",
    images: [
      {
        url: "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg",
        _id: "img1",
      },
    ],
    createdAt: new Date("2025-12-10T14:32:00Z"),
  },

  {
    _id: "postId_2",
    content: "This café never disappoints ☕💛",
    images: [
      {
        url: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
        _id: "img2",
      },
      {
        url: "https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg",
        _id: "img3",
      },
    ],
    taggedFriends: [{ name: "Michael Tan", username: "miket" }],
    createdAt: new Date("2025-12-09T09:15:00Z"),
  },

  {
    _id: "postId_3",
    feeling: "happy 😄",
    content: "Feeling blessed today.",
    createdAt: new Date("2025-12-08T18:47:00Z"),
  },

  {
    _id: "postId_4",
    message: "updated their profile picture",
    images: [
      {
        url: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
        _id: "img4",
      },
    ],
    createdAt: new Date("2025-12-07T12:00:00Z"),
  },

  {
    _id: "postId_5",
    content: "Can’t believe this happened today 😂",
    images: [
      {
        url: "https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg",
        _id: "img5",
      },
      {
        url: "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg",
        _id: "img6",
      },
      {
        url: "https://images.pexels.com/photos/34950/pexels-photo.jpg",
        _id: "img7",
      },
    ],
    createdAt: new Date("2025-12-07T12:00:00Z"),
  },
];

export const friends = [
  {
    name: "Liam Carter",
    birthplace: "Austin, Texas, USA",
    friendsCount: 342,
    followingCount: 180,
    postsCount: 96,
    about_me:
      "Product designer who loves minimalism, coffee, and long road trips.",
    friendsSince: "2019-04-12",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    cover: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    username: "liamcarter",
  },
  {
    name: "Sofia Nguyen",
    birthplace: "Da Nang, Vietnam",
    friendsCount: 512,
    followingCount: 410,
    postsCount: 214,
    about_me: "Travel blogger sharing stories, food, and street photography.",
    friendsSince: "2020-08-03",
    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    cover: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    username: "sofianigyen",
  },
  {
    name: "Ethan Morales",
    birthplace: "San Diego, California, USA",
    friendsCount: 289,
    followingCount: 301,
    postsCount: 132,
    about_me:
      "Frontend engineer, surfer on weekends, and open-source enthusiast.",
    friendsSince: "2018-11-21",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    cover: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    username: "ethanmorales",
  },
  {
    name: "Amelia Wright",
    birthplace: "Brighton, England",
    friendsCount: 421,
    followingCount: 198,
    postsCount: 175,
    about_me: "Illustrator and art teacher inspired by nature and urban life.",
    friendsSince: "2021-02-14",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    cover: "https://images.unsplash.com/photo-1503264116251-35a269479413",
    username: "ameliawright",
  },
  {
    name: "Noah Petrov",
    birthplace: "Plovdiv, Bulgaria",
    friendsCount: 367,
    followingCount: 223,
    postsCount: 88,
    about_me: "Tech enthusiast exploring AI, photography, and digital privacy.",
    friendsSince: "2017-06-30",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    cover: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d",
    username: "noahpetrov",
  },
  {
    name: "Isabella Rossi",
    birthplace: "Florence, Italy",
    friendsCount: 458,
    followingCount: 312,
    postsCount: 201,
    about_me:
      "Art history graduate with a passion for museums and analog photography.",
    friendsSince: "2019-09-18",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    cover: "https://images.unsplash.com/photo-1491555103944-7c647fd857e6",
    username: "isabellarossi",
  },
  {
    name: "Daniel Kim",
    birthplace: "Seoul, South Korea",
    friendsCount: 395,
    followingCount: 540,
    postsCount: 267,
    about_me: "Startup marketer, night runner, and specialty coffee nerd.",
    friendsSince: "2022-01-07",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
    cover: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c",
    username: "danielkim",
  },
  {
    name: "Maya Patel",
    birthplace: "Ahmedabad, India",
    friendsCount: 624,
    followingCount: 389,
    postsCount: 319,
    about_me: "UX researcher focused on inclusive design and accessibility.",
    friendsSince: "2020-05-26",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    cover: "https://images.unsplash.com/photo-1504805572947-34fad45aed93",
    username: "mayapatel",
  },
];

export const albums = [
  {
    _id: "album-1",
    title: "Summer Adventures",
    slug: "summer-adventures",
    lastUpdated: "2025-03-12T14:30:00Z",
    images: [
      { _id: "img_001", url: "https://picsum.photos/800/600?random=1" },
      { _id: "img_002", url: "https://picsum.photos/800/600?random=2" },
      { _id: "img_003", url: "https://picsum.photos/800/600?random=3" },
    ],
  },
  {
    _id: "album-2",
    title: "City Lights",
    slug: "city-lights",
    lastUpdated: "2025-02-28T09:15:00Z",
    images: [
      { _id: "img_004", url: "https://picsum.photos/800/600?random=4" },
      { _id: "img_005", url: "https://picsum.photos/800/600?random=5" },
    ],
  },
  {
    _id: "album-3",
    title: "Nature Escapes",
    slug: "nature-escapes",
    lastUpdated: "2025-01-20T18:45:00Z",
    images: [
      { _id: "img_006", url: "https://picsum.photos/800/600?random=6" },
      { _id: "img_007", url: "https://picsum.photos/800/600?random=7" },
      { _id: "img_008", url: "https://picsum.photos/800/600?random=8" },
      { _id: "img_009", url: "https://picsum.photos/800/600?random=9" },
    ],
  },
  {
    _id: "album-4",
    title: "Family Moments",
    slug: "family-moments",
    lastUpdated: "2024-12-15T11:20:00Z",
    images: [
      { _id: "img_010", url: "https://picsum.photos/800/600?random=10" },
      { _id: "img_011", url: "https://picsum.photos/800/600?random=11" },
      { _id: "img_012", url: "https://picsum.photos/800/600?random=12" },
    ],
  },
  {
    _id: "album-5",
    title: "Mountain Trails",
    slug: "mountain-trails",
    lastUpdated: "2024-11-05T07:50:00Z",
    images: [
      { _id: "img_013", url: "https://picsum.photos/800/600?random=13" },
      { _id: "img_014", url: "https://picsum.photos/800/600?random=14" },
      { _id: "img_015", url: "https://picsum.photos/800/600?random=15" },
    ],
  },
  {
    _id: "album-6",
    title: "Food & Flavors",
    slug: "food-and-flavors",
    lastUpdated: "2024-10-22T16:10:00Z",
    images: [
      { _id: "img_016", url: "https://picsum.photos/800/600?random=16" },
      { _id: "img_017", url: "https://picsum.photos/800/600?random=17" },
    ],
  },
  {
    _id: "album-7",
    title: "Cover Images",
    slug: "cover-images",
    lastUpdated: "2024-10-22T16:10:00Z",
    images: [
      { _id: "img_016", url: "https://picsum.photos/800/600?random=18" },
      { _id: "img_017", url: "https://picsum.photos/800/600?random=19" },
    ],
  },
];
