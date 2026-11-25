import { defineConfig } from 'vitepress';

export default defineConfig({
  srcDir: 'docs',
  title: 'Zapind',
  description:
    'SDK Zalo thân thiện với lập trình viên, an toàn kiểu và hỗ trợ đối tượng theo ngữ cảnh cho Node.js (npm) và Python (PyPI).',
  cleanUrls: true,
  lastUpdated: true,
  appearance: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#0068ff' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Zapind' }],
    ['meta', { property: 'og:title', content: 'Zapind — Developer-Friendly Zalo SDK (npm & PyPI)' }],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'Type-safe, contextual Zalo SDK for Node.js (npm) and Python (PyPI) with automatic ThreadType resolution, session stores, and realtime events.',
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
        'SDK Zalo thân thiện với lập trình viên, an toàn kiểu cho Node.js (npm) và Python (PyPI).',
      themeConfig: {
        nav: [
          { text: 'npm (JS/TS)', link: '/vi/npm/', activeMatch: '/vi/npm/' },
          { text: 'PyPI (Python)', link: '/vi/python/', activeMatch: '/vi/python/' },
          { text: 'v0.1.0', link: 'https://github.com/nquangdungg/zapind' },
        ],
        sidebar: {
          '/vi/npm/': [
            {
              text: 'Zapind cho Node.js (npm)',
              items: [
                { text: 'Tổng quan npm', link: '/vi/npm/' },
                { text: 'Bắt đầu nhanh', link: '/vi/npm/guide/getting-started' },
                { text: 'Xác thực & Phiên', link: '/vi/npm/guide/authentication' },
                { text: 'Tin nhắn & Media', link: '/vi/npm/guide/messaging' },
                { text: 'Sự kiện thời gian thực', link: '/vi/npm/guide/events' },
                { text: 'Xử lý lỗi & Chính sách', link: '/vi/npm/guide/error-handling' },
              ],
            },
            {
              text: 'Tài liệu API (JS/TS)',
              items: [
                { text: 'Zapind Client & Cấu hình', link: '/vi/npm/api/' },
                { text: 'Domain Services', link: '/vi/npm/api/services' },
                { text: 'Models & Kiểu dữ liệu', link: '/vi/npm/api/models' },
              ],
            },
          ],
          '/vi/python/': [
            {
              text: 'Zapind cho Python (PyPI)',
              items: [
                { text: 'Tổng quan PyPI', link: '/vi/python/' },
                { text: 'Bắt đầu nhanh', link: '/vi/python/guide/getting-started' },
                { text: 'Xác thực & Phiên', link: '/vi/python/guide/authentication' },
                { text: 'Tin nhắn & Media', link: '/vi/python/guide/messaging' },
                { text: 'Sự kiện thời gian thực', link: '/vi/python/guide/events' },
                { text: 'Xử lý lỗi & Chính sách', link: '/vi/python/guide/error-handling' },
              ],
            },
            {
              text: 'Tài liệu API (Python)',
              items: [
                { text: 'Zapind Client & Cấu hình', link: '/vi/python/api/' },
                { text: 'Domain Services', link: '/vi/python/api/services' },
                { text: 'Models & Kiểu dữ liệu', link: '/vi/python/api/models' },
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
          message: 'Phát hành theo giấy phép GNU LGPL v3.0.',
          copyright: 'Zapind SDK — npm (Node.js >= 20) & PyPI (Python >= 3.10)',
        },
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'Zapind',
      description:
        'Developer-friendly, type-safe, contextual Zalo SDK for Node.js (npm) and Python (PyPI).',
      themeConfig: {
        nav: [
          { text: 'npm (JS/TS)', link: '/en/npm/', activeMatch: '/en/npm/' },
          { text: 'PyPI (Python)', link: '/en/python/', activeMatch: '/en/python/' },
          { text: 'v0.1.0', link: 'https://github.com/nquangdungg/zapind' },
        ],
        sidebar: {
          '/en/npm/': [
            {
              text: 'Zapind for Node.js (npm)',
              items: [
                { text: 'npm Overview', link: '/en/npm/' },
                { text: 'Quick Start', link: '/en/npm/guide/getting-started' },
                { text: 'Authentication & Sessions', link: '/en/npm/guide/authentication' },
                { text: 'Messaging & Media', link: '/en/npm/guide/messaging' },
                { text: 'Realtime Events', link: '/en/npm/guide/events' },
                { text: 'Error Handling & Policies', link: '/en/npm/guide/error-handling' },
              ],
            },
            {
              text: 'API Reference (JS/TS)',
              items: [
                { text: 'Zapind Client & Options', link: '/en/npm/api/' },
                { text: 'Domain Services', link: '/en/npm/api/services' },
                { text: 'Models & Types', link: '/en/npm/api/models' },
              ],
            },
          ],
          '/en/python/': [
            {
              text: 'Zapind for Python (PyPI)',
              items: [
                { text: 'PyPI Overview', link: '/en/python/' },
                { text: 'Quick Start', link: '/en/python/guide/getting-started' },
                { text: 'Authentication & Sessions', link: '/en/python/guide/authentication' },
                { text: 'Messaging & Media', link: '/en/python/guide/messaging' },
                { text: 'Realtime Events', link: '/en/python/guide/events' },
                { text: 'Error Handling & Policies', link: '/en/python/guide/error-handling' },
              ],
            },
            {
              text: 'API Reference (Python)',
              items: [
                { text: 'Zapind Client & Options', link: '/en/python/api/' },
                { text: 'Domain Services', link: '/en/python/api/services' },
                { text: 'Models & Types', link: '/en/python/api/models' },
              ],
            },
          ],
        },
        outline: {
          label: 'On this page',
          level: [2, 3],
        },
        footer: {
          message: 'Released under the GNU LGPL v3.0 License.',
          copyright: 'Zapind SDK — npm (Node.js >= 20) & PyPI (Python >= 3.10)',
        },
      },
    },
  },
});
