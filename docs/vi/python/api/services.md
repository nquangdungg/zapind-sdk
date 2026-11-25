# Domain Services (Python)

Mỗi thực thể `Zapind` cung cấp 9 dịch vụ theo miền bằng `snake_case`.

## `client.account`
- `get_own_id() -> str`
- `await get_me() -> Profile`
- `await update_profile(*, name: str, dob: str, gender: str) -> None`
- `await update_bio(bio: str) -> None`
- `await keep_alive() -> dict[str, int]`

## `client.users`
- `await get(user_id: str, *, skip_cache: bool = False) -> User | None`
- `await get_many(user_ids: list[str]) -> dict[str, User]`
- `await find_by_phone(phone_number: str) -> User | None`
- `await find_by_username(username: str) -> User | None`
- `await get_last_online(user_id: str) -> LastOnlineInfo`

## `client.contacts`
- `await list(*, count: int | None = None, page: int | None = None) -> list[Contact]`
- `await send_request(user_id: str, message: str = "Hello!") -> None`
- `await accept_request(user_id: str) -> None`
- `await reject_request(user_id: str) -> None`
- `await remove(user_id: str) -> None`
- `await block(user_id: str) -> None`
- `await unblock(user_id: str) -> None`
- `await set_alias(user_id: str, alias: str) -> None`
- `await get_online() -> list[OnlineStatus]`

## `client.groups`
- `await list() -> list[GroupSummary]`
- `await get(group_id: str, *, skip_cache: bool = False) -> Group`
- `await get_many(group_ids: list[str]) -> dict[str, Group]`
- `await create(*, members: list[str], name: str | None = None) -> Group`
- `await get_members(member_ids: list[str]) -> list[GroupMember]`
- `await add_members(group_id: str, user_ids: list[str]) -> None`
- `await remove_members(group_id: str, user_ids: list[str]) -> None`
- `await rename(group_id: str, name: str) -> None`
- `await leave(group_id: str) -> None`

## `client.conversations`
- `await get(conversation_id: str, thread_type: ThreadType | None = None) -> Conversation`
- `await get_messages(conversation_id: str, count: int | None = None) -> MessagePage`
- `await get_pinned() -> PinnedConversations`
- `await get_unread() -> UnreadMarks`
- `await pin(target: ThreadTarget, pinned: bool = True) -> None`
- `await mute(target: ThreadTarget, duration_seconds: int) -> None`
- `await send_typing(target: ThreadTarget) -> None`

## `client.messages`
- `await send(target: ThreadTarget, content: SendMessageContent, *, thread_type: ThreadType | None = None) -> SendMessageReceipt`
- `await reply(message: Message, content: SendMessageContent) -> SendMessageReceipt`
- `await react(message: Message, reaction: Reaction | str) -> None`
- `await undo(message: Message) -> None`
- `await delete(message: Message, *, only_me: bool = True) -> None`
- `await mark_seen(messages: list[Message]) -> None`

## `client.media`
- `await upload(target: ThreadTarget, sources: MediaInput | list[MediaInput], *, thread_type: ThreadType | None = None) -> list[UploadedMedia]`
- `await send(target: ThreadTarget, media: MediaInput | list[MediaInput], *, caption: str | None = None) -> SendMessageReceipt`

## `client.settings`
- `await get() -> AccountSettings`
- `await update_language(lang: str) -> None` (`"VI"` hoặc `"EN"`)

## `client.events`
- `on`, `once`, `off`, `await start(retry_on_close=False)`, `await stop()`
