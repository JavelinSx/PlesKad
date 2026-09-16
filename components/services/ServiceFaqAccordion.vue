<template>
  <section class="section faq-section">
    <div class="faq-grid">
      <div>
        <h6 class="kicker">Вопросы</h6>
        <h2 class="faq-title">Коротко о том, что спрашивают чаще всего</h2>
        <NuxtLink to="/request" class="faq-cta">Не нашли ответ — спросите нас →</NuxtLink>
      </div>
      <div class="faq-list">
        <div v-for="(item, i) in faqItems" :key="item.q" class="faq-row">
          <button type="button" class="faq-question" @click="toggle(i)">
            <span class="faq-q-text">{{ item.q }}</span>
            <span class="faq-sign">{{ openIndex === i ? '–' : '+' }}</span>
          </button>
          <p v-if="openIndex === i" class="faq-answer animate-popIn">{{ item.a }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { faqItems } from '~/data/faq';

const openIndex = ref<number | null>(null);
const toggle = (i: number) => {
  openIndex.value = openIndex.value === i ? null : i;
};
</script>

<style scoped>
.faq-section {
  padding-top: 72px;
}
.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: 40px;
  align-items: start;
}
.faq-title {
  font-size: 32px;
  letter-spacing: -0.02em;
  margin: 0 0 14px;
  font-weight: 500;
}
.faq-cta {
  font-size: 14px;
  color: var(--pk-link);
}
.faq-list {
  border-top: 1px solid var(--pk-border);
}
.faq-row {
  border-bottom: 1px solid var(--pk-border);
}
.faq-question {
  display: flex;
  gap: 16px;
  align-items: baseline;
  width: 100%;
  padding: 17px 4px;
  color: var(--pk-text);
  font-size: 16px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
}
.faq-q-text {
  flex: 1;
}
.faq-sign {
  color: var(--pk-accent);
  font-size: 19px;
}
.faq-answer {
  font-size: 14.5px;
  color: var(--pk-text-2);
  margin: 0 0 18px;
  padding: 0 40px 0 4px;
}
</style>
