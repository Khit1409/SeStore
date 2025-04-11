import { Outlet } from "react-router-dom";
import Navbar from "../components/sections/Navbar";
import Footer from "../components/sections/Footer";

export default function IndexLayout() {
  return (
    <div>
      <header>
        <div className="bg-[url('/banner.png')] bg-cover bg-center h-screen w-screen">
          <Navbar />
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
