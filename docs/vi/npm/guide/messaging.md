# Tin nhắn & Media

Zapind đơn giản hóa việc gửi tin nhắn bằng cơ chế **tự động xác định loại hội thoại (`ThreadType`)** và **payload thống nhất**.

## Tự động xác định `ThreadType`

Bạn không cần truyền `ThreadType.User` hay `ThreadType.Group` ở hầu hết trường hợp:

1. Khi gửi qua đối tượng có ngữ cảnh (`user.send()`, `group.send()`, `conversation.send()`, `message.reply()`), loại hội thoại được xác định ngay lập tức từ ngữ cảnh.
2. Khi gửi bằng chuỗi `threadId`, Zapind kiểm tra bộ nhớ đệm danh sách nhóm (tự động cập nhật từ `groups.list()` và các sự kiện đến). Nếu không thuộc danh sách nhóm, SDK mặc định gửi dạng tin nhắn cá nhân (`ThreadType.User`).
3. Bạn vẫn có thể chỉ định tường minh `ThreadType` ở tham số thứ ba hoặc trong payload khi cần.

```ts
// Tự nhận diện nhóm hay cá nhân
await client.messages.send(userId, 'Xin chào!');
await client.messages.send(groupId, 'Xin chào cả nhóm!');

// Hoặc gọi trực tiếp trên đối tượng
const group = await client.groups.get(groupId);
await group.send('Thông báo mới từ hệ thống.');
```

## Gửi tin nhắn nâng cao với payload thống nhất

`client.messages.send()` hỗ trợ cả chuỗi thuần lẫn đối tượng `SendMessagePayload`:

```ts
import { TextStyle, Urgency } from 'zapind';

await client.messages.send(groupId, {
  text: 'Báo cáo tuần đã sẵn sàng',
  replyTo: incomingMessage,
  mentions: [{ userId: '123456789', pos: 0, len: 7 }],
  styles: [{ start: 0, len: 7, style: TextStyle.Bold }],
  urgency: Urgency.Important,
  attachment: './report.pdf',
  ttlMs: 0,
});
```

### Gửi liên kết, sticker, thoại và video

Cùng một phương thức `client.messages.send()` tự điều hướng theo loại nội dung:

```ts
// Liên kết
await client.messages.send(groupId, {
  link: { url: 'https://github.com/nquangdungg/zapind' },
});

// Sticker
await client.messages.send(groupId, {
  sticker: { id: 123, cateId: 1, type: 1 },
});

// Tin nhắn thoại
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

## Phản hồi, cảm xúc, thu hồi & xóa tin nhắn

```ts
import { Reaction } from 'zapind';

await message.reply('Đã nhận được tin nhắn!');
await message.react(Reaction.Heart);
await message.markSeen();
await message.undo();
await message.delete(true); // onlyMe = true
```

## Tải lên và gửi tệp qua `client.media`

```ts
// Tải lên tệp và nhận thông tin media đã tải
const uploaded = await client.media.upload(groupId, './document.pdf');

// Gửi tệp trực tiếp kèm chú thích
await client.media.send(groupId, './document.pdf', 'Tài liệu đính kèm');
```

::: tip Lưu ý khi tải lên ảnh từ đường dẫn tệp
Khi tải lên ảnh bằng đường dẫn tệp cục bộ, bạn cần truyền hàm `imageMetadataGetter` trong `new Zapind({ imageMetadataGetter })`, hoặc truyền đối tượng `Buffer` kèm sẵn `{ data, filename, width, height }`.
:::
