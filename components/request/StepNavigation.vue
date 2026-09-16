<template>
  <div class="nav-row">
    <button v-if="store.currentStep > 0" type="button" class="btn-secondary" @click="store.prevStep()">Назад</button>
    <button v-if="store.currentStep < 3" type="button" class="btn-primary" @click="store.nextStep()">Дальше</button>
    <button
      v-if="store.currentStep === 3"
      type="button"
      class="btn-primary"
      :disabled="store.isSubmitting"
      @click="store.submitForm()"
    >
      {{ store.isSubmitting ? 'Отправляем…' : 'Отправить заявку' }}
    </button>
    <span class="step-counter">Шаг {{ store.currentStep + 1 }} из 4</span>
  </div>
  <p v-if="store.submitError" class="submit-error">
    Произошла ошибка при отправке. Попробуйте ещё раз или позвоните нам напрямую.
  </p>
</template>

<script setup lang="ts">
const store = useRequestStore();
</script>

<style scoped>
.nav-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
  padding-top: 18px;
  border-top: 1px solid var(--pk-border);
}
.step-counter {
  font-size: 12.5px;
  color: var(--pk-text-3);
  margin-left: auto;
}
.submit-error {
  margin: 12px 0 0;
  font-size: 13px;
  color: #dc2626;
}
</style>
