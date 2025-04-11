import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoaddingAnimation from "../loadings/LoaddingAnimation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../features/auths/authStore";
import { useEffect, useState } from "react";
import { login } from "../../features/auths/authSlice";
import { Link, useNavigate } from "react-router-dom";

type Data = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [mess, setMess] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [data, setData] = useState<Data>({
    email: "",
    password: "",
  });
  // onChange value
  const handleOnchange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    setData({ ...data, [target.name]: target.value });
  };
  //check navigate with role
  useEffect(() => {
    if (user?.role) {
      switch (user.role) {
        case "user":
          navigate("/user");
          break;
        case "seller":
          navigate("/seller");
          break;
        case "admin":
          navigate("/admin");
          break;
        default:
          navigate("/");
      }
    }
  }, [user, navigate]);
  //post form data
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await dispatch(
        login({ email: data.email, password: data.password })
      );
      setLoading(false);

      if (!login.fulfilled.match(result)) {
        setMess("*Thông tin bạn cung cấp không chính xác!");
      }
    } catch (error) {
      setLoading(false);
      setMess("*Đã xảy ra lỗi trong quá trình đăng nhập!");
      console.error("Login error:", error);
    }
  };
  return (
    <div className="w-screen h-screen bg-[url('/banner.png')] bg-cover bg-center bg-no-repeat">
      <div className="w-full h-full flex justify-center items-center backdrop-blur">
        {loading ? (
          <LoaddingAnimation />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-300 rounded p-3 flex flex-col justify-center md:w-[500px] h-[450px]"
          >
            {/* name form */}
            <div className="h-[25%] w-full flex items-center justify-center m-4">
              <h1 className="font-bold text-6xl text-cyan-500">Sign in</h1>
              <span className="mx-2 text-sm flex">
                <p className="text-cyan-500 mr-2">for shoping now</p>
                <FontAwesomeIcon
                  icon={["fas", "cart-plus"]}
                  className="text-green-500"
                />
              </span>
            </div>

            {/* alert mess */}

            <p className="text-red-500 text-center">{mess}</p>

            {/* form */}
            <div className="w-full p-2 flex flex-col h-[75%] justify-end items-center">
              {/* input element */}
              <div className="w-full flex flex-col gap-1 items-center">
                <div className="w-full flex flex-col">
                  <label htmlFor="email">
                    Email:
                    <FontAwesomeIcon
                      icon={["fas", "envelope"]}
                      className="mx-1"
                    />
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Nhập email của bạn"
                    className="outline-0 border-[1.5px] border-gray-500 rounded w-full p-1 text-center"
                    onChange={handleOnchange}
                  />
                </div>
                <div className="w-full flex flex-col">
                  <label htmlFor="password">
                    Password:
                    <FontAwesomeIcon icon={["fas", "lock"]} className="mx-1" />
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Nhập mật khẩu của bạn"
                    className="outline-0 border-[1.5px] border-gray-500 rounded w-full p-1 text-center"
                    name="password"
                    onChange={handleOnchange}
                  />
                </div>
              </div>
              {/* button */}
              <div className="mt-6 mb-3 w-full flex items-center flex-col">
                <button
                  type="submit"
                  className="mb-3 h-[40px] w-[100px] bg-green-500 rounded text-x font-bold text-white"
                >
                  <FontAwesomeIcon icon={["fas", "paper-plane"]} />
                </button>
                <div className="flex gap-2 w-full items-center justify-center">
                  <button className="bg-blue-500 h-[40px] w-[80px] rounded">
                    <FontAwesomeIcon
                      icon={["fab", "facebook"]}
                      className="text-white"
                    />
                  </button>
                  <span></span>
                  <button className="bg-red-500 h-[40px] w-[80px] rounded">
                    <FontAwesomeIcon
                      icon={["fab", "google"]}
                      className="text-white"
                    />
                  </button>
                </div>
              </div>
              {/* question */}
              <div className="flex gap-2 w-full items-center justify-center">
                <Link to="/" className="text-cyan-500 underline text-sm">
                  Home
                </Link>
                <Link
                  to="/register"
                  className="text-cyan-500 underline text-sm"
                >
                  Register?
                </Link>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
