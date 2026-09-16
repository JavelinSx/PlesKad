<template>
  <Teleport to="body">
    <div v-if="modelValue" class="popup-backdrop" @click.self="$emit('update:modelValue', false)">
      <div class="popup-panel animate-popIn" :style="{ width: `min(${width}px, 100%)` }">
        <div class="popup-head">
          <h3 class="popup-title">{{ title }}</h3>
          <button type="button" class="popup-close" aria-label="Закрыть" @click="$emit('update:modelValue', false)">✕</button>
        </div>
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, required: true },
  width: { type: Number, default: 640 },
});
defineEmits(['update:modelValue']);
</script>

<style scoped>
.popup-backdrop {
  position: fixed;
  inset: 0;
  z-index: 70;
  background: var(--pk-overlay);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px;
}
.popup-panel {
  max-height: 84vh;
  overflow: auto;
  background: var(--pk-surface);
  border: 1px solid var(--pk-border-strong);
  border-radius: 16px;
  padding: 28px 30px;
}
.popup-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}
.popup-title {
  font-size: 24px;
  margin: 0;
  font-weight: 500;
}
.popup-close {
  font-size: 18px;
  color: var(--pk-text-3);
  background: none;
  border: none;
  cursor: pointer;
  line-height: 1;
}
.popup-close:hover {
  color: var(--pk-text);
}
</style>
