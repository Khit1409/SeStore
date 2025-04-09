import { createContext } from "react";

//authcontext dung de tao mot component createContext va mot component de su dung context do

export type User = {
  email: string;
  password: string;
};
type UserData = {
  avatar: string;
  fullname: string;
  email: string;
  birthday: string;
  address: string;
  phone: string;
};
type AuthContextType = {
  user: User | null;
  login: (
    email: string,
    password: string
  ) => Promise<{
    status: number;
    user: UserData;
    message: string;
  }>;
  checkLogin: () => Promise<UserData>;
  logout: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
