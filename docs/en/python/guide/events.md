# Realtime Events (Python)

Zapind supports registering listeners both via `client.on(event, handler)` and via the `@client.on(event)` decorator.

## Registering & Managing Listeners

```python
@client.on("message")
async def handle_message(message):
    print(message.sender.id, message.text, message.timestamp)

unsubscribe = client.on("reaction", lambda evt: print("Reaction:", evt.icon))

await client.start_listening(retry_on_close=True)

# Unsubscribe or stop listening
unsubscribe()
await client.stop_listening()
```

## Supported Events

| Event | Payload Type | Description |
|---|---|---|
| `message` | `Message` | Incoming message (self messages filtered unless `self_listen=True`). |
| `reaction` | `ReactionEvent` | Reaction added to a message. |
| `group.update` | `GroupUpdateEvent` | Group update event (automatically invalidates group cache). |
| `user.update` | `UserUpdateEvent` | Friend/user update event (automatically invalidates user cache). |
| `typing` | `TypingEvent` | Typing indicator. |
| `seen` | `SeenEvent` | Read receipt event. |
| `undo` | `UndoEvent` | Message recall event. |
| `auth.required` | `AuthRequiredEvent` | Emitted when no session exists or connection closes with `KickConnection` / `DuplicateConnection`. |
| `connected` | `ConnectionEvent` | Listener connected. |
| `disconnected` | `ConnectionEvent` | Listener closed with `code` and `reason`. |
| `error` | `ZapindError` | Realtime listener error. |
