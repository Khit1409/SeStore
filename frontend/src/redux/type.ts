export type DecodedUser = {
  userId: string;
  avatar: string;
  fullname: string;
  address: string;
  phone: string;
  birthday: string;
  email: string;
  role: string;
};

export type AuthState = {
  user: DecodedUser | null;
  isAuthenticate: boolean;
  error: string | null;
};

export const initialState: AuthState = {
  user: null,
  isAuthenticate: false,
  error: null,
};
