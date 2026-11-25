import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import PackageSelector from './components/PackageSelector.vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-before': () => h(PackageSelector, { compact: true }),
    });
  },
  enhanceApp({ app }: { app: { component: (name: string, comp: unknown) => void } }) {
    app.component('PackageSelector', PackageSelector);
  },
};
