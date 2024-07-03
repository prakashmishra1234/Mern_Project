export interface UserType {
  _id: string;
  username: string;
  fullname: string;
  email: string;
  isVerified: boolean;
  role: string;
  createdAt: string;
  picture: string;
  __v: number;
}

export interface UserDetailsType {
  _id: string;
  bio: string;
  user: string;
}
