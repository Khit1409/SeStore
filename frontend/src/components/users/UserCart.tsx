//trang hiện sản phẩm đã được thêm vào giỏ hàng

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../features/app.store";
import { useEffect } from "react";
import { cancelCart, getCart } from "../../features/carts/cart.slice";
import { Link } from "react-router-dom";

export default function UserCart() {
  const { users } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const { carts } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (users?.user_id) {
      const fetchCart = async () => {
        await dispatch(getCart({ user_id: users.user_id }));
      };
      fetchCart();
    }
  }, [users?.user_id, dispatch]);

  if (carts?.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-xl text-gray-500">
        Giỏ hàng trống
      </div>
    );
  }

  const handleCancel = async (id: string) => {
    dispatch(cancelCart({ cart_id: id, user_id: users?.user_id as string }));
  };
  return (
    <section className="min-h-screen bg-gray-50">
      <section className="flex flex-col gap-6 p-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Giỏ hàng của bạn
        </h1>

        {carts?.map((cart_items) => (
          <div key={cart_items._id} className="space-y-4">
            {cart_items.product_items.map((product_item) => (
              <div
                key={product_item.product_id}
                className="flex flex-col md:flex-row items-center gap-4 border rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition"
              >
                <img
                  src={product_item.snapshot.image}
                  alt={product_item.snapshot.name}
                  className="w-full md:w-32 h-32 object-cover rounded-md"
                />
                <div className="flex-1">
                  <p className="font-semibold text-lg">
                    {product_item.snapshot.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Thương hiệu:</strong> {product_item.snapshot.brands}
                  </p>
                  <p className="text-green-600 font-bold">
                    {product_item.snapshot.price.toLocaleString()} VND
                  </p>
                  <p className="text-sm">
                    <strong>Số lượng:</strong> {product_item.quantity}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-2 text-sm">
                    {product_item.attributes.map((attr, index) => (
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
                    {product_item.snapshot.type_product}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Tình trạng:</strong>{" "}
                    {product_item.snapshot.state_product}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>phương thức thanh toán:</strong>
                    {cart_items.method_pay}
                  </p>
                </div>

                {/* Nút hành động */}
                <div className="flex gap-2 mt-4 md:mt-0">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold"
                    onClick={() => handleCancel(cart_items._id)}
                  >
                    Hủy đơn hàng
                  </button>
                  <Link
                    to={`/user/payment/${cart_items._id}`}
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
