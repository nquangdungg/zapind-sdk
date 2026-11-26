# Models & Types

Core entities in Zapind carry contextual action methods so you do not have to pass IDs and `ThreadType` repeatedly.

## Contextual Entity Classes

### `User`
Properties: `id`, `username?`, `displayName`, `zaloName`, `avatarUrl`, `coverUrl?`, `gender`, `birthday?`, `statusMessage?`, `phoneNumber?`, `isFriend`, `isBlocked`, `lastActiveAt?`, `threadType` (`ThreadType.User`).

Methods:
- `user.send(content: SendMessageContent): Promise<SendMessageReceipt>`
- `user.sendFriendRequest(message?: string): Promise<void>`
- `user.block(): Promise<void>`
- `user.unblock(): Promise<void>`

### `Profile` *(extends `User`)*
Additional properties: `globalId?`, `isBusiness`, `createdAt?`.

### `Contact` *(extends `User`)*
Additional properties: `alias?`.

Additional methods:
- `contact.setAlias(alias: string): Promise<void>`
- `contact.remove(): Promise<void>`

### `Group`
Properties: `id`, `name`, `description`, `type` (`GroupType`), `creatorId`, `avatarUrl`, `fullAvatarUrl?`, `memberCount`, `maxMembers`, `memberIds`, `adminIds`, `isE2EE`, `createdAt?`, `settings?`, `threadType` (`ThreadType.Group`).

Methods:
- `group.send(content: SendMessageContent): Promise<SendMessageReceipt>`
- `group.getMessages(options?: number | GetMessagesOptions): Promise<MessagePage>`
- `group.addMembers(userIds: readonly string[]): Promise<void>`
- `group.removeMembers(userIds: readonly string[]): Promise<void>`
- `group.rename(name: string): Promise<void>`
- `group.leave(): Promise<void>`

### `Conversation`
Properties: `id`, `threadType`, `isGroup`.

Methods:
- `conversation.send(content: SendMessageContent): Promise<SendMessageReceipt>`
- `conversation.getMessages(options?: number | GetMessagesOptions): Promise<MessagePage>` *(group conversations only; throws `ValidationError` for `ThreadType.User` — use `'old_messages'` + `conversations.requestOldMessages(ThreadType.User)` for DMs)*
- `conversation.sendTyping(): Promise<void>`
- `conversation.pin(pinned?: boolean): Promise<void>`
- `conversation.mute(durationSeconds: number): Promise<void>`

### `Message`
Properties: `id`, `clientMsgId`, `threadId`, `threadType`, `isGroup`, `sender` (`{ id, name? }`), `recipientId`, `isSelf`, `msgType`, `text`, `attachments`, `mentions`, `replyTo?` (`MessageQuote`, including optional `senderName?`), `timestamp` (`Date`), `ttlMs`, `conversation` (`Conversation`).

Methods:
- `message.reply(content: SendMessageContent): Promise<SendMessageReceipt>`
- `message.react(reaction: Reaction | string): Promise<void>`
- `message.undo(): Promise<void>`
- `message.delete(onlyMe?: boolean): Promise<void>`
- `message.markSeen(): Promise<void>`

### `MessagePage` & `GetMessagesOptions`
- `GetMessagesOptions`: `{ count?: number; cursor?: string | null; isOld?: boolean }`
- `MessagePage`: `{ items: readonly Message[]; hasMore: boolean; nextCursor: string | null; isOld?: boolean }`

## Exported Enums

| Enum | Values |
|---|---|
| `ThreadType` | `User = 0`, `Group = 1` |
| `ClientStatus` | `Idle`, `Starting`, `QRPending`, `Scanned`, `Connected`, `Error` |
| `Gender` | `Male`, `Female`, `Unknown` |
| `GroupType` | `Group`, `Community` |
| `CloseReason` | `ManualClosure = 1000`, `AbnormalClosure = 1006`, `DuplicateConnection = 3000`, `KickConnection = 3003` |
| `TextStyle` | `Bold`, `Italic`, `Underline`, `StrikeThrough`, `Red`, `Orange`, `Yellow`, `Green`, `Small`, `Big`, `UnorderedList`, `OrderedList`, `Indent` |
| `Urgency` | `Default = 0`, `Important = 1`, `Urgent = 2` |
| `Reaction` | `Heart`, `Like`, `Haha`, `Wow`, `Cry`, `Angry`, `None` |
