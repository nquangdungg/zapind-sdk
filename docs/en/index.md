---
layout: home
title: Zapind — Developer-Friendly Zalo SDK for Node.js & TypeScript
titleTemplate: false

hero:
  name: Zapind
  text: Modern, Type-Safe Zalo SDK for Node.js & TypeScript
  tagline: Domain-oriented API, automatic threadType resolution, contextual objects, built-in session stores, and realtime events.
  image:
    src: /logo.svg
    alt: Zapind Logo
  actions:
    - theme: brand
      text: Get Started
      link: /en/guide/getting-started
    - theme: alt
      text: API Reference
      link: /en/api/
    - theme: alt
      text: GitHub
      link: https://github.com/nquangdungg/zapind

features:
  - icon: 🧩
    title: Clean Domain API
    details: Organized into 9 intuitive namespaces — account, users, contacts, groups, conversations, messages, media, settings, and events — plus client.raw for low-level control.
  - icon: 🎯
    title: Contextual Models
    details: Call user.send(), group.send(), conversation.send(), message.reply(), and message.react() directly without repeating thread IDs or threadType.
  - icon: 🔐
    title: Built-in Session Management
    details: Ships with MemorySessionStore, FileSessionStore (atomic writes), and EncryptedFileSessionStore (AES-256-GCM) with automatic session restore and QR fallback.
  - icon: ⚡
    title: Multi-Listener Realtime Events
    details: Typed event bus for message, reaction, group.update, user.update, typing, seen, undo, auth.required, connected, disconnected, and error with per-handler error isolation.
  - icon: 🛡️
    title: Strict TypeScript & Typed Errors
    details: Written in strict TypeScript, shipped as dual ESM & CommonJS with full .d.ts definitions and a 9-class ZapindError hierarchy.
  - icon: 🚀
    title: Caching & Built-in Resilience
    details: Bounded TTLCache, concurrent in-flight request deduplication, request timeouts, controlled retries, token-bucket rate limiting, and RedactingLogger.
---

<div class="zapind-landing-preview">

## Install and run in minutes

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
