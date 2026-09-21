<template>
  <section class="section office-section">
    <div class="office-grid">
      <div class="office-map">
        <img src="/images/map-ples.png" :alt="`Карта: ${contacts.address}`" class="office-map-img" />
        <div class="office-map-label">{{ contacts.address }}</div>
      </div>
      <div class="card office-card">
        <h3 class="office-title">Офис и контакты</h3>
        <div class="office-list">
          <span>
            <span class="office-label">Телефон</span>
            <a :href="contacts.phoneHref" class="office-value office-value--accent">{{ contacts.phone }}</a>
            <a :href="contacts.phone2Href" class="office-value office-value--accent office-phone-second">{{ contacts.phone2 }}</a>
          </span>
          <span>
            <span class="office-label">Почта</span>
            <a :href="`mailto:${contacts.email}`" class="office-value office-value--accent">{{ contacts.email }}</a>
          </span>
          <span>
            <span class="office-label">Часы работы</span>
            <span class="office-value">{{ contacts.hours }}</span>
          </span>
          <span>
            <span class="office-label">Выезд</span>
            <span class="office-value">{{ contacts.coverage }}</span>
          </span>
        </div>
        <NuxtLink to="/request" class="btn-primary office-cta">Оставить заявку</NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { contacts } from '~/data/team';
</script>

<style scoped>
.office-section {
  padding-top: 48px;
}
.office-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: 14px;
}
.office-map {
  position: relative;
  border: 1px solid var(--pk-border);
  border-radius: 14px;
  overflow: hidden;
  min-height: 280px;
}
.office-map-img {
  width: 100%;
  height: 100%;
  min-height: 280px;
  object-fit: cover;
}
.office-map-label {
  position: absolute;
  bottom: 14px;
  left: 14px;
  background: var(--pk-surface);
  border: 1px solid var(--pk-border-strong);
  border-radius: 9px;
  padding: 9px 13px;
  font-size: 13px;
}
.office-card {
  padding: 26px;
}
.office-title {
  font-size: 22px;
  margin: 0 0 18px;
  font-weight: 500;
}
.office-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  font-size: 15px;
}
.office-label {
  display: block;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--pk-text-3);
  margin-bottom: 3px;
}
.office-value {
  color: var(--pk-text);
}
.office-value--accent {
  color: var(--pk-link);
  font-weight: 500;
}
.office-phone-second {
  display: block;
  margin-top: 2px;
}
.office-cta {
  margin-top: 22px;
}
</style>
