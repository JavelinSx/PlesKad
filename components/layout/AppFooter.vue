<template>
  <footer class="site-footer">
    <div class="footer-grid">
      <div>
        <div class="footer-brand">
          <img src="/images/logo_512x512.png" alt="" class="footer-logo" />
          <span class="footer-name">ПлесКад</span>
        </div>
        <p class="footer-tagline">Кадастровые и геодезические работы в Плесецком районе с 2009 года.</p>
      </div>

      <div>
        <h6 class="footer-heading">Услуги</h6>
        <div class="footer-links">
          <NuxtLink to="/services" class="footer-link">Кадастровые работы в отношении земельных участков</NuxtLink>
          <NuxtLink to="/services" class="footer-link">Технические планы</NuxtLink>
          <NuxtLink to="/services" class="footer-link">Геодезия</NuxtLink>
          <NuxtLink to="/services" class="footer-link">Консультации</NuxtLink>
        </div>
      </div>

      <div>
        <h6 class="footer-heading">Справочное</h6>
        <div class="footer-links">
          <button type="button" class="footer-link footer-link--btn" @click="open('glossary')">Словарь терминов</button>
          <button type="button" class="footer-link footer-link--btn" @click="open('faq')">Частые вопросы</button>
          <button type="button" class="footer-link footer-link--btn" @click="open('laws')">Изменения в законах</button>
          <button type="button" class="footer-link footer-link--btn footer-link--muted" @click="open('privacy')">Политика конфиденциальности</button>
        </div>
      </div>

      <div>
        <h6 class="footer-heading">Контакты</h6>
        <div class="footer-links footer-contacts">
          <span class="footer-link-accent">{{ contacts.phone }}</span>
          <span class="footer-link-accent">{{ contacts.phone2 }}</span>
          <span>{{ contacts.email }}</span>
          <span>{{ contacts.address }}</span>
          <span class="footer-link--muted">{{ contacts.hours }}</span>
        </div>
      </div>
    </div>
    <div class="footer-bottom">© {{ year }} ПлесКад</div>
  </footer>
</template>

<script setup lang="ts">
import { contacts } from '~/data/team';

const { open } = usePopups();
const year = new Date().getFullYear();
</script>

<style scoped>
.site-footer {
  border-top: 1px solid var(--pk-border);
  margin-top: 80px;
  padding: 44px 0 34px;
}
.footer-grid {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 28px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
  gap: 34px;
}
.footer-brand {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 12px;
}
.footer-logo {
  width: 24px;
  height: 24px;
  border-radius: 5px;
}
.footer-name {
  font-weight: 500;
  font-size: 16px;
}
.footer-tagline {
  font-size: 13.5px;
  color: var(--pk-text-3);
  max-width: 270px;
  margin: 0;
}
.footer-heading {
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--pk-text-3);
  margin: 0 0 12px;
}
.footer-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 13.5px;
}
.footer-link {
  color: var(--pk-text-2);
  text-align: left;
}
.footer-link--btn {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
}
.footer-link--muted {
  color: var(--pk-text-3);
}
.footer-link-accent {
  color: var(--pk-link);
}
.footer-contacts span {
  color: var(--pk-text-2);
}
.footer-bottom {
  max-width: 1200px;
  margin: 28px auto 0;
  padding: 0 28px;
  font-size: 12.5px;
  color: var(--pk-text-3);
}
</style>
