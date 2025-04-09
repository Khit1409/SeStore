import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/authStore";

interface PrivateRoutesProps {
  children: React.ReactNode;
}

export default function PrivateRoutes({ children }: PrivateRoutesProps) {
  const { isAuthenticate } = useSelector((state: RootState) => state.auth);

  // Nếu đã đăng nhập, render nội dung, nếu không thì chuyển hướng tới trang đăng nhập
  return isAuthenticate ? <>{children}</> : <Navigate to="/login" />;
}
