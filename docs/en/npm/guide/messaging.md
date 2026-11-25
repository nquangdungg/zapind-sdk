# Messaging & Media

Zapind simplifies messaging through **automatic `ThreadType` resolution** and a **unified send payload**.

## Automatic `ThreadType` Resolution

In most cases you do not need to pass `ThreadType.User` or `ThreadType.Group`:

1. Contextual models (`user.send()`, `group.send()`, `conversation.send()`, `message.reply()`) already carry their `threadType`.
2. When passing a string ID, Zapind checks its cached Group ID registry (lazily populated from `groups.list()` and updated by incoming events). Unknown IDs default to `ThreadType.User`.
3. You can still pass an explicit `ThreadType` override as the third argument or inside the payload whenever needed.

```ts
// Automatically resolves DM vs Group
await client.messages.send(userId, 'Hello!');
await client.messages.send(groupId, 'Hello group!');

// Or call directly on a contextual model
const group = await client.groups.get(groupId);
await group.send('System announcement.');
```

## Unified Rich Payload

`client.messages.send()` accepts either a plain string or a typed `SendMessagePayload`:

```ts
import { TextStyle, Urgency } from 'zapind';

await client.messages.send(groupId, {
  text: 'Weekly report is ready',
  replyTo: incomingMessage,
  mentions: [{ userId: '123456789', pos: 0, len: 6 }],
  styles: [{ start: 0, len: 6, style: TextStyle.Bold }],
  urgency: Urgency.Important,
  attachment: './report.pdf',
  ttlMs: 0,
});
```

### Links, Stickers, Voice, and Video

Use the same `client.messages.send()` method for specialized message types:

```ts
// Link
await client.messages.send(groupId, {
  link: { url: 'https://github.com/nquangdungg/zapind' },
});

// Sticker
await client.messages.send(groupId, {
  sticker: { id: 123, cateId: 1, type: 1 },
});

// Voice
await client.messages.send(groupId, {
  voice: { voiceUrl: 'https://example.com/audio.aac' },
});

// Video
await client.messages.send(groupId, {
  video: {
    videoUrl: 'https://example.com/clip.mp4',
    thumbnailUrl: 'https://example.com/thumb.jpg',
    duration: 15000,
  },
});
```

## Replying, Reacting, Undoing & Deleting

```ts
import { Reaction } from 'zapind';

await message.reply('Got it!');
await message.react(Reaction.Heart);
await message.markSeen();
await message.undo();
await message.delete(true); // onlyMe = true
```

## Uploading and Sending Media

```ts
// Upload and inspect uploaded media metadata
const uploaded = await client.media.upload(groupId, './document.pdf');

// Send media directly with an optional caption
await client.media.send(groupId, './document.pdf', 'Attached document');
```

::: tip Uploading Local Images by Path
When uploading local image files by path, provide `imageMetadataGetter` in `new Zapind({ imageMetadataGetter })`, or pass a `Buffer` with `{ data, filename, width, height }`.
:::
