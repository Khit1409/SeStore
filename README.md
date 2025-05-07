# 🛍️ Se Store

**Se Store** là một nền tảng thương mại điện tử được xây dựng bằng công nghệ Fullstack hiện đại. Ứng dụng cho phép người dùng mua sắm, trò chuyện với người bán, thanh toán trực tuyến, đồng thời cung cấp hệ thống quản lý sản phẩm và người dùng cho cả admin và người bán.

---

## 🚀 Công nghệ sử dụng

### Frontend

- ⚛️ React
- 💨 Tailwind CSS
- 🟦 TypeScript

### Backend

- 🟩 Node.js
- ⚙️ Express.js
- 🍃 Mongoose (MongoDB)

---

## ✨ Các tính năng nổi bật

- 🔐 Đăng ký / Đăng nhập người dùng
- 🛒 Quản lý giỏ hàng
- 📦 Quản lý sản phẩm dành cho người bán
- 🧑‍💼 Trang quản lý người dùng (Admin Dashboard)
- 💬 Trang chat với người bán
- 💳 Trang thanh toán đơn hàng

---

## ⚙️ Cách chạy dự án và chỉnh sửa

- npm run dev : frontend
- npm start: backend
- npm install : tải các dependencies
- git add . # Bước 1: Thêm tất cả thay đổi mới
- git commit -m "Mô tả ngắn gọn thay đổi" # Bước 2: Ghi lại thay đổi
- git push # Bước 3: Đẩy lên GitHub

### 1. Clone repository:

```bash
git clone https://github.com/Khit1409/SeStore.git
cd SeStore
```

## 📌 To do list

<!-- 1. Thiết kế Database cho Oder Product -->
<!-- 2. chạy thử và điều chỉnh controller. -->

1. sửa cách hiện thị giỏ hàng
2. tạo chức năng banking momo và banking

- nhấn nút thanh toán --> chuyển sang trang thanh toán, khi thanh toán xong chuyển stateOrder sang đã thanh toán --> trả về các đơn hàng đã thanh toán

3. tạo chức năng xóa tài khoản, xóa đơn hàng, xóa giỏ hàng
   <!-- 3. chỉnh lại các chức năng thêm sửa xóa lọc sản phẩm. -->
   <!-- 4. sửa tên các file có cùng nhiệm vụ -->
   <!-- 5. Tạo trang cho admin -->

##

1. Sửa mấy chức năng xóa

##

FE React:

- User đặt hàng => Sinh QR theo số tiền & nội dung riêng
- FE show QR cho user quét

User:

- Quét QR và chuyển khoản đúng số tiền, nội dung

Backend Node.js:

- 1 phút/lần gọi API ngân hàng lấy danh sách giao dịch
- Nếu thấy giao dịch phù hợp với đơn hàng (khớp amount + purpose)
  => Cập nhật trạng thái đơn hàng: "Đã thanh toán"
  => Gửi email/Zalo cho khách xác nhận luôn
