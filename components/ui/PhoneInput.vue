<template>
  <label class="block">
    <span v-if="label" class="field-label">{{ label }}</span>
    <input
      :id="id"
      type="tel"
      :value="modelValue"
      class="field-input"
      :placeholder="placeholder"
      :disabled="disabled"
      autocomplete="tel"
      @input="onInput"
    />
    <p v-if="error" class="field-error">{{ error }}</p>
  </label>
</template>

<script setup lang="ts">
const props = defineProps({
  id: { type: String, required: true },
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '+7 (___) ___-__-__' },
  error: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(['update:modelValue']);

const formatPhoneNumber = (value: string): string => {
  let digits = value.replace(/[^\d+]/g, '');

  if (digits.startsWith('8')) {
    digits = '+7' + digits.substring(1);
  }

  if (!digits.startsWith('+')) {
    digits = '+' + digits;
  }

  if (digits.length > 12) {
    digits = digits.substring(0, 12);
  }

  return digits;
};

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const formatted = formatPhoneNumber(target.value);

  if (formatted !== target.value) {
    target.value = formatted;
  }

  emit('update:modelValue', formatted);
};
</script>

<style scoped>
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
