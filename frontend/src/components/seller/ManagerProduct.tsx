import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteProduct,
  getProductForSeller,
} from "../../features/products/productsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppDispatch, RootState } from "../../features/app.store";

type DataType = {
  seller_id: string;
  type_product: string;
  limit: number;
  page: number;
  search: string;
};

export default function ManagerProduct() {
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.auth);
  const { products } = useSelector((state: RootState) => state.product);

  const [data, setData] = useState<DataType>({
    seller_id: users?.user_id as string,
    type_product: "",
    limit: 8,
    page: 1,
    search: "",
  });

  useEffect(() => {
    const fetchProducts = () => {
      dispatch(
        getProductForSeller({
          type_product: data.type_product,
          page: data.page,
          limit: 8,
          seller_id: data.seller_id,
          search: data.search,
        })
      );
    };
    if (data.seller_id) fetchProducts();
  }, [data, dispatch]);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      page: 1,
    }));
  };

  const handleNextPage = () =>
    setData((prev) => ({ ...prev, page: prev.page + 1 }));
  const handlePrevPage = () =>
    setData((prev) => ({ ...prev, page: Math.max(prev.page - 1, 1) }));

  const handleDeleteProduct = async (product_id: string) => {
    dispatch(
      deleteProduct({ seller_id: users?.user_id as string, product_id: product_id })
    );
  };
  return (
    <div className="py-8 px-4">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-8">Quản lý sản phẩm</h1>

      {/* Filter */}
      <section className="flex flex-col md:flex-row items-center gap-4 mb-6 max-w-5xl mx-auto ">
        <select
          onChange={handleOnChange}
          name="typeProduct"
          className="w-full md:w-1/2 border border-gray-400 outline-0 rounded-full px-4 py-2 text-center hover:outline hover:outline-green-500"
        >
          <option value="">Chọn loại sản phẩm</option>
          <option value="fashion">Thời trang</option>
          <option value="vehicles">Phương tiện</option>
          <option value="household_appliances">Đồ gia dụng</option>
          <option value="devices">Thiết bị</option>
          <option value="other">Khác</option>
        </select>

        {/* Search - future update */}
        <form className="relative w-full md:w-1/2">
          <input
            onChange={handleOnChange}
            name="search"
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full border border-gray-400 rounded-full px-4 py-2 text-center outline-0"
          />
        </form>
      </section>

      {/* Product Grid */}
      <section className="my-6">
        {products && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {products.map((item) => (
              <div
                key={item._id}
                className="flex flex-col items-center text-center p-3 rounded-lg shadow-sm hover:shadow-md transition gap-2"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded mb-2 hover:scale-105 transition-transform"
                />
                <p className="font-semibold">{item.name}</p>
                <p className="text-cyan-600 font-bold">{item.price} VND</p>

                <div className="flex justify-between mt-3 gap-2">
                  <button
                    onClick={() => handleDeleteProduct(item._id)}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full font-semibold text-sm"
                  >
                    <FontAwesomeIcon icon={["fas", "trash"]} /> Xóa
                  </button>
                  <button className="flex items-center gap-2 bg-amber-300 hover:bg-amber-400 text-white px-3 py-1 rounded-full font-semibold text-sm">
                    <FontAwesomeIcon icon={["fas", "pen"]} /> Chỉnh sửa
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-xl font-medium text-gray-600 mt-10">
            Không có sản phẩm nào
          </div>
        )}
      </section>

      {/* Pagination */}
      <section className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={handlePrevPage}
          className="p-2 border rounded-full hover:bg-gray-200"
        >
          <FontAwesomeIcon icon={["fas", "backward"]} />
        </button>
        <span className="w-10 text-center font-semibold">{data.page}</span>
        <button
          onClick={handleNextPage}
          className="p-2 border rounded-full hover:bg-gray-200"
        >
          <FontAwesomeIcon icon={["fas", "forward"]} />
        </button>
      </section>
    </div>
  );
}
