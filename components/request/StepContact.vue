<template>
  <div class="step-block">
    <h3 class="step-title">Как с вами связаться</h3>
    <p class="step-hint">Позвоним или напишем — как удобнее.</p>
    <div class="field-grid">
      <label class="block">
        <span class="field-label">Имя</span>
        <input
          type="text"
          class="field-input"
          placeholder="Андрей"
          :value="store.formData.fullName"
          @input="store.setFullName(($event.target as HTMLInputElement).value)"
        />
        <p v-if="store.errors.fullName" class="field-error">{{ store.errors.fullName }}</p>
      </label>

      <PhoneInput
        id="phone"
        label="Телефон"
        :model-value="store.formData.phone"
        :error="store.errors.phone"
        @update:model-value="store.setPhone($event)"
      />

      <label class="block">
        <span class="field-label">Почта (необязательно)</span>
        <input
          type="email"
          class="field-input"
          placeholder="you@mail.ru"
          :value="store.formData.email"
          @input="store.setEmail(($event.target as HTMLInputElement).value)"
        />
        <p v-if="store.errors.email" class="field-error">{{ store.errors.email }}</p>
      </label>

      <StyledSelect
        id="callTime"
        :model-value="store.formData.callTime"
        :options="callTimeOptions"
        label="Удобное время звонка"
        @update:model-value="store.setCallTime($event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { callTimeOptions } from '~/data/request';

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
.field-error {
  margin-top: 6px;
  font-size: 12.5px;
  color: #dc2626;
}
</style>
