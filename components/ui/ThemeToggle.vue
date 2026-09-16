<template>
  <button type="button" class="theme-toggle" :aria-label="isDark ? 'Включить светлую тему' : 'Включить тёмную тему'" @click="toggle">
    <span v-if="isDark">☀</span>
    <span v-else>☾</span>
  </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === 'dark');

const toggle = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark';
};
</script>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid var(--pk-border);
  background: transparent;
  color: var(--pk-text-2);
  font-size: 15px;
  cursor: pointer;
}
.theme-toggle:hover {
  border-color: var(--pk-accent);
  color: var(--pk-accent);
}
.theme-toggle:focus-visible {
  outline: 2px solid var(--pk-accent);
  outline-offset: 2px;
}
</style>
