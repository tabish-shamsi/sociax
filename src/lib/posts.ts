import { Post } from "@/types/Post";

export const posts: Post[] = [
  {
    _id: "postId_1",
    user: {
      name: "Alex Johnson",
      username: "alexj",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    },
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
    user: {
      name: "Samantha Lee",
      username: "samlee",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    },
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
    user: {
      name: "Daniel Carter",
      username: "dcarter",
      avatar:
        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
    },
    feeling: "happy 😄",
    content: "Feeling blessed today.",
    createdAt: new Date("2025-12-08T18:47:00Z"),
  },

  {
    _id: "postId_4",
    user: {
      name: "Emily Nguyen",
      username: "emilyng",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    },
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
    user: {
      name: "Jason Kim",
      username: "jasonk",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    },
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
    taggedFriends: [
      { name: "Alex Johnson", username: "alexj" },
      { name: "Samantha Lee", username: "samlee" },
    ],
    createdAt: new Date("2025-12-06T20:30:00Z"),
  },

  {
    _id: "postId_6",
    user: {
      name: "Laura Martinez",
      username: "lauram",
      avatar:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
    },
    content:
      "Sometimes you just need a moment to breathe and appreciate the little things 🌿",
    createdAt: new Date("2025-12-05T15:10:00Z"),
  },

  {
    _id: "postId_7",
    user: {
      name: "Mark Holloway",
      username: "markh",
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    },
    message: "updated their cover photo",
    images: [
      {
        url: "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg",
        _id: "img8",
      },
    ],
    createdAt: new Date("2025-12-04T11:45:00Z"),
  },

  // ---- NEW POSTS ADDED ---- //

  {
    _id: "postId_8",
    user: {
      name: "Hannah Brooks",
      username: "hbrooks",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    },
    content: "Morning run completed! Feeling pumped 💪🏃‍♀️",
    images: [
      {
        url: "https://images.pexels.com/photos/1199590/pexels-photo-1199590.jpeg",
        _id: "img9",
      },
    ],
    createdAt: new Date("2025-12-04T07:20:00Z"),
  },

  {
    _id: "postId_9",
    user: {
      name: "Michael Tan",
      username: "miket",
      avatar:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    },
    feeling: "motivated 🔥",
    content: "Working on new goals today!",
    createdAt: new Date("2025-12-03T18:10:00Z"),
  },

  {
    _id: "postId_10",
    user: {
      name: "Rachel Green",
      username: "rgreen",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    },
    content: "Movie night with the squad 🎬✨",
    taggedFriends: [
      { name: "Alex Johnson", username: "alexj" },
      { name: "Daniel Carter", username: "dcarter" },
    ],
    createdAt: new Date("2025-12-03T10:00:00Z"),
  },

  {
    _id: "postId_11",
    user: {
      name: "Kevin Liu",
      username: "kliu",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    },
    message: "updated their profile picture",
    images: [
      {
        url: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
        _id: "img10",
      },
    ],
    createdAt: new Date("2025-12-02T15:33:00Z"),
  },

  {
    _id: "postId_12",
    user: {
      name: "Sophia Williams",
      username: "sophw",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    },
    content: "New recipe experiment 🍝✨",
    images: [
      {
        url: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg",
        _id: "img11",
      },
      {
        url: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
        _id: "img12",
      },
    ],
    createdAt: new Date("2025-12-02T11:25:00Z"),
  },

  {
    _id: "postId_13",
    user: {
      name: "David Park",
      username: "dpark",
      avatar:
        "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
    },
    content: "Late night coding session 👨‍💻",
    createdAt: new Date("2025-12-02T02:15:00Z"),
  },

  {
    _id: "postId_14",
    user: {
      name: "Olivia Chen",
      username: "oliviac",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    },
    feeling: "excited ✨",
    content: "Planning my next travel adventure!",
    images: [
      {
        url: "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg",
        _id: "img13",
      },
    ],
    createdAt: new Date("2025-12-01T21:50:00Z"),
  },

  {
    _id: "postId_15",
    user: {
      name: "Thomas Reed",
      username: "treed",
      avatar:
        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
    },
    message: "updated their cover photo",
    images: [
      {
        url: "https://images.pexels.com/photos/210415/pexels-photo-210415.jpeg",
        _id: "img14",
      },
      {
        url: "https://images.pexels.com/photos/210415/pexels-photo-210415.jpeg",
        _id: "img15",
      },
      {
        url: "https://images.pexels.com/photos/210415/pexels-photo-210415.jpeg",
        _id: "img16",
      },
      {
        url: "https://images.pexels.com/photos/210415/pexels-photo-210415.jpeg",
        _id: "img17",
      },
    ],
    createdAt: new Date("2025-12-01T17:30:00Z"),
  },

  {
    _id: "postId_16",
    user: {
      name: "Bella Rivera",
      username: "bellar",
      avatar:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
    },
    content: "What a beautiful sunset today 🌅",
    images: [
      {
        url: "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg",
        _id: "img15",
      },
    ],
    createdAt: new Date("2025-12-01T08:40:00Z"),
  },

  {
    _id: "postId_17",
    user: {
      name: "Ethan Walker",
      username: "ethanw",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    },
    content: "Brunch with the fam 🥐🤍",
    taggedFriends: [
      { name: "Laura Martinez", username: "lauram" },
      { name: "Sophia Williams", username: "sophw" },
    ],
    createdAt: new Date("2025-12-01T02:22:00Z"),
  },

  {
    _id: "postId_18",
    user: {
      name: "Natalie Scott",
      username: "nat_s",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    },
    content: "Work hard, rest harder 😌✨",
    createdAt: new Date("2025-11-30T16:10:00Z"),
  },

  {
    _id: "postId_19",
    user: {
      name: "Chris Evans",
      username: "cevans",
      avatar:
        "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
    },
    content: "Nature walk therapy 🌲🍃",
    images: [
      {
        url: "https://images.pexels.com/photos/349758/pexels-photo-349758.jpeg",
        _id: "img16",
      },
      {
        url: "https://images.pexels.com/photos/1671324/pexels-photo-1671324.jpeg",
        _id: "img17",
      },
    ],
    createdAt: new Date("2025-11-30T11:00:00Z"),
  },

  {
    _id: "postId_20",
    user: {
      name: "Zara Ahmed",
      username: "zaraa",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    },
    feeling: "grateful 💖",
    content: "Thankful for everyone in my life!",
    images: [
      {
        url: "https://images.pexels.com/photos/4587992/pexels-photo-4587992.jpeg",
        _id: "img18",
      },
    ],
    createdAt: new Date("2025-11-30T06:45:00Z"),
  },
];
