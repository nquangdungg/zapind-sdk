# Tổng quan API (Python)

## Khởi tạo `Zapind(...)`

```python
from zapind import Zapind, FileSessionStore, RetryOptions, RateLimiter

client = Zapind(
    session=FileSessionStore("./session.json"),
    timeout=15.0,
    qr_timeout=180.0,
    retry=RetryOptions(max_attempts=3, base_delay=0.3, max_delay=5.0),
    rate_limit=RateLimiter(max_requests_per_second=5.0, burst=10),
    cache_ttl=60.0,
    max_cache_entries=500,
    debug=False,
    self_listen=False,
    language="vi",
)
```

### Tham số khởi tạo

| Tham số | Kiểu | Mặc định | Mô tả |
|---|---|---|---|
| `session` | `str \| Path \| SessionStore \| None` | `MemorySessionStore` | Đường dẫn tệp JSON hoặc `SessionStore`. |
| `timeout` | `float` | `15.0` | Timeout mỗi yêu cầu (giây). |
| `qr_timeout` | `float` | `180.0` | Timeout quét QR (giây). |
| `retry` | `RetryOptions \| None` | `RetryOptions()` | Chính sách retry cho thao tác idempotent. |
| `rate_limit` | `RateLimiter \| bool` | `True` (`5 req/s`, burst `10`) | Bật/tắt hoặc truyền `RateLimiter` tùy chỉnh. |
| `cache_ttl` | `float` | `60.0` | Thời gian sống cache user/group (giây). |
| `max_cache_entries` | `int` | `500` | Số phần tử tối đa của `TTLCache`. |
| `logger` | `logging.Logger \| None` | `logging.getLogger("zapind")` | Logger Python chuẩn được bọc bởi `RedactingLogger`. |
| `debug` | `bool` | `False` | Bật/tắt log mức debug. |
| `self_listen` | `bool` | `False` | Nhận sự kiện do chính tài khoản gửi. |
| `user_agent` | `str` | `DEFAULT_USER_AGENT` | Chuỗi User-Agent. |
| `language` | `str` | `"vi"` | Ngôn ngữ mặc định. |
| `transport` | `TransportAdapter \| None` | `NodeBridgeTransport()` | Tầng transport (có thể thay bằng `MockTransport` khi test). |

## Phương thức chính trên `Zapind`

| Phương thức | Kiểu trả về | Mô tả |
|---|---|---|
| `await login(...)` | `SessionInfo` | Khôi phục phiên hoặc đăng nhập QR. |
| `await logout(clear_session=True)` | `None` | Ngắt kết nối, xóa cache và tùy chọn xóa phiên cục bộ. |
| `get_status()` | `ClientStatus` | Trạng thái hiện tại. |
| `get_session()` | `SessionInfo \| None` | Metadata phiên an toàn. |
| `is_authenticated()` | `bool` | Kiểm tra trạng thái xác thực. |
| `on(event, handler?)` | `UnsubscribeFn \| Decorator` | Đăng ký sự kiện (hàm hoặc decorator). |
| `once(event, handler)` | `UnsubscribeFn` | Đăng ký sự kiện chạy một lần. |
| `off(event, handler)` | `None` | Hủy đăng ký sự kiện. |
| `await start_listening(retry_on_close=False)` | `None` | Bắt đầu lắng nghe sự kiện. |
| `await stop_listening()` | `None` | Dừng lắng nghe sự kiện. |
