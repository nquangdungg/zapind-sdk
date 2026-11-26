# Domain Services

Mỗi thực thể `Zapind` cung cấp 9 không gian tên theo miền nghiệp vụ.

## `client.account`

| Phương thức | Tham số | Giá trị trả về |
|---|---|---|
| `getOwnId()` | — | `string` |
| `getMe()` | — | `Promise<Profile>` |
| `updateProfile(patch)` | `{ name: string; dob: \`${number}-${number}-${number}\`; gender: 'male' \| 'female' }` | `Promise<void>` |
| `updateBio(bio)` | `bio: string` | `Promise<void>` |
| `keepAlive()` | — | `Promise<{ configVersion: number }>` |

## `client.users`

Tích hợp `TTLCache` và gộp yêu cầu đồng thời cho `get()`.

| Phương thức | Tham số | Giá trị trả về |
|---|---|---|
| `get(userId, options?)` | `userId: string`, `options?: { skipCache?: boolean }` | `Promise<User \| null>` |
| `getMany(userIds, options?)` | `userIds: readonly string[]`, `options?: { skipCache?: boolean }` | `Promise<Record<string, User>>` |
| `findByPhone(phoneNumber)` | `phoneNumber: string` | `Promise<User \| null>` |
| `findByUsername(username)` | `username: string` | `Promise<User \| null>` |
| `getLastOnline(userId)` | `userId: string` | `Promise<LastOnlineInfo>` |

## `client.contacts`

| Phương thức | Tham số | Giá trị trả về |
|---|---|---|
| `list(options?)` | `{ count?: number; page?: number }` | `Promise<Contact[]>` |
| `sendRequest(userId, message?)` | `userId: string`, `message?: string` | `Promise<void>` |
| `acceptRequest(userId)` | `userId: string` | `Promise<void>` |
| `rejectRequest(userId)` | `userId: string` | `Promise<void>` |
| `remove(userId)` | `userId: string` | `Promise<void>` |
| `block(userId)` | `userId: string` | `Promise<void>` |
| `unblock(userId)` | `userId: string` | `Promise<void>` |
| `setAlias(userId, alias)` | `userId: string`, `alias: string` | `Promise<void>` |
| `getOnline()` | — | `Promise<OnlineStatus[]>` |

## `client.groups`

Tích hợp `TTLCache`, gộp yêu cầu đồng thời và tự động vô hiệu hóa cache khi nhóm thay đổi.

| Phương thức | Tham số | Giá trị trả về |
|---|---|---|
| `list()` | — | `Promise<GroupSummary[]>` |
| `get(groupId, options?)` | `groupId: string`, `options?: { skipCache?: boolean }` | `Promise<Group>` |
| `getMany(groupIds, options?)` | `groupIds: readonly string[]`, `options?: { skipCache?: boolean }` | `Promise<Record<string, Group>>` |
| `create(options)` | `{ name?: string; members: readonly string[] }` | `Promise<Group>` |
| `getMembers(memberIds)` | `memberIds: readonly string[]` | `Promise<GroupMember[]>` |
| `addMembers(groupId, userIds)` | `groupId: string`, `userIds: readonly string[]` | `Promise<void>` |
| `removeMembers(groupId, userIds)` | `groupId: string`, `userIds: readonly string[]` | `Promise<void>` |
| `rename(groupId, name)` | `groupId: string`, `name: string` | `Promise<void>` |
| `leave(groupId)` | `groupId: string` | `Promise<void>` |

## `client.conversations`

| Phương thức | Tham số | Giá trị trả về |
|---|---|---|
| `get(id, threadType?)` | `id: string`, `threadType?: ThreadType` | `Promise<Conversation>` |
| `getMessages(conversationId, options?)` | `conversationId: string`, `options?: number \| GetMessagesOptions` | `Promise<MessagePage>` |
| `requestOldMessages(threadType, lastMsgId?)` | `threadType: ThreadType`, `lastMsgId?: string \| null` | `void` |
| `getPinned()` | — | `Promise<PinnedConversations>` |
| `getUnread()` | — | `Promise<UnreadMarks>` |
| `pin(target, pinned?)` | `target: ThreadTarget`, `pinned?: boolean` | `Promise<void>` |
| `mute(target, durationSeconds)` | `target: ThreadTarget`, `durationSeconds: number` | `Promise<void>` |
| `sendTyping(target)` | `target: ThreadTarget` | `Promise<void>` |

::: info Phạm vi lịch sử hội thoại
`conversations.getMessages()` tải lịch sử tin nhắn đám mây cho **hội thoại nhóm** kèm phân trang theo cursor (`{ count?, cursor?, isOld? }`). Với tin nhắn cá nhân 1-1 (hoặc đồng bộ bổ sung cho nhóm), hãy lắng nghe sự kiện `'old_messages'` và gọi `conversations.requestOldMessages(ThreadType.User)`.
:::

## `client.messages`

| Phương thức | Tham số | Giá trị trả về |
|---|---|---|
| `send(target, content, explicitType?)` | `target: ThreadTarget`, `content: SendMessageContent`, `explicitType?: ThreadType` | `Promise<SendMessageReceipt>` |
| `reply(message, content)` | `message: Message`, `content: SendMessageContent` | `Promise<SendMessageReceipt>` |
| `react(message, reaction)` | `message: Message`, `reaction: Reaction \| string` | `Promise<void>` |
| `undo(message)` | `message: Message` | `Promise<void>` |
| `delete(message, onlyMe?)` | `message: Message`, `onlyMe?: boolean` | `Promise<void>` |
| `markSeen(messages)` | `messages: readonly Message[]` | `Promise<void>` |

## `client.media`

| Phương thức | Tham số | Giá trị trả về |
|---|---|---|
| `upload(target, sources, explicitType?)` | `target: ThreadTarget`, `sources: MediaInput \| readonly MediaInput[]`, `explicitType?: ThreadType` | `Promise<UploadedMedia[]>` |
| `send(target, media, caption?)` | `target: ThreadTarget`, `media: MediaInput \| readonly MediaInput[]`, `caption?: string` | `Promise<SendMessageReceipt>` |

## `client.settings`

| Phương thức | Tham số | Giá trị trả về |
|---|---|---|
| `get()` | — | `Promise<AccountSettings>` |
| `updateLanguage(lang)` | `lang: 'VI' \| 'EN'` | `Promise<void>` |

## `client.events`

Cung cấp `on`, `once`, `off`, `start`, `stop` và `requestOldMessages` tương ứng với các phương thức sự kiện và đồng bộ tin nhắn cũ qua WebSocket trên `Zapind`.
