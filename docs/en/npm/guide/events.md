# Realtime Events

Zapind includes a typed multi-listener `EventBus` with per-handler error isolation so a throwing callback never crashes the realtime connection.

## Starting and Stopping the Listener

```ts
const unsubscribe = client.on('message', async (message) => {
  console.log(message.sender.id, message.text, message.timestamp);
});

client.startListening({ retryOnClose: true });

// Unsubscribe a single handler
unsubscribe();

// Stop listening
client.stopListening();
```

You can also use the equivalent `client.events` namespace (`on`, `once`, `off`, `start`, `stop`, `requestOldMessages`). Stopping and restarting the listener safely detaches underlying socket callbacks to prevent duplicate handlers.

## Supported Events

| Event Name | Payload Type | Description |
|---|---|---|
| `message` | `Message` | Incoming message (self messages are filtered unless `selfListen: true`). |
| `old_messages` | `OldMessagesEvent` | Historical message batch delivered over WebSocket after calling `conversations.requestOldMessages()` or `events.requestOldMessages()`. |
| `reaction` | `ReactionEvent` | Reaction added to a message. |
| `group.update` | `GroupUpdateEvent` | Group membership or metadata change (automatically invalidates group cache). |
| `user.update` | `UserUpdateEvent` | Friend or user update (automatically invalidates user cache). |
| `typing` | `TypingEvent` | Typing indicator from another participant. |
| `seen` | `SeenEvent` | Message read receipt event. |
| `undo` | `UndoEvent` | Message recall/undo event. |
| `auth.required` | `AuthRequiredEvent` | Emitted when no session exists or the socket closes with `KickConnection (3003)` / `DuplicateConnection (3000)`. |
| `connected` | `ConnectionEvent` | Realtime socket connected. |
| `disconnected` | `ConnectionEvent` | Realtime socket closed with `code` and `reason`. |
| `error` | `ZapindError` | Error emitted by the realtime listener. |

## Syncing Historical Messages Over WebSocket

```ts
import { ThreadType } from 'zapind';

client.on('old_messages', ({ messages, threadType }) => {
  console.log(`Synced ${messages.length} messages for threadType=${threadType}`);
});

client.on('connected', () => {
  client.conversations.requestOldMessages(ThreadType.User);
  client.conversations.requestOldMessages(ThreadType.Group);
});
```

## Listening to Multiple Events

```ts
client.on('reaction', (evt) => {
  console.log('Reaction:', evt.icon, 'from', evt.senderId);
});

client.on('group.update', (evt) => {
  console.log('Group updated:', evt.groupId, evt.type);
});

client.on('auth.required', ({ reason, error }) => {
  console.warn('Re-authentication required:', reason, error?.message);
});

client.on('error', (err) => {
  console.error('Listener error:', err.code, err.message);
});
```
