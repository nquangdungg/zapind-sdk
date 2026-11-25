# Authentication & Sessions

Zapind manages the complete authentication and session lifecycle through `client.login()`.

## Automatic Login Flow

When you call `await client.login(options?)`:

1. If `options.credentials` is provided, Zapind authenticates directly with those credentials.
2. Otherwise (unless `forceQR: true`), Zapind attempts to load and validate a saved session from your `SessionStore`.
3. If no session exists or the saved session expired, Zapind emits `'auth.required'` (`'no_session'` or `'session_expired'`) and automatically starts QR login.
4. Once authenticated, Zapind persists the updated session to your `SessionStore`.

```ts
import { Zapind } from 'zapind';

const client = new Zapind({
  session: './session.json',
});

client.on('auth.required', ({ reason }) => {
  console.log('Authentication required:', reason);
});

const session = await client.login({
  onQRCode: ({ imageDataUrl }) => console.log('QR Data URL:', imageDataUrl),
  onScanned: ({ displayName }) => console.log('Scanned by:', displayName),
  timeoutMs: 180_000,
});

console.log('Account:', session.accountId, session.displayName);
```

## Built-in Session Stores

Zapind includes 3 `SessionStore` implementations:

| Store | Usage | Behavior |
|---|---|---|
| `MemorySessionStore` | Default when `session` is omitted | In-memory only; cleared when the process exits. |
| `FileSessionStore` | `session: './session.json'` or `new FileSessionStore(path)` | Atomic writes (temp file + rename) with `0o600` permissions on POSIX. |
| `EncryptedFileSessionStore` | `new EncryptedFileSessionStore(path, secret)` | Encrypts session data at rest using **AES-256-GCM** with `scrypt` key derivation (`secret` must be at least 16 bytes). |

### Encrypted Session Example

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

## Status & Logout

```ts
client.isAuthenticated(); // boolean
client.getStatus();       // ClientStatus: idle | starting | qr_pending | scanned | connected | error
client.getSession();      // SessionInfo | null (never exposes cookie or IMEI)

// Stop listener, disconnect, clear caches, and optionally remove local session
await client.logout({ clearSession: true });
```

::: warning Note on `logout()`
`logout()` stops the realtime listener, clears in-memory caches, and clears local storage. Server-side session revocation is not available as an endpoint in the current SDK.
:::
