---
layout: home
title: Zapind — Zalo SDK for Node.js & Python
titleTemplate: false

hero:
  name: Zapind
  text: Modern Zalo SDK for Node.js (npm) & Python (PyPI)
  tagline: Domain-oriented API, automatic ThreadType resolution, contextual models, built-in session stores, and realtime events.
  image:
    src: /logo.svg
    alt: Zapind Logo
  actions:
    - theme: brand
      text: npm Docs (JS/TS)
      link: /en/npm/guide/getting-started
    - theme: alt
      text: PyPI Docs (Python)
      link: /en/python/guide/getting-started
    - theme: alt
      text: GitHub
      link: https://github.com/nquangdungg/zapind

features:
  - icon: 🧩
    title: Consistent 9-Domain API
    details: Shared architecture across Node.js and Python with account, users, contacts, groups, conversations, messages, media, settings, and events.
  - icon: 🎯
    title: Contextual Models
    details: Call user.send(), group.send(), conversation.send(), message.reply(), and message.react() directly without repeating IDs or ThreadType.
  - icon: 🔐
    title: Built-in Session Stores
    details: Ships with MemorySessionStore, FileSessionStore (atomic writes), and EncryptedFileSessionStore (AES-256-GCM) with automatic session restore.
  - icon: ⚡
    title: Multi-Listener Realtime Events
    details: Typed event bus for message, reaction, group.update, user.update, typing, seen, undo, auth.required, connected, disconnected, and error.
  - icon: 🛡️
    title: Strict Typing & Typed Errors
    details: Strict TypeScript (.d.ts) for npm and PEP 561 py.typed type hints for PyPI, sharing the 9-class ZapindError hierarchy.
  - icon: 🚀
    title: Caching & Built-in Resilience
    details: Bounded TTLCache, concurrent in-flight deduplication, request timeouts, controlled retries, rate limiting, and RedactingLogger.
---

<div class="zapind-selector-banner">
  <strong>Select package ecosystem:</strong>
  <PackageSelector />
</div>

<div class="zapind-landing-preview">

## Quick install (npm — JavaScript / TypeScript)

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
  onQRCode: ({ imageDataUrl }) => console.log('Scan QR:', imageDataUrl),
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
