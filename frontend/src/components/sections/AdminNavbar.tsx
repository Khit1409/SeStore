import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
// import UserTable from "../users/UserTable";
import { AppDispatch, RootState } from "../../features/app.store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auths/auth.slice";

export default function AdminNavbar() {
  const { isAuthenticate } = useSelector((state: RootState) => state.auth);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  // const [show, setShow] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const responsiveToggle = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLogout = async () => {
    const respose = await dispatch(logout());
    if (logout.fulfilled.match(respose)) {
      navigate("/login");
    }
  };
  return (
    <section className="container-lg flex items-center justify-around pt-1 w-screen">
      {/* logo */}
      <div className="mx-2 h-[40px]">
        <img src="/logo.png" alt="logo" className="h-full w-[50px] rounded" />
      </div>

      {/* navigation */}
      <nav className="flex w-[90%] items-center justify-end md:justify-around">
        <ul
          className={`
            absolute top-15
            flex w-screen flex-col items-center py-2 gap-3 rounded  bg-gray-400 text-center text-white font-semibold right-0
            md:static md:pl-0 md:h-auto md:w-[80%] md:flex md:flex-row md:justify-center md:bg-white md:text-black
            ${showMenu ? "" : "hidden"}
          `}
        >
          <li>
            <Link
              to="/admin"
              className="hover:border-b-[1.5px] hover:border-b-gray-500"
            >
              Trang chủ
            </Link>
          </li>
          <li>
            <Link
              to="/manager_products"
              className="hover:border-b-[1.5px] hover:border-b-gray-500"
            >
              Quản lý tài khoản
            </Link>
          </li>
          <li>
            <Link
              to="/support"
              className="hover:border-b-[1.5px] hover:border-b-gray-500"
            >
              Hộ trợ
            </Link>
          </li>
        </ul>
        {/* inforuser */}
        {/* button group */}
        <div className="flex gap-2 mx-2 justify-around">
          {isAuthenticate ? (
            <button
              onClick={handleLogout}
              type="button"
              className="flex w-[80px] items-center justify-center rounded bg-cyan-500 text-xl font-bold text-white py-1"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="flex w-[80px] items-center justify-center rounded bg-cyan-500 text-xl font-bold text-white py-1"
            >
              Sign in
            </Link>
          )}

          {/* responsive toggle */}
          <button
            onClick={responsiveToggle}
            className="h-[40px] w-[40px] md:hidden border-[1.5px] border-white rounded mr-5"
          >
            <FontAwesomeIcon
              icon={["fas", "hamburger"]}
              className="h-full w-full text-2xl text-white"
            />
          </button>
        </div>
      </nav>
    </section>
  );
}
