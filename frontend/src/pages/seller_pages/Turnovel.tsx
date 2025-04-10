import "react-datepicker/dist/react-datepicker.css";
import HeaderSeller from "../../layouts/HeaderSeller";
import Filter from "./Filter";

export default function Turnovel() {
  return (
    <>
      <HeaderSeller />
      <section className="h-screen my-1 py-6">
        <span className="flex justify-center">
          <h1 className="text-4xl font-bold">DOANH THU</h1>
        </span>
        <div className="w-full">
          <Filter />
        </div>
      </section>
    </>
  );
}
