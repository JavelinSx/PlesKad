<template>
  <PopupBase :model-value="activePopup === 'faq'" title="Частые вопросы" :width="640" @update:model-value="close">
    <div>
      <div v-for="(item, i) in faqItems" :key="item.q" class="faq-row">
        <button type="button" class="faq-question" @click="toggle(i)">
          <span class="faq-q-text">{{ item.q }}</span>
          <span class="faq-sign">{{ openIndex === i ? '–' : '+' }}</span>
        </button>
        <p v-if="openIndex === i" class="faq-answer animate-popIn">{{ item.a }}</p>
      </div>
    </div>
  </PopupBase>
</template>

<script setup lang="ts">
import { faqItems } from '~/data/faq';

const { activePopup, close } = usePopups();
const openIndex = ref<number | null>(null);

const toggle = (i: number) => {
  openIndex.value = openIndex.value === i ? null : i;
};

watch(activePopup, () => {
  openIndex.value = null;
});
</script>

<style scoped>
.faq-row {
  border-top: 1px solid var(--pk-border);
}
.faq-row:first-child {
  border-top: none;
}
.faq-question {
  display: flex;
  gap: 14px;
  align-items: baseline;
  width: 100%;
  padding: 15px 2px;
  color: var(--pk-text);
  font-size: 15px;
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
  font-size: 18px;
}
.faq-answer {
  font-size: 14px;
  color: var(--pk-text-2);
  margin: 0 0 16px;
  padding-right: 30px;
}
</style>
