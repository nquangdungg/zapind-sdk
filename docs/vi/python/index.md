# Zapind cho Python (PyPI)

<PackageSelector />

**Zapind** (`v0.1.0`) là bộ SDK Zalo bất đồng bộ (`asyncio`) và đầy đủ type hints (`PEP 561 py.typed`) dành cho **Python (`>= 3.10`)**.

## Cài đặt

```bash
pip install zapind
```

Cài thêm tùy chọn mã hóa phiên AES-256-GCM (`EncryptedFileSessionStore`):

```bash
pip install "zapind[crypto]"
```

## Khởi chạy nhanh

```python
import asyncio
from zapind import Zapind, Reaction

async def main() -> None:
    async with Zapind(session="./session.json") as client:
        await client.login(
            on_qr_code=lambda qr: print("Quét QR:", qr.image_data_url),
        )

        @client.on("message")
        async def handle_message(message):
            if message.text == "!ping":
                await message.reply("pong!")
                await message.react(Reaction.HEART)

        await client.start_listening(retry_on_close=True)
        await asyncio.sleep(60)

asyncio.run(main())
```

## Mục lục tài liệu Python

- [Bắt đầu nhanh](/vi/python/guide/getting-started)
- [Xác thực & Phiên](/vi/python/guide/authentication)
- [Tin nhắn & Media](/vi/python/guide/messaging)
- [Sự kiện thời gian thực](/vi/python/guide/events)
- [Xử lý lỗi & Chính sách](/vi/python/guide/error-handling)
- [Tổng quan API](/vi/python/api/)
- [Domain Services](/vi/python/api/services)
- [Models & Kiểu dữ liệu](/vi/python/api/models)
