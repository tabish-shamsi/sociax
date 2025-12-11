export type Post = {
  _id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  content?: string;
  images?: {
    url: string;
    _id: string;
  }[];
  taggedFriends?: {
    name: string;
    username: string;
  }[];
  feeling?: string;
  message?: string; // updated their cover | updated their profile picture
  createdAt: Date;
}