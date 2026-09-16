<template>
  <div class="progress-row">
    <button
      v-for="(label, i) in labels"
      :key="label"
      type="button"
      class="progress-step"
      :disabled="i > store.currentStep"
      @click="i <= store.currentStep && store.setCurrentStep(i)"
    >
      <span class="progress-line" :class="{ 'progress-line--done': i < store.currentStep }" />
      <span class="progress-dot-row">
        <span class="progress-dot" :class="{ 'progress-dot--active': i <= store.currentStep }">{{ i + 1 }}</span>
        <span class="progress-label">{{ label }}</span>
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
const store = useRequestStore();
const labels = ['Услуга', 'Объект', 'Контакты', 'Подтверждение'];
</script>

<style scoped>
.progress-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px 14px;
  margin-bottom: 26px;
}
@media (min-width: 480px) {
  .progress-row {
    grid-template-columns: repeat(4, 1fr);
  }
}
.progress-step {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  color: var(--pk-text);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-align: left;
}
.progress-step:disabled {
  cursor: default;
}
.progress-line {
  height: 3px;
  border-radius: 2px;
  background: var(--pk-border);
}
.progress-line--done {
  background: var(--pk-accent-strong);
}
.progress-dot-row {
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
}
.progress-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid var(--pk-border-strong);
  background: transparent;
  color: var(--pk-text-3);
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.progress-dot--active {
  border-color: var(--pk-accent-strong);
  background: var(--pk-accent-strong);
  color: var(--pk-on-accent);
}
.progress-label {
  font-size: 12.5px;
  color: var(--pk-text-3);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
