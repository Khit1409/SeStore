import { Link } from "react-router-dom";

export default function ManagerStore() {
  return (
    <section className="w-full h-full flex my-6">
      {/* navigation */}
      <div className="h-screen overflow-y-auto w-[200px]">
        <ul className="flex flex-col gap-5 relative">
          <li>
            <Link to="">Quản lý vận chuyển</Link>
          </li>
          <li className="relative">
            <Link to="">Quản lý sản phầm</Link>
            <ul className="absolute left-10">
              <li>
                <Link to={"/"}>Thêm sản phẩm</Link>
              </li>
              <li>
                <Link to={"/"}>Chỉnh sửa sản phẩm</Link>
              </li>
            </ul>
          </li>
          {/* <li>
            <Link to="">Quản lý đơn hàng</Link>
            <ul className="">
              <li>
                <Link to="">Đơn đã đặt</Link>
              </li>
              <li>
                <Link to="">Đơn đã giao</Link>
              </li>
              <li>
                <Link to="">Đơn đã hoàn</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="">Quản lý doanh thu</Link>
          </li> */}
        </ul>
      </div>
      {/* content */}
      <div></div>
      {/* chat with user */}
      <div></div>
    </section>
  );
}
