<template>
  <div>
    <section class="section services-hero">
      <div class="services-hero-grid" />
      <div class="services-hero-inner">
        <h6 class="kicker">Услуги</h6>
        <h1 class="services-title">Полный цикл кадастровых работ</h1>
        <p class="services-lead">Выберите направление и конкретную работу — покажем, когда она нужна и какие документы собрать.</p>
      </div>
    </section>

    <section class="section">
      <ServiceAccordion />
    </section>

    <ServiceFaqAccordion />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Услуги — межевание, технические планы, геодезия, консультации | ПлесКад',
  meta: [
    {
      name: 'description',
      content: 'Межевание земельных участков, технические планы зданий и помещений, геодезические изыскания, консультации кадастрового инженера в Плесецком районе.',
    },
  ],
});
</script>

<style scoped>
.services-hero {
  position: relative;
  overflow: hidden;
  padding: 72px 0 44px;
}
.services-hero-grid {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image: linear-gradient(var(--pk-grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--pk-grid-line) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(100% 70% at 15% 0%, #000 10%, transparent 75%);
}
.services-hero-inner {
  position: relative;
  z-index: 1;
}
.services-title {
  font-size: clamp(32px, 4.6vw, 52px);
  line-height: 1.04;
  letter-spacing: -0.025em;
  margin: 0 0 18px;
  font-weight: 500;
  max-width: 760px;
  text-wrap: balance;
}
.services-lead {
  font-size: 18px;
  color: var(--pk-text-2);
  max-width: 600px;
  margin: 0;
}
</style>
