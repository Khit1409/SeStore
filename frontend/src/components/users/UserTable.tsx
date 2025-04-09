import { useSelector } from "react-redux";
import { RootState } from "../../redux/authStore";
import { useEffect, useState } from "react";

export default function UserTable() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 2000);
  }, []);

  return (
    //container
    <div className="absolute top-15 right-5">
      <div className="rounded flex items-start justify-center p-10 bg-white">
        {user ? (
          <ul className="flex flex-col justify-center gap-2 p-10 rounded shadow-[0px_0px_3px_1px_rgba(0,0,0,0.75)] ">
            <li className="flex items-center justify-center mb-3">
              <img
                src={user.avatar}
                alt="avatar"
                className="w-[100px] h-[100px] rounded-full"
              />
            </li>
            <li className="bg-gray-100 rounded flex text-center px-1">
              <span className="font-bold mx-1"> Tên: </span>
              <p>{user.fullname}</p>
            </li>
            <li className="bg-gray-100 rounded flex text-center px-1">
              <span className="font-bold mx-1"> Email:</span> <p>{user.email}</p>
            </li>
            <li className="bg-gray-100 rounded flex text-center px-1">
              <span className="font-bold mx-1">Phone: </span>
              <p>{user.phone}</p>
            </li>
            <li className="bg-gray-100 rounded flex text-center px-1">
              <span className="font-bold mx-1">Địa chỉ:</span>
              <p> {user.address}</p>
            </li>
            <li className="bg-gray-100 rounded flex text-center px-1">
              <span className="font-bold mx-1">Quyền:</span>
              <p> {user.role}</p>
            </li>
            {/* logout btn */}
            <li className="flex items-center justify-center mt-10">
              <button
                type="button"
                className="flex w-[80px] items-center justify-center rounded bg-cyan-500 text-xl font-bold text-white py-1"
              >
                Logout
              </button>
            </li>
          </ul>
        ) : (
          <div className="w-[200px] h-[200px] flex items-center justify-center flex-col gap-2">
            {loading ? (
              <div className="w-[40px] h-[40px] border-2 border-gray-500 rounded-full border-t-transparent animate-spin"></div>
            ) : (
              <p className="text-xl">Bạn chưa đăng nhập</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
