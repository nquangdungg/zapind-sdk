# Xử lý lỗi & Chính sách vận hành

Mọi lỗi phát sinh trong Zapind đều được chuẩn hóa về cây kế thừa của **`ZapindError`**.

## Cây phân cấp lỗi

```text
ZapindError (code, retryable, rawCode, cause)
├── AuthenticationError   (AUTHENTICATION_ERROR)
├── SessionError          (SESSION_ERROR)
├── NetworkError          (NETWORK_ERROR, retryable: true)
├── RateLimitError        (RATE_LIMIT_ERROR, retryable: true, retryAfterMs)
├── ValidationError       (VALIDATION_ERROR)
├── PermissionError       (PERMISSION_ERROR)
├── NotFoundError         (NOT_FOUND_ERROR)
└── APIError              (API_ERROR)
```

## Ví dụ bắt lỗi theo loại

```ts
import {
  ZapindError,
  AuthenticationError,
  SessionError,
  RateLimitError,
  ValidationError,
  NotFoundError,
} from 'zapind';

try {
  await client.messages.send(groupId, 'Xin chào');
} catch (err) {
  if (err instanceof RateLimitError) {
    console.error('Vượt giới hạn tần suất, thử lại sau (ms):', err.retryAfterMs);
  } else if (err instanceof SessionError || err instanceof AuthenticationError) {
    console.error('Phiên không hợp lệ hoặc chưa đăng nhập:', err.message);
  } else if (err instanceof ValidationError) {
    console.error('Tham số đầu vào không hợp lệ:', err.message);
  } else if (err instanceof NotFoundError) {
    console.error('Không tìm thấy tài nguyên:', err.message);
  } else if (err instanceof ZapindError) {
    console.error('Lỗi Zapind:', err.code, err.message);
  }
}
```

## Timeout, Retry, Rate Limiter & Ẩn dữ liệu nhạy cảm

Zapind tích hợp sẵn các chính sách vận hành ở tầng thực thi:

- **Timeout:** Mặc định `15_000 ms` cho mỗi yêu cầu API và `180_000 ms` cho luồng quét QR (`timeoutMs`, `qrTimeoutMs`).
- **Retry có kiểm soát:** Mặc định tối đa `3` lần thử với exponential backoff chỉ dành cho lỗi `retryable: true` trên các thao tác an toàn (idempotent). Các thao tác ghi không idempotent như `messages.send`, `media.upload`, `groups.create`, `groups.leave` **không bao giờ tự thử lại** để tránh gửi trùng tin nhắn.
- **Rate Limiter:** Bộ điều tiết dạng token-bucket mặc định `5` yêu cầu/giây, burst `10` (có thể tùy chỉnh qua `rateLimit` hoặc tắt với `rateLimit: false`).
- **RedactingLogger:** Tự động che các trường nhạy cảm trong metadata log như `cookie`, `imei`, `token`, `secret`, `password`, `auth`, `cipher`, `qr`, `content`, `message`, `msg`, `text` thành `[REDACTED]`.
