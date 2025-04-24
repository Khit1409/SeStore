export type DecodedUser = {
  user_id: string;
  avatar: string;
  name: string;
  phone: string;
  email: string;
  role: string;
};

export type AuthState = {
  users: DecodedUser | null;
  account: DecodedUser[] | null;
  isAuthenticate: boolean;
  error: string | null;
};

export const initialState: AuthState = {
  users: null,
  account: null,
  isAuthenticate: false,
  error: null,
};
