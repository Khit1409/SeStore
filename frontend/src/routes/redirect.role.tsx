// src/routes/RedirectByRole.tsx
import { Navigate } from "react-router-dom";
import IndexLayout from "../layouts/IndexLayout";
import { DecodedUser } from "../features/type";

interface Props {
  users: DecodedUser | null;
}

const RedirectByRole = ({ users }: Props) => {
  if (!users) return <IndexLayout />;

  switch (users.role) {
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
