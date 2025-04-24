//trang hiện chi tiết sản phẩm
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getProductForDetail } from "../../features/products/productsSlice";
import { AppDispatch, RootState } from "../../features/app.store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addToCart } from "../../features/carts/cart.slice";

export default function UserProduct_detaill() {
  const dispatch = useDispatch<AppDispatch>();
  const { product_detail } = useSelector((state: RootState) => state.product);
  const { product_id } = useParams<string>();
  const { users } = useSelector((state: RootState) => state.auth);
  const { loading } = useSelector((state: RootState) => state.cart);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);
  const [dataPost, setDataPost] = useState<{
    quantity: number;
    address: string;
    attributes: { name: string; value: (string | number)[] }[];
    method_pay: string;
  }>({
    quantity: 1,
    attributes: [],
    address: "",
    method_pay: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      if (product_id) {
        await dispatch(getProductForDetail({ product_id: product_id }));
      }
    };
    fetchProduct();
  }, [dispatch, product_id]);

  //onchange
  const handleOnchange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setDataPost((prev) => {
      const existingAttribute = prev.attributes.find(
        (attr) => attr.name === name
      );

      let updatedAttributes;
      if (existingAttribute) {
        // cập nhật lại value (lưu dưới dạng mảng)
        updatedAttributes = prev.attributes.map((attr) =>
          attr.name === name ? { ...attr, value: [value] } : attr
        );
      } else {
        // thêm mới
        updatedAttributes = [...prev.attributes, { name, value: [value] }];
      }

      return {
        ...prev,
        attributes: updatedAttributes,
      };
    });
  };

  const handleAddToCart = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //
    try {
      const actions = await dispatch(
        addToCart({
          user_id: users?.user_id as string,
          product_id: product_id as string,
          quantity: dataPost.quantity,
          address: dataPost.address,
          attributes: dataPost.attributes,
          method_pay: dataPost.method_pay,
        })
      );
      if (addToCart.fulfilled.match(actions)) {
        setAlertType("success");
        setAlertMessage("Đã thêm sản phẩm vào giỏ hàng!");
      } else {
        setAlertType("error");
        setAlertMessage(
          "Thiếu thông tin! không thể thêm sản phẩm vào giỏ hàng!"
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section className="w-full min-h-screen bg-gray-100 p-6">
      {product_detail ? (
        <div className="flex flex-col md:flex-row items-start gap-6 bg-white shadow-lg rounded-xl p-6">
          {/* Hình ảnh sản phẩm */}
          <div className="w-full md:w-[40%]">
            <img
              src={product_detail.image}
              className="rounded-xl w-full object-cover"
              alt={product_detail.name}
            />
          </div>

          {/* Thông tin và form */}
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {product_detail.name}
            </h2>
            <div className="text-gray-700 space-y-2">
              <p>
                <span className="font-semibold">Giá:</span>{" "}
                {product_detail.price}
                VND
              </p>
              <p>
                <span className="font-semibold">Thương hiệu:</span>{" "}
                {product_detail.brands}
              </p>
              <p>
                <span className="font-semibold">Tình trạng:</span>{" "}
                {product_detail.state_product}
              </p>
              <p>
                <span className="font-semibold">Loại sản phẩm:</span>{" "}
                {product_detail.type_product}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleAddToCart} className="space-y-4">
              {/* Chọn thuộc tính */}
              {product_detail.attributes &&
                product_detail.attributes.map((attribute) => (
                  <div key={attribute.name} className="mb-3">
                    <span className="font-semibold text-gray-800">
                      {attribute.name}:
                    </span>
                    <div className="flex gap-3 mt-2 flex-wrap">
                      {attribute.value.map((value) => (
                        <label
                          key={value}
                          className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-full cursor-pointer hover:bg-green-200 transition"
                        >
                          <input
                            onChange={handleOnchange}
                            type="radio"
                            name={attribute.name}
                            value={value}
                            className="accent-green-500"
                          />
                          <span className="text-sm">{value}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

              {/* Địa chỉ */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Địa chỉ giao hàng:
                </label>
                <textarea
                  onChange={(e) =>
                    setDataPost((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  className="border rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Nhập địa chỉ nhận hàng cụ thể..."
                  rows={3}
                ></textarea>
              </div>

              {/* Số lượng */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Số lượng:
                </label>
                <input
                  type="number"
                  min={1}
                  onChange={(e) =>
                    setDataPost((prev) => ({
                      ...prev,
                      quantity: Number(e.target.value),
                    }))
                  }
                  name="quantity"
                  placeholder="Chọn số lượng"
                  className="border rounded-lg w-24 p-2 text-center focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              {/* pay method */}
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-gray-700">
                  Phương thức thanh toán:
                </p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="method_pay"
                      value="momo"
                      checked={dataPost.method_pay === "momo"}
                      onChange={(e) =>
                        setDataPost((prev) => ({
                          ...prev,
                          method_Pay: e.target.value,
                        }))
                      }
                      className="accent-green-500"
                    />
                    <img
                      src="/momo.webp"
                      alt="Momo"
                      className="w-10 h-10 rounded"
                    />
                    <span className="text-sm">Momo</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="method_pay"
                      value="banking"
                      checked={dataPost.method_pay === "banking"}
                      onChange={(e) =>
                        setDataPost((prev) => ({
                          ...prev,
                          method_pay: e.target.value,
                        }))
                      }
                      className="accent-green-500"
                    />
                    <img
                      src="/banking.jpg"
                      alt="Banking"
                      className="w-10 h-10 rounded"
                    />
                    <span className="text-sm">Banking</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="method_pay"
                      value="cod"
                      checked={dataPost.method_pay === "cod"}
                      onChange={(e) =>
                        setDataPost((prev) => ({
                          ...prev,
                          method_pay: e.target.value,
                        }))
                      }
                      className="accent-green-500"
                    />
                    <img
                      src="/cod.avif"
                      alt="COD"
                      className="w-10 h-10 rounded"
                    />
                    <span className="text-sm">COD</span>
                  </label>
                </div>
              </div>

              {/* Nút submit */}
              <div className="mb-3">
                <button
                  type="submit"
                  className="w-full md:w-[200px] bg-green-500 hover:bg-green-600 transition py-2 rounded-xl text-white font-semibold text-lg shadow"
                >
                  {loading ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-[30px] h-[30px] border-2 border-green-500 border-t-transparent animate-spin rounded-full" />
                    </div>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={["fas", "cart-plus"]}
                        className="mr-2"
                      />
                      Thêm vào giỏ
                    </>
                  )}
                </button>
              </div>
              {/* thông báo */}
              {alertMessage && (
                <p
                  className={`text-sm font-medium mt-2 ${
                    alertType === "success" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {alertMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          Đang tải sản phẩm...
        </div>
      )}
    </section>
  );
}
