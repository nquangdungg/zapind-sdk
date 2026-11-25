# Models & Kiểu dữ liệu (Python)

## Các lớp thực thể có ngữ cảnh

### `User`
Thuộc tính: `id`, `display_name`, `zalo_name`, `avatar_url`, `username`, `cover_url`, `gender`, `birthday`, `status_message`, `phone_number`, `is_friend`, `is_blocked`, `last_active_at`, `thread_type` (`ThreadType.USER`).

Phương thức: `await send(content)`, `await send_friend_request(message)`, `await block()`, `await unblock()`.

### `Profile` *(kế thừa `User`)*
Thuộc tính bổ sung: `global_id`, `is_business`, `created_at`.

### `Contact` *(kế thừa `User`)*
Thuộc tính bổ sung: `alias`. Phương thức: `await set_alias(alias)`, `await remove()`.

### `Group`
Thuộc tính: `id`, `name`, `description`, `type`, `creator_id`, `avatar_url`, `full_avatar_url`, `member_count`, `max_members`, `member_ids`, `admin_ids`, `is_e2ee`, `created_at`, `settings`, `thread_type` (`ThreadType.GROUP`).

Phương thức: `await send(content)`, `await get_messages(count?)`, `await add_members(user_ids)`, `await remove_members(user_ids)`, `await rename(name)`, `await leave()`.

### `Conversation`
Thuộc tính: `id`, `thread_type`, `is_group`.

Phương thức: `await send(content)`, `await get_messages(count?)`, `await send_typing()`, `await pin(pinned=True)`, `await mute(duration_seconds)`.

### `Message`
Thuộc tính: `id`, `client_msg_id`, `thread_id`, `thread_type`, `is_group`, `sender`, `recipient_id`, `is_self`, `msg_type`, `text`, `attachments`, `mentions`, `reply_to`, `timestamp` (`datetime`), `ttl_ms`, `conversation`.

Phương thức: `await reply(content)`, `await react(reaction)`, `await undo()`, `await delete(only_me=True)`, `await mark_seen()`.

## Enums & Dataclasses

- **Enums:** `ThreadType`, `ClientStatus`, `Gender`, `GroupType`, `CloseReason`, `TextStyle`, `Urgency`, `Reaction`.
- **Dataclasses (`frozen=True`):** `SessionCredentials`, `SessionInfo`, `StoredSessionRecord`, `QRCodeData`, `QRScannedData`, `MediaBuffer`, `UploadedMedia`, `Attachment`, `Mention`, `MessageStyle`, `MessageQuote`, `SendMessagePayload`, `SendMessageReceipt`, `MessageSenderRef`, `MessagePage`, `GroupSummary`, `GroupSettings`, `GroupMember`, `OnlineStatus`, `LastOnlineInfo`, `AccountSettings`, `PinnedConversations`, `UnreadMark`, `UnreadMarks`, và các lớp sự kiện (`ConnectionEvent`, `ReactionEvent`, `TypingEvent`, `SeenEvent`, `UndoEvent`, `GroupUpdateEvent`, `UserUpdateEvent`, `AuthRequiredEvent`).
