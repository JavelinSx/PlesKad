<template>
  <section class="section team-section">
    <div class="team-grid">
      <div v-for="member in team" :key="member.name" class="card team-card animate-rise">
        <div class="team-avatar" />
        <h4 class="team-name">{{ member.name }}</h4>
        <div class="team-role">{{ member.role }}</div>
        <p class="team-about">{{ member.about }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { team } from '~/data/team';
</script>

<style scoped>
.team-section {
  padding-top: 48px;
}
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
  gap: 14px;
}
.team-card {
  padding: 22px;
}
.team-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--pk-surface-2);
  border: 1px solid var(--pk-border-strong);
  margin-bottom: 16px;
}
.team-name {
  font-size: 17px;
  margin: 0 0 4px;
  font-weight: 500;
}
.team-role {
  font-size: 13px;
  color: var(--pk-link);
  margin-bottom: 10px;
}
.team-about {
  font-size: 13.5px;
  color: var(--pk-text-3);
  margin: 0;
}
</style>
