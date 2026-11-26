# Domain Services

Every `Zapind` instance exposes 9 domain namespaces.

## `client.account`

| Method | Parameters | Return Type |
|---|---|---|
| `getOwnId()` | — | `string` |
| `getMe()` | — | `Promise<Profile>` |
| `updateProfile(patch)` | `{ name: string; dob: \`${number}-${number}-${number}\`; gender: 'male' \| 'female' }` | `Promise<void>` |
| `updateBio(bio)` | `bio: string` | `Promise<void>` |
| `keepAlive()` | — | `Promise<{ configVersion: number }>` |

## `client.users`

Backed by `TTLCache` and concurrent in-flight request deduplication for `get()`.

| Method | Parameters | Return Type |
|---|---|---|
| `get(userId, options?)` | `userId: string`, `options?: { skipCache?: boolean }` | `Promise<User \| null>` |
| `getMany(userIds, options?)` | `userIds: readonly string[]`, `options?: { skipCache?: boolean }` | `Promise<Record<string, User>>` |
| `findByPhone(phoneNumber)` | `phoneNumber: string` | `Promise<User \| null>` |
| `findByUsername(username)` | `username: string` | `Promise<User \| null>` |
| `getLastOnline(userId)` | `userId: string` | `Promise<LastOnlineInfo>` |

## `client.contacts`

| Method | Parameters | Return Type |
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

Backed by `TTLCache`, in-flight deduplication, and automatic cache invalidation on mutations.

| Method | Parameters | Return Type |
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

| Method | Parameters | Return Type |
|---|---|---|
| `get(id, threadType?)` | `id: string`, `threadType?: ThreadType` | `Promise<Conversation>` |
| `getMessages(conversationId, options?)` | `conversationId: string`, `options?: number \| GetMessagesOptions` | `Promise<MessagePage>` |
| `requestOldMessages(threadType, lastMsgId?)` | `threadType: ThreadType`, `lastMsgId?: string \| null` | `void` |
| `getPinned()` | — | `Promise<PinnedConversations>` |
| `getUnread()` | — | `Promise<UnreadMarks>` |
| `pin(target, pinned?)` | `target: ThreadTarget`, `pinned?: boolean` | `Promise<void>` |
| `mute(target, durationSeconds)` | `target: ThreadTarget`, `durationSeconds: number` | `Promise<void>` |
| `sendTyping(target)` | `target: ThreadTarget` | `Promise<void>` |

::: info Conversation History Scope
`conversations.getMessages()` fetches cloud chat history for **group** conversations with cursor pagination (`{ count?, cursor?, isOld? }`). For 1-on-1 direct messages (and WebSocket backfill for groups), listen to `'old_messages'` and call `conversations.requestOldMessages(ThreadType.User)`.
:::

## `client.messages`

| Method | Parameters | Return Type |
|---|---|---|
| `send(target, content, explicitType?)` | `target: ThreadTarget`, `content: SendMessageContent`, `explicitType?: ThreadType` | `Promise<SendMessageReceipt>` |
| `reply(message, content)` | `message: Message`, `content: SendMessageContent` | `Promise<SendMessageReceipt>` |
| `react(message, reaction)` | `message: Message`, `reaction: Reaction \| string` | `Promise<void>` |
| `undo(message)` | `message: Message` | `Promise<void>` |
| `delete(message, onlyMe?)` | `message: Message`, `onlyMe?: boolean` | `Promise<void>` |
| `markSeen(messages)` | `messages: readonly Message[]` | `Promise<void>` |

## `client.media`

| Method | Parameters | Return Type |
|---|---|---|
| `upload(target, sources, explicitType?)` | `target: ThreadTarget`, `sources: MediaInput \| readonly MediaInput[]`, `explicitType?: ThreadType` | `Promise<UploadedMedia[]>` |
| `send(target, media, caption?)` | `target: ThreadTarget`, `media: MediaInput \| readonly MediaInput[]`, `caption?: string` | `Promise<SendMessageReceipt>` |

## `client.settings`

| Method | Parameters | Return Type |
|---|---|---|
| `get()` | — | `Promise<AccountSettings>` |
| `updateLanguage(lang)` | `lang: 'VI' \| 'EN'` | `Promise<void>` |

## `client.events`

Exposes `on`, `once`, `off`, `start`, `stop`, and `requestOldMessages` mirroring the top-level event methods and historical WebSocket sync on `Zapind`.
