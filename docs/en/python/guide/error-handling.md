# Error Handling & Policies (Python)

All exceptions raised by Zapind inherit from `ZapindError` (`code`, `retryable`, `raw_code`, `cause`).

## Exception Hierarchy

```text
ZapindError
├── AuthenticationError   (AUTHENTICATION_ERROR)
├── SessionError          (SESSION_ERROR)
├── NetworkError          (NETWORK_ERROR, retryable=True)
├── RateLimitError        (RATE_LIMIT_ERROR, retryable=True, retry_after_ms)
├── ValidationError       (VALIDATION_ERROR)
├── PermissionError       (PERMISSION_ERROR)
├── NotFoundError         (NOT_FOUND_ERROR)
└── APIError              (API_ERROR)
```

## Handling Specific Exceptions

```python
from zapind import (
    ZapindError,
    AuthenticationError,
    SessionError,
    RateLimitError,
    ValidationError,
    NotFoundError,
)

try:
    await client.messages.send(group_id, "Hello")
except RateLimitError as err:
    print("Rate limited, retry after (ms):", err.retry_after_ms)
except (SessionError, AuthenticationError) as err:
    print("Re-authentication required:", err.message)
except ValidationError as err:
    print("Invalid input:", err.message)
except NotFoundError as err:
    print("Resource not found:", err.message)
except ZapindError as err:
    print("Zapind error:", err.code, err.message)
```

## Built-in Policies

- **Timeouts (`timeout=15.0`, `qr_timeout=180.0`):** Enforced with `asyncio.wait_for`.
- **Retries (`RetryOptions`):** Up to `3` attempts with exponential backoff for idempotent operations when `err.retryable` is `True`. Non-idempotent writes (`messages.send`, `media.upload`, `groups.create`, `groups.leave`) are never auto-retried.
- **Rate Limiter (`RateLimiter`):** Async token-bucket limiter defaulting to `5.0` req/s with burst `10` (disable with `rate_limit=False`).
- **RedactingLogger:** Redacts `cookie`, `imei`, `token`, `secret`, `password`, `auth`, `cipher`, `qr`, `content`, `message`, `msg`, and `text` to `[REDACTED]`.
