# 🏛️ Architecture & Project Structure Guide
## E-commerce Intelligence Platform

> **Định vị dự án:** Hệ thống thương mại điện tử kết hợp phân tích dữ liệu chuyên sâu (E-commerce Intelligence), xử lý tác vụ nền (Queue/Worker), Caching (Redis), giám sát thời gian thực (WebSocket) và sẵn sàng tích hợp AI/ML.

---

## 1. 🌐 Tổng quan kiến trúc hệ thống

```text
                          [ CLIENT BROWSER ]
                                  │
                                  ▼
                   [ FRONTEND - Next.js App Router ]
                     ├── (shop): Dành cho khách mua hàng
                     └── (admin): Dashboard phân tích thông minh
                                  │
                          (REST API / WebSocket)
                                  │
                                  ▼
                  [ BACKEND - Node.js / Express / TS ]
                      (Clean Architecture 4 Tầng)
                                  │
       ┌──────────────────────────┼──────────────────────────┐
       ▼                          ▼                          ▼
 [ PostgreSQL ]                [ Redis ]               [ BullMQ Queue ]
(Dữ liệu chính + Prisma)   (Cache + Session)                  │
                                                              ▼
                                                     [ Background Workers ]
                                                      ├── Email service
                                                      ├── Analytics processor
                                                      └── Inventory sync
                                                              │
                                                              ▼
                                                    [ WebSocket Gateway ]
                                                              │
                                                              ▼
                                                   [ Admin Real-time Alert ]
```

---

## 2. 🎯 Triết lý thiết kế (Architecture Philosophy)

1. **Backend:** Áp dụng **Pragmatic Clean Architecture (4 Tầng Tinh Giản)**:
   - **Độc lập công nghệ:** Nghiệp vụ cốt lõi (Domain & Application) hoàn toàn sạch bóng mã nguồn của Express, Prisma hay Redis.
   - **Dependency Inversion (SOLID):** Tầng trong chỉ phụ thuộc vào **Interface** (Abstraction), tầng ngoài (`Infrastructure`) mới là nơi cài đặt cụ thể.
   - **Nói KHÔNG với Boilerplate Hell:** Sử dụng sức mạnh TypeScript Interface & Prisma Types thay vì viết hàng trăm hàm Getter/Setter và Mapper thủ công nặng nề.
2. **Frontend:** Áp dụng **Feature-Driven Architecture (Bulletproof React)**:
   - Gom mã nguồn theo từng module nghiệp vụ (`features/products`, `features/analytics`).
   - Tách biệt UI Khách hàng `(shop)` và UI Quản trị `(admin)` bằng Next.js Route Groups.

---

## 3. 🌳 Cấu trúc thư mục toàn dự án

