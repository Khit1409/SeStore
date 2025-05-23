import { Outlet } from "react-router-dom";
import Footer from "../components/sections/Footer";
import UserNavbar from "../components/sections/UserNavbar";

export default function UserLayout() {
  return (
    <div>
      <header>
        <div className="bg-[url('/banner.png')] bg-cover bg-center bg-no-repeat h-screen">
          <UserNavbar />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
