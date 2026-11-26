# Quick Start (Python)

**Zapind** (`v1.0.0`) provides an idiomatic `asyncio` Python API using `snake_case`, `async with Zapind(...) as client:`, contextual models, and full PEP 561 type hints (`py.typed`).

## Requirements

- **Python `>= 3.10`**
- Zero mandatory third-party runtime dependencies (`dependencies = []`)
- Optional `[crypto]` extra (`cryptography >= 42.0.0`) for `EncryptedFileSessionStore`
- When using the default `NodeBridgeTransport` for live Zalo sessions, **Node.js `>= 20`** and a bridge worker running `zapind` are required

## Installation

```bash
pip install zapind
```

```bash
# With AES-256-GCM encrypted session storage
pip install "zapind[crypto]"
```

## Your First Script

```python
import asyncio
from zapind import Zapind, Reaction

async def main() -> None:
    async with Zapind(session="./session.json") as client:
        await client.login(
            on_qr_code=lambda qr: print("QR Data URL:", qr.image_data_url),
            on_scanned=lambda info: print("Scanned by:", info.display_name),
        )

        me = await client.account.get_me()
        print("Logged in as:", me.id, me.display_name)

        @client.on("message")
        async def on_message(message):
            if message.text == "!ping":
                await message.reply("pong!")
                await message.react(Reaction.HEART)

        await client.start_listening(retry_on_close=True)
        await asyncio.sleep(60)

asyncio.run(main())
```

## Multi-Account Support

Each `Zapind` instance owns its own session store, caches, and event bus:

```python
import asyncio
from zapind import Zapind

async def main() -> None:
    bot_a = Zapind(session="./sessions/bot-a.json")
    bot_b = Zapind(session="./sessions/bot-b.json")
    await asyncio.gather(bot_a.login(), bot_b.login())
```

## Next Steps

- [Authentication & Sessions](/en/python/guide/authentication)
- [Messaging & Media](/en/python/guide/messaging)
- [Realtime Events](/en/python/guide/events)
- [Python API Overview](/en/python/api/)
