# Authentication & Sessions (Python)

`await client.login(...)` automatically restores saved sessions from your `SessionStore`, validates them, and falls back to QR login when missing or expired.

## Automatic Login Flow

```python
from zapind import Zapind

client = Zapind(session="./session.json")

client.on("auth.required", lambda evt: print("Auth required:", evt.reason))

session = await client.login(
    on_qr_code=lambda qr: print("Scan QR:", qr.image_data_url),
    on_scanned=lambda info: print("Scanned by:", info.display_name),
    timeout=180.0,
)

print(session.account_id, session.display_name)
```

## Built-in `SessionStore` Implementations

| Store | Usage | Description |
|---|---|---|
| `MemorySessionStore` | Default when `session` is omitted | In-memory storage only. |
| `FileSessionStore` | `session="./session.json"` or `FileSessionStore(path)` | Atomic writes via temp file + `os.replace`, with `0o600` permissions on POSIX. |
| `EncryptedFileSessionStore` | `EncryptedFileSessionStore(path, secret)` | AES-256-GCM encryption with `scrypt` key derivation (requires `pip install "zapind[crypto]"` and a secret of at least 16 bytes). |

```python
import os
from zapind import Zapind, EncryptedFileSessionStore

client = Zapind(
    session=EncryptedFileSessionStore("./session.enc.json", os.environ["SESSION_SECRET"]),
)
```

## Status & Logout

```python
client.is_authenticated()  # bool
client.get_status()        # ClientStatus
client.get_session()       # SessionInfo | None

await client.logout(clear_session=True)
```

When used with `async with Zapind(...) as client:`, exiting the context block automatically calls `await client.logout(clear_session=False)` to disconnect cleanly while preserving your saved session file.
