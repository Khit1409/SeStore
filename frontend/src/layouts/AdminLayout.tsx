import AdminNavbar from "../components/sections/AdminNavbar";
import Footer from "../components/sections/Footer";

export default function AdminLayout() {
  return (
    <div>
      <header>
        <AdminNavbar />
      </header>
      <main className="bg-gray-300"></main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
