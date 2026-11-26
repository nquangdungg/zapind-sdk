# API Overview (`Zapind`)

The `Zapind` class is the primary entry point of the SDK.

## Constructor `new Zapind(options?)`

```ts
import { Zapind, FileSessionStore, noopLogger } from 'zapind';

const client = new Zapind({
  session: new FileSessionStore('./session.json'),
  timeoutMs: 15_000,
  qrTimeoutMs: 180_000,
  retry: { maxAttempts: 3, baseDelayMs: 300, maxDelayMs: 5_000 },
  rateLimit: { maxRequestsPerSecond: 5, burst: 10 },
  cacheTtlMs: 60_000,
  maxCacheEntries: 500,
  selfListen: false,
  language: 'vi',
  debug: false,
  logger: noopLogger,
});
```

### `ZapindOptions`

| Option | Type | Default | Description |
|---|---|---|---|
| `session` | `string \| SessionStore` | `MemorySessionStore` | JSON file path or custom `SessionStore` instance. |
| `timeoutMs` | `number` | `15000` | Maximum timeout (ms) per request. |
| `qrTimeoutMs` | `number` | `180000` | Maximum timeout (ms) for QR login. |
| `retry` | `Partial<RetryOptions>` | `{ maxAttempts: 3, baseDelayMs: 300, maxDelayMs: 5000 }` | Retry policy for idempotent operations on retryable errors. |
| `rateLimit` | `RateLimiterOptions \| false` | `{ maxRequestsPerSecond: 5, burst: 10 }` | Token-bucket rate limiter options, or `false` to disable. |
| `cacheTtlMs` | `number` | `60000` | TTL (ms) for user/group caches. |
| `maxCacheEntries` | `number` | `500` | Maximum number of entries in `TTLCache`. |
| `logger` | `Logger` | `console` (wrapped in `RedactingLogger`) | Custom logger sink. |
| `debug` | `boolean` | `false` | Enables debug-level logging. |
| `selfListen` | `boolean` | `false` | Emits events triggered by the logged-in account itself. |
| `userAgent` | `string` | `DEFAULT_USER_AGENT` | User-Agent string used for session requests. |
| `language` | `string` | `'vi'` | Default session language. |
| `imageMetadataGetter` | `ImageMetadataGetter` | `undefined` | Helper returning `{ width, height, size }` when uploading images by file path. |
| `transport` | `TransportAdapter` | Default transport | Allows injecting a mock transport for automated tests. |

## Top-Level Methods & Properties

| Member | Return Type | Description |
|---|---|---|
| `login(options?: LoginOptions)` | `Promise<SessionInfo>` | Restores saved session or starts QR login automatically. |
| `logout(options?: LogoutOptions)` | `Promise<void>` | Stops listener, disconnects, clears caches, and optionally clears local session store. |
| `destroy(options?: LogoutOptions)` | `Promise<void>` | Full teardown: stops listener, disconnects, clears caches, removes all event listeners, and optionally clears local session (`clearSession` defaults to `false`). |
| `getStatus()` | `ClientStatus` | Current client lifecycle status. |
| `getSession()` | `SessionInfo \| null` | Safe session metadata (excludes cookies and IMEI). |
| `isAuthenticated()` | `boolean` | Whether the client is currently authenticated and connected. |
| `on(event, handler)` | `UnsubscribeFn` | Registers a realtime event listener. |
| `once(event, handler)` | `UnsubscribeFn` | Registers a one-time event listener. |
| `off(event, handler)` | `void` | Removes an event listener. |
| `startListening(options?)` | `void` | Starts the realtime WebSocket listener. |
| `stopListening()` | `void` | Stops the realtime WebSocket listener. |
| `raw` | `unknown` | Escape hatch exposing the underlying low-level API for advanced use cases. |

## Domain Services & Models

Explore all 9 namespaces in [Domain Services](/en/npm/api/services) and contextual entities in [Models & Types](/en/npm/api/models).
