import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../features/appStore";
import { getCartForSeller } from "../../features/carts/cartSlice";

type PostType = {
  sellerId: string;
  typeProduct: string;
  limit: number;
  page: number;
};

export default function ManagerOrder() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { cart } = useSelector((state: RootState) => state.cart);

  const [post, setPost] = useState<PostType>({
    sellerId: user?.userId as string,
    typeProduct: "",
    limit: 8,
    page: 1,
  });

  useEffect(() => {
    const fetchOrders = () => {
      dispatch(
        getCartForSeller({
          sellerId: post.sellerId,
          typeProduct: post.typeProduct,
          page: post.page,
          limit: post.limit,
        })
      );
    };
    if (post.sellerId) fetchOrders();
  }, [post, dispatch]);

  const handleChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPost((prev) => ({ ...prev, typeProduct: e.target.value, page: 1 }));
  };

  const handleNextPage = () =>
    setPost((prev) => ({ ...prev, page: prev.page + 1 }));
  const handlePrevPage = () =>
    setPost((prev) => ({ ...prev, page: Math.max(prev.page - 1, 1) }));

  return (
    <div className="py-8 px-4">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-8">Quản lý đơn hàng</h1>

      {/* Filter */}
      <section className="flex flex-col md:flex-row items-center gap-4 mb-6 max-w-5xl mx-auto">
        <select
          onChange={handleChangeType}
          value={post.typeProduct}
          className="w-full md:w-1/2 border border-gray-400 outline-0 rounded-full px-4 py-2 text-center hover:outline hover:outline-green-500"
        >
          <option value="">Chọn loại sản phẩm</option>
          <option value="fashion">Thời trang</option>
          <option value="vehicles">Phương tiện</option>
          <option value="household_appliances">Đồ gia dụng</option>
          <option value="devices">Thiết bị</option>
          <option value="other">Khác</option>
        </select>

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

      {/* Orders List */}
      <section className="my-6">
        {cart && cart.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {cart.map((carts) => (
              <div
                key={carts._id}
                className="flex flex-col gap-2 bg-white rounded-lg p-4 shadow hover:shadow-md transition"
              >
                {/* User Info */}
                <div className="border-b pb-2">
                  <div className="text-left mb-2">
                    <p className="font-bold text-green-700">
                      Tên khách hàng: {carts.users.fullname}
                    </p>
                    <p className="font-bold text-green-700">
                      Mã đơn hàng: {carts._id}
                    </p>
                    <p>📞 {carts.users.phone}</p>
                    <p>📧 {carts.users.email}</p>
                    <p className="italic text-gray-500">🏠 {carts.address}</p>
                  </div>
                </div>

                {/* Product Info */}
                {carts.productItems.map((product) => (
                  <div
                    key={product._id}
                    className="border-t pt-2 mt-2 text-left text-sm"
                  >
                    <img
                      src={`${product.productId.image}`}
                      alt={product.productId.name}
                      className="w-full h-40 object-cover rounded"
                    />
                    <p className="font-semibold mt-1">
                      {product.productId.name}
                    </p>
                    <p>
                      <strong>Hãng:</strong> {product.productId.brands}
                    </p>
                    <p>
                      <strong>Loại:</strong> {product.productId.typeProduct}
                    </p>
                    <p>
                      <strong>Trạng thái:</strong>
                      {product.productId.stateProduct}
                    </p>
                    <p>
                      <strong>Giá:</strong>
                      {product.productId.price}
                      VND
                    </p>

                    <p>
                      <strong>số lượng:</strong> {product.quantity}
                    </p>
                    <p>
                      <strong>Ngày đặt:</strong>
                      {new Date(carts.createdAt).toLocaleDateString("vi-VN")}
                    </p>
                    {product.attributes.map((attr, index) => (
                      <p key={index}>
                        <strong>{attr.name}:</strong> {attr.value}
                      </p>
                    ))}
                  </div>
                ))}

                {/* Actions */}
                <div className="flex justify-between mt-3">
                  <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full font-semibold text-sm">
                    <FontAwesomeIcon icon={["fas", "check"]} />
                    Xác nhận
                  </button>
                  <button className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-full font-semibold text-sm">
                    <FontAwesomeIcon icon={["fas", "pen"]} />
                    Sửa
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-xl font-medium text-gray-600 mt-10">
            Không có đơn hàng nào
          </div>
        )}
      </section>

      {/* Pagination */}
      <section className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={handlePrevPage}
          className="p-2 border rounded-full hover:bg-gray-200"
        >
          <FontAwesomeIcon icon={["fas", "backward"]} />
        </button>
        <span className="w-10 text-center font-semibold">{post.page}</span>
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
