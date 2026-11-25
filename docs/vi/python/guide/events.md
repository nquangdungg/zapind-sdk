# Sự kiện thời gian thực (Python)

Zapind hỗ trợ đăng ký listener theo cả hai phong cách: hàm `client.on(event, handler)` và decorator `@client.on(event)`.

## Đăng ký và quản lý listener

```python
@client.on("message")
async def handle_message(message):
    print(message.sender.id, message.text, message.timestamp)

unsubscribe = client.on("reaction", lambda evt: print("Reaction:", evt.icon))

await client.start_listening(retry_on_close=True)

# Hủy listener hoặc dừng lắng nghe
unsubscribe()
await client.stop_listening()
```

## Danh sách sự kiện hỗ trợ

| Sự kiện | Kiểu payload | Mô tả |
|---|---|---|
| `message` | `Message` | Tin nhắn mới nhận được (bỏ qua tin tự gửi trừ khi `self_listen=True`). |
| `reaction` | `ReactionEvent` | Cảm xúc mới trên tin nhắn. |
| `group.update` | `GroupUpdateEvent` | Sự kiện thay đổi nhóm (tự xóa cache nhóm liên quan). |
| `user.update` | `UserUpdateEvent` | Sự kiện người dùng/bạn bè (tự xóa cache user liên quan). |
| `typing` | `TypingEvent` | Trạng thái đang nhập. |
| `seen` | `SeenEvent` | Sự kiện đã xem tin nhắn. |
| `undo` | `UndoEvent` | Sự kiện thu hồi tin nhắn. |
| `auth.required` | `AuthRequiredEvent` | Phát khi chưa có phiên hoặc phiên bị ngắt (`KickConnection` / `DuplicateConnection`). |
| `connected` | `ConnectionEvent` | Đã kết nối listener. |
| `disconnected` | `ConnectionEvent` | Đã ngắt kết nối kèm `code` và `reason`. |
| `error` | `ZapindError` | Lỗi từ tầng lắng nghe thời gian thực. |
