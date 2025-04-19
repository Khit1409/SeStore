import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../features/appStore";
import { useEffect } from "react";
import { getCart } from "../../features/carts/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserCart() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (user?.userId) {
      const fetchCart = async () => {
        await dispatch(getCart({ userId: user.userId }));
      };
      fetchCart();
    }
  }, [user?.userId, dispatch]);

  if (cart?.length == 0) {
    return <div className="h-screen">not found cart</div>;
  }
  return (
    <section className="flex flex-col gap-6 p-4">
      <h1 className="text-4xl text-center font-bold">Giỏ hàng của tôi</h1>
      {cart?.map((carts) => (
        <div
          key={carts._id}
          className="w-full flex flex-col gap-4 border border-gray-300 p-4 rounded-xl shadow-md"
        >
          <h2 className="text-lg font-semibold text-gray-700">
            Địa chỉ nhận hàng: {carts.address}
          </h2>

          {carts.productItems.map((productItem) => (
            <div
              key={productItem._id}
              className="flex flex-col md:flex-row gap-4 border-t pt-4"
            >
              <img
                src={productItem.productId.image}
                alt={productItem.productId.name}
                className="w-full md:w-60 h-auto rounded-xl object-cover"
              />
              <div className="flex-1 flex flex-col gap-2 text-gray-800">
                <p>
                  <strong>Tên sản phẩm:</strong> {productItem.productId.name}
                </p>
                <p>
                  <strong>Thương hiệu:</strong> {productItem.productId.brands}
                </p>
                <p>
                  <strong>Giá sản phẩm:</strong>
                  {productItem.productId.price.toLocaleString()} VND
                </p>
                <p>
                  <strong>Trạng thái:</strong>
                  {productItem.productId.stateProduct}
                </p>
                <p>
                  <strong>Loại sản phẩm:</strong>
                  {productItem.productId.typeProduct}
                </p>
                <p>
                  <strong>Số lượng đặt:</strong> {productItem.quantity}
                </p>

                {/* Attribute hiển thị rõ ràng hơn */}
                {productItem.attributes.map((attr, index) => (
                  <p key={index}>
                    <strong>{attr.name}:</strong> {attr.value.join(", ")}
                  </p>
                ))}

                <p className="text-red-600 text-lg mt-2">
                  <strong>Tổng tiền:</strong>
                  {(
                    productItem.quantity * productItem.productId.price
                  ).toLocaleString()}
                  VND
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-row md:flex-col gap-2 items-center">
                <button className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg">
                  <FontAwesomeIcon icon={["fas", "trash"]} /> Xóa
                </button>
                <button className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg">
                  <FontAwesomeIcon icon={["fas", "paper-plane"]} /> Mua
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
