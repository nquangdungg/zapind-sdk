# API Overview (Python)

## Constructor `Zapind(...)`

```python
from zapind import Zapind, FileSessionStore, RetryOptions, RateLimiter

client = Zapind(
    session=FileSessionStore("./session.json"),
    timeout=15.0,
    qr_timeout=180.0,
    retry=RetryOptions(max_attempts=3, base_delay=0.3, max_delay=5.0),
    rate_limit=RateLimiter(max_requests_per_second=5.0, burst=10),
    cache_ttl=60.0,
    max_cache_entries=500,
    debug=False,
    self_listen=False,
    language="vi",
)
```

### Constructor Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `session` | `str \| Path \| SessionStore \| None` | `MemorySessionStore` | JSON file path or custom `SessionStore`. |
| `timeout` | `float` | `15.0` | Request timeout in seconds. |
| `qr_timeout` | `float` | `180.0` | QR login timeout in seconds. |
| `retry` | `RetryOptions \| None` | `RetryOptions()` | Retry policy for idempotent operations. |
| `rate_limit` | `RateLimiter \| bool` | `True` (`5 req/s`, burst `10`) | Rate limiter toggle or custom instance. |
| `cache_ttl` | `float` | `60.0` | TTL (seconds) for user/group caches. |
| `max_cache_entries` | `int` | `500` | Maximum entries stored in `TTLCache`. |
| `logger` | `logging.Logger \| None` | `logging.getLogger("zapind")` | Standard Python logger wrapped by `RedactingLogger`. |
| `debug` | `bool` | `False` | Enable debug logging. |
| `self_listen` | `bool` | `False` | Emit events sent by the logged-in account itself. |
| `user_agent` | `str` | `DEFAULT_USER_AGENT` | User-Agent string. |
| `language` | `str` | `"vi"` | Default session language. |
| `transport` | `TransportAdapter \| None` | `NodeBridgeTransport()` | Pluggable transport (supports `MockTransport` for tests). |

## Top-Level Methods

| Method | Return Type | Description |
|---|---|---|
| `await login(...)` | `SessionInfo` | Restores saved session or runs QR login. |
| `await logout(clear_session=True)` | `None` | Disconnects, clears caches, and optionally clears local session store. |
| `get_status()` | `ClientStatus` | Current lifecycle status. |
| `get_session()` | `SessionInfo \| None` | Safe session metadata. |
| `is_authenticated()` | `bool` | Whether the client is authenticated and connected. |
| `on(event, handler?)` | `UnsubscribeFn \| Decorator` | Register event listener directly or as decorator. |
| `once(event, handler)` | `UnsubscribeFn` | Register one-time listener. |
| `off(event, handler)` | `None` | Remove listener. |
| `await start_listening(retry_on_close=False)` | `None` | Start listening for realtime events. |
| `await stop_listening()` | `None` | Stop listening for realtime events. |
