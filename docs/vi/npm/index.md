# Zapind cho Node.js (npm)

<PackageSelector />

**Zapind** (`v1.0.1`) là bộ SDK Zalo dành cho **Node.js (`>= 20.0.0`)** và **TypeScript**, phát hành song song dạng **ESM** và **CommonJS** kèm đầy đủ tệp khai báo kiểu `.d.ts`.

## Cài đặt

```bash
npm install zapind
```

## Khởi chạy nhanh

```ts
import { Zapind, Reaction } from 'zapind';

const client = new Zapind({ session: './session.json' });

await client.login({
  onQRCode: ({ imageDataUrl }) => console.log('Quét QR:', imageDataUrl),
});

client.on('message', async (message) => {
  if (message.text === '!ping') {
    await message.reply('pong!');
    await message.react(Reaction.Heart);
  }
});

client.startListening({ retryOnClose: true });
```

## Mục lục tài liệu npm

- [Bắt đầu nhanh](/vi/npm/guide/getting-started)
- [Xác thực & Phiên](/vi/npm/guide/authentication)
- [Tin nhắn & Media](/vi/npm/guide/messaging)
- [Sự kiện thời gian thực](/vi/npm/guide/events)
- [Xử lý lỗi & Chính sách](/vi/npm/guide/error-handling)
- [Tổng quan API](/vi/npm/api/)
- [Domain Services](/vi/npm/api/services)
- [Models & Kiểu dữ liệu](/vi/npm/api/models)
