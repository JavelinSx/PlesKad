<template>
  <PopupBase :model-value="activePopup === 'laws'" title="Изменения в законодательстве" :width="680" @update:model-value="close">
    <div class="live-note">
      <span class="live-dot" />
      Список пополняется автоматически из официальных источников
    </div>
    <div v-for="law in lawUpdates" :key="law.t" class="law-row">
      <span class="law-date">{{ law.date }}</span>
      <span>
        <span class="law-title">{{ law.t }}</span>

        <p v-if="law.details.length === 1" class="law-desc">{{ law.details[0] }}</p>
        <ol v-else class="law-steps">
          <li v-for="(step, i) in law.details" :key="i">{{ step }}</li>
        </ol>

        <span class="law-src">Источник: {{ law.src }}</span>
      </span>
    </div>
  </PopupBase>
</template>

<script setup lang="ts">
import { lawUpdates } from '~/data/laws';

const { activePopup, close } = usePopups();
</script>

<style scoped>
.live-note {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 12.5px;
  color: var(--pk-text-3);
  margin-bottom: 16px;
}
.live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--pk-accent);
  animation: livedot 2.4s ease-in-out infinite;
}
.law-row {
  display: grid;
  grid-template-columns: 86px minmax(0, 1fr);
  gap: 16px;
  padding: 15px 0;
  border-top: 1px solid var(--pk-border);
}
.law-row:first-child {
  border-top: none;
}
.law-date {
  font-size: 13px;
  color: var(--pk-link);
}
.law-title {
  display: block;
  font-size: 15px;
  margin-bottom: 5px;
  color: var(--pk-text);
}
.law-desc {
  display: block;
  font-size: 13.5px;
  line-height: 1.55;
  color: var(--pk-text-3);
  margin: 0 0 8px;
}
.law-steps {
  margin: 0 0 8px;
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.law-steps li {
  font-size: 13.5px;
  line-height: 1.5;
  color: var(--pk-text-3);
}
.law-src {
  font-size: 12px;
  color: var(--pk-text-3);
}
</style>
