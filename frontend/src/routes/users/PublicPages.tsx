import { Route, Routes } from "react-router-dom";
import About from "../../pages/user_pages/About";
import Register from "../../pages/Register";
import Home from "../../pages/Home";

export default function PublicPages() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
