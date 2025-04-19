import { Outlet } from "react-router-dom";
import SellerNavbar from "../components/sections/SellerNavbar";
import Footer from "../components/sections/Footer";

export default function SellerLayout() {
  return (
    <div>
      <header>
        <SellerNavbar />
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
