import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../features/app.store";
import { useEffect, useState } from "react";
import { getCartForDetail } from "../../features/carts/cart.slice";
import { checkoutOrder } from "../../features/orders/order.slice";

export default function Checkout() {
  const { cart_id } = useParams<string>();
  const dispatch = useDispatch<AppDispatch>();
  const { cart_detail, error } = useSelector((state: RootState) => state.cart);
  const [alert, setAlert] = useState<boolean | null>(null);

  useEffect(() => {
    if (cart_id) {
      dispatch(getCartForDetail({ cart_id }));
    }
  }, [dispatch, cart_id]);

  if (error) {
    return <div className="text-red-500 text-center mt-10">Lỗi: {error}</div>;
  }

  const handleCheckout = async () => {
    try {
      if (
        cart_detail?.product_detail.quantity &&
        cart_detail.product_detail.snapshot.price
      ) {
        const result = await dispatch(
          checkoutOrder({
            amount:
              cart_detail?.product_detail.snapshot.price *
              cart_detail?.product_detail.quantity,
            orderCode: cart_detail.orderCode,
          })
        );
        if (checkoutOrder.fulfilled.match(result)) {
          window.location.href = result.payload;
        } else {
          setAlert(false);
          console.error(result.payload);
        }
      }
    } catch (error) {
      console.error(error);
      setAlert(false);
    }
  };

  return (
    <section className="max-w-5xl mx-auto p-6 my-6 bg-white shadow-xl rounded-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Chi tiết đơn hàng
      </h1>

      {cart_detail ? (
        <div className="flex flex-col justify-center items-center gap-8">
          {/* Thông tin đơn hàng */}
          <div className="md:col-span-2 space-y-4">
            <p className="text-center">
              <span className="font-semibold text-gray-700">Mã đơn hàng:</span>
              {cart_detail._id}
            </p>

            {cart_detail.product_detail?.snapshot && (
              <div className="bg-gray-50 p-4 rounded-xl text-center shadow-sm space-y-2">
                <p>
                  <span className="font-semibold text-gray-700">
                    Tên sản phẩm:
                  </span>{" "}
                  {cart_detail.product_detail.snapshot.name}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Giá:</span>{" "}
                  {cart_detail.product_detail.snapshot.price.toLocaleString()}₫
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Số lượng:</span>{" "}
                  {cart_detail.product_detail.quantity}
                </p>
              </div>
            )}

            <p>
              <span className="font-semibold text-gray-700">
                Phương thức thanh toán:
              </span>{" "}
              {cart_detail.method_pay.toUpperCase()}
            </p>

            <p>
              <span className="font-semibold text-gray-700">
                Trạng thái đơn hàng:
              </span>{" "}
              {cart_detail.state_order === "wait_checking"
                ? "Chờ xác nhận"
                : cart_detail.state_order === "paid"
                ? "Đã thanh toán"
                : "Chưa thanh toán"}
            </p>

            <p>
              <span className="font-semibold text-gray-700">
                Địa chỉ nhận hàng:
              </span>{" "}
              {cart_detail.address}
            </p>

            <p>
              <span className="font-semibold text-gray-700">
                Thời gian đặt hàng:
              </span>{" "}
              {new Date(cart_detail.createdAt).toLocaleString()}
            </p>

            {/* Nút hành động */}
            <div className="flex gap-4 pt-4 justify-center">
              <button
                // onClick={handleCancelPayment}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium shadow-md transition"
              >
                Hủy đơn
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium shadow-md transition"
                onClick={handleCheckout}
              >
                Thanh toán
              </button>
            </div>

            {/* Thông báo */}
            <div>
              {alert === null ? (
                <></>
              ) : alert ? (
                <p className="text-green-500">Thanh toán thành công!</p>
              ) : (
                <p className="text-red-500">Thanh toán không thành công!</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">
          Không tìm thấy đơn hàng nào.
        </p>
      )}
    </section>
  );
}
//
