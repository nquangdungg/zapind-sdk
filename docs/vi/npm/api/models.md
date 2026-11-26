# Models & Kiểu dữ liệu

Các thực thể chính trong Zapind được thiết kế kèm theo phương thức hành động theo ngữ cảnh để giảm tham số lặp lại.

## Các lớp thực thể có ngữ cảnh

### `User`
Thuộc tính: `id`, `username?`, `displayName`, `zaloName`, `avatarUrl`, `coverUrl?`, `gender`, `birthday?`, `statusMessage?`, `phoneNumber?`, `isFriend`, `isBlocked`, `lastActiveAt?`, `threadType` (`ThreadType.User`).

Phương thức:
- `user.send(content: SendMessageContent): Promise<SendMessageReceipt>`
- `user.sendFriendRequest(message?: string): Promise<void>`
- `user.block(): Promise<void>`
- `user.unblock(): Promise<void>`

### `Profile` *(kế thừa `User`)*
Thuộc tính bổ sung: `globalId?`, `isBusiness`, `createdAt?`.

### `Contact` *(kế thừa `User`)*
Thuộc tính bổ sung: `alias?`.

Phương thức bổ sung:
- `contact.setAlias(alias: string): Promise<void>`
- `contact.remove(): Promise<void>`

### `Group`
Thuộc tính: `id`, `name`, `description`, `type` (`GroupType`), `creatorId`, `avatarUrl`, `fullAvatarUrl?`, `memberCount`, `maxMembers`, `memberIds`, `adminIds`, `isE2EE`, `createdAt?`, `settings?`, `threadType` (`ThreadType.Group`).

Phương thức:
- `group.send(content: SendMessageContent): Promise<SendMessageReceipt>`
- `group.getMessages(options?: number | GetMessagesOptions): Promise<MessagePage>`
- `group.addMembers(userIds: readonly string[]): Promise<void>`
- `group.removeMembers(userIds: readonly string[]): Promise<void>`
- `group.rename(name: string): Promise<void>`
- `group.leave(): Promise<void>`

### `Conversation`
Thuộc tính: `id`, `threadType`, `isGroup`.

Phương thức:
- `conversation.send(content: SendMessageContent): Promise<SendMessageReceipt>`
- `conversation.getMessages(options?: number | GetMessagesOptions): Promise<MessagePage>` *(chỉ hỗ trợ hội thoại nhóm; ném `ValidationError` với `ThreadType.User` — dùng `'old_messages'` + `conversations.requestOldMessages(ThreadType.User)` cho DM)*
- `conversation.sendTyping(): Promise<void>`
- `conversation.pin(pinned?: boolean): Promise<void>`
- `conversation.mute(durationSeconds: number): Promise<void>`

### `Message`
Thuộc tính: `id`, `clientMsgId`, `threadId`, `threadType`, `isGroup`, `sender` (`{ id, name? }`), `recipientId`, `isSelf`, `msgType`, `text`, `attachments`, `mentions`, `replyTo?` (`MessageQuote`, gồm cả `senderName?`), `timestamp` (`Date`), `ttlMs`, `conversation` (`Conversation`).

Phương thức:
- `message.reply(content: SendMessageContent): Promise<SendMessageReceipt>`
- `message.react(reaction: Reaction | string): Promise<void>`
- `message.undo(): Promise<void>`
- `message.delete(onlyMe?: boolean): Promise<void>`
- `message.markSeen(): Promise<void>`

### `MessagePage` & `GetMessagesOptions`
- `GetMessagesOptions`: `{ count?: number; cursor?: string | null; isOld?: boolean }`
- `MessagePage`: `{ items: readonly Message[]; hasMore: boolean; nextCursor: string | null; isOld?: boolean }`

## Enums được xuất công khai

| Enum | Các giá trị |
|---|---|
| `ThreadType` | `User = 0`, `Group = 1` |
| `ClientStatus` | `Idle`, `Starting`, `QRPending`, `Scanned`, `Connected`, `Error` |
| `Gender` | `Male`, `Female`, `Unknown` |
| `GroupType` | `Group`, `Community` |
| `CloseReason` | `ManualClosure = 1000`, `AbnormalClosure = 1006`, `DuplicateConnection = 3000`, `KickConnection = 3003` |
| `TextStyle` | `Bold`, `Italic`, `Underline`, `StrikeThrough`, `Red`, `Orange`, `Yellow`, `Green`, `Small`, `Big`, `UnorderedList`, `OrderedList`, `Indent` |
| `Urgency` | `Default = 0`, `Important = 1`, `Urgent = 2` |
| `Reaction` | `Heart`, `Like`, `Haha`, `Wow`, `Cry`, `Angry`, `None` |
