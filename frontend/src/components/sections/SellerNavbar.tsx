import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { AppDispatch, RootState } from "../../features/appStore";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auths/authSlice";

export default function SellerNavbar() {
  const { isAuthenticate } = useSelector((state: RootState) => state.auth);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const toggleMenu = () => setShowMenu((prev) => !prev);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <section className="w-full bg-white shadow-md">
      <div className="flex items-center justify-between px-4 py-2 max-w-[1400px] mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/logo.png" alt="logo" className="h-10 w-10 rounded" />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-lg font-medium text-gray-800">
          <Link to="/seller/dashboard" className="hover:text-cyan-600 transition">
            Trang chủ
          </Link>
          <Link
            to="/seller/myproduct"
            className="hover:text-cyan-600 transition"
          >
            Quản lý sản phẩm
          </Link>
          <Link
            to="/seller/mystore_order"
            className="hover:text-cyan-600 transition"
          >
            Quản lý đơn hàng
          </Link>
        </nav>

        {/* Auth + Hamburger */}
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

          {/* Hamburger button */}
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
            to="/seller"
            onClick={toggleMenu}
            className="hover:text-cyan-600"
          >
            Trang chủ
          </Link>
          <Link
            to="/seller/mystore"
            onClick={toggleMenu}
            className="hover:text-cyan-600"
          >
            Quản lý cửa hàng
          </Link>
          <Link
            to="/seller/myproduct"
            onClick={toggleMenu}
            className="hover:text-cyan-600"
          >
            Quản lý sản phẩm
          </Link>
          <Link
            to="/seller/mystore_order"
            onClick={toggleMenu}
            className="hover:text-cyan-600"
          >
            Quản lý đơn hàng
          </Link>
        </nav>
      )}
    </section>
  );
}
