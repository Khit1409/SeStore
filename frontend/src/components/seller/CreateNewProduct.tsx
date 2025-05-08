import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../features/app.store";
import { createProducts } from "../../features/products/productsSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateNewProduct() {
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 1,
    brands: "",
    type_product: "",
    state_product: "",
    attributes: [] as { name: string; value: (string | number)[] }[],
    image: "",
  });
  const [attributeName, setAttributeName] = useState("");
  const [attributeValue, setAttributeValue] = useState("");

  const handleCreateNewProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await dispatch(
        createProducts({
          image: newProduct.image,
          name: newProduct.name,
          seller_id: users?.user_id as string,
          price: Number(newProduct.price),
          type_product: newProduct.type_product,
          state_product: newProduct.state_product,
          attributes: newProduct.attributes,
          brands: newProduct.brands,
        })
      );

      if (createProducts.fulfilled.match(response)) {
        navigate("/seller/myproduct");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    setNewProduct({ ...newProduct, [target.name]: target.value });
  };

  const handleAddAttribute = () => {
    if (!attributeName || !attributeValue) return;
    const values = attributeValue.split(",").map((v) => v.trim());
    setNewProduct({
      ...newProduct,
      attributes: [
        ...newProduct.attributes,
        { name: attributeName, value: values },
      ],
    });
    setAttributeName("");
    setAttributeValue("");
  };

  return (
    <div className="my-5">
      <section>
        <h2 className="text-4xl text-center font-bold">Thêm sản phẩm mới</h2>

        <form
          onSubmit={handleCreateNewProduct}
          className="flex flex-col gap-4 items-center justify-center max-w-xl mx-auto"
        >
          <div className="flex flex-col w-full">
            <label>Tên sản phẩm:</label>
            <input
              onChange={handleOnchange}
              type="text"
              className="border rounded px-2 py-1"
              name="name"
              value={newProduct.name}
            />
          </div>

          <div className="flex flex-col w-full">
            <label>Giá sản phẩm:</label>
            <input
              onChange={handleOnchange}
              type="number"
              className="border rounded px-2 py-1"
              name="price"
              value={newProduct.price}
            />
          </div>

          <div className="flex flex-col w-full">
            <label>Thương hiệu:</label>
            <input
              onChange={handleOnchange}
              type="text"
              className="border rounded px-2 py-1"
              name="brands"
              value={newProduct.brands}
            />
          </div>

          <div className="flex flex-col w-full">
            <label>Url ảnh sản phẩm:</label>
            <input
              onChange={handleOnchange}
              type="text"
              className="border rounded px-2 py-1"
              name="image"
              value={newProduct.image}
            />
          </div>

          <div className="flex flex-col w-full">
            <label>Tình trạng sản phẩm:</label>
            <select
              name="state_product"
              className="border rounded px-2 py-1"
              onChange={handleOnchange}
              value={newProduct.state_product}
            >
              <option value="">--Chọn--</option>
              <option value="new">Mới</option>
              <option value="used">Đã qua sử dụng</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label>Loại sản phẩm:</label>
            <select
              name="type_product"
              className="border rounded px-2 py-1"
              onChange={handleOnchange}
              value={newProduct.type_product}
            >
              <option value="">--Chọn--</option>
              <option value="fashion">Thời trang</option>
              <option value="vehicles">Phương tiện</option>
              <option value="household_appliances">Đồ gia dụng</option>
              <option value="devices">Thiết bị</option>
              <option value="other">Khác</option>
            </select>
          </div>

          <div className="flex flex-col w-full gap-2">
            <label>Thuộc tính sản phẩm:</label>
            <input
              type="text"
              className="border rounded px-2 py-1"
              placeholder="Tên thuộc tính (VD: Màu sắc)"
              value={attributeName}
              onChange={(e) => setAttributeName(e.target.value)}
            />
            <input
              type="text"
              className="border rounded px-2 py-1"
              placeholder="Giá trị (cách nhau bởi dấu phẩy)"
              value={attributeValue}
              onChange={(e) => setAttributeValue(e.target.value)}
            />
            <button
              type="button"
              className="bg-blue-500 text-white px-3 py-1 mt-2 rounded w-fit"
              onClick={handleAddAttribute}
            >
              Thêm thuộc tính
            </button>

            <ul className="text-sm text-gray-600 mt-2 list-disc pl-5">
              {newProduct.attributes.map((attr, idx) => (
                <li key={idx}>
                  <strong>{attr.name}:</strong> {attr.value.join(", ")}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded font-bold"
            >
              Thêm
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
