<template>
  <section class="section cta-section">
    <div class="cta-panel">
      <h2 class="cta-title">Расскажите про объект — подскажем, что делать дальше</h2>
      <p class="cta-lead">Четыре коротких шага в заявке или звонок. Консультация бесплатная.</p>
      <div class="cta-actions">
        <NuxtLink to="/request" class="btn-primary">Оставить заявку</NuxtLink>
        <a :href="contacts.phoneHref" class="btn-secondary">{{ contacts.phone }}</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { contacts } from '~/data/team';
</script>

<style scoped>
.cta-section {
  padding-top: 88px;
  padding-bottom: 88px;
}
.cta-panel {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 16px;
  padding: 52px 44px;
  background: radial-gradient(120% 140% at 8% 0%, rgba(34, 197, 94, 0.16), transparent 62%), var(--pk-bg);
}
.cta-title {
  font-size: 34px;
  letter-spacing: -0.02em;
  margin: 0 0 12px;
  font-weight: 500;
  max-width: 560px;
  text-wrap: balance;
}
.cta-lead {
  font-size: 15.5px;
  color: var(--pk-text-2);
  margin: 0 0 26px;
  max-width: 520px;
}
.cta-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
