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
    <div className="absolute top-12 right-5 bg-gray-500 rounded p-2 w-[300px] flex items-center justify-center">
      <div className="bg-gray-300 h-[95%] w-[95%] rounded gap-2 flex flex-col p-2">
        {user ? (
          <>
            <div className="h-[30%] flex items-center justify-center">
              <span>
                <img
                  src={user.avatar}
                  alt=""
                  className="w-[100px] h-[100px] rounded-full object-cover"
                />
              </span>
            </div>
            <div className="h-[70%] flex flex-col items-start mx-2">
              <span className="flex gap-2">
                <strong>Tên:</strong>
                <p>{user.fullname}</p>
              </span>
              <span className="flex gap-2">
                <strong>Email:</strong>
                <p>{user.email}</p>
              </span>
              <span className="flex gap-2">
                <strong>Số điện thoại:</strong>
                <p>{user.phone}</p>
              </span>
              <span className="flex gap-2">
                <strong>Địa chỉ:</strong>
                <p>{user.address}</p>
              </span>
              <span className="flex gap-2">
                <strong>Quyền:</strong>
                <p>{user.role}</p>
              </span>
            </div>
          </>
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