```text
ecommerce-intelligence/
│
├── .gitignore
├── docker-compose.yml              # Khởi chạy PostgreSQL + Redis môi trường Dev
├── ARCHITECTURE.md                 # Tài liệu kiến trúc này
├── README.md
│
├── backend/                        # ⚙️ Clean Architecture Backend
│   ├── prisma/
│   │   ├── schema.prisma           # Chứa toàn bộ Data Models (User, Order, DailySales...)
│   │   └── seed.ts                 # Dữ liệu mẫu (Admin, Categories, Products)
│   │
│   ├── src/
│   │   ├── config/                 # Cấu hình biến môi trường
│   │   │   └── env.ts              # Parse & validate bằng Zod
│   │   │
│   │   │
│   │   ├── domain/                 # 🟢 TẦNG 1: DOMAIN (Nghiệp vụ thuần túy - Pure TS)
│   │   │   ├── entities/           # TypeScript Types/Interfaces (Không cần Getter/Setter)
│   │   │   │   ├── user.entity.ts
│   │   │   │   ├── product.entity.ts
│   │   │   │   ├── order.entity.ts
│   │   │   │   └── analytics.entity.ts
│   │   │   │
│   │   │   ├── repositories/       # Interface định nghĩa giao tiếp dữ liệu
│   │   │   │   ├── user.repository.interface.ts
│   │   │   │   ├── product.repository.interface.ts
│   │   │   │   ├── order.repository.interface.ts
│   │   │   │   └── analytics.repository.interface.ts
│   │   │   │
│   │   │   └── services/           # Interface của các dịch vụ bên ngoài
│   │   │       ├── queue.service.interface.ts         # IQueueService
│   │   │       ├── cache.service.interface.ts         # ICacheService
│   │   │       └── notification.service.interface.ts  # INotificationService
│   │   │
│   │   │
│   │   ├── application/            # 🟡 TẦNG 2: APPLICATION (Use Cases)
│   │   │   ├── dtos/               # Zod Schemas & Input Types
│   │   │   │   ├── auth.dto.ts
│   │   │   │   ├── product.dto.ts
│   │   │   │   └── order.dto.ts
│   │   │   │
│   │   │   └── use-cases/          # Mỗi nghiệp vụ là 1 Class độc lập (execute())
│   │   │       ├── auth/
│   │   │       │   ├── register.use-case.ts
│   │   │       │   └── login.use-case.ts
│   │   │       ├── products/
│   │   │       │   ├── get-products.use-case.ts       # Kiểm tra Cache -> Miss gọi Repo
│   │   │       │   └── create-product.use-case.ts
│   │   │       ├── orders/
│   │   │       │   ├── create-order.use-case.ts       # Tạo đơn -> Đẩy job vào BullMQ
│   │   │       │   └── update-order-status.use-case.ts
│   │   │       └── analytics/
│   │   │           └── get-dashboard-stats.use-case.ts
│   │   │
│   │   │
│   │   ├── infrastructure/         # 🔴 TẦNG 3: INFRASTRUCTURE (Chi tiết kỹ thuật)
│   │   │   ├── database/
│   │   │   │   ├── prisma.client.ts                   # Prisma Singleton
│   │   │   │   └── repositories/                      # Implements interfaces từ Domain
│   │   │   │       ├── prisma-user.repository.ts
│   │   │   │       ├── prisma-product.repository.ts
│   │   │   │       ├── prisma-order.repository.ts
│   │   │   │       └── prisma-analytics.repository.ts
│   │   │   │
│   │   │   ├── redis/
│   │   │   │   ├── redis.client.ts
│   │   │   │   └── redis-cache.service.ts             # Implements ICacheService
│   │   │   │
│   │   │   ├── queues/             # 📦 Xử lý Background Jobs (BullMQ)
│   │   │   │   ├── bullmq-queue.service.ts            # Implements IQueueService
│   │   │   │   └── workers/                           # Worker xử lý ngầm
│   │   │   │       ├── order.worker.ts                # Gửi email, trừ tồn kho
│   │   │   │       └── analytics.worker.ts            # Tính toán ghi bảng DailySales
│   │   │   │
│   │   │   └── websocket/
│   │   │       └── socket-notification.service.ts     # Implements INotificationService
│   │   │
│   │   │
│   │   ├── presentation/           # 🔵 TẦNG 4: PRESENTATION (Giao tiếp bên ngoài)
│   │   │   ├── http/
│   │   │   │   ├── controllers/    # Nhận Request -> Validate -> Gọi UseCase -> Trả JSON
│   │   │   │   │   ├── auth.controller.ts
│   │   │   │   │   ├── product.controller.ts
│   │   │   │   │   ├── order.controller.ts
│   │   │   │   │   └── analytics.controller.ts
│   │   │   │   ├── routes/         # Khai báo Express Routers
│   │   │   │   │   ├── auth.routes.ts
│   │   │   │   │   ├── product.routes.ts
│   │   │   │   │   ├── order.routes.ts
│   │   │   │   │   ├── analytics.routes.ts
│   │   │   │   │   └── index.ts    # Router tổng
│   │   │   │   └── middlewares/
│   │   │   │       ├── auth.middleware.ts             # JWT & Role authorization
│   │   │   │       ├── validate.middleware.ts         # Validate body qua Zod schema
│   │   │   │       └── error.middleware.ts            # Bắt lỗi toàn cục
│   │   │   └── websocket/
│   │   │       └── socket.gateway.ts                  # Server Socket.io
│   │   │
│   │   │
│   │   ├── container.ts            # ⭐ Nơi khởi tạo & lắp ghép dependencies (IoC Container)
│   │   ├── app.ts                  # Cấu hình Express app
│   │   └── server.ts               # Khởi động server HTTP, DB, Redis, BullMQ
│   │
│   ├── package.json
│   └── tsconfig.json
│
│
└── frontend/                       # 🎨 Next.js App Router (Feature-Driven)
    ├── src/
    │   ├── app/
    │   │   ├── (auth)/             # Route: /login, /register
    │   │   │   ├── login/page.tsx
    │   │   │   └── register/page.tsx
    │   │   │
    │   │   ├── (shop)/             # 🛒 Giao diện Khách hàng
    │   │   │   ├── layout.tsx      # Header, Footer, Giỏ hàng nổi
    │   │   │   ├── page.tsx        # Trang chủ
    │   │   │   ├── products/
    │   │   │   │   ├── page.tsx    # Danh mục, lọc, phân trang
    │   │   │   │   └── [id]/page.tsx
    │   │   │   ├── cart/page.tsx
    │   │   │   └── checkout/page.tsx
    │   │   │
    │   │   └── (admin)/dashboard/  # 📊 Giao diện Quản trị & Phân tích
    │   │       ├── layout.tsx      # Sidebar, Header thông báo Real-time
    │   │       ├── page.tsx        # Tổng quan KPI & Revenue Chart
    │   │       ├── orders/page.tsx # Quản lý đơn hàng
    │   │       ├── products/page.tsx
    │   │       └── analytics/page.tsx
    │   │
    │   ├── components/
    │   │   ├── ui/                 # Base components (Button, Input, Modal...)
    │   │   ├── shop/               # ProductCard, CartDrawer, FilterBar
    │   │   └── admin/              # RevenueChart, RealtimeToast
    │   │
    │   ├── features/               # ⭐ Business logic từng module
    │   │   ├── auth/               # api/auth.ts, hooks/useAuth.ts
    │   │   ├── products/           # api/products.ts, hooks/useProducts.ts
    │   │   ├── cart/               # store/useCartStore.ts (Zustand)
    │   │   ├── orders/             # api/orders.ts
    │   │   ├── analytics/          # api/analytics.ts, types/analytics.ts
    │   │   └── notifications/      # hooks/useSocketNotifications.ts
    │   │
    │   ├── lib/
    │   │   ├── api-client.ts       # Axios instance với JWT Interceptor
    │   │   └── socket.ts           # Kết nối Socket.io client
    │   └── types/                  # Shared TypeScript interfaces
    │
    ├── package.json
    └── tsconfig.json
```

