import Footer from "../../components/sections/Footer";
import ProductContainer from "../../components/store/ProductContainer";
import Header from "../../layouts/Header";


export default function Store() {
  return (
    <div className="container-lg">
      <Header />
      <ProductContainer />
      <Footer />
    </div>
  );
}
