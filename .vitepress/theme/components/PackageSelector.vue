<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vitepress';

const props = defineProps<{
  compact?: boolean;
}>();

const route = useRoute();
const router = useRouter();

const lang = computed<'vi' | 'en'>(() => (route.path.startsWith('/en') ? 'en' : 'vi'));
const isPython = computed(() => route.path.includes('/python'));

function switchTo(target: 'npm' | 'python'): void {
  const prefix = `/${lang.value}`;
  const path = route.path;

  if (target === 'python') {
    if (path.startsWith(`${prefix}/npm/`)) {
      router.go(path.replace(`${prefix}/npm/`, `${prefix}/python/`));
    } else if (!path.startsWith(`${prefix}/python`)) {
      router.go(`${prefix}/python/`);
    }
  } else {
    if (path.startsWith(`${prefix}/python/`)) {
      router.go(path.replace(`${prefix}/python/`, `${prefix}/npm/`));
    } else if (!path.startsWith(`${prefix}/npm`)) {
      router.go(`${prefix}/npm/`);
    }
  }
}
</script>

<template>
  <div
    class="zapind-pkg-selector"
    :class="{ 'zapind-pkg-selector--compact': props.compact }"
    role="tablist"
    aria-label="Package ecosystem selector"
  >
    <button
      type="button"
      role="tab"
      :aria-selected="!isPython"
      class="zapind-pkg-btn"
      :class="{ 'is-active': !isPython }"
      @click="switchTo('npm')"
    >
      <span class="zapind-pkg-dot zapind-pkg-dot--npm" aria-hidden="true" />
      <span>npm</span>
    </button>
    <button
      type="button"
      role="tab"
      :aria-selected="isPython"
      class="zapind-pkg-btn"
      :class="{ 'is-active': isPython }"
      @click="switchTo('python')"
    >
      <span class="zapind-pkg-dot zapind-pkg-dot--pypi" aria-hidden="true" />
      <span>PyPI</span>
    </button>
  </div>
</template>
