export type DecodedUser = {
  userId: string;
  avatar: string;
  fullname: string;
  phone: string;
  email: string;
  role: string;
};

export type AuthState = {
  user: DecodedUser | null;
  account: DecodedUser[] | null;
  isAuthenticate: boolean;
  error: string | null;
};

export const initialState: AuthState = {
  user: null,
  account: null,
  isAuthenticate: false,
  error: null,
};
