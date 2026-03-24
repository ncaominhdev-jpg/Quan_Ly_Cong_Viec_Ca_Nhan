# Trang Quản Lý Công Việc Cá Nhân

## Giới thiệu

Đây là ứng dụng web quản lý công việc cá nhân được xây dựng bằng React (Single Page Application).  
Ứng dụng giúp người dùng quản lý công việc, theo dõi trạng thái và deadline một cách đơn giản.

---

## Tính năng chính

- Thêm, sửa, xóa công việc
- Phân loại công việc theo trạng thái:
  - TODO
  - In Progress
  - Done
- Tìm kiếm công việc theo tên
- Lọc công việc theo trạng thái
- Đặt deadline cho từng công việc
- Cảnh báo khi công việc sắp đến hạn hoặc quá hạn
- Thống kê:
  - Tổng số task
  - Số task hoàn thành
  - Số task quá hạn
- Lưu dữ liệu bằng localStorage

---

## Công nghệ sử dụng

- React: xây dựng giao diện SPA
- Vite: build tool nhanh
- Tailwind CSS: styling UI
- localStorage: lưu dữ liệu phía client

---

## Hướng dẫn cài đặt và chạy local

### 1. Clone dự án

- git clone <link-repository>
- cd Quan_Ly_Cong_Viec_Ca_Nhan

### 2. Cài đặt thư viện

- npm install

### 3. Chạy project

- npm run dev

- Mở trình duyệt tại:
  - http://localhost:5173

---

## Giải thích các quyết định kỹ thuật

### 1. React + Vite

- React được sử dụng để xây dựng SPA với cấu trúc component rõ ràng.
- Vite giúp khởi tạo nhanh, build nhanh và phù hợp với dự án frontend nhỏ.

### 2. Sử dụng localStorage

- Đề bài không yêu cầu backend nên localStorage được dùng để:
  - lưu dữ liệu trực tiếp trên trình duyệt
  - không cần server hoặc database
  - đảm bảo dữ liệu không bị mất khi reload

### 3. Sử dụng Tailwind CSS

- Tailwind giúp:
  - xây dựng UI nhanh
  - dễ responsive
  - giảm thời gian viết CSS

### 4. Quản lý trạng thái

- Sử dụng useState để lưu danh sách công việc.
- Mỗi task gồm:
  - title
  - status
  - deadline

### 5. Xử lý deadline

- So sánh thời gian hiện tại với deadline để xác định:
  - công việc bình thường
  - công việc sắp đến hạn
  - công việc quá hạn

---

## Những điểm sẽ cải thiện nếu có thêm thời gian

- Xây dựng backend
- Lưu dữ liệu bằng database
- Thêm đăng nhập người dùng
- Cải thiện UI/UX
- Thêm drag & drop để sắp xếp task
- Thêm toast notification
- Viết test cho các chức năng chính
- Tối ưu cấu trúc code để dễ mở rộng
