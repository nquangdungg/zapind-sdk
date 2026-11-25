# Quick Start

**Zapind** (`v0.1.0`) is a Node.js and TypeScript SDK for interacting with Zalo accounts through a domain-oriented API, contextual models, and a typed realtime event bus.

## Requirements

- **Node.js `>= 20.0.0`**
- Dual **ESM (`import`)** and **CommonJS (`require`)** exports
- Bundled **TypeScript (`.d.ts`)** declarations

## Installation

```bash
npm install zapind
```

## Your First Script

```ts
import { Zapind, Reaction } from 'zapind';

const client = new Zapind({
  session: './session.json',
});

await client.login({
  onQRCode: ({ imageDataUrl }) => {
    console.log('Scan this QR code:', imageDataUrl);
  },
  onScanned: ({ displayName }) => {
    console.log('Scanned by:', displayName);
  },
});

const me = await client.account.getMe();
console.log('Logged in as:', me.id, me.displayName);

client.on('message', async (message) => {
  console.log(`[${message.sender.name ?? message.sender.id}]: ${message.text}`);

  if (message.text === '!ping') {
    await message.reply('pong!');
    await message.react(Reaction.Heart);
  }
});

client.startListening({ retryOnClose: true });
```

## Multi-Account Support

`Zapind` is a regular class with zero module-level singletons. You can run multiple independent accounts concurrently in the same Node.js process:

```ts
import { Zapind } from 'zapind';

const botA = new Zapind({ session: './sessions/bot-a.json' });
const botB = new Zapind({ session: './sessions/bot-b.json' });

await Promise.all([botA.login(), botB.login()]);
```

## Next Steps

- [Authentication & Sessions](/en/npm/guide/authentication)
- [Messaging & Media](/en/npm/guide/messaging)
- [Realtime Events](/en/npm/guide/events)
- [API Reference](/en/npm/api/)
