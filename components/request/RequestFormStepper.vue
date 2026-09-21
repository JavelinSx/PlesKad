<template>
  <div class="card stepper-card">
    <template v-if="store.currentStep < 4">
      <StepProgress />
      <StepService v-if="store.currentStep === 0" />
      <StepObject v-else-if="store.currentStep === 1" />
      <StepContact v-else-if="store.currentStep === 2" />
      <StepConfirmation v-else-if="store.currentStep === 3" />
      <StepNavigation />
    </template>

    <div v-else class="success">
      <div class="success-icon">✓</div>
      <h3 class="success-title">Заявка отправлена</h3>
      <p class="success-text">Мы свяжемся с вами в течение рабочего дня. Если срочно — звоните напрямую.</p>
      <div class="success-actions">
        <a :href="contacts.phoneHref" class="btn-primary">{{ contacts.phone }}</a>
        <a :href="contacts.phone2Href" class="btn-secondary">{{ contacts.phone2 }}</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { contacts } from '~/data/team';

const store = useRequestStore();
</script>

<style scoped>
.stepper-card {
  padding: 26px;
}
.success {
  text-align: center;
  padding: 20px 0;
}
.success-icon {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(34, 197, 94, 0.15);
  color: var(--pk-accent-strong);
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 18px;
}
.success-title {
  font-size: 22px;
  margin: 0 0 10px;
  font-weight: 500;
}
.success-text {
  font-size: 14.5px;
  color: var(--pk-text-2);
  margin: 0 0 20px;
}
.success-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
