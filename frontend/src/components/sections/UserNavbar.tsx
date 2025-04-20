import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { AppDispatch, RootState } from "../../features/appStore";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auths/authSlice";

export default function UserNavbar() {
  const { isAuthenticate } = useSelector((state: RootState) => state.auth);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLogout = async () => {
    const response = await dispatch(logout());
    if (logout.fulfilled.match(response)) {
      navigate("/");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex items-center justify-between px-4 py-2 max-w-[1400px] mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/logo.png" alt="logo" className="h-10 w-10 rounded" />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-lg font-medium text-gray-800">
          <Link to="/user" className="hover:text-green-500 transition">
            Trang chủ
          </Link>
          <Link
            to="/user/go_to_shopping"
            className="hover:text-green-500 transition"
          >
            Cửa hàng
          </Link>
          <Link to="/user/my_cart" className="hover:text-green-500 transition">
            Giỏ hàng
          </Link>
          <Link to="/user/my_order" className="hover:text-green-500 transition">
            Đơn hàng
          </Link>
          <Link
            to="/user/my_profile"
            className="hover:text-green-500 transition"
          >
            Profile
          </Link>
        </nav>

        {/* Auth + Toggle */}
        <div className="flex items-center gap-3">
          {isAuthenticate ? (
            <button
              onClick={handleLogout}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-1 rounded font-bold"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-1 rounded font-bold"
            >
              Sign in
            </Link>
          )}

          {/* Hamburger for mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden border p-2 rounded text-gray-700"
          >
            <FontAwesomeIcon icon={["fas", "bars"]} className="text-xl" />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {showMenu && (
        <nav className="md:hidden bg-gray-100 text-gray-800 font-medium px-6 py-4 flex flex-col gap-3">
          <Link
            to="/user"
            onClick={toggleMenu}
            className="hover:text-green-500"
          >
            Trang chủ
          </Link>
          <Link
            to="/user/go_to_shopping"
            onClick={toggleMenu}
            className="hover:text-green-500"
          >
            Cửa hàng
          </Link>
          <Link
            to="/user/my_cart"
            onClick={toggleMenu}
            className="hover:text-green-500"
          >
            Giỏ hàng
          </Link>
          <Link
            to="/user/my_order"
            onClick={toggleMenu}
            className="hover:text-green-500"
          >
            Đơn hàng
          </Link>
          <Link
            to="/user/my_profile"
            onClick={toggleMenu}
            className="hover:text-green-500"
          >
            Profile
          </Link>
        </nav>
      )}
    </header>
  );
}
