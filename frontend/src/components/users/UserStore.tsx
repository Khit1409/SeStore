//trang hiện các sản phẩm trong shop
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../features/app.store";
import { ChangeEvent, useEffect, useState } from "react";
import { getProductForUser } from "../../features/products/productsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

type RequestType = {
  typeProduct: string;
  price: string;
  limit: 8;
  stateProduct: string;
  page: number;
  search: string;
};

export default function UserStore() {
  const { products } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch<AppDispatch>();
  const [res, setRes] = useState<RequestType>({
    typeProduct: "",
    price: "",
    limit: 8,
    stateProduct: "",
    page: 1,
    search: "",
  });
  useEffect(() => {
    const fetchProduct = async () => {
      await dispatch(
        getProductForUser({
          type_product: res.typeProduct,
          state_product: res.stateProduct,
          limit: res.limit,
          page: res.page,
          price: res.price,
          search: res.search,
        })
      );
    };
    fetchProduct();
  }, [dispatch, res]);

  const handleOnchange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setRes((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      page: res.page,
    }));
  };
  const handleNextPage = () =>
    setRes((prev) => ({ ...prev, page: prev.page + 1 }));

  const handlePrevPage = () =>
    setRes((prev) => ({ ...prev, page: prev.page > 1 ? prev.page - 1 : 1 }));
  return (
    <section className="min-h-screen bg-gray-50">
      {/* Filter section */}
      <section className="flex flex-wrap items-center justify-around gap-4 my-6 px-5">
        <select
          onChange={handleOnchange}
          name="typeProduct"
          className="flex-1 min-w-[180px] border-[1.5px] rounded-full border-gray-400 h-[40px] text-center bg-white shadow-sm hover:border-green-500 focus:ring-green-500"
        >
          <option value="all">Chọn loại sản phẩm</option>
          <option value="fashion">Thời trang</option>
          <option value="vehicles">Xe cộ</option>
          <option value="household_appliances">Đồ gia dụng</option>
          <option value="devices">Thiết bị</option>
          <option value="other">Khác</option>
        </select>

        <select
          onChange={handleOnchange}
          name="price"
          className="flex-1 min-w-[180px] border-[1.5px] rounded-full border-gray-400 h-[40px] text-center bg-white shadow-sm hover:border-green-500 focus:ring-green-500"
        >
          <option value="all">Chọn mức giá</option>
          <option value="100000">0 - 100.000 VND</option>
          <option value="200000">~ 200.000 VND</option>
          <option value="300000">~ 300.000 VND</option>
          <option value="400000">~ 400.000 VND</option>
          <option value="1000000">Lớn hơn</option>
        </select>

        <select
          name="stateProduct"
          onChange={handleOnchange}
          className="flex-1 min-w-[180px] border-[1.5px] rounded-full border-gray-400 h-[40px] text-center bg-white shadow-sm hover:border-green-500 focus:ring-green-500"
        >
          <option value="">Tình trạng sản phẩm</option>
          <option value="new">Mới</option>
          <option value="used">Đã qua sử dụng</option>
        </select>

        <form className="relative flex-1 min-w-[200px]">
          <input
            type="text"
            name="search"
            onChange={handleOnchange}
            className="w-full h-[40px] border-[1.5px] rounded-full text-center outline-0 border-gray-400 bg-white shadow-sm"
            placeholder="Tìm kiếm..."
          />
        </form>
      </section>

      {/* Product list */}
      <section className="flex items-center justify-center my-10">
        {products && products.length > 0 ? (
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 w-[95%]">
            {products.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition duration-300"
              >
                <img
                  className="rounded-lg w-full h-[200px] object-cover mb-3"
                  src={item.image}
                  alt={item.name}
                />
                <h3 className="text-lg font-bold text-gray-800 truncate">
                  {item.name}
                </h3>
                <p className="text-green-600 font-semibold">{item.price} VND</p>
                <div className="mt-2 flex justify-end">
                  <Link
                    to={`/user/buy/${item._id}`}
                    className="text-white bg-green-500 hover:bg-green-600 transition px-3 py-1 rounded-full text-sm"
                  >
                    <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Thêm vào giỏ
                    hàng
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-xl">
            Không tìm thấy sản phẩm nào
          </div>
        )}
      </section>

      {/* Pagination */}
      <section className="flex items-center justify-center gap-3 my-6">
        <button
          onClick={handlePrevPage}
          className="bg-gray-200 hover:bg-gray-300 rounded-full w-[40px] h-[40px] flex items-center justify-center text-xl"
        >
          <FontAwesomeIcon icon={["fas", "backward"]} />
        </button>
        <input
          type="text"
          readOnly
          value={res.page}
          className="w-[40px] h-[40px] text-center border border-gray-300 rounded"
        />
        <button
          onClick={handleNextPage}
          className="bg-gray-200 hover:bg-gray-300 rounded-full w-[40px] h-[40px] flex items-center justify-center text-xl"
        >
          <FontAwesomeIcon icon={["fas", "forward"]} />
        </button>
      </section>
    </section>
  );
}
