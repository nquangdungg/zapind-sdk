# Bắt đầu nhanh (Python)

**Zapind** (`v0.1.0`) cung cấp giao diện `asyncio` chuẩn Python với quy ước `snake_case`, hỗ trợ `async with Zapind(...) as client:`, đối tượng có ngữ cảnh và đầy đủ type hints (`py.typed`).

## Yêu cầu môi trường

- **Python `>= 3.10`**
- Gói lõi không yêu cầu dependency bên ngoài (`dependencies = []`)
- Tùy chọn `[crypto]` (`cryptography >= 42.0.0`) khi dùng `EncryptedFileSessionStore`
- Khi chạy thực tế với `NodeBridgeTransport` mặc định, cần có **Node.js `>= 20`** và script worker chạy gói `zapind`

## Cài đặt

```bash
pip install zapind
```

```bash
# Nếu cần lưu phiên mã hóa AES-256-GCM
pip install "zapind[crypto]"
```

## Ví dụ đầu tiên

```python
import asyncio
from zapind import Zapind, Reaction

async def main() -> None:
    async with Zapind(session="./session.json") as client:
        await client.login(
            on_qr_code=lambda qr: print("Mã QR:", qr.image_data_url),
            on_scanned=lambda info: print("Đã quét bởi:", info.display_name),
        )

        me = await client.account.get_me()
        print("Đăng nhập thành công:", me.id, me.display_name)

        @client.on("message")
        async def on_message(message):
            if message.text == "!ping":
                await message.reply("pong!")
                await message.react(Reaction.HEART)

        await client.start_listening(retry_on_close=True)
        await asyncio.sleep(60)

asyncio.run(main())
```

## Hỗ trợ đa tài khoản

Mỗi thực thể `Zapind` giữ trạng thái, cache và `SessionStore` độc lập:

```python
import asyncio
from zapind import Zapind

async def main() -> None:
    bot_a = Zapind(session="./sessions/bot-a.json")
    bot_b = Zapind(session="./sessions/bot-b.json")
    await asyncio.gather(bot_a.login(), bot_b.login())
```

## Các bước tiếp theo

- [Xác thực & Phiên](/vi/python/guide/authentication)
- [Tin nhắn & Media](/vi/python/guide/messaging)
- [Sự kiện thời gian thực](/vi/python/guide/events)
- [Tổng quan API Python](/vi/python/api/)
