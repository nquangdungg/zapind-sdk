# Xử lý lỗi & Chính sách (Python)

Mọi ngoại lệ từ Zapind đều kế thừa `ZapindError` (có thuộc tính `code`, `retryable`, `raw_code`, `cause`).

## Cây ngoại lệ

```text
ZapindError
├── AuthenticationError   (AUTHENTICATION_ERROR)
├── SessionError          (SESSION_ERROR)
├── NetworkError          (NETWORK_ERROR, retryable=True)
├── RateLimitError        (RATE_LIMIT_ERROR, retryable=True, retry_after_ms)
├── ValidationError       (VALIDATION_ERROR)
├── PermissionError       (PERMISSION_ERROR)
├── NotFoundError         (NOT_FOUND_ERROR)
└── APIError              (API_ERROR)
```

## Bắt lỗi theo loại

```python
from zapind import (
    ZapindError,
    AuthenticationError,
    SessionError,
    RateLimitError,
    ValidationError,
    NotFoundError,
)

try:
    await client.messages.send(group_id, "Xin chào")
except RateLimitError as err:
    print("Vượt tần suất, thử lại sau (ms):", err.retry_after_ms)
except (SessionError, AuthenticationError) as err:
    print("Cần đăng nhập lại:", err.message)
except ValidationError as err:
    print("Dữ liệu đầu vào không hợp lệ:", err.message)
except NotFoundError as err:
    print("Không tìm thấy tài nguyên:", err.message)
except ZapindError as err:
    print("Lỗi Zapind:", err.code, err.message)
```

## Chính sách tích hợp sẵn

- **Timeout (`timeout=15.0`, `qr_timeout=180.0`):** Dùng `asyncio.wait_for`.
- **Retry (`RetryOptions`):** Chỉ thử lại tối đa `3` lần cho các thao tác idempotent khi `err.retryable` là `True`. Không tự thử lại `messages.send`, `media.upload`, `groups.create`, `groups.leave`.
- **Rate Limiter (`RateLimiter`):** Token-bucket bất đồng bộ mặc định `5.0` yêu cầu/giây, burst `10` (truyền `rate_limit=False` để tắt).
- **RedactingLogger:** Tự động che `cookie`, `imei`, `token`, `secret`, `password`, `auth`, `cipher`, `qr`, `content`, `message`, `msg`, `text` thành `[REDACTED]`.
