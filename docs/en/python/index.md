# Zapind for Python (PyPI)

<PackageSelector />

**Zapind** (`v0.1.0`) is an async-first (`asyncio`), fully typed (`PEP 561 py.typed`) Zalo SDK for **Python (`>= 3.10`)**.

## Installation

```bash
pip install zapind
```

To enable AES-256-GCM encrypted session storage (`EncryptedFileSessionStore`):

```bash
pip install "zapind[crypto]"
```

## Quick Start

```python
import asyncio
from zapind import Zapind, Reaction

async def main() -> None:
    async with Zapind(session="./session.json") as client:
        await client.login(
            on_qr_code=lambda qr: print("Scan QR:", qr.image_data_url),
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

## Python Documentation Sections

- [Quick Start](/en/python/guide/getting-started)
- [Authentication & Sessions](/en/python/guide/authentication)
- [Messaging & Media](/en/python/guide/messaging)
- [Realtime Events](/en/python/guide/events)
- [Error Handling & Policies](/en/python/guide/error-handling)
- [API Overview](/en/python/api/)
- [Domain Services](/en/python/api/services)
- [Models & Types](/en/python/api/models)
