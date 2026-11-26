# Sự kiện thời gian thực

Zapind cung cấp bộ phát sự kiện có kiểu chặt chẽ (`EventBus`), cho phép đăng ký nhiều listener cùng lúc và cô lập lỗi giữa các handler để một handler gặp sự cố không làm gián đoạn kết nối WebSocket.

## Khởi động và dừng lắng nghe

```ts
const unsubscribe = client.on('message', async (message) => {
  console.log(message.sender.id, message.text, message.timestamp);
});

client.startListening({ retryOnClose: true });

// Hủy đăng ký 1 listener cụ thể
unsubscribe();

// Dừng kết nối lắng nghe
client.stopListening();
```

Bạn cũng có thể truy cập các hàm tương đương qua `client.events.on()`, `client.events.once()`, `client.events.off()`, `client.events.start()`, `client.events.stop()` và `client.events.requestOldMessages()`. Khi gọi `stopListening()` và khởi động lại, SDK tự gỡ sạch các callback WebSocket cũ để tránh lặp sự kiện.

## Danh sách sự kiện được hỗ trợ

| Tên sự kiện | Kiểu payload | Mô tả |
|---|---|---|
| `message` | `Message` | Tin nhắn mới nhận được (mặc định bỏ qua tin tự gửi trừ khi bật `selfListen: true`). |
| `old_messages` | `OldMessagesEvent` | Lô tin nhắn cũ được đồng bộ qua WebSocket sau khi gọi `conversations.requestOldMessages()` hoặc `events.requestOldMessages()`. |
| `reaction` | `ReactionEvent` | Cảm xúc mới được thả vào tin nhắn. |
| `group.update` | `GroupUpdateEvent` | Sự kiện thay đổi trong nhóm (tự động xóa cache nhóm liên quan). |
| `user.update` | `UserUpdateEvent` | Sự kiện liên quan đến bạn bè/người dùng (tự động xóa cache user liên quan). |
| `typing` | `TypingEvent` | Trạng thái đang nhập của người dùng khác. |
| `seen` | `SeenEvent` | Sự kiện đã xem tin nhắn. |
| `undo` | `UndoEvent` | Sự kiện thu hồi tin nhắn. |
| `auth.required` | `AuthRequiredEvent` | Phát ra khi chưa có phiên hoặc kết nối bị đóng do `KickConnection (3003)` / `DuplicateConnection (3000)`. |
| `connected` | `ConnectionEvent` | Kết nối WebSocket đã mở. |
| `disconnected` | `ConnectionEvent` | Kết nối WebSocket đã đóng kèm `code` và `reason`. |
| `error` | `ZapindError` | Lỗi phát sinh từ luồng lắng nghe thời gian thực. |

## Đồng bộ lịch sử tin nhắn qua WebSocket

```ts
import { ThreadType } from 'zapind';

client.on('old_messages', ({ messages, threadType }) => {
  console.log(`Đã đồng bộ ${messages.length} tin nhắn cho threadType=${threadType}`);
});

client.on('connected', () => {
  client.conversations.requestOldMessages(ThreadType.User);
  client.conversations.requestOldMessages(ThreadType.Group);
});
```

## Ví dụ xử lý nhiều sự kiện

```ts
client.on('reaction', (evt) => {
  console.log('Reaction:', evt.icon, 'từ', evt.senderId);
});

client.on('group.update', (evt) => {
  console.log('Cập nhật nhóm:', evt.groupId, evt.type);
});

client.on('auth.required', ({ reason, error }) => {
  console.warn('Cần đăng nhập lại:', reason, error?.message);
});

client.on('error', (err) => {
  console.error('Lỗi listener:', err.code, err.message);
});
```
