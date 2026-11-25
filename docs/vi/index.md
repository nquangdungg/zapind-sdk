---
layout: home
title: Zapind — SDK Zalo cho Node.js & Python
titleTemplate: false

hero:
  name: Zapind
  text: SDK Zalo hiện đại cho Node.js (npm) và Python (PyPI)
  tagline: Giao diện lập trình phân theo miền nghiệp vụ, tự động suy luận loại hội thoại, đối tượng theo ngữ cảnh, quản lý phiên và sự kiện thời gian thực.
  image:
    src: /logo.svg
    alt: Biểu trưng Zapind
  actions:
    - theme: brand
      text: Tài liệu npm (JS/TS)
      link: /vi/npm/guide/getting-started
    - theme: alt
      text: Tài liệu PyPI (Python)
      link: /vi/python/guide/getting-started
    - theme: alt
      text: GitHub
      link: https://github.com/nquangdungg/zapind

features:
  - icon: 🧩
    title: API 9 miền nhất quán
    details: Đồng bộ kiến trúc giữa Node.js và Python với account, users, contacts, groups, conversations, messages, media, settings và events.
  - icon: 🎯
    title: Đối tượng theo ngữ cảnh
    details: Gọi trực tiếp user.send(), group.send(), conversation.send(), message.reply() hoặc message.react() mà không lặp lại ID và threadType.
  - icon: 🔐
    title: Quản lý phiên tích hợp sẵn
    details: Hỗ trợ MemorySessionStore, FileSessionStore (ghi nguyên tử) và EncryptedFileSessionStore (AES-256-GCM) với tự động khôi phục phiên.
  - icon: ⚡
    title: Sự kiện thời gian thực đa listener
    details: Lắng nghe message, reaction, group.update, user.update, typing, seen, undo, auth.required, connected, disconnected và error.
  - icon: 🛡️
    title: An toàn kiểu & Hệ thống lỗi chuẩn hóa
    details: TypeScript strict (.d.ts) cho npm và Python type hints (PEP 561 py.typed) cho PyPI, dùng chung cây lỗi ZapindError.
  - icon: 🚀
    title: Bộ nhớ đệm & Chống quá tải
    details: TTLCache có giới hạn, gộp yêu cầu đồng thời (in-flight deduplication), timeout, retry có kiểm soát, rate limiter và RedactingLogger.
---

<div class="zapind-selector-banner">
  <strong>Chọn hệ sinh thái tài liệu:</strong>
  <PackageSelector />
</div>

<div class="zapind-landing-preview">

## Cài đặt nhanh (npm — JavaScript / TypeScript)

<div class="zapind-meta-strip">
  <span class="zapind-meta-pill">zapind v0.1.0</span>
  <span class="zapind-meta-pill">Node.js &gt;= 20</span>
  <span class="zapind-meta-pill">ESM &amp; CommonJS</span>
  <span class="zapind-meta-pill">GNU LGPL v3.0</span>
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
