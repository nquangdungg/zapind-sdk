import { defineConfig } from 'vitepress';

export default defineConfig({
  srcDir: 'docs',
  title: 'Zapind',
  description:
    'SDK Zalo thân thiện với lập trình viên, an toàn kiểu TypeScript và hỗ trợ đối tượng theo ngữ cảnh cho Node.js.',
  cleanUrls: true,
  lastUpdated: true,
  appearance: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#0068ff' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Zapind' }],
    ['meta', { property: 'og:title', content: 'Zapind — Developer-Friendly Zalo SDK' }],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'Type-safe, contextual Zalo SDK for Node.js & TypeScript with automatic threadType resolution, session stores, and realtime events.',
      },
    ],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Zapind',
    search: {
      provider: 'local',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/nquangdungg/zapind' },
    ],
  },

  locales: {
    vi: {
      label: 'Tiếng Việt',
      lang: 'vi-VN',
      link: '/vi/',
      title: 'Zapind',
      description:
        'SDK Zalo thân thiện với lập trình viên, an toàn kiểu TypeScript và hỗ trợ đối tượng theo ngữ cảnh cho Node.js.',
      themeConfig: {
        nav: [
          { text: 'Hướng dẫn', link: '/vi/guide/getting-started', activeMatch: '/vi/guide/' },
          { text: 'Tài liệu API', link: '/vi/api/', activeMatch: '/vi/api/' },
          { text: 'v0.1.0', link: 'https://github.com/nquangdungg/zapind' },
        ],
        sidebar: {
          '/vi/guide/': [
            {
              text: 'Bắt đầu',
              items: [
                { text: 'Bắt đầu nhanh', link: '/vi/guide/getting-started' },
                { text: 'Xác thực & Phiên', link: '/vi/guide/authentication' },
                { text: 'Tin nhắn & Media', link: '/vi/guide/messaging' },
                { text: 'Sự kiện thời gian thực', link: '/vi/guide/events' },
                { text: 'Xử lý lỗi & Chính sách', link: '/vi/guide/error-handling' },
              ],
            },
            {
              text: 'Tham chiếu',
              items: [
                { text: 'Tổng quan API', link: '/vi/api/' },
                { text: 'Domain Services', link: '/vi/api/services' },
                { text: 'Models & Kiểu dữ liệu', link: '/vi/api/models' },
              ],
            },
          ],
          '/vi/api/': [
            {
              text: 'Tài liệu API',
              items: [
                { text: 'Zapind Client & Cấu hình', link: '/vi/api/' },
                { text: 'Domain Services', link: '/vi/api/services' },
                { text: 'Models & Kiểu dữ liệu', link: '/vi/api/models' },
              ],
            },
            {
              text: 'Hướng dẫn',
              items: [
                { text: 'Bắt đầu nhanh', link: '/vi/guide/getting-started' },
                { text: 'Xác thực & Phiên', link: '/vi/guide/authentication' },
              ],
            },
          ],
        },
        outline: {
          label: 'Trên trang này',
          level: [2, 3],
        },
        docFooter: {
          prev: 'Trang trước',
          next: 'Trang tiếp theo',
        },
        darkModeSwitchLabel: 'Giao diện',
        lightModeSwitchTitle: 'Chuyển sang chế độ sáng',
        darkModeSwitchTitle: 'Chuyển sang chế độ tối',
        sidebarMenuLabel: 'Danh mục',
        returnToTopLabel: 'Lên đầu trang',
        langMenuLabel: 'Đổi ngôn ngữ',
        lastUpdated: {
          text: 'Cập nhật gần nhất',
        },
        footer: {
          message: 'Phát hành theo giấy phép GNU GPL v3.0.',
          copyright: 'Zapind SDK — Node.js >= 20 & TypeScript',
        },
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'Zapind',
      description:
        'Developer-friendly, type-safe, contextual Zalo SDK for Node.js & TypeScript.',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/en/guide/getting-started', activeMatch: '/en/guide/' },
          { text: 'API Reference', link: '/en/api/', activeMatch: '/en/api/' },
          { text: 'v0.1.0', link: 'https://github.com/nquangdungg/zapind' },
        ],
        sidebar: {
          '/en/guide/': [
            {
              text: 'Getting Started',
              items: [
                { text: 'Quick Start', link: '/en/guide/getting-started' },
                { text: 'Authentication & Sessions', link: '/en/guide/authentication' },
                { text: 'Messaging & Media', link: '/en/guide/messaging' },
                { text: 'Realtime Events', link: '/en/guide/events' },
                { text: 'Error Handling & Policies', link: '/en/guide/error-handling' },
              ],
            },
            {
              text: 'Reference',
              items: [
                { text: 'API Overview', link: '/en/api/' },
                { text: 'Domain Services', link: '/en/api/services' },
                { text: 'Models & Types', link: '/en/api/models' },
              ],
            },
          ],
          '/en/api/': [
            {
              text: 'API Reference',
              items: [
                { text: 'Zapind Client & Options', link: '/en/api/' },
                { text: 'Domain Services', link: '/en/api/services' },
                { text: 'Models & Types', link: '/en/api/models' },
              ],
            },
            {
              text: 'Guide',
              items: [
                { text: 'Quick Start', link: '/en/guide/getting-started' },
                { text: 'Authentication & Sessions', link: '/en/guide/authentication' },
              ],
            },
          ],
        },
        outline: {
          label: 'On this page',
          level: [2, 3],
        },
        footer: {
          message: 'Released under the GNU GPL v3.0 License.',
          copyright: 'Zapind SDK — Node.js >= 20 & TypeScript',
        },
      },
    },
  },
});
