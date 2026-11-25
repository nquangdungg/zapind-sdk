# Error Handling & Policies

All errors thrown by Zapind are normalized into subclasses of **`ZapindError`**.

## Error Hierarchy

```text
ZapindError (code, retryable, rawCode, cause)
├── AuthenticationError   (AUTHENTICATION_ERROR)
├── SessionError          (SESSION_ERROR)
├── NetworkError          (NETWORK_ERROR, retryable: true)
├── RateLimitError        (RATE_LIMIT_ERROR, retryable: true, retryAfterMs)
├── ValidationError       (VALIDATION_ERROR)
├── PermissionError       (PERMISSION_ERROR)
├── NotFoundError         (NOT_FOUND_ERROR)
└── APIError              (API_ERROR)
```

## Catching Specific Errors

```ts
import {
  ZapindError,
  AuthenticationError,
  SessionError,
  RateLimitError,
  ValidationError,
  NotFoundError,
} from 'zapind';

try {
  await client.messages.send(groupId, 'Hello');
} catch (err) {
  if (err instanceof RateLimitError) {
    console.error('Rate limited, retry after (ms):', err.retryAfterMs);
  } else if (err instanceof SessionError || err instanceof AuthenticationError) {
    console.error('Session invalid or not authenticated:', err.message);
  } else if (err instanceof ValidationError) {
    console.error('Invalid input:', err.message);
  } else if (err instanceof NotFoundError) {
    console.error('Resource not found:', err.message);
  } else if (err instanceof ZapindError) {
    console.error('Zapind error:', err.code, err.message);
  }
}
```

## Timeout, Retry, Rate Limiting & Log Redaction

Zapind applies built-in operational safeguards at the execution layer:

- **Timeouts:** Default `15_000 ms` per API request and `180_000 ms` for QR login (`timeoutMs`, `qrTimeoutMs`).
- **Controlled Retries:** Default `3` attempts with exponential backoff only for `retryable: true` errors on idempotent operations. Non-idempotent writes (`messages.send`, `media.upload`, `groups.create`, `groups.leave`) are **never auto-retried** to prevent duplicates.
- **Rate Limiter:** Token-bucket limiter defaulting to `5` requests/second with burst `10` (configurable via `rateLimit`, or disable with `rateLimit: false`).
- **RedactingLogger:** Automatically redacts sensitive metadata keys (`cookie`, `imei`, `token`, `secret`, `password`, `auth`, `cipher`, `qr`, `content`, `message`, `msg`, `text`) to `[REDACTED]`.
