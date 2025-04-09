import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/authStore";

export type RegisterData = {
  fullname: string;
  address: string;
  phone: string;
  avatar: string;
  birthday: string;
  email: string;
  role: string;
  repassword: string;
  password: string;
};
export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setloading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [data, setData] = useState<RegisterData>({
    fullname: "",
    email: "",
    address: "",
    password: "",
    birthday: "",
    avatar: "",
    role: "",
    phone: "",
    repassword: "",
  });
  // onchange
  const handleOnchange = (
    e: React.FormEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    setData({ ...data, [target.name]: target.value });
  };
  // submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // post

    setloading(true);
    setTimeout(() => {
      const result = dispatch(
        register({
          email: data.email,
          role: data.role,
          address: data.address,
          birthday: data.birthday,
          fullname: data.fullname,
          password: data.password,
          phone: data.password,
          avatar: data.avatar,
          repassword: data.repassword,
        })
      );
      setloading(false);
      if (register.fulfilled.match(result)) {
        navigate("/");
      } else {
        setMessage("*Thông tin bạn cung cấp không đầy đủ!");
      }
    }, 2000);
  };
  return (
    <div className="container-lg bg-[url('/banner.png')] bg-cover bg-center bg-no-repeat] flex items-center justify-center">
      {loading ? (
        //load
        <div className="w-screen h-screen backdrop-blur-lg flex items-center justify-center flex-col">
          <div className="border-2 border-t-transparent border-gray-300 animate-spin rounded-full w-[50px] h-[50px]" />
        </div>
      ) : (
        //form
        <form
          onSubmit={handleSubmit}
          className="my-5 px-3 bg-white rounded flex flex-col items-center justify-around w-[70%]"
        >
          <div className="w-full my-6 flex gap-1">
            <h1 className="text-5xl text-cyan-500 font-bold py-1 px-1">
              Register
            </h1>
            <p className="italic font-bold text-cyan-500">
              Account for walk in my Store
            </p>
          </div>
          {/* alert messsage */}
          <p className="my-2 text-red-500">{message}</p>
          {/* border */}
          <div className="flex items-center justify-center">
            <hr className="border rounded border-gray-400 w-[100px]" />
            <h1 className="text-xl text-cyan-500 font-bold">Set account</h1>
            <hr className="border rounded border-gray-400 w-[100px]" />
          </div>
          {/* input */}
          <div className="w-full items-center flex justify-center flex-col gap-2">
            <div className="grid grid-cols-2 gap-3 w-[90%]">
              {/* full name */}
              <div className="flex flex-col">
                <label htmlFor="" className="mx-2">
                  <FontAwesomeIcon icon={["fas", "user"]} />
                </label>
                <input
                  type="text"
                  name="fullname"
                  onChange={handleOnchange}
                  className="h-[40px] border-[1.5px] border-gray-400 rounded text-center"
                  placeholder="Nhập họ tên của bạn"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="mx-2">
                  <FontAwesomeIcon icon={["fas", "image"]} />
                </label>
                <input
                  type="text"
                  name="avatar"
                  onChange={handleOnchange}
                  className="h-[40px] border-[1.5px] border-gray-400 rounded text-center"
                  placeholder="Dán đường dẫn avatar"
                />
              </div>
              {/* email */}
              <div className="flex flex-col">
                <label htmlFor="" className="mx-2">
                  <FontAwesomeIcon icon={["fas", "envelope"]} />
                </label>
                <input
                  onChange={handleOnchange}
                  type="email"
                  name="email"
                  className="h-[40px] border-[1.5px] border-gray-400 rounded text-center"
                  placeholder="Nhập email của bạn"
                />
              </div>

              {/* address */}
              <div className="flex flex-col">
                <label htmlFor="" className="mx-2">
                  <FontAwesomeIcon icon={["fas", "address-book"]} />
                </label>
                <input
                  onChange={handleOnchange}
                  type="text"
                  name="address"
                  placeholder="Nhập địa chỉ của bạn"
                  className="h-[40px] border-[1.5px] border-gray-400 rounded text-center"
                />
              </div>

              {/* birthday */}
              <div className="flex flex-col">
                <label htmlFor="birthday" className="mx-2">
                  <FontAwesomeIcon icon={["fas", "birthday-cake"]} />
                </label>
                <input
                  onChange={handleOnchange}
                  type="date"
                  name="birthday"
                  className="h-[40px] border-[1.5px] border-gray-400 rounded text-center"
                />
              </div>
              {/*phone*/}
              <div className="flex flex-col">
                <label htmlFor="" className="mx-2">
                  <FontAwesomeIcon icon={["fas", "phone"]} />
                </label>
                <input
                  onChange={handleOnchange}
                  type="tel"
                  name="phone"
                  placeholder="Nhập số điện thoại"
                  className="h-[40px] border-[1.5px] border-gray-400 rounded text-center"
                />
              </div>
            </div>
            {/* border */}
            <div className="flex items-center justify-center">
              <hr className="border rounded border-gray-400 w-[100px]" />
              <h1 className="text-xl text-cyan-500 font-bold">Set password</h1>
              <hr className="border rounded border-gray-400 w-[100px]" />
            </div>
            {/* pass and role */}
            <div className="flex gap-3 flex-col w-[60%]">
              {/* chose role */}
              <select
                name="role"
                id="role"
                onChange={handleOnchange}
                className="h-[40px] border-[1.5px] border-gray-400 rounded text-center"
              >
                <option value="">Bạn muốn tạo tài khoản vì mục đích gì?</option>
                <option value="user">Người dùng</option>
                <option value="seller">Seller</option>
              </select>
              {/* setpass */}
              <input
                onChange={handleOnchange}
                type="password"
                placeholder="Tạo mật khẩu"
                name="password"
                className="h-[40px] border-[1.5px] border-gray-400 rounded text-center"
              />
              <input
                onChange={handleOnchange}
                type="password"
                name="repassword"
                placeholder="Xác nhận mật khẩu"
                className="h-[40px] border-[1.5px] border-gray-400 rounded text-center"
              />
            </div>
          </div>
          {/* button */}
          <div className="my-3">
            <button
              type="submit"
              className=" bg-green-500 rounded w-[100px] h-[40px]"
            >
              <FontAwesomeIcon
                icon={["fas", "paper-plane"]}
                className="text-2xl text-white"
              />
            </button>
          </div>
          {/* question */}
          <div className="my-3 flex gap-3">
            <Link className="text-cyan-500 underline" to="/">
              <FontAwesomeIcon icon={["fas", "house"]} />
            </Link>
            <span>||</span>
            <Link className="text-cyan-500 underline" to="/login">
              Login?
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
