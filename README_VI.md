🌐 言語: [日本語](README.md) | [Tiếng việt](README_VI.md)
# ✈️ PBL3_Web – Website Bán Vé Máy Bay

> Đồ án môn học **PBL3 – Xây dựng phần mềm**  
> Nhóm sinh viên trường đại học Bách Khoa - Đại học Đà Nẵng
> Hệ thống web hỗ trợ người dùng tìm kiếm, đặt vé, thanh toán và quản lý chuyến bay nhanh chóng, tiện lợi.

---

## 📌 Mục tiêu dự án

Dự án nhằm mục đích xây dựng một hệ thống đặt vé máy bay trực tuyến, giúp giải quyết các vấn đề:
- Tốn thời gian khi đặt vé truyền thống.
- Khó tra cứu lịch trình và thông tin chuyến bay.
- Thiếu minh bạch trong việc quản lý hóa đơn, vé và doanh thu.

---

## 💡 Tính năng chính

### 🎫 Đối với người dùng:

- Đăng ký, đăng nhập.
- Tìm kiếm chuyến bay theo ngày, điểm đi, điểm đến.
- Đặt vé máy bay, chọn chỗ ngồi.
- Xem lịch sử đặt vé.
- Thanh toán và nhận hóa đơn.

### 🛠️ Đối với quản trị viên:
- Quản lý máy bay (CRUD).
- Quản lý chuyến bay (CRUD).
- Quản lý tài khoản người dùng, phân quyền (Admin/User).
- Quản lý vé máy bay.

---

## 🛠️ Công nghệ sử dụng

| Thành phần       | Công nghệ được sử dụng                        |
|------------------|-----------------------------------------------|
| Backend          | Java Spring Boot                              |
| Frontend         | HTML5, CSS3, JavaScript thuần                 |
| Cơ sở dữ liệu    | SQL Server                                          |
| ORM              | Spring Data JPA                               |
| IDE              | IntelliJ IDEA                                  |
| Quản lý dự án    | GitHub                                         |
| Công cụ hỗ trợ   | Postman             |



---
## Yêu cầu hệ thống
| Thành phần        | Phiên bản yêu cầu                     |
| ----------------- | ------------------------------------- |
| Java              | **JDK 22**                            |
| Maven             | **Maven 3.8+**                        |
| Hệ điều hành      | Windows / macOS / Linux               |
| IDE (khuyến nghị) | IntelliJ IDEA / Eclipse               |
| Database          | **SQL Server** (Microsoft SQL Server) |
| Trình duyệt       | Google Chrome / Firefox / Edge        |

---

## 🚀 Hướng dẫn chạy dự án

