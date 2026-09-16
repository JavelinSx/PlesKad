<template>
  <div class="step-block">
    <h3 class="step-title">Подтверждение</h3>
    <p class="step-hint">Проверьте заявку и отправьте — перезвоним в рабочее время.</p>

    <div class="summary">
      <div class="summary-row"><span>Услуга</span><strong>{{ category?.n || '—' }}</strong></div>
      <div class="summary-row"><span>Объект</span><strong>{{ objectTypeLabel }}</strong></div>
      <div class="summary-row"><span>Населённый пункт</span><strong>{{ store.formData.city || '—' }}</strong></div>
      <div class="summary-row"><span>Контакт</span><strong>{{ store.formData.fullName }}, {{ store.formData.phone }}</strong></div>
    </div>

    <label class="agreement">
      <input type="checkbox" class="agreement-checkbox" :checked="store.formData.agreement" @change="store.setAgreement(($event.target as HTMLInputElement).checked)" />
      <span>Согласен на обработку персональных данных в соответствии с <button type="button" class="agreement-link" @click="open('privacy')">политикой конфиденциальности</button>.</span>
    </label>
    <p v-if="store.errors.agreement" class="field-error">{{ store.errors.agreement }}</p>
  </div>
</template>

<script setup lang="ts">
import { objectTypes } from '~/data/request';

const store = useRequestStore();
const { open } = usePopups();

const category = computed(() => store.getCategory());
const objectTypeLabel = computed(() => objectTypes.find((o) => o.value === store.formData.objectType)?.text || '—');
</script>

<style scoped>
.step-block {
  margin-bottom: 22px;
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
.summary {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
  padding: 14px 15px;
  background: var(--pk-surface-2);
  border: 1px solid var(--pk-border);
  border-radius: 10px;
}
.summary-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 13.5px;
  color: var(--pk-text-2);
}
.summary-row strong {
  color: var(--pk-text);
  text-align: right;
}
.agreement {
  display: flex;
  gap: 11px;
  align-items: flex-start;
  font-size: 13.5px;
  color: var(--pk-text-2);
  background: var(--pk-surface-2);
  border: 1px solid var(--pk-border-strong);
  border-radius: 10px;
  padding: 14px 15px;
}
.agreement-checkbox {
  accent-color: var(--pk-accent-strong);
  margin-top: 2px;
}
.agreement-link {
  color: var(--pk-link);
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  text-decoration: underline;
}
.field-error {
  margin-top: 6px;
  font-size: 12.5px;
  color: #dc2626;
}
</style>
