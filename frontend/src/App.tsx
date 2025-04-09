import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth } from "./redux/authSlice";
import { AppDispatch, RootState } from "./redux/authStore";
import UserLayouts from "./layouts/UserLayouts";
import AdminLayouts from "./layouts/AdminLayouts";
import SellerLayouts from "./layouts/SellerLayouts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
      <div className="w-screen h-screen bg-[url('/banner.png') bg-cover bg-center bg-no-repeat]">
        <div className="w-full h-full flex items-center justify-center backdrop-blur-lg">
          <div className="border-2 border-t-transparent rounded-full border-gray-500 animate-spin w-[50px] h-[50px]" />
        </div>
      </div>
    );

  let LayoutToRender;

  switch (user?.role) {
    case "admin":
      LayoutToRender = AdminLayouts;
      break;
    case "seller":
      LayoutToRender = SellerLayouts;
      break;
    case "user":
    default:
      LayoutToRender = UserLayouts;
      break;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Còn lại render theo role */}
        <Route path="/*" element={<LayoutToRender />} />
      </Routes>
    </BrowserRouter>
  );
}
