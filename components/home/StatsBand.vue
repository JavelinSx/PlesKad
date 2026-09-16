<template>
  <section class="stat-band">
    <div class="stats-inner">
      <div v-for="stat in companyStats" :key="stat.label">
        <div class="stat-value">{{ stat.value }}</div>
        <div class="stat-label">{{ stat.label }}</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { companyStats } from '~/data/team';
</script>

<style scoped>
.stats-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 28px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 28px;
}
.stat-value {
  font-size: 44px;
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1;
}
.stat-label {
  font-size: 13.5px;
  color: rgba(243, 245, 254, 0.82);
  margin-top: 4px;
}
</style>