---

## 4. 🔄 Luồng dữ liệu chuẩn (Data Flow)

### Luồng 1: Truy vấn Sản phẩm có Caching (Read Flow)
1. **Client** gửi `GET /api/v1/products?category=laptop`.
2. **ProductController** chuyển query params vào `GetProductsUseCase`.
3. **GetProductsUseCase** kiểm tra `ICacheService.get(cacheKey)`:
   - **HIT:** Trả ngay dữ liệu từ Redis về (tốc độ < 10ms).
   - **MISS:** Gọi `IProductRepository.findAll()`, sau đó lưu vào Redis với TTL 60s, rồi trả kết quả về Client.

### Luồng 2: Đặt hàng & Xử lý Nền (Write & Event-Driven Flow)
```text
1. Client POST /api/v1/orders
       │
       ▼
2. OrderController -> CreateOrderUseCase.execute(userId, dto)
       │
       ├──► 3. IOrderRepository.create() [Tạo đơn hàng trạng thái PENDING]
       │
       ├──► 4. IQueueService.addJob('ORDER_QUEUE', 'ORDER_CREATED', orderData)
       │
       ▼
5. Phản hồi HTTP 201 Created cho Client ngay lập tức (< 50ms)
       │
       ▼ (Chạy ngầm bất đồng bộ)
6. BullMQ Worker nhặt Job 'ORDER_CREATED':
       ├── Worker gửi email xác nhận cho khách hàng
       ├── Worker cập nhật bảng tổng hợp: DailySales, ProductSales
       └── Worker gọi INotificationService.emit('NEW_ORDER', orderData)
                               │
                               ▼
7. WebSocket Gateway gửi thông báo tới Admin Dashboard: "Có đơn hàng mới #1024!"
```

