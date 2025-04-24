import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../features/app.store";
import { useEffect } from "react";
import { getAccountForAdmin } from "../../features/auths/auth.slice";

export default function AdminDashboard() {
  const { account } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAccountForAdmin(null));
  }, [dispatch]);
  return (
    <>
      <div className="p-6 space-y-10 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center">Trang quản trị Admin</h1>

        {/* User Section */}
        {account?.map((acc) => (
          <>
            {acc.role === "user" && (
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-blue-600">
                  Danh sách người dùng
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div
                    key={acc.user_id}
                    className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition flex flex-col gap-2"
                  >
                    <p>
                      <strong>Tên:</strong>
                      {acc.name}
                    </p>
                    <p>
                      <strong>Email:</strong>
                      {acc.email}
                    </p>
                    <p>
                      <strong>Vai trò:</strong>
                      {acc.role}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <button className="px-3 py-1 bg-amber-400 hover:bg-amber-500 text-white rounded-full text-sm">
                        <FontAwesomeIcon icon={["fas", "pen"]} /> Chỉnh sửa
                      </button>
                      <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm">
                        <FontAwesomeIcon icon={["fas", "trash"]} /> Xoá
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Seller Section */}
            {acc.role === "seller" && (
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-blue-600">
                  Danh sách người dùng
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div
                    key={acc.user_id}
                    className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition flex flex-col gap-2"
                  >
                    <p>
                      <strong>Tên:</strong>
                      {acc.name}
                    </p>
                    <p>
                      <strong>Email:</strong>
                      {acc.email}
                    </p>
                    <p>
                      <strong>Vai trò:</strong>
                      {acc.role}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <button className="px-3 py-1 bg-amber-400 hover:bg-amber-500 text-white rounded-full text-sm">
                        <FontAwesomeIcon icon={["fas", "pen"]} /> Chỉnh sửa
                      </button>
                      <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm">
                        <FontAwesomeIcon icon={["fas", "trash"]} /> Xoá
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </>
        ))}
      </div>
    </>
  );
}
