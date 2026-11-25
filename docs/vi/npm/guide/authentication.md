# Xác thực & Phiên làm việc

Zapind quản lý trọn vòng đời phiên đăng nhập qua một điểm vào duy nhất là `client.login()`.

## Luồng đăng nhập tự động

Khi gọi `await client.login(options?)`:

1. Nếu bạn truyền `options.credentials`, SDK đăng nhập trực tiếp bằng bộ thông tin phiên đó.
2. Nếu không truyền `credentials` và không bật `forceQR: true`, SDK tự đọc phiên từ `SessionStore` để khôi phục và xác thực.
3. Nếu chưa có phiên hoặc phiên đã hết hạn, SDK phát sự kiện `'auth.required'` (kèm lý do `'no_session'` hoặc `'session_expired'`) và tự động chuyển sang luồng quét mã QR.
4. Sau khi đăng nhập thành công, SDK tự lưu phiên mới xuống `SessionStore`.

```ts
import { Zapind } from 'zapind';

const client = new Zapind({
  session: './session.json',
});

client.on('auth.required', ({ reason }) => {
  console.log('Cần đăng nhập lại, lý do:', reason);
});

const session = await client.login({
  onQRCode: ({ imageDataUrl }) => console.log('Mã QR:', imageDataUrl),
  onScanned: ({ displayName }) => console.log('Đã quét bởi:', displayName),
  timeoutMs: 180_000,
});

console.log('Tài khoản:', session.accountId, session.displayName);
```

## Các bộ lưu phiên tích hợp sẵn

Zapind cung cấp 3 lớp triển khai `SessionStore`:

| Lớp lưu trữ | Cách dùng | Đặc điểm |
|---|---|---|
| `MemorySessionStore` | Mặc định khi không truyền `session` | Chỉ lưu trong RAM, tự mất khi tiến trình dừng. |
| `FileSessionStore` | `session: './session.json'` hoặc `new FileSessionStore(path)` | Ghi nguyên tử (atomic write qua tệp tạm rồi đổi tên), đặt quyền `0o600` trên hệ thống POSIX. |
| `EncryptedFileSessionStore` | `new EncryptedFileSessionStore(path, secret)` | Mã hóa toàn bộ phiên trên đĩa bằng **AES-256-GCM** (dẫn xuất khóa bằng `scrypt`), yêu cầu `secret` tối thiểu 16 byte. |

### Ví dụ lưu phiên mã hóa

```ts
import { Zapind, EncryptedFileSessionStore } from 'zapind';

const client = new Zapind({
  session: new EncryptedFileSessionStore(
    './session.enc.json',
    process.env.SESSION_SECRET!,
  ),
});

await client.login();
```

## Kiểm tra trạng thái & Đăng xuất

```ts
client.isAuthenticated(); // boolean
client.getStatus();       // ClientStatus: idle | starting | qr_pending | scanned | connected | error
client.getSession();      // SessionInfo | null (không chứa cookie hay IMEI)

// Ngắt kết nối, dừng listener, xóa cache và (tùy chọn) xóa tệp phiên cục bộ
await client.logout({ clearSession: true });
```

::: warning Lưu ý về `logout()`
`logout()` dừng WebSocket listener, dọn bộ nhớ đệm và xóa dữ liệu phiên cục bộ trong `SessionStore`. Thư viện hiện không có endpoint thu hồi phiên từ phía máy chủ Zalo.
:::
