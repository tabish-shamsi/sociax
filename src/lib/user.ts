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
