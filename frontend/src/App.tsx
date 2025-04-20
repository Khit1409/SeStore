import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./features/appStore";
import { useEffect, useState } from "react";
import { fetchAuth } from "./features/auths/authSlice";
import { RouterProvider } from "react-router-dom";
import { generateRouter } from "./routes/app.router";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchAuth()).finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="w-screen h-screen bg-[url('/banner.png')] bg-cover bg-center bg-no-repeat">
        <div className="w-full h-full flex items-center justify-center backdrop-blur-lg">
          <div className="border-2 border-t-transparent rounded-full border-gray-500 animate-spin w-[50px] h-[50px]" />
        </div>
      </div>
    );
  }
  const router = generateRouter(user);

  return <RouterProvider router={router} />;
}
