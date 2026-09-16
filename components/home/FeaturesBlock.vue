<template>
  <section class="section features-section">
    <div class="features-grid">
      <div>
        <h6 class="kicker">Почему выбирают нас</h6>
        <h2 class="features-title">Один инженер ведёт вас до выписки из ЕГРН</h2>
        <p class="features-lead">
          Без передачи клиента «по отделам» и без лишних бумаг. Сначала разбираемся, что именно нужно, и только потом
          берёмся за работу.
        </p>
      </div>
      <div class="features-list">
        <div v-for="(f, i) in features" :key="f.t" class="feature-item">
          <div class="feature-num">{{ String(i + 1).padStart(2, '0') }}</div>
          <h4 class="feature-title">{{ f.t }}</h4>
          <p class="feature-desc">{{ f.d }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { features } from '~/data/features';
</script>

<style scoped>
.features-section {
  padding-top: 88px;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
  gap: 40px;
  align-items: start;
}
.features-title {
  font-size: 38px;
  letter-spacing: -0.02em;
  margin: 0 0 16px;
  font-weight: 500;
  text-wrap: balance;
}
.features-lead {
  font-size: 15.5px;
  color: var(--pk-text-2);
  margin: 0;
}
.features-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  gap: 1px;
  background: var(--pk-border);
  border: 1px solid var(--pk-border);
  border-radius: 14px;
  overflow: hidden;
}
.feature-item {
  background: var(--pk-surface-2);
  padding: 22px 20px;
}
.feature-num {
  font-size: 11.5px;
  color: var(--pk-link);
  margin-bottom: 10px;
}
.feature-title {
  font-size: 16px;
  margin: 0 0 6px;
  font-weight: 500;
}
.feature-desc {
  font-size: 13.5px;
  color: var(--pk-text-3);
  margin: 0;
}
</style>