### 1. Clone project
```bash
git clone https://github.com/loinguyenvan274/PBL3_Web.git
cd PBL3_Web
````

### 2. Cấu hình cơ sở dữ liệu MySQL

* Tạo cơ sở dữ liệu tên `pbl3_web` trong MySQL.
* Import file `pbl3_web.sql` nếu có (trong thư mục `database/` hoặc bạn tự export).
* Cập nhật file `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/pbl3_web
spring.datasource.username=root
spring.datasource.password=your_password
```

### 3. Chạy ứng dụng Spring Boot

```bash
mvn clean install
mvn spring-boot:run
```
### 5. run frontend
```bash
npm run dev
```

### 5. Truy cập web

* Mở trình duyệt và truy cập: [http://localhost:5173/](http://localhost:5173/)

---

## 🖼️ Giao diện (Screenshots)

### Admin

| Trang                      | Ảnh minh họa                      |
| -------------------------- | --------------------------------- |
| Trang chủ                  | ![Trang chủ](Screenshots/1.png)  |
| Quản lý máy bay        | ![#](Screenshots/2.png)    |
| Sơ đồ ghế                    | ![#](Screenshots/3.png)        |
| Thông tin chuyến bay | ![#](Screenshots/4.png)        |
| Đơn đặt vé | ![#](Screenshots/5.png)        |
| Chi tiết vé | ![#](Screenshots/6.png)        |
| Thông tin khách hàng | ![#](Screenshots/7.png)        |
| Quản lý vai trò | ![#](Screenshots/8.png)        |
| Tài khoảng | ![#](Screenshots/9.png)        |

### Khách hàng 

| Trang                      | Ảnh minh họa                      |
| -------------------------- | --------------------------------- |
| Trang chủ                  | ![Trang chủ](Screenshots/10.png)  |
| Vé được tìm                  | ![Trang chủ](Screenshots/11.png)  |
| Trang chọn ghế                 | ![Trang chủ](Screenshots/13.png)  |

---

## 🔐 Phân quyền người dùng

| Vai trò | Quyền hạn                                         |
| ------- | ------------------------------------------------- |
| User    | Tìm kiếm, đặt vé, xem vé                          |
| Admin   | Quản lý máy bay, chuyến bay, người dùng, thống kê |

---

## 📂 Cấu trúc thư mục

```bash
PBL3_Web/
├── src/
│   ├── main/
│   │   ├── java/com/pbl3/
│   │   │   ├── controller/
│   │   │   ├── entity/
│   │   │   ├── repository/
│   │   │   ├── service/
│   │   │   └── Pbl3WebApplication.java
│   │   └── resources/
│   │       ├── templates/
│   │       ├── static/
│   │       └── application.properties
├── README.md
└── pom.xml
```

---

## ❗ Lưu ý

* Dự án được xây dựng phục vụ mục đích học tập, không dùng cho thương mại.
* Một số tính năng thanh toán có thể giả lập (không kết nối thật với cổng thanh toán).

---
## Điểm tâm huyết
Trong suốt quá trình xây dựng hệ thống, tính năng "chọn chỗ ngồi" là phần mà chúng tôi đầu tư nhiều công sức và tâm huyết nhất. Đây không chỉ là một chức năng nhỏ, mà là điểm mấu chốt tạo nên trải nghiệm thực tế và chuyên nghiệp cho người dùng.

### Tại sao lại quan trọng?
Thay vì đặt vé ngẫu nhiên, người dùng có quyền lựa chọn chỗ ngồi mong muốn, tương tự các hệ thống đặt vé chuyên nghiệp ngoài thực tế.

Việc này giúp cá nhân hóa trải nghiệm, đặc biệt với những người muốn ngồi gần cửa sổ, gần lối thoát, hoặc tránh chỗ bị đặt trước.

### Cách chúng tôi thực hiện
Thiết kế giao diện sơ đồ chỗ ngồi rõ ràng, tương tác bằng JavaScript thuần.

Mỗi ghế được đánh mã và thể hiện trạng thái:

✅ Có thể chọn

❌ Đã có người đặt

🔒 Không khả dụng

Khi người dùng chọn ghế, hệ thống kiểm tra và ghi nhận chính xác ghế đã đặt vào cơ sở dữ liệu.

Tránh trùng lặp bằng cách kiểm tra khóa chính hoặc unique constraint ở cả phía client và server.

### Thách thức & Giải pháp
| Thách thức                                            | Cách giải quyết                                                      |
| ----------------------------------------------------- | -------------------------------------------------------------------- |
| Đồng bộ trạng thái chỗ ngồi giữa nhiều người dùng     | Sử dụng logic kiểm tra trạng thái chỗ ngồi trước khi xác nhận đặt vé |
| Giao diện trực quan cho cả người không rành công nghệ | Thiết kế layout đơn giản, dễ hiểu, mô phỏng sơ đồ máy bay thực tế    |
| Đảm bảo an toàn dữ liệu                               | Ràng buộc dữ liệu trên DB, xác thực thông tin trước khi lưu          |
---

## 🧑‍💻 Thành viên nhóm

| Họ tên         | Vai trò                 |
| -------------- | ----------------------- |
| Nguyễn Văn Lợi | Backend, Frontend     |
| Nguyễn Thanh Hậu | Frontend, Thiết kế UI, Xây dựng DB |

---
## 📄 License

© 2025 – Nhóm PBL3 – Trường đại học Bách Khoa - Đại học Đà Nẵng


