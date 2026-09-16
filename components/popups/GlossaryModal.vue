<template>
  <PopupBase :model-value="activePopup === 'glossary'" title="Словарь терминов" :width="720" @update:model-value="close">
    <div class="term-list">
      <div v-for="term in glossaryTerms" :key="term.t" class="term-row">
        <span class="term-letter">{{ term.t.charAt(0) }}</span>
        <span>
          <span class="term-title">{{ term.t }}</span>
          <span class="term-desc">{{ term.d }}</span>
        </span>
      </div>
    </div>
  </PopupBase>
</template>

<script setup lang="ts">
import { glossaryTerms } from '~/data/glossary';

const { activePopup, close } = usePopups();
</script>

<style scoped>
.term-list {
  display: flex;
  flex-direction: column;
}
.term-row {
  display: flex;
  gap: 16px;
  padding: 13px 0;
  border-top: 1px solid var(--pk-border);
}
.term-row:first-child {
  border-top: none;
}
.term-letter {
  font-size: 13px;
  color: var(--pk-accent);
  min-width: 14px;
}
.term-title {
  display: block;
  font-size: 14.5px;
  margin-bottom: 3px;
  color: var(--pk-text);
}
.term-desc {
  display: block;
  font-size: 13px;
  color: var(--pk-text-3);
}
</style>
