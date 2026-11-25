# Zapind for Node.js (npm)

<PackageSelector />

**Zapind** (`v0.1.0`) is a Zalo SDK for **Node.js (`>= 20.0.0`)** and **TypeScript**, shipped as dual **ESM** and **CommonJS** with bundled `.d.ts` declarations.

## Installation

```bash
npm install zapind
```

## Quick Start

```ts
import { Zapind, Reaction } from 'zapind';

const client = new Zapind({ session: './session.json' });

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

## npm Documentation Sections

- [Quick Start](/en/npm/guide/getting-started)
- [Authentication & Sessions](/en/npm/guide/authentication)
- [Messaging & Media](/en/npm/guide/messaging)
- [Realtime Events](/en/npm/guide/events)
- [Error Handling & Policies](/en/npm/guide/error-handling)
- [API Overview](/en/npm/api/)
- [Domain Services](/en/npm/api/services)
- [Models & Types](/en/npm/api/models)
