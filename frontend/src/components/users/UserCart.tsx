import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../features/appStore";
import { useEffect } from "react";
import { getCart } from "../../features/carts/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function UserCart() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const { carts } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (user?.userId) {
      const fetchCart = async () => {
        await dispatch(getCart({ userId: user.userId }));
      };
      fetchCart();
    }
  }, [user?.userId, dispatch]);

  if (carts?.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-xl text-gray-500">
        Không tìm thấy sản phẩm trong giỏ hàng
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50">
      <section className="flex flex-col gap-6 p-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Giỏ hàng của bạn
        </h1>
        {/* Filter section */}
        <div className="flex flex-wrap items-center justify-around gap-4 px-5">
          <select
            name="stateProduct"
            className="flex-1 min-w-[180px] border-[1.5px] rounded-full border-gray-400 h-[40px] text-center bg-white shadow-sm hover:border-green-500 focus:ring-green-500"
          >
            <option value="">Tình trạng sản đơn hàng</option>
            <option value="new">Mới</option>
            <option value="used">Đã thanh toán</option>
            <option value="used">Đã thanh giao</option>
          </select>

          <form className="relative flex-1 min-w-[200px]">
            <input
              type="text"
              name="search"
              className="w-full h-[40px] border-[1.5px] rounded-full text-center outline-0 border-gray-400 bg-white shadow-sm"
              placeholder="Tìm kiếm..."
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-3 rounded-full bg-green-500 text-white"
            >
              <FontAwesomeIcon icon={["fas", "search"]} />
            </button>
          </form>
        </div>
        {carts?.map((cartItems) => (
          <div key={cartItems._id} className="space-y-4">
            {cartItems.productItems.map((productItem) => (
              <div
                key={productItem.productId}
                className="flex flex-col md:flex-row items-center gap-4 border rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition"
              >
                <img
                  src={productItem.snapshot.image}
                  alt={productItem.snapshot.name}
                  className="w-full md:w-32 h-32 object-cover rounded-md"
                />
                <div className="flex-1">
                  <p className="font-semibold text-lg">
                    {productItem.snapshot.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Thương hiệu:</strong> {productItem.snapshot.brands}
                  </p>
                  <p className="text-green-600 font-bold">
                    {productItem.snapshot.price.toLocaleString()} VND
                  </p>
                  <p className="text-sm">
                    <strong>Số lượng:</strong> {productItem.quantity}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-2 text-sm">
                    {productItem.attributes.map((attr, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-200 rounded-full"
                      >
                        <strong>{attr.name}:</strong> {attr.value}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm mt-2">
                    <span className="text-gray-600">
                      <strong>Loại sản phẩm:</strong>
                    </span>
                    {productItem.snapshot.typeProduct}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Tình trạng:</strong>{" "}
                    {productItem.snapshot.stateProduct}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>phương thức thanh toán:</strong>
                    {cartItems.methodPay}
                  </p>
                </div>

                {/* Nút hành động */}
                <div className="flex gap-2 mt-4 md:mt-0">
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Hủy đơn hàng
                  </button>
                  <Link
                    to={`/user/payment/${cartItems._id}`}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold"
                  >
                    Đặt hàng
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>
    </section>
  );
}
