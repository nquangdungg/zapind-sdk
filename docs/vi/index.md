---
layout: home
title: Zapind — SDK Zalo cho Node.js & TypeScript
titleTemplate: false

hero:
  name: Zapind
  text: SDK Zalo hiện đại, an toàn kiểu cho Node.js & TypeScript
  tagline: Giao diện lập trình phân theo miền nghiệp vụ, tự động suy luận loại hội thoại, đối tượng theo ngữ cảnh, quản lý phiên và sự kiện thời gian thực.
  image:
    src: /logo.svg
    alt: Biểu trưng Zapind
  actions:
    - theme: brand
      text: Bắt đầu ngay
      link: /vi/guide/getting-started
    - theme: alt
      text: Tài liệu API
      link: /vi/api/
    - theme: alt
      text: GitHub
      link: https://github.com/nquangdungg/zapind

features:
  - icon: 🧩
    title: API theo miền rõ ràng
    details: Tổ chức gọn gàng thành 9 miền gồm account, users, contacts, groups, conversations, messages, media, settings và events — kèm client.raw khi cần kiểm soát mức thấp.
  - icon: 🎯
    title: Đối tượng theo ngữ cảnh
    details: Gọi trực tiếp user.send(), group.send(), conversation.send(), message.reply() hoặc message.react() mà không cần lặp lại ID và threadType thủ công.
  - icon: 🔐
    title: Quản lý phiên tích hợp sẵn
    details: Hỗ trợ MemorySessionStore, FileSessionStore (ghi nguyên tử) và EncryptedFileSessionStore (AES-256-GCM), tự khôi phục phiên và chuyển sang đăng nhập QR khi hết hạn.
  - icon: ⚡
    title: Sự kiện thời gian thực đa listener
    details: Lắng nghe message, reaction, group.update, user.update, typing, seen, undo, auth.required, connected, disconnected và error với cơ chế cô lập lỗi từng handler.
  - icon: 🛡️
    title: An toàn kiểu & Hệ thống lỗi chuẩn hóa
    details: Viết bằng TypeScript strict, xuất song song ESM & CommonJS kèm đầy đủ khai báo .d.ts và cây lỗi ZapindError (9 lớp lỗi chuyên biệt).
  - icon: 🚀
    title: Bộ nhớ đệm & Chống quá tải
    details: Tích hợp sẵn TTLCache có giới hạn kích thước, gộp yêu cầu đồng thời (in-flight deduplication), timeout, retry có kiểm soát, rate limiter và RedactingLogger.
---

<div class="zapind-landing-preview">

## Cài đặt và chạy trong vài dòng mã

<div class="zapind-meta-strip">
  <span class="zapind-meta-pill">zapind v0.1.0</span>
  <span class="zapind-meta-pill">Node.js &gt;= 20</span>
  <span class="zapind-meta-pill">ESM &amp; CommonJS</span>
  <span class="zapind-meta-pill">TypeScript Strict</span>
  <span class="zapind-meta-pill">GNU GPL v3.0</span>
</div>

```bash
npm install zapind
```

```ts
import { Zapind, Reaction } from 'zapind';

const client = new Zapind({
  session: './session.json',
});

await client.login({
  onQRCode: ({ imageDataUrl }) => console.log('Quét mã QR:', imageDataUrl),
});

client.on('message', async (message) => {
  if (message.text === '!ping') {
    await message.reply('pong!');
    await message.react(Reaction.Heart);
  }
});

client.startListening({ retryOnClose: true });
```

</div>
