import { Route, Routes } from "react-router-dom";
import Store from "../../pages/user_pages/Store";

export default function PrivateUserPages() {
  return (
    <Routes>
      <Route path="/store" element={<Store />} />
    </Routes>
  );
}
