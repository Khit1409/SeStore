import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../features/app.store";
import {
  getOrderConfirm,
  submitOrder,
} from "../../features/orders/order.slice";

type PostType = {
  seller_id: string;
  type_product: string;
  limit: number;
  page: number;
};

export default function ManagerOrder() {
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.auth);
  const { orders } = useSelector((state: RootState) => state.order);

  const [post, setPost] = useState<PostType>({
    seller_id: users?.user_id as string,
    type_product: "",
    limit: 8,
    page: 1,
  });

  useEffect(() => {
    const fetchOrder = async () =>
      await dispatch(getOrderConfirm({ seller_id: users?.user_id as string }));
    fetchOrder();
  }, [dispatch, users]);

  const handleChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPost((prev) => ({ ...prev, typeProduct: e.target.value, page: 1 }));
  };

  const handleNextPage = () =>
    setPost((prev) => ({ ...prev, page: prev.page + 1 }));
  const handlePrevPage = () =>
    setPost((prev) => ({ ...prev, page: Math.max(prev.page - 1, 1) }));

  return (
    <div className="py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Quản lý đơn hàng</h1>
      <section className="flex flex-col md:flex-row items-center gap-4 mb-6 max-w-5xl mx-auto">
        <select
          onChange={handleChangeType}
          value={post.type_product}
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
        {orders && orders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {orders.map((order) => (
              <div
                key={order._id}
                className="flex flex-col gap-2 bg-white rounded-lg p-4 shadow hover:shadow-md transition"
              >
                {/* User Info */}
                {order.users && (
                  <div className="border-b pb-2">
                    <div className="text-left mb-2">
                      <p className="font-bold text-green-700">
                        Tên khách hàng: {order.users.name}
                      </p>
                      <p className="font-bold text-green-700">
                        Mã đơn hàng: {order._id}
                      </p>
                      <p>📞 {order.users.phone}</p>
                      <p>📧 {order.users.email}</p>
                      <p className="italic text-gray-500">
                        🏠 {order.address}
                      </p>
                    </div>
                  </div>
                )}

                {/* Product Info */}
                {order.product_items.map((product, index) => (
                  <div
                    key={index}
                    className="border-t pt-2 mt-2 text-left text-sm"
                  >
                    <img
                      src={product.snapshot?.image}
                      alt={product.snapshot?.name}
                      className="w-full h-40 object-cover rounded"
                    />
                    <p className="font-semibold mt-1">
                      {product.snapshot?.name}
                    </p>
                    <p>
                      <strong>Hãng:</strong> {product.snapshot?.brands}
                    </p>
                    <p>
                      <strong>Loại:</strong> {product.snapshot?.type_product}
                    </p>
                    <p>
                      <strong>Trạng thái:</strong>
                      {product.snapshot?.state_product}
                    </p>
                    <p>
                      <strong>Giá:</strong>
                      {product.snapshot?.price}
                      VND
                    </p>

                    <span>
                      <strong>số lượng:</strong> {product.quantity}{" "}
                    </span>
                    <p>
                      <strong>Ngày đặt:</strong>
                      {order.createdAt}
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
                  <button
                    onClick={() => {
                      dispatch(
                        submitOrder({
                          order_id: order._id,
                        })
                      );
                    }}
                    className="flex items-center gap-2 bg-amber-300 hover:bg-amber-400 text-white px-3 py-1 rounded-full font-semibold text-sm"
                  >
                    <FontAwesomeIcon icon={["fas", "check"]} />
                    Đã giao
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
