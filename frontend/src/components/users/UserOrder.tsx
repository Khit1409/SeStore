import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getProductForDetail } from "../../features/products/productsSlice";
import { AppDispatch, RootState } from "../../features/appStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addToCart } from "../../features/carts/cartSlice";

export default function UserOrder() {
  const dispatch = useDispatch<AppDispatch>();
  const { productDetai } = useSelector((state: RootState) => state.product);
  const { productId } = useParams<string>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [dataPost, setDataPost] = useState<{
    quantity: number;
    address: string;
    attributes: { name: string; value: (string | number)[] }[];
  }>({
    quantity: 1,
    attributes: [],
    address: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        await dispatch(getProductForDetail({ productId: productId }));
      }
    };
    fetchProduct();
  }, [dispatch, productId]);

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
    await dispatch(
      addToCart({
        userId: user?.userId as string,
        productId: productId as string,
        quantity: dataPost.quantity,
        address: dataPost.address,
        attributes: dataPost.attributes,
      })
    );
  };
  return (
    <section className="w-full min-h-screen bg-gray-100 p-6">
      {productDetai ? (
        <div className="flex flex-col md:flex-row items-start gap-6 bg-white shadow-lg rounded-xl p-6">
          {/* Hình ảnh sản phẩm */}
          <div className="w-full md:w-[40%]">
            <img
              src={productDetai.image}
              className="rounded-xl w-full object-cover"
              alt={productDetai.name}
            />
          </div>

          {/* Thông tin và form */}
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {productDetai.name}
            </h2>
            <div className="text-gray-700 space-y-2">
              <p>
                <span className="font-semibold">Giá:</span> {productDetai.price}
                đ
              </p>
              <p>
                <span className="font-semibold">Thương hiệu:</span>{" "}
                {productDetai.brands}
              </p>
              <p>
                <span className="font-semibold">Tình trạng:</span>{" "}
                {productDetai.stateProduct}
              </p>
              <p>
                <span className="font-semibold">Loại sản phẩm:</span>{" "}
                {productDetai.typeProduct}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleAddToCart} className="space-y-4">
              {/* Chọn thuộc tính */}
              {productDetai.attributes &&
                productDetai.attributes.map((attribute) => (
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

              {/* Nút submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full md:w-[200px] bg-green-500 hover:bg-green-600 transition py-2 rounded-xl text-white font-semibold text-lg shadow"
                >
                  <FontAwesomeIcon
                    icon={["fas", "cart-plus"]}
                    className="mr-2"
                  />
                  Thêm vào giỏ
                </button>
              </div>
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
