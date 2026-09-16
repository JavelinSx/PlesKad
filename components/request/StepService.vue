<template>
  <div class="step-block">
    <h3 class="step-title">Что нужно сделать</h3>
    <p class="step-hint">Выберите направление — уточним детали при звонке.</p>
    <p v-if="store.errors.service" class="step-error">{{ store.errors.service }}</p>
    <div class="option-list">
      <label v-for="cat in serviceCategories" :key="cat.id" class="option-card">
        <input
          type="radio"
          name="service"
          class="option-radio"
          :checked="store.formData.categoryId === cat.id"
          @change="store.setCategory(cat.id)"
        />
        <span>
          <span class="option-title">{{ cat.n }}</span>
          <span class="option-sub">{{ cat.short }}</span>
        </span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { serviceCategories } from '~/data/services';

const store = useRequestStore();
</script>

<style scoped>
.step-block {
  margin-bottom: 26px;
}
.step-title {
  font-size: 19px;
  margin: 0 0 4px;
  font-weight: 500;
}
.step-hint {
  font-size: 13.5px;
  color: var(--pk-text-3);
  margin: 0 0 16px;
}
.step-error {
  font-size: 12.5px;
  color: #dc2626;
  margin: 0 0 12px;
}
.option-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.option-card {
  display: flex;
  gap: 11px;
  align-items: flex-start;
  background: var(--pk-surface-2);
  border: 1px solid var(--pk-border-strong);
  border-radius: 10px;
  padding: 13px 15px;
  cursor: pointer;
}
.option-card:hover {
  border-color: var(--pk-accent-strong);
}
.option-radio {
  accent-color: var(--pk-accent-strong);
  margin-top: 2px;
}
.option-title {
  display: block;
  font-size: 14.5px;
  color: var(--pk-text);
}
.option-sub {
  display: block;
  font-size: 12.5px;
  color: var(--pk-text-3);
  margin-top: 2px;
}
</style>
