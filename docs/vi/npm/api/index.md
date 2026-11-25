# Tổng quan API (`Zapind`)

Lớp `Zapind` là điểm vào chính của thư viện.

## Khởi tạo `new Zapind(options?)`

```ts
import { Zapind, FileSessionStore, noopLogger } from 'zapind';

const client = new Zapind({
  session: new FileSessionStore('./session.json'),
  timeoutMs: 15_000,
  qrTimeoutMs: 180_000,
  retry: { maxAttempts: 3, baseDelayMs: 300, maxDelayMs: 5_000 },
  rateLimit: { maxRequestsPerSecond: 5, burst: 10 },
  cacheTtlMs: 60_000,
  maxCacheEntries: 500,
  selfListen: false,
  language: 'vi',
  debug: false,
  logger: noopLogger,
});
```

### Tùy chọn `ZapindOptions`

| Thuộc tính | Kiểu | Mặc định | Mô tả |
|---|---|---|---|
| `session` | `string \| SessionStore` | `MemorySessionStore` | Đường dẫn tệp JSON hoặc thực thể `SessionStore`. |
| `timeoutMs` | `number` | `15000` | Thời gian chờ tối đa (ms) cho mỗi yêu cầu. |
| `qrTimeoutMs` | `number` | `180000` | Thời gian chờ tối đa (ms) cho luồng quét mã QR. |
| `retry` | `Partial<RetryOptions>` | `{ maxAttempts: 3, baseDelayMs: 300, maxDelayMs: 5000 }` | Cấu hình thử lại cho các thao tác idempotent gặp lỗi tạm thời. |
| `rateLimit` | `RateLimiterOptions \| false` | `{ maxRequestsPerSecond: 5, burst: 10 }` | Cấu hình giới hạn tần suất yêu cầu hoặc `false` để tắt. |
| `cacheTtlMs` | `number` | `60000` | Thời gian sống (ms) cho cache user/group. |
| `maxCacheEntries` | `number` | `500` | Số phần tử tối đa trong `TTLCache`. |
| `logger` | `Logger` | `console` (bọc `RedactingLogger`) | Logger tùy chỉnh. |
| `debug` | `boolean` | `false` | Bật/tắt log mức `debug`. |
| `selfListen` | `boolean` | `false` | Cho phép nhận sự kiện do chính tài khoản đang đăng nhập gửi. |
| `userAgent` | `string` | `DEFAULT_USER_AGENT` | Chuỗi User-Agent dùng cho phiên. |
| `language` | `string` | `'vi'` | Ngôn ngữ mặc định của phiên. |
| `imageMetadataGetter` | `ImageMetadataGetter` | `undefined` | Hàm đọc `{ width, height, size }` khi tải lên ảnh từ đường dẫn tệp. |
| `transport` | `TransportAdapter` | Engine mặc định | Cho phép inject mock transport khi viết kiểm thử tự động. |

## Phương thức cấp cao trên `Zapind`

| Phương thức / Thuộc tính | Kiểu trả về | Mô tả |
|---|---|---|
| `login(options?: LoginOptions)` | `Promise<SessionInfo>` | Khôi phục phiên hoặc đăng nhập QR tự động. |
| `logout(options?: LogoutOptions)` | `Promise<void>` | Dừng lắng nghe, ngắt kết nối, xóa cache và tùy chọn xóa phiên cục bộ. |
| `getStatus()` | `ClientStatus` | Trạng thái hiện tại của client. |
| `getSession()` | `SessionInfo \| null` | Thông tin phiên an toàn (không chứa cookie/IMEI). |
| `isAuthenticated()` | `boolean` | Kiểm tra client đã kết nối và xác thực hay chưa. |
| `on(event, handler)` | `UnsubscribeFn` | Đăng ký listener cho sự kiện thời gian thực. |
| `once(event, handler)` | `UnsubscribeFn` | Đăng ký listener chạy một lần duy nhất. |
| `off(event, handler)` | `void` | Hủy đăng ký listener. |
| `startListening(options?)` | `void` | Bắt đầu lắng nghe WebSocket thời gian thực. |
| `stopListening()` | `void` | Dừng lắng nghe WebSocket. |
| `raw` | `unknown` | Cổng truy cập API mức thấp dành cho nhu cầu nâng cao chưa được bọc ở tầng cao. |

## Các Domain Services

Xem chi tiết 9 miền API tại [Domain Services](/vi/npm/api/services) và các thực thể có ngữ cảnh tại [Models & Kiểu dữ liệu](/vi/npm/api/models).
