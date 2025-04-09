import axios from "axios";
import { useEffect, useState } from "react";
import { AuthContext, User } from "./AuthContext";

//auth provider la mot ham dung de tao cac gia tri truyen di va chia se no voi cac component khac thong qua props Provider
const userUrl = import.meta.env.VITE_USER_API;
const authUrl = import.meta.env.VITE_AUTH_API;
type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const [user, setUsers] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  //check login
  const checkLogin = async () => {
    try {
      const repsonse = await axios.get(authUrl, {
        withCredentials: true,
      });
      setUsers(repsonse.data.user);
      setIsLoggedIn(true);
      return repsonse.data.user;
    } catch (error) {
      console.error("Chua dang nhap!", error);
      setUsers(null);
      setIsLoggedIn(false);
    }
  };
  useEffect(() => {
    checkLogin();
  }, []);

  //login
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${userUrl}/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.user) {
        setUsers(response.data.user);
        setIsLoggedIn(true);
        return {
          status: response.status,
          user: response.data.user,
          message: response.data.message || "Đăng nhập thành công",
        };
      } else {
        setUsers(null);
        setIsLoggedIn(false);
        throw new Error("Không tìm thấy user");
      }
    } catch (error) {
      console.error("Cannot login", error);
      setIsLoggedIn(false);
      throw new Error("Không thể đăng nhập");
    }
  };
  //logout
  const logout = async () => {
    try {
      await axios.post(`${userUrl}/logout`, {}, { withCredentials: true });
      setIsLoggedIn(false);
      setUsers(null);
      window.location.reload();
    } catch (error) {
      console.error("Cannot logout!", error);
    }
  };

  //provider value
  const value = {
    user,
    checkLogin,
    setUsers,
    login,
    logout,
    isLoggedIn,
    setIsLoggedIn,
  };

  //share
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
