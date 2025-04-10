export default function Filter() {
  return (
    <div className="flex justify-around items-center my-6">
      {/* select */}
      <select className="border-[1.5px] rounded border-gray-500 text-center">
        <option defaultValue="">Chọn tháng muốn xem doanh thu</option>
        <option value="month_1">Tháng 1</option>
        <option value="month_2">Tháng 2</option>
        <option value="month_3">Tháng 3</option>
        <option value="month_4">Tháng 4</option>
        <option value="month_5">Tháng 5</option>
        <option value="month_6">Tháng 6</option>
        <option value="month_7">Tháng 7</option>
        <option value="month_8">Tháng 8</option>
        <option value="month_9">Tháng 9</option>
        <option value="month_10">Tháng 10</option>
        <option value="month_11">Tháng 11</option>
        <option value="month_12">Tháng 12</option>
      </select>

      {/* search */}
      <div>
        <input
          type="text"
          className="rounded-2xl border-[1.5px] border-gray-500 w-[400px] text-center outline-0"
          placeholder="Tìm sản phẩm đã bán"
        />
      </div>
    </div>
  );
}
