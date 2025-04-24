//trang hiện đơn hàng đã đặt

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../features/app.store";
import { useEffect } from "react";
import { getOrder } from "../../features/orders/order.slice";

export default function UserOrder() {
  const dispatch = useDispatch<AppDispatch>();
  const { orders } = useSelector((state: RootState) => state.order);
  const { users } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (users?.user_id) {
      dispatch(getOrder({ user_id: users.user_id }));
    }
  }, [dispatch, users]);

  return (
    <div className="p-6 space-y-6">
      {orders?.length !== 0 ? (
        orders?.map((order) => (
          <div key={order._id} className="bg-white p-4 rounded-lg shadow-md">
            {/* Phần hình ảnh sản phẩm */}
            <div className="flex items-center gap-6 mb-4">
              <img
                src={order.product_detail.snapshot.image}
                alt={order.product_detail.snapshot.name}
                className="w-24 h-24 object-cover rounded-md shadow-sm"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">
                  {order.product_detail.snapshot.name}
                </h3>
                <p className="text-gray-600">
                  Số lượng: {order.product_detail.quantity}
                </p>
                <p className="text-gray-800 font-semibold">
                  Giá:{" "}
                  {order.product_detail.snapshot.price *
                    order.product_detail.quantity}
                  ₫
                </p>
                {/* Hiển thị các thuộc tính của sản phẩm */}
                <div className="mt-2 space-y-1 text-gray-600">
                  {order.product_detail.attributes.map((attribute, index) => (
                    <p key={index}>
                      <span className="font-medium">{attribute.name}: </span>
                      {attribute.value.join(", ")}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Thông tin chi tiết đơn hàng */}
            <div className="mt-4 text-gray-500">
              <p className="text-sm">Địa chỉ: {order.address}</p>
              <p className="text-sm">
                Phương thức thanh toán: {order.method_pay}
              </p>
              <p className="text-sm">
                Trạng thái giao hàng:{" "}
                {order.shipping_status === "wait_shipping"
                  ? "Chờ giao hàng"
                  : order.shipping_status === "shipping"
                  ? "Đang trên đường tới tay bạn"
                  : "Đã giao hàng"}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Không có đơn hàng nào</p>
      )}
    </div>
  );
}
