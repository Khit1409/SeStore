import { Outlet } from "react-router-dom";
import SellerNavbar from "../components/sections/SellerNavbar";

export default function SellerLayout() {
  return (
    <div>
      <header>
        <SellerNavbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
}
