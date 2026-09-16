<template>
  <section class="hero">
    <div class="hero-grid-bg" />
    <div class="hero-glow hero-glow--a" />
    <div class="hero-glow hero-glow--b" />
    <div class="hero-inner">
      <div class="animate-rise">
        <div class="hero-badge">Кадастровый инженер · с 2009 года</div>
        <h1 class="hero-title">Кадастровые работы в Плесецком районе</h1>
        <p class="hero-lead">
          Оформим землю, дом или гараж в ЕГРН — без походов по инстанциям. Выезжаем по Плесецкому району и всей
          Архангельской области.
        </p>
        <div class="hero-actions">
          <NuxtLink to="/request" class="btn-primary">Оставить заявку</NuxtLink>
          <NuxtLink to="/services" class="btn-secondary">Посмотреть услуги</NuxtLink>
        </div>
        <div class="hero-meta">
          <span>Бесплатная консультация</span>
          <span>Работаем с частниками и организациями</span>
        </div>
      </div>
      <div class="hero-media animate-rise delay-100">
        <img src="/images/map-ples.png" alt="Карта Плесецкого района" class="hero-map" />
        <div class="hero-map-shade" />
        <div class="hero-map-grid" />
        <div class="hero-map-label">рп. Плесецк · Архангельская область</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding: 104px 0 88px;
}
.hero-grid-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image: linear-gradient(var(--pk-grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--pk-grid-line) 1px, transparent 1px);
  background-size: 60px 60px;
  animation: gridDrift 26s linear infinite;
  mask-image: radial-gradient(120% 80% at 20% 0%, #000 20%, transparent 78%);
}
.hero-glow {
  position: absolute;
  z-index: 0;
  pointer-events: none;
  border-radius: 50%;
  filter: blur(30px);
}
.hero-glow--a {
  top: -180px;
  left: -120px;
  width: 620px;
  height: 520px;
  background: radial-gradient(circle, rgba(34, 197, 94, 0.22), transparent 66%);
  animation: glow 14s ease-in-out infinite;
}
.hero-glow--b {
  top: 40px;
  right: -160px;
  width: 540px;
  height: 460px;
  background: radial-gradient(circle, rgba(70, 120, 160, 0.18), transparent 68%);
  filter: blur(34px);
  animation: glow 19s ease-in-out infinite reverse;
}
.hero-inner {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 28px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 330px), 1fr));
  gap: 48px;
  align-items: center;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--pk-link);
  border: 1px solid rgba(34, 197, 94, 0.34);
  border-radius: 999px;
  padding: 5px 12px;
  margin-bottom: 22px;
}
.hero-title {
  font-size: clamp(34px, 5.2vw, 60px);
  line-height: 1.02;
  letter-spacing: -0.025em;
  margin: 0 0 20px;
  font-weight: 500;
  text-wrap: balance;
}
.hero-lead {
  font-size: 19px;
  line-height: 1.5;
  color: var(--pk-text-2);
  max-width: 520px;
  margin: 0 0 30px;
}
.hero-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 34px;
}
.hero-meta {
  display: flex;
  gap: 28px;
  flex-wrap: wrap;
  font-size: 13.5px;
  color: var(--pk-text-3);
}
.hero-media {
  position: relative;
}
.hero-map {
  position: relative;
  width: 100%;
  height: 340px;
  object-fit: cover;
  opacity: 0.9;
  border-radius: 14px;
}
.hero-media {
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 22px 60px rgba(41, 43, 49, 0.15);
}
.hero-map-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(243, 245, 254, 0.04), rgba(41, 43, 49, 0.3));
}
.hero-map-grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(34, 197, 94, 0.5) 1px, transparent 1px),
    linear-gradient(90deg, rgba(34, 197, 94, 0.5) 1px, transparent 1px);
  background-size: 56px 56px;
  opacity: 0.5;
}
.hero-map-label {
  position: absolute;
  bottom: 16px;
  left: 18px;
  font-size: 12.5px;
  color: var(--pk-on-accent);
  background: rgba(41, 43, 49, 0.55);
  padding: 3px 9px;
  border-radius: 6px;
}
</style>
