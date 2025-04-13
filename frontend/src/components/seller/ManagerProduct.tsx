import { useDispatch, useSelector } from "react-redux";
import {
  ProductDispatch,
  ProductRootState,
} from "../../features/products/productsStore";
import { useEffect, useState } from "react";
import { getProduct } from "../../features/products/productsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Data = {
  typeProduct: string;
  limit: number;
  page: number;
};

export default function ManagerProduct() {
  const dispatch = useDispatch<ProductDispatch>();
  const [data, setData] = useState<Data>({
    typeProduct: "all",
    limit: 8,
    page: 1,
  });

  const { product, error } = useSelector(
    (state: ProductRootState) => state.dataProduct
  );

  useEffect(() => {
    const fetchProduct = async () => {
      await dispatch(
        getProduct({
          typeProduct: data.typeProduct,
          limit: 8,
          page: data.page,
        })
      );
    };

    fetchProduct();
  }, [dispatch, data]);

  const handleOnchange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setData((prev) => ({
      ...prev,
      typeProduct: e.target.value,
      page: 1,
    }));
  };

  const handleNextPage = () =>
    setData((prev) => ({ ...prev, page: prev.page + 1 }));

  const handlePrevPage = () =>
    setData((prev) => ({ ...prev, page: prev.page > 1 ? prev.page - 1 : 1 }));

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="my-6">
      {/* header */}
      <div className="flex items-center justify-center">
        <h1 className="text-4xl font-bold">My Shop</h1>
      </div>

      {/* filter */}
      <section className="flex items-center justify-around my-6 gap-2 px-5 h-[35px]">
        {/* select */}
        <select
          onChange={handleOnchange}
          name="typeProduct"
          className="w-full border-[1.5px] rounded-full border-gray-500 h-full text-center"
        >
          <option value="all">Chose product you want to manage</option>
          <option value="fashion">Fashion</option>
          <option value="vehicles">Vehicles</option>
          <option value="household_appliances">Household appliances</option>
          <option value="devices">Devices</option>
          <option value="other">Other</option>
        </select>

        {/* search */}
        <form className="relative w-full h-full">
          <input
            type="text"
            className="w-full h-full border-[1.5px] rounded-full text-center outline-0 border-gray-500"
          />
          <button
            type="submit"
            className="absolute right-0 h-full rounded-full bg-green-500 w-[50px]"
          >
            <FontAwesomeIcon icon={["fas", "search"]} />
          </button>
        </form>
      </section>

      {/* product container */}
      <section className="flex items-center justify-center my-10">
        {product && product.length > 0 ? (
          <div className="grid md:grid-cols-4 grid-cols-2 gap-4 w-[95%]">
            {product.map((item) => (
              <div
                key={item._id}
                className="flex flex-col items-center justify-center"
              >
                <img
                  className="rounded transition-transform duration-300 ease-in-out hover:scale-105"
                  src={item.image}
                  alt={item.name}
                />
                <p className="font-bold">{item.name}</p>
                <p className="font-bold">{item.price} VND</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-screen flex items-center justify-center">
            <p className="text-4xl">No products found</p>
          </div>
        )}
      </section>

      {/* pagination */}
      <section className="flex items-center justify-center gap-3">
        <button className="mx-1" onClick={handlePrevPage}>
          <FontAwesomeIcon icon={["fas", "backward"]} className="text-2xl" />
        </button>
        <input
          type="text"
          readOnly
          value={data.page}
          className="text-center w-[30px] h-[30px]"
        />
        <button className="mx-1" onClick={handleNextPage}>
          <FontAwesomeIcon icon={["fas", "forward"]} className="text-2xl" />
        </button>
      </section>
    </div>
  );
}
