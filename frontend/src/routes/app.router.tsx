// src/routes/router.tsx
import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoutes from "./protected.routes";
import RedirectByRole from "./redirect.role";

import AdminLayout from "../layouts/AdminLayout";
import SellerLayout from "../layouts/SellerLayout";
import UserLayout from "../layouts/UserLayout";

import AdminDashboard from "../components/admins/AdminDashboard";
import SellerDashboard from "../components/seller/SellerDashboard";
import ManagerProduct from "../components/seller/ManagerProduct";

import Dashboard from "../pages/users/Dashboard";
import Shop from "../pages/users/Shop";
import Cart from "../pages/users/Cart";

import { DecodedUser } from "../features/type";
import UserProductDetail from "../components/users/UserProductDetail";
import UserOrder from "../components/users/UserOrder";
import PlaceOrder from "../components/users/Checkout";
import ComfirmOrder from "../components/seller/ComfirmOrder";
import ManagerOrder from "../components/seller/ManagerOrder";

export const generateRouter = (users: DecodedUser | null) => {
  return createBrowserRouter([
    {
      path: "/",
      element: <RedirectByRole users={users} />,
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },

    {
      element: (
        <ProtectedRoutes allowedRoles={["admin"]} currentRole={users?.role} />
      ),
      children: [
        {
          path: "/admin",
          element: <AdminLayout />,
          children: [
            { path: "/admin/dashboard", element: <AdminDashboard /> },
            { path: "/admin/manager_users", element: <>MANAGER ACCOUNT</> },
            { path: "/admin/support", element: <>Support</> },
            { path: "/admin/mananger_sellers", element: <>Seller</> },
          ],
        },
      ],
    },

    {
      element: (
        <ProtectedRoutes allowedRoles={["seller"]} currentRole={users?.role} />
      ),
      children: [
        {
          path: "/seller",
          element: <SellerLayout />,
          children: [
            { path: "/seller/dashboard", element: <SellerDashboard /> },
            { path: "/seller/myproduct", element: <ManagerProduct /> },
            { path: "/seller/comfirm_order", element: <ComfirmOrder /> },
            { path: "/seller/mystore_order", element: <ManagerOrder /> },
          ],
        },
      ],
    },

    {
      element: (
        <ProtectedRoutes allowedRoles={["user"]} currentRole={users?.role} />
      ),
      children: [
        {
          path: "/user",
          element: <UserLayout />,
          children: [
            { path: "/user/dashboard", element: <Dashboard /> },
            { path: "/user/buy/:product_id", element: <UserProductDetail /> },
            { path: "/user/go_to_shopping", element: <Shop /> },
            { path: "/user/my_cart", element: <Cart /> },
            { path: "/user/my_order", element: <UserOrder /> },
            { path: "/user/payment/:cart_id", element: <PlaceOrder /> },
          ],
        },
      ],
    },
  ]);
};
