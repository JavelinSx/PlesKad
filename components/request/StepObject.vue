<template>
  <div class="step-block">
    <h3 class="step-title">Объект</h3>
    <p class="step-hint">Что и где оформляем.</p>
    <div class="field-grid">
      <StyledSelect
        id="objectType"
        :model-value="store.formData.objectType"
        :options="objectTypes"
        placeholder="Выберите тип"
        label="Тип объекта"
        :error="store.errors.objectType"
        @update:model-value="store.setObjectType($event)"
      />
      <StyledSelect
        id="city"
        :model-value="store.formData.city"
        :options="cityList"
        placeholder="Выберите населённый пункт"
        label="Населённый пункт"
        :error="store.errors.city"
        @update:model-value="store.setCity($event)"
      />
      <label class="block">
        <span class="field-label">Кадастровый номер или адрес</span>
        <input
          type="text"
          class="field-input"
          placeholder="29:15:000000:000"
          :value="store.formData.address"
          @input="store.setAddress(($event.target as HTMLInputElement).value)"
        />
      </label>
      <label class="block">
        <span class="field-label">Что уже есть на руках</span>
        <input
          type="text"
          class="field-input"
          placeholder="выписка ЕГРН, старый межевой план…"
          :value="store.formData.additionalInfo"
          @input="store.setAdditionalInfo(($event.target as HTMLInputElement).value)"
        />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { objectTypes, cityList } from '~/data/request';

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
.field-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
  gap: 12px;
}
.field-label {
  display: block;
  font-size: 11.5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--pk-text-3);
  margin-bottom: 6px;
}
.field-input {
  width: 100%;
  padding: 11px 13px;
  border: 1px solid var(--pk-border-strong);
  border-radius: 9px;
  background: var(--pk-surface-2);
  color: var(--pk-text);
  font: inherit;
  font-size: 14.5px;
}
.field-input:focus-visible {
  outline: 2px solid var(--pk-accent);
  outline-offset: 1px;
}
</style>
