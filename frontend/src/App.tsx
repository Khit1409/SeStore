import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./features/appStore";
import { useEffect, useState } from "react";
import { fetchAuth } from "./features/auths/authSlice";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import IndexLayout from "./layouts/IndexLayout";
import SellerLayout from "./layouts/SellerLayout";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import ManagerProduct from "./components/seller/ManagerProduct";
import ManagerOrder from "./components/seller/ManagerOrder";
import Shop from "./pages/users/Shop";
import UserOrder from "./components/users/UserOrder";
import Cart from "./pages/users/Cart";
import SellerDashboard from "./components/seller/SellerDashboard";
import Dashboard from "./pages/users/Dashboard";

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
    // Public page
    {
      path: "/",
      element: <IndexLayout />,
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
          element: <AdminLayout />,
          children: [
            {
              path: "/admin/dashboard",
              element: <>MANAGER ACCOUNT</>,
            },
            {
              path: "/admin/manager_users",
              element: <>MANAGER ACCOUNT</>,
            },
            {
              path: "/admin/manager_users",
              element: <>MANAGER ACCOUNT</>,
            },
            {
              path: "/admin/support",
              element: <>Support</>,
            },
            {
              path: "/admin/mananger_sellers",
              element: <>Seller</>,
            },
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
          element: <SellerLayout />,
          children: [
            {
              path: "/seller/dashboard",
              element: <SellerDashboard />,
            },
            {
              path: "/seller/myproduct",
              element: <ManagerProduct />,
            },
            {
              path: "/seller/mystore_order",
              element: <ManagerOrder />,
            },
          ],
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
          element: <UserLayout />,
          children: [
            { path: "/user/dashboard", element: <Dashboard /> },
            { path: "/user/buy/:productId", element: <UserOrder /> },
            { path: "/user/go_to_shopping", element: <Shop /> },
            { path: "/user/my_cart", element: <Cart /> },
          ],
        },
      ],
    },
  ]);

  // Trả về RouterProvider
  return <RouterProvider router={router} />;
}
