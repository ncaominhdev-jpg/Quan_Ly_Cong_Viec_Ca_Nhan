# 📋 Ứng Dụng Quản Lý Công Việc Cá Nhân

Một ứng dụng Single Page Application (SPA) được xây dựng bằng React + Vite để quản lý công việc cá nhân một cách hiệu quả. Ứng dụng hỗ trợ thêm, sửa, xóa công việc, phân loại theo trạng thái, tìm kiếm, lọc, và lưu dữ liệu tự động.

## ✨ Tính Năng Chính

### 1. **Quản Lý Công Việc Cơ Bản**
- ✅ **Thêm công việc**: Nhập tiêu đề, chọn trạng thái, đặt thời hạn
- ✏️ **Sửa công việc**: Cập nhật bất kỳ thông tin nào của công việc
- 🗑️ **Xóa công việc**: Xóa vĩnh viễn các công việc không cần
- 📊 **Xem chi tiết**: Hiển thị đầy đủ thông tin mỗi công việc

### 2. **Phân Loại Theo Trạng Thái**
- 📝 **Cần Làm (TODO)**: Các công việc chưa bắt đầu
- ⚙️ **Đang Làm (In Progress)**: Các công việc đang thực hiện
- ✅ **Hoàn Thành (Done)**: Các công việc đã xong

### 3. **Tìm Kiếm & Lọc**
- 🔍 **Tìm kiếm theo tên**: Gõ từ khóa để tìm công việc
- 📋 **Lọc theo trạng thái**: Hiển thị các công việc theo trạng thái cụ thể

### 4. **Quản Lý Thời Hạn**
- ⏰ **Đặt thời hạn**: Chọn ngày giờ dự kiến hoàn thành
- ⚠️ **Cảnh báo quá hạn**: Hiển thị đậm đỏ khi vượt quá thời hạn
- ⚠️ **Cảnh báo sắp đến hạn**: Hiển thị vàng cam khi còn < 24 giờ

### 5. **Thống Kê Nhanh**
- Tổng số công việc
- Số công việc ở trạng thái TODO, In Progress, Done
- Phần trăm hoàn thành
- Số công việc quá hạn

### 6. **Lưu Dữ Liệu Tự Động**
- 💾 Lưu trên localStorage (không bị mất khi tắt trình duyệt)
- 🔄 Đồng bộ tức thì

### 7. **Giao Diện Responsive**
- 📱 Tối ưu cho điện thoại, tablet, desktop
- 🎨 Gradients, animations, UI hiện đại

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy

### Yêu Cầu
- Node.js >= 16.0.0
- npm >= 8.0.0

### Bước 1: Clone Repository
```bash
git clone <repository-url>
cd Quan_Ly_Cong_Viec_Ca_Nhan
```

### Bước 2: Cài Đặt Dependencies
```bash
npm install
```

### Bước 3: Chạy Development Server
```bash
npm run dev
```
Ứng dụng sẽ mở tại: **http://localhost:5173**

### Bước 4: Build cho Production
```bash
npm run build
```

### Bước 5: Preview Production Build
```bash
npm run preview
```

---

## 📁 Cấu Trúc Dự Án

```
src/
├── components/
│   ├── TaskForm.jsx          # Form thêm/sửa công việc
│   ├── TaskList.jsx          # Danh sách công việc
│   ├── TaskFilter.jsx        # Tìm kiếm & lọc
│   └── TaskStats.jsx         # Thống kê
├── App.jsx                   # Component chính
├── App.css                   # Styles tùy chỉnh
├── index.css                 # Tailwind directives
└── main.jsx                  # Entry point
```

---

## 🔧 Công Nghệ Sử Dụng

- **React 19.2.4** + Hooks
- **Vite 8.0.1** - Build tool siêu nhanh
- **Tailwind CSS 3.4.1** - Styling
- **localStorage** - Persistence

---

## 🎯 Giải Thích Kỹ Thuật

### Tại Sao localStorage?
- Đề bài không yêu cầu backend
- Đủ cho ứng dụng cá nhân một người dùng
- Giảm độ phức tạp, dễ triển khai

### Filtering Logic
```javascript
const filteredTasks = tasks.filter(task => {
  const matchStatus = filter === 'ALL' || task.status === filter;
  const matchSearch = task.title.toLowerCase().includes(searchTerm);
  return matchStatus && matchSearch;
});
```

### Deadline Alerts
- Quá hạn: `deadline < now && status !== 'Done'`
- Sắp hết hạn: `0 < hoursUntil < 24`

---

## 🚀 Những Cải Thiện nếu Có Thêm Thời Gian

### 1. **Backend & Database**
- Firebase/MongoDB để sync multi-device
- User authentication

### 2. **Tính Năng Nâng Cao**
- Categories/Tags cho công việc
- Priority levels (High/Medium/Low)
- Subtasks
- Recurring tasks
- Desktop notifications

### 3. **Dark Mode**
- Toggle light/dark theme
- Persist preference

### 4. **Advanced Filtering**
- Date range filter
- Priority filter
- Saved filter templates
- Multiple sort options

### 5. **Performance**
- Lazy loading
- Pagination
- Virtual scrolling

### 6. **UX Enhancements**
- Undo/Redo
- Drag & Drop reordering
- Keyboard shortcuts
- Toast notifications
- Progress bar

### 7. **Testing**
- Unit tests (Jest)
- E2E tests (Cypress)

### 8. **Accessibility**
- ARIA labels
- Full keyboard navigation
- WCAG AA compliance

### 9. **Multi-Language**
- i18n support

### 10. **PWA Features**
- Service Workers
- Offline mode
- Installable

### 11. **DevOps**
- CI/CD with GitHub Actions
- Deploy to Vercel/Netlify

### 12. **Monitoring**
- Error tracking (Sentry)
- Analytics

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^19.2.4",
    "react-dom": "^19.2.4"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.1",
    "vite": "^8.0.1",
    "postcss": "^8.5.8", "autoprefixer": "^10.4.27"
  }
}
```

---

## 🔐 Security Notes

1. localStorage không an toàn - data lưu plain text
2. Không có authentication - anyone on device can use
3. Giới hạn dung lượng ~5-10MB

---

## 💡 Tips

- Dữ liệu được lưu tự động khi thêm/sửa/xóa
- Không cần save thủ công
- Mở DevTools → Applications → localStorage để xem dữ liệu

---

**Chúc bạn quản lý công việc hiệu quả! 🎉**
