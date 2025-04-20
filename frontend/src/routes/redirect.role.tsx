// src/routes/RedirectByRole.tsx
import { Navigate } from "react-router-dom";
import IndexLayout from "../layouts/IndexLayout";
import { DecodedUser } from "../features/type";

interface Props {
  user: DecodedUser | null;
}

const RedirectByRole = ({ user }: Props) => {
  if (!user) return <IndexLayout />;

  switch (user.role) {
    case "admin":
      return <Navigate to="/admin/dashboard" replace />;
    case "seller":
      return <Navigate to="/seller/dashboard" replace />;
    case "user":
      return <Navigate to="/user/dashboard" replace />;
    default:
      return <IndexLayout />;
  }
};

export default RedirectByRole;
