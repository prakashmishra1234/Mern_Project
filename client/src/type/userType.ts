export interface UserType {
  _id: string;
  username: string;
  fullname: string;
  email: string;
  isVerified: boolean;
  role: string;
  createdAt: string;
  picture: string;
  bio: string;
  user: string;
  followers: string[];
  followings: string[];
  __v: number;
}
