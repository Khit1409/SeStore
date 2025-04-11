import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./features/auths/authStore";
import { useEffect, useState } from "react";
import { fetchAuth } from "./features/auths/authSlice";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminHome from "./pages/admin/AdminHome";
import Start from "./pages/Start";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SellerHome from "./pages/sellers/SellerHome";
import UserHome from "./pages/users/UserHome";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchAuth()).finally(() => {
      setLoading(false);
    });
  }, [dispatch]);

  if (loading)
    return (
      <div className="w-screen h-screen bg-[url('/banner.png')] bg-cover bg-center bg-no-repeat">
        <div className="w-full h-full flex items-center justify-center backdrop-blur-lg">
          <div className="border-2 border-t-transparent rounded-full border-gray-500 animate-spin w-[50px] h-[50px]" />
        </div>
      </div>
    );

  // Khởi tạo router bên trong component
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Start />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },

    // 🛡️ ADMIN
    {
      element: (
        <ProtectedRoute allowedRoles={["admin"]} currentRole={user?.role} />
      ),
      children: [
        {
          path: "/admin",
          element: <AdminHome />,
          children: [
            { path: "manager_users", element: <>MANAGER ACCOUNT</> },
            { path: "support", element: <>Support</> },
            { path: "mananger_sellers", element: <>Seller</> },
          ],
        },
      ],
    },

    // 🛡️ SELLER
    {
      element: (
        <ProtectedRoute allowedRoles={["seller"]} currentRole={user?.role} />
      ),
      children: [
        {
          path: "/seller",
          element: <SellerHome />,
          children: [{ path: "product", element: <>Quản lý sản phẩm</> }],
        },
      ],
    },

    // 🛡️ USER
    {
      element: (
        <ProtectedRoute allowedRoles={["user"]} currentRole={user?.role} />
      ),
      children: [
        {
          path: "/user",
          element: <UserHome />,
          children: [
            { path: "profile", element: <></> },
            { path: "cart", element: <></> },
            { path: "shop", element: <>Shop</> },
          ],
        },
      ],
    },
  ]);

  // Trả về RouterProvider
  return <RouterProvider router={router} />;
}
