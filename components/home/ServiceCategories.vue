<template>
  <section class="section cats-section">
    <div class="cats-head">
      <div>
        <h6 class="kicker">Что мы делаем</h6>
        <h2 class="cats-title">Четыре направления работ</h2>
      </div>
      <NuxtLink to="/services" class="cats-all-link">Все услуги и подуслуги →</NuxtLink>
    </div>
    <div class="cats-grid">
      <NuxtLink
        v-for="(cat, i) in serviceCategories"
        :key="cat.id"
        :to="`/services#${cat.id}`"
        class="cat-card animate-rise"
      >
        <div class="cat-num">{{ String(i + 1).padStart(2, '0') }}</div>
        <h3 class="cat-title">{{ cat.n }}</h3>
        <p class="cat-desc">{{ cat.d }}</p>
        <div class="cat-footer">
          <span class="cat-count">{{ cat.sub.length }} видов работ</span>
          <span class="cat-more">Подробнее</span>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { serviceCategories } from '~/data/services';
</script>

<style scoped>
.cats-section {
  padding-top: 88px;
}
.cats-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 34px;
}
.cats-title {
  font-size: 38px;
  letter-spacing: -0.02em;
  margin: 0;
  font-weight: 500;
}
.cats-all-link {
  font-size: 14px;
  color: var(--pk-link);
}
.cats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 270px), 1fr));
  gap: 14px;
}
.cat-card {
  border: 1px solid var(--pk-border);
  border-radius: 14px;
  padding: 22px;
  background: var(--pk-surface);
  display: flex;
  flex-direction: column;
  color: var(--pk-text);
}
.cat-card:hover {
  border-color: rgba(22, 163, 74, 0.55);
  background: var(--pk-surface-2);
}
.cat-num {
  font-size: 12px;
  color: var(--pk-link);
  letter-spacing: 0.08em;
  margin-bottom: 16px;
}
.cat-title {
  font-size: 20px;
  line-height: 1.2;
  margin: 0 0 10px;
  font-weight: 500;
}
.cat-desc {
  font-size: 14px;
  color: var(--pk-text-2);
  margin: 0 0 18px;
  flex: 1;
}
.cat-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding-top: 14px;
  border-top: 1px solid var(--pk-border);
}
.cat-count {
  font-size: 12.5px;
  color: var(--pk-text-3);
}
.cat-more {
  font-size: 13.5px;
  color: var(--pk-link);
  font-weight: 500;
}
</style>
