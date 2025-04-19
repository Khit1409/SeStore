export default function SellerDashboard() {
  return (
    <div className="px-4 py-6 max-w-6xl mx-auto h-screen flex items-center flex-col justify-center">
      {/* Tiêu đề */}
      <h1 className="text-4xl font-bold text-center mb-6">Quản lý cửa hàng</h1>

      {/* Thông tin cửa hàng */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">👤 Tên cửa hàng:</h2>
          <p className="text-gray-700">Se Store</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">📅 Ngày tham gia:</h2>
          <p className="text-gray-700">17/04/2024</p>
        </div>
      </section>

      {/* Thống kê tổng quan */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-cyan-100 p-4 rounded-lg shadow hover:scale-105 transition">
          <p className="text-sm text-gray-600">Tổng sản phẩm</p>
          <h3 className="text-3xl font-bold">128</h3>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow hover:scale-105 transition">
          <p className="text-sm text-gray-600">Tổng doanh thu</p>
          <h3 className="text-3xl font-bold">38,500,000 VND</h3>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow hover:scale-105 transition">
          <p className="text-sm text-gray-600">Tổng đơn hàng</p>
          <h3 className="text-3xl font-bold">452</h3>
        </div>
        <div className="bg-red-100 p-4 rounded-lg shadow hover:scale-105 transition">
          <p className="text-sm text-gray-600">Đơn đang chờ</p>
          <h3 className="text-3xl font-bold">7</h3>
        </div>
      </section>

      {/* Mở rộng sau này: biểu đồ, danh sách đơn gần nhất, sản phẩm nổi bật */}
    </div>
  );
}
