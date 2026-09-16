<template>
  <div>
    <section class="section about-hero">
      <h6 class="kicker">О нас</h6>
      <h1 class="about-title">Три специалиста, которые доводят дело до записи в ЕГРН</h1>
      <p class="about-lead">
        С 2009 года помогаем жителям Плесецкого района и Архангельской области оформлять землю и постройки. Наша
        задача — снять с вас беготню по инстанциям.
      </p>
    </section>

    <TeamGrid />
    <OfficeContact />

    <section class="section stats-section">
      <div class="stat-band stats-panel">
        <div v-for="stat in companyStats" :key="stat.label">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
      <p class="stats-note">
        Работаем с частными заказчиками и организациями: муниципальные учреждения, агропредприятия, строительные
        компании, лесная промышленность.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { companyStats } from '~/data/team';

useHead({
  title: 'О нас и контакты | ПлесКад — кадастровый инженер в Плесецке',
  meta: [
    {
      name: 'description',
      content: 'Команда, офис и контакты кадастрового инженера ПлесКад в рп. Плесецк. Работаем с 2009 года, 1000+ выполненных проектов.',
    },
  ],
});
</script>

<style scoped>
.about-hero {
  padding-top: 64px;
}
.about-title {
  font-size: clamp(32px, 4.4vw, 50px);
  line-height: 1.05;
  letter-spacing: -0.025em;
  margin: 0 0 18px;
  font-weight: 500;
  max-width: 720px;
  text-wrap: balance;
}
.about-lead {
  font-size: 18px;
  color: var(--pk-text-2);
  max-width: 620px;
  margin: 0;
}
.stats-section {
  padding-top: 48px;
  padding-bottom: 64px;
}
.stats-panel {
  border-radius: 14px;
  padding: 34px 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 160px), 1fr));
  gap: 24px;
}
.stat-value {
  font-size: 40px;
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1;
}
.stat-label {
  font-size: 13px;
  color: rgba(243, 245, 254, 0.82);
  margin-top: 4px;
}
.stats-note {
  font-size: 15px;
  color: var(--pk-text-2);
  max-width: 640px;
  margin: 20px 0 0;
}
</style>
