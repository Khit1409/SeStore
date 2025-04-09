import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth } from "./redux/authSlice";
import { AppDispatch, RootState } from "./redux/authStore";
import UserLayouts from "./layouts/UserLayouts";
import AdminLayouts from "./layouts/AdminLayouts";
import SellerLayouts from "./layouts/SellerLayouts";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchAuth()).finally(() => {
      setLoading(false);
    });
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

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
      <LayoutToRender />
    </BrowserRouter>
  );
}
