# Messaging & Media (Python)

Zapind Python automatically resolves `ThreadType` (`ThreadType.USER` or `ThreadType.GROUP`) using contextual models and a cached `ThreadTypeRegistry`.

## Sending Text & Unified Payloads

```python
from zapind import SendMessagePayload, TextStyle, Urgency, Mention, MessageStyle

# Auto-resolves DM vs Group
await client.messages.send(user_id, "Hello!")
await client.messages.send(group_id, "Hello group!")

# Unified rich payload
await client.messages.send(
    group_id,
    SendMessagePayload(
        text="Weekly report is ready",
        reply_to=incoming_message,
        mentions=[Mention(user_id="123456", pos=0, length=6)],
        styles=[MessageStyle(start=0, length=6, style=TextStyle.BOLD)],
        urgency=Urgency.IMPORTANT,
        attachment="./report.pdf",
    ),
)
```

## Contextual Model Actions

```python
from zapind import Reaction

user = await client.users.get(user_id)
if user:
    await user.send("Hi there!")

group = await client.groups.get(group_id)
await group.send("Announcement!")
history = await group.get_messages(count=20)

msg = history.items[0]
await msg.reply("Got it!")
await msg.react(Reaction.HEART)
await msg.mark_seen()
await msg.undo()
await msg.delete(only_me=True)
```

## Uploading and Sending Media

```python
uploaded = await client.media.upload(group_id, "./document.pdf")
await client.media.send(group_id, "./document.pdf", caption="Attached document")
```
