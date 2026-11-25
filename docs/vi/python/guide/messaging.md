# Tin nhắn & Media (Python)

Zapind Python tự động suy luận `ThreadType` (`ThreadType.USER` hoặc `ThreadType.GROUP`) dựa trên đối tượng ngữ cảnh hoặc bộ nhớ đệm `ThreadTypeRegistry`.

## Gửi tin nhắn văn bản & Payload thống nhất

```python
from zapind import SendMessagePayload, TextStyle, Urgency, Mention, MessageStyle

# Tự nhận diện nhóm hay cá nhân
await client.messages.send(user_id, "Xin chào!")
await client.messages.send(group_id, "Xin chào cả nhóm!")

# Payload thống nhất
await client.messages.send(
    group_id,
    SendMessagePayload(
        text="Báo cáo tuần đã sẵn sàng",
        reply_to=incoming_message,
        mentions=[Mention(user_id="123456", pos=0, length=7)],
        styles=[MessageStyle(start=0, length=7, style=TextStyle.BOLD)],
        urgency=Urgency.IMPORTANT,
        attachment="./report.pdf",
    ),
)
```

## Tương tác trực tiếp trên đối tượng ngữ cảnh

```python
from zapind import Reaction

user = await client.users.get(user_id)
if user:
    await user.send("Chào bạn!")

group = await client.groups.get(group_id)
await group.send("Thông báo mới!")
history = await group.get_messages(count=20)

msg = history.items[0]
await msg.reply("Đã nhận!")
await msg.react(Reaction.HEART)
await msg.mark_seen()
await msg.undo()
await msg.delete(only_me=True)
```

## Tải lên và gửi Media

```python
uploaded = await client.media.upload(group_id, "./document.pdf")
await client.media.send(group_id, "./document.pdf", caption="Tài liệu đính kèm")
```
