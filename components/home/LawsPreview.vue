<template>
  <section class="section laws-section">
    <div class="card laws-card">
      <div class="laws-head">
        <span class="live-dot" />
        <h4 class="laws-title">Последние изменения в законодательстве</h4>
        <span class="laws-live-label">обновляется автоматически</span>
        <div class="spacer" />
        <button type="button" class="laws-all-link" @click="open('laws')">Все изменения →</button>
      </div>
      <div class="laws-grid">
        <div v-for="law in topLaws" :key="law.t" class="law-item">
          <div class="law-date">{{ law.date }}</div>
          <div class="law-title">{{ law.t }}</div>
          <p class="law-desc">{{ law.summary }}</p>
          <span class="law-src">Источник: {{ law.src }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { lawUpdates } from '~/data/laws';

const { open } = usePopups();
const topLaws = lawUpdates.slice(0, 3);
</script>

<style scoped>
.laws-section {
  padding-top: 88px;
}
.laws-card {
  overflow: hidden;
}
.laws-head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 22px;
  border-bottom: 1px solid var(--pk-border);
  flex-wrap: wrap;
}
.live-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--pk-accent);
  animation: livedot 2.4s ease-in-out infinite;
}
.laws-title {
  font-size: 16px;
  margin: 0;
  font-weight: 500;
}
.laws-live-label {
  font-size: 12px;
  color: var(--pk-text-3);
}
.spacer {
  flex: 1;
}
.laws-all-link {
  font-size: 13.5px;
  color: var(--pk-link);
  background: none;
  border: none;
  cursor: pointer;
}
.laws-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
}
.law-item {
  padding: 20px 22px;
  border-right: 1px solid var(--pk-border);
}
.law-date {
  font-size: 12px;
  color: var(--pk-link);
  margin-bottom: 8px;
}
.law-title {
  font-size: 15px;
  line-height: 1.3;
  margin-bottom: 8px;
}
.law-desc {
  font-size: 13px;
  color: var(--pk-text-3);
  margin: 0 0 10px;
}
.law-src {
  font-size: 11.5px;
  color: var(--pk-text-3);
}
</style>
