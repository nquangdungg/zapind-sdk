# Xác thực & Phiên (Python)

`await client.login(...)` tự động khôi phục phiên từ `SessionStore`, kiểm tra hợp lệ và chuyển sang đăng nhập QR khi phiên chưa tồn tại hoặc đã hết hạn.

## Luồng đăng nhập tự động

```python
from zapind import Zapind

client = Zapind(session="./session.json")

client.on("auth.required", lambda evt: print("Cần đăng nhập:", evt.reason))

session = await client.login(
    on_qr_code=lambda qr: print("Quét QR:", qr.image_data_url),
    on_scanned=lambda info: print("Đã quét bởi:", info.display_name),
    timeout=180.0,
)

print(session.account_id, session.display_name)
```

## Các lớp `SessionStore` tích hợp sẵn

| Lớp | Cách dùng | Mô tả |
|---|---|---|
| `MemorySessionStore` | Mặc định khi không truyền `session` | Lưu trong bộ nhớ RAM. |
| `FileSessionStore` | `session="./session.json"` hoặc `FileSessionStore(path)` | Ghi nguyên tử bằng tệp tạm + `os.replace`, đặt quyền `0o600` trên POSIX. |
| `EncryptedFileSessionStore` | `EncryptedFileSessionStore(path, secret)` | Mã hóa AES-256-GCM với `scrypt` (yêu cầu `pip install "zapind[crypto]"` và `secret` tối thiểu 16 byte). |

```python
import os
from zapind import Zapind, EncryptedFileSessionStore

client = Zapind(
    session=EncryptedFileSessionStore("./session.enc.json", os.environ["SESSION_SECRET"]),
)
```

## Trạng thái & Đăng xuất

```python
client.is_authenticated()  # bool
client.get_status()        # ClientStatus
client.get_session()       # SessionInfo | None

await client.logout(clear_session=True)
```

Khi dùng `async with Zapind(...) as client:`, thoát khối `async with` sẽ tự động gọi `await client.logout(clear_session=False)` để đóng kết nối an toàn mà vẫn giữ tệp phiên.
