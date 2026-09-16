<template>
  <label class="block">
    <span v-if="label" class="field-label">{{ label }}</span>
    <div class="select-wrap">
      <select
        :id="id"
        :value="modelValue"
        class="field-select"
        :disabled="disabled"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      >
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <option v-for="option in options" :key="getOptionValue(option)" :value="getOptionValue(option)">
          {{ getOptionLabel(option) }}
        </option>
      </select>
      <span class="select-chevron">▾</span>
    </div>
    <p v-if="error" class="field-error">{{ error }}</p>
  </label>
</template>

<script setup lang="ts">
const props = defineProps({
  id: { type: String, required: true },
  modelValue: { type: [String, Number, Boolean, Object], default: '' },
  options: { type: Array, required: true },
  placeholder: { type: String, default: '' },
  label: { type: String, default: '' },
  error: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  valueKey: { type: String, default: 'value' },
  labelKey: { type: String, default: 'text' },
});

defineEmits(['update:modelValue']);

const getOptionValue = (option: any) => {
  if (typeof option === 'object' && option !== null) {
    return option[props.valueKey];
  }
  return option;
};

const getOptionLabel = (option: any) => {
  if (typeof option === 'object' && option !== null) {
    return option[props.labelKey];
  }
  return option;
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
.select-wrap {
  position: relative;
}
.field-select {
  width: 100%;
  padding: 11px 32px 11px 12px;
  border: 1px solid var(--pk-border-strong);
  border-radius: 9px;
  background: var(--pk-surface-2);
  color: var(--pk-text);
  font: inherit;
  font-size: 14.5px;
  appearance: none;
}
.field-select:focus-visible {
  outline: 2px solid var(--pk-accent);
  outline-offset: 1px;
}
.select-chevron {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--pk-accent);
  font-size: 12px;
}
.field-error {
  margin-top: 6px;
  font-size: 12.5px;
  color: #dc2626;
}
</style>
