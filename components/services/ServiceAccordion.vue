<template>
  <div class="card acc-wrap">
    <div v-for="(cat, i) in serviceCategories" :key="cat.id" :id="cat.id" class="acc-row">
      <button type="button" class="acc-head" @click="toggleCat(cat.id)">
        <span class="acc-num">{{ String(i + 1).padStart(2, '0') }}</span>
        <span class="acc-head-text">
          <span class="acc-name">{{ cat.n }}</span>
          <span class="acc-short">{{ cat.short }}</span>
        </span>
        <span class="acc-count">{{ cat.sub.length }}</span>
        <span class="acc-chevron">{{ openCat === cat.id ? '–' : '+' }}</span>
      </button>

      <div v-if="openCat === cat.id" class="acc-body animate-popIn">
        <p class="acc-desc">{{ cat.d }}</p>
        <div class="sub-grid">
          <div v-for="(sub, j) in cat.sub" :key="sub.n" class="sub-card">
            <div class="sub-name">{{ sub.n }}</div>
            <p class="sub-desc">{{ sub.d }}</p>
            <button type="button" class="sub-more" @click="toggleSub(cat.id, j)">
              {{ isSubOpen(cat.id, j) ? 'Свернуть' : 'Подробнее' }}
            </button>

            <div v-if="isSubOpen(cat.id, j)" class="sub-detail animate-popIn">
              <div class="detail-label">Когда нужно</div>
              <div class="detail-list">
                <span v-for="w in sub.w" :key="w" class="detail-item"><span class="dot">•</span>{{ w }}</span>
              </div>
              <div class="detail-label detail-label--muted">Документы</div>
              <div class="detail-list">
                <span v-for="doc in sub.docs" :key="doc" class="detail-item detail-item--plain">{{ doc }}</span>
              </div>
              <NuxtLink :to="`/request?service=${cat.id}&sub=${j}`" class="detail-cta">Оставить заявку</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { serviceCategories } from '~/data/services';

const route = useRoute();
const openCat = ref<string | null>(null);
const openSub = ref<string | null>(null);

const toggleCat = (id: string) => {
  openCat.value = openCat.value === id ? null : id;
  openSub.value = null;
};

const toggleSub = (catId: string, index: number) => {
  const key = `${catId}-${index}`;
  openSub.value = openSub.value === key ? null : key;
};

const isSubOpen = (catId: string, index: number) => openSub.value === `${catId}-${index}`;

onMounted(() => {
  const hash = route.hash?.replace('#', '');
  if (hash && serviceCategories.some((c) => c.id === hash)) {
    openCat.value = hash;
    nextTick(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
});
</script>

<style scoped>
.acc-wrap {
  overflow: hidden;
}
.acc-row {
  border-bottom: 1px solid var(--pk-border);
  background: var(--pk-surface);
  scroll-margin-top: 90px;
}
.acc-row:last-child {
  border-bottom: none;
}
.acc-head {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 24px 26px;
  color: var(--pk-text);
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
}
.acc-head:hover {
  background: var(--pk-surface-2);
}
.acc-num {
  font-size: 12px;
  color: var(--pk-link);
  min-width: 22px;
}
.acc-head-text {
  flex: 1;
  min-width: 0;
}
.acc-name {
  display: block;
  font-size: 22px;
  letter-spacing: -0.015em;
}
.acc-short {
  display: block;
  font-size: 13.5px;
  color: var(--pk-text-3);
  margin-top: 4px;
}
.acc-count {
  font-size: 12.5px;
  color: var(--pk-text-3);
}
.acc-chevron {
  font-size: 22px;
  color: var(--pk-accent);
  width: 22px;
  text-align: center;
}
.acc-body {
  padding: 4px 26px 26px;
}
.acc-desc {
  font-size: 14.5px;
  color: var(--pk-text-2);
  max-width: 640px;
  margin: 0 0 18px;
}
.sub-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  gap: 10px;
}
.sub-card {
  border: 1px solid var(--pk-border);
  border-radius: 10px;
  background: var(--pk-surface-2);
  padding: 16px 17px;
}
.sub-card:hover {
  border-color: rgba(22, 163, 74, 0.5);
}
.sub-name {
  font-size: 15px;
  line-height: 1.25;
  margin-bottom: 7px;
}
.sub-desc {
  font-size: 13px;
  color: var(--pk-text-3);
  margin: 0 0 12px;
}
.sub-more {
  font-size: 13px;
  color: var(--pk-link);
  font-weight: 500;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}
.sub-detail {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid rgba(34, 197, 94, 0.24);
}
.detail-label {
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--pk-link);
  margin-bottom: 8px;
}
.detail-label--muted {
  color: var(--pk-text-3);
}
.detail-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
}
.detail-item {
  font-size: 13px;
  color: var(--pk-text-2);
  display: flex;
  gap: 8px;
}
.detail-item--plain {
  display: block;
}
.dot {
  color: var(--pk-accent);
}
.detail-cta {
  display: inline-block;
  font-size: 13px;
  font-weight: 500;
  color: var(--pk-link);
  border: 1px solid var(--pk-link);
  border-radius: 8px;
  padding: 8px 14px;
}
.detail-cta:hover {
  background: rgba(34, 197, 94, 0.12);
}
</style>
