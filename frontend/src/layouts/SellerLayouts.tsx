import { Route, Routes } from "react-router-dom";
import HomeSeller from "../pages/seller_pages/HomeSeller";
import ShopDetailSeller from "../pages/seller_pages/ShopSeller";
import Turnovel from "../pages/seller_pages/Turnovel";

export default function SellerLayouts() {
  return (
    <Routes>
      <Route path="/" element={<HomeSeller />} />
      <Route path="/seller/myshop" element={<ShopDetailSeller />} />
      <Route path="/seller/turnovel" element={<Turnovel />} />
    </Routes>
  );
}
