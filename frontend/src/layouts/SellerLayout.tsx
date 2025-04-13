import { Outlet } from "react-router-dom";
import SellerNavbar from "../components/sections/SellerNavbar";
import { Provider } from "react-redux";
import { productStore } from "../features/products/productsStore";

export default function SellerLayout() {
  return (
    <div>
      <header>
        <SellerNavbar />
      </header>
      <main>
        <Provider store={productStore}>
          <Outlet />
        </Provider>
      </main>
      <footer></footer>
    </div>
  );
}