---

## 5. 📏 Quy ước đặt tên & File Conventions

| Thành phần | Vị trí | Quy ước đặt tên file | Ví dụ |
| :--- | :--- | :--- | :--- |
| **Domain Entity** | `src/domain/entities` | `*.entity.ts` | `order.entity.ts` |
| **Repository Interface** | `src/domain/repositories` | `*.repository.interface.ts` | `order.repository.interface.ts` |
| **Service Interface** | `src/domain/services` | `*.service.interface.ts` | `queue.service.interface.ts` |
| **Use Case** | `src/application/use-cases/<feature>` | `*.use-case.ts` | `create-order.use-case.ts` |
| **DTO (Zod)** | `src/application/dtos` | `*.dto.ts` | `order.dto.ts` |
| **Prisma Repository**| `src/infrastructure/database/repositories` | `prisma-*.repository.ts`| `prisma-order.repository.ts` |
| **Queue Worker** | `src/infrastructure/queues/workers` | `*.worker.ts` | `order.worker.ts` |
| **Controller** | `src/presentation/http/controllers` | `*.controller.ts` | `order.controller.ts` |
| **Route** | `src/presentation/http/routes` | `*.routes.ts` | `order.routes.ts` |

---

## 6. 🚀 Lộ trình triển khai khuyến nghị (Roadmap Phases)

- [ ] **Phase 1: Foundation Setup**
  - Setup Docker Compose (PostgreSQL, Redis).
  - Setup Backend (TypeScript, Express, Prisma ORM, Global Error Handling, Zod).
  - Setup Database Schema cơ bản (`User`, `Category`, `Product`, `Role`).
  - Authentication (JWT, Refresh Token, Hashing bcrypt).
- [ ] **Phase 2: E-commerce Core**
  - CRUD Products & Categories (Filter, Pagination, Sort).
  - Cart & Orders Management (`Order`, `OrderItem`, `Inventory`).
- [ ] **Phase 3: Redis Performance**
  - Tích hợp Redis Caching cho Product List & Detail.
- [ ] **Phase 4: BullMQ Background Processing**
  - Cấu hình Redis Queue & Workers.
  - Xử lý bất đồng bộ khi có đơn hàng (Cộng dồn số liệu, Gửi mail).
- [ ] **Phase 5: Intelligence & Analytics Dashboard**
  - Thiết kế các bảng tổng hợp: `DailySales`, `ProductSales`.
  - API Analytics: Doanh thu theo ngày/tháng, sản phẩm bán chạy nhất, tỷ lệ hủy.
- [ ] **Phase 6: Real-time Notification**
  - Socket.io tích hợp vào Admin Dashboard (Đơn hàng mới, Hàng sắp hết kho).
- [ ] **Phase 7: Frontend & Dashboard (Next.js)**
  - Giao diện mua hàng `(shop)` + Giao diện phân tích `(admin)`.
- [ ] **Phase 8: Docker & CI/CD**
  - Đóng gói toàn bộ qua Dockerfile, cấu hình Nginx Reverse Proxy.
