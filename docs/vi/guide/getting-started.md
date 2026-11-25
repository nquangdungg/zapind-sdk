# Bắt đầu nhanh

**Zapind** (`v0.1.0`) là bộ SDK dành cho Node.js và TypeScript giúp ứng dụng của bạn tương tác với tài khoản Zalo thông qua API hướng miền, đối tượng có ngữ cảnh và hệ thống sự kiện thời gian thực.

## Yêu cầu môi trường

- **Node.js `>= 20.0.0`**
- Hỗ trợ cả **ESM (`import`)** và **CommonJS (`require`)**
- Đi kèm sẵn khai báo kiểu **TypeScript (`.d.ts`)**

## Cài đặt

```bash
npm install zapind
```

## Khởi tạo và chạy ví dụ đầu tiên

```ts
import { Zapind, Reaction } from 'zapind';

const client = new Zapind({
  session: './session.json',
});

await client.login({
  onQRCode: ({ imageDataUrl }) => {
    console.log('Hiển thị hoặc mở ảnh QR:', imageDataUrl);
  },
  onScanned: ({ displayName }) => {
    console.log('Đã quét bởi:', displayName);
  },
});

const me = await client.account.getMe();
console.log('Đăng nhập thành công:', me.id, me.displayName);

client.on('message', async (message) => {
  console.log(`[${message.sender.name ?? message.sender.id}]: ${message.text}`);

  if (message.text === '!ping') {
    await message.reply('pong!');
    await message.react(Reaction.Heart);
  }
});

client.startListening({ retryOnClose: true });
```

## Hỗ trợ đa tài khoản

`Zapind` được thiết kế dạng lớp (`class`), không sử dụng trạng thái toàn cục (singleton). Bạn có thể tạo nhiều thực thể `Zapind` chạy song song trong cùng một tiến trình Node.js với bộ lưu phiên độc lập:

```ts
import { Zapind } from 'zapind';

const botA = new Zapind({ session: './sessions/bot-a.json' });
const botB = new Zapind({ session: './sessions/bot-b.json' });

await Promise.all([botA.login(), botB.login()]);
```

## Các bước tiếp theo

- [Xác thực & Quản lý phiên](/vi/guide/authentication)
- [Gửi tin nhắn & Media](/vi/guide/messaging)
- [Lắng nghe sự kiện thời gian thực](/vi/guide/events)
- [Tham chiếu API đầy đủ](/vi/api/)
