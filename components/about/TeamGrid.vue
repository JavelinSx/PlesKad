<template>
  <section class="section team-section">
    <div class="team-grid">
      <div v-for="member in team" :key="member.name" class="card team-card animate-rise">
        <img v-if="member.photo" :src="member.photo" :alt="member.name" class="team-avatar team-avatar--photo" />
        <div v-else class="team-avatar team-avatar--placeholder">{{ initials(member.name) }}</div>
        <h4 class="team-name">{{ member.name }}</h4>
        <div class="team-role">{{ member.role }}</div>
        <p class="team-about">{{ member.about }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { team } from '~/data/team';

const initials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();
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
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-bottom: 16px;
}
.team-avatar--photo {
  object-fit: cover;
  border: 1px solid var(--pk-border-strong);
}
.team-avatar--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--pk-surface-2);
  border: 1px solid var(--pk-border-strong);
  color: var(--pk-text-3);
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.02em;
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
