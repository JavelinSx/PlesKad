<template>
  <header class="site-header">
    <div class="header-inner">
      <NuxtLink to="/" class="brand">
        <img src="/images/logo_512x512.png" alt="ПлесКад" class="brand-logo" />
        <span class="brand-name">ПлесКад</span>
      </NuxtLink>

      <nav class="nav">
        <NuxtLink to="/" class="nav-link" exact-active-class="nav-link--active">Главная</NuxtLink>
        <NuxtLink to="/services" class="nav-link" active-class="nav-link--active">Услуги</NuxtLink>
        <NuxtLink to="/about" class="nav-link" active-class="nav-link--active">О нас</NuxtLink>
        <NuxtLink to="/request" class="nav-link" active-class="nav-link--active">Заявка</NuxtLink>
      </nav>

      <div class="spacer" />

      <div class="header-phones">
        <a :href="contacts.phoneHref" class="header-phone">{{ contacts.phone }}</a>
        <a :href="contacts.phone2Href" class="header-phone">{{ contacts.phone2 }}</a>
      </div>

      <ThemeToggle />

      <NuxtLink to="/request" class="btn-outline">Оставить заявку</NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { contacts } from '~/data/team';
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: var(--pk-header-bg);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--pk-border);
}
.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px 28px;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}
.brand {
  display: flex;
  align-items: center;
  gap: 9px;
  color: var(--pk-text);
}
.brand-logo {
  width: 26px;
  height: 26px;
  border-radius: 5px;
}
.brand-name {
  font-weight: 500;
  letter-spacing: -0.01em;
  font-size: 17px;
}
.nav {
  display: flex;
  gap: 4px;
  margin-left: 8px;
  flex-wrap: wrap;
}
.nav-link {
  padding: 7px 12px;
  border-radius: 8px;
  font-size: 14px;
  white-space: nowrap;
  color: var(--pk-text-3);
}
.nav-link--active {
  color: var(--pk-link);
  background: rgba(34, 197, 94, 0.12);
}
.spacer {
  flex: 1;
}
.header-phones {
  display: none;
}
.header-phone {
  font-size: 12.5px;
  color: var(--pk-link);
  line-height: 1.4;
}
@media (min-width: 900px) {
  .header-phones {
    display: flex;
    flex-direction: column;
  }
}
.btn-outline {
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  color: var(--pk-link);
  border: 1px solid var(--pk-link);
  border-radius: 8px;
  padding: 8px 15px;
}
.btn-outline:hover {
  background: rgba(34, 197, 94, 0.12);
}
</style>
