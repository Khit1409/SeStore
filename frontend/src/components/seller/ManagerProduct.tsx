import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteProduct,
  getProductForSeller,
} from "../../features/products/productsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppDispatch, RootState } from "../../features/appStore";

type Data = {
  sellerId: string;
  typeProduct: string;
  limit: number;
  page: number;
};

export default function ManagerProduct() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { product } = useSelector((state: RootState) => state.product);

  const [data, setData] = useState<Data>({
    sellerId: user?.userId as string,
    typeProduct: "",
    limit: 8,
    page: 1,
  });

  useEffect(() => {
    const fetchProducts = () => {
      dispatch(
        getProductForSeller({
          typeProduct: data.typeProduct,
          page: data.page,
          limit: 8,
          sellerId: data.sellerId,
        })
      );
    };
    if (data.sellerId) fetchProducts();
  }, [data, dispatch]);

  const handleChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setData((prev) => ({ ...prev, typeProduct: e.target.value, page: 1 }));
  };

  const handleNextPage = () =>
    setData((prev) => ({ ...prev, page: prev.page + 1 }));
  const handlePrevPage = () =>
    setData((prev) => ({ ...prev, page: Math.max(prev.page - 1, 1) }));

  const handleDeleteProduct = async (productId: string) => {
    dispatch(
      deleteProduct({ sellerId: user?.userId as string, productId: productId })
    );
  };
  return (
    <div className="py-8 px-4">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-8">Quản lý sản phẩm</h1>

      {/* Filter */}
      <section className="flex flex-col md:flex-row items-center gap-4 mb-6 max-w-5xl mx-auto ">
        <select
          onChange={handleChangeType}
          value={data.typeProduct}
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
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full border border-gray-400 rounded-full px-4 py-2 text-center outline-0"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full"
          >
            <FontAwesomeIcon icon={["fas", "search"]} />
          </button>
        </form>
      </section>

      {/* Product Grid */}
      <section className="my-6">
        {product && product.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {product.map((item) => (
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

                <div className="flex gap-2">
                  <button
                    onClick={() => handleDeleteProduct(item._id)}
                    className="rounded-full bg-red-500 px-2 py-1 text-white font-bold"
                  >
                    <FontAwesomeIcon icon={["fas", "trash"]} /> Xóa
                  </button>
                  <button className="rounded-full bg-amber-300 px-2 py-1 text-white font-bold">
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
          className="p-2 border rounded hover:bg-gray-200"
        >
          <FontAwesomeIcon icon={["fas", "backward"]} />
        </button>
        <span className="w-10 text-center font-semibold">{data.page}</span>
        <button
          onClick={handleNextPage}
          className="p-2 border rounded hover:bg-gray-200"
        >
          <FontAwesomeIcon icon={["fas", "forward"]} />
        </button>
      </section>
    </div>
  );
}
