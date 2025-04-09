import { Route, Routes } from "react-router-dom";
import PublicPages from "../routes/users/PublicPages";
import PrivateRoutes from "../routes/PrivateRoutes";
import PrivateUserPages from "../routes/users/PrivateUserPages";

export default function UserLayouts() {
  return (
    <Routes>
      <Route path="/*" element={<PublicPages />} />
      <Route
        path="/users/*"
        element={
          <PrivateRoutes>
            <PrivateUserPages />
          </PrivateRoutes>
        }
      />
    </Routes>
  );
}
