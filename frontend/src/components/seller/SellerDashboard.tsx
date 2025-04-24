import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../features/app.store";
import { useEffect } from "react";
import { getProductForSeller } from "../../features/products/productsSlice";

export default function SellerDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.auth);
  const { carts } = useSelector((state: RootState) => state.cart);
  const { products } = useSelector((state: RootState) => state.product);
  useEffect(() => {
    const data = {
      seller_id: users?.user_id as string,
      type_product: "",
      limit: 8,
      page: 1,
    };

    const fetchProducts = () => {
      dispatch(
        getProductForSeller({
          type_product: data.type_product,
          page: data.page,
          limit: 8,
          seller_id: data.seller_id,
          search: "",
        })
      );
    };
    if (data.seller_id) fetchProducts();
  }, [users, dispatch]);
  useEffect(() => {
    const fetchOrders = () => {};
    if (users?.user_id) fetchOrders();
  }, [users, dispatch]);
  return (
    <div className="px-4 my-6 max-w-6xl mx-auto h-screen flex items-center flex-col justify-center">
      {/* Tiêu đề */}
      <h1 className="text-4xl font-bold text-center mb-6">Quản lý cửa hàng</h1>

      {/* Thông tin cửa hàng */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">👤 Tên chủ cửa hàng:</h2>
          <p className="text-gray-700">{users?.name}</p>
          {users?.avatar ? (
            <img
              src={users.avatar}
              alt={`Avatar của ${users.name}`}
              className="w-24 h-24 rounded-full object-cover mt-4 mx-auto"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 mt-4 mx-auto">
              No Avatar
            </div>
          )}
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">📅 Ngày tham gia:</h2>
          <p className="text-gray-700">{users?.phone}</p>
        </div>
      </section>

      {/* Thống kê tổng quan */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-cyan-100 p-4 rounded-lg shadow hover:scale-105 transition">
          <p className="text-sm text-gray-600">Tổng sản phẩm</p>
          <h3 className="text-3xl font-bold">{products?.length}</h3>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow hover:scale-105 transition">
          <p className="text-sm text-gray-600">Tổng doanh thu</p>
          <h3 className="text-3xl font-bold text-green-700">
            {carts
              ?.reduce((acc, cartItems) => {
                const orderTotal = cartItems.product_items.reduce(
                  (sum, product) =>
                    sum + product.quantity * product.snapshot.price,
                  0
                );
                return acc + orderTotal;
              }, 0)
              .toLocaleString("vi-VN")}
            VND
          </h3>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow hover:scale-105 transition">
          <p className="text-sm text-gray-600">Tổng đơn hàng</p>
          <h3 className="text-3xl font-bold">{carts?.length}</h3>
        </div>
        <div className="bg-red-100 p-4 rounded-lg shadow hover:scale-105 transition">
          <p className="text-sm text-gray-600">Đơn đang chờ</p>
          <h3 className="text-3xl font-bold">{carts?.length}</h3>
        </div>
      </section>

      {/* Mở rộng sau này: biểu đồ, danh sách đơn gần nhất, sản phẩm nổi bật */}
    </div>
  );
}
