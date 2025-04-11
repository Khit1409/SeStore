import Footer from "../components/sections/Footer";
import SellerNavbar from "../components/sections/SellerNavbar";

export default function SellerLayout() {
  return (
    <div>
      <header>
        <div className="bg-[url('/banner.png')] bg-cover bg-center h-screen w-screen">
          <SellerNavbar />
        </div>
      </header>
      <main></main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
