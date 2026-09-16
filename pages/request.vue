<template>
  <div class="section request-page">
    <div class="request-head">
      <div>
        <h6 class="kicker">Заявка</h6>
        <h1 class="request-title">Расскажите про объект — ответим в течение рабочего дня</h1>
        <p class="request-lead">Заполнение занимает пару минут. Консультация бесплатная, отказаться можно на любом шаге.</p>
      </div>
    </div>

    <div class="request-grid">
      <RequestFormStepper />

      <div class="side-col">
        <div class="card side-card">
          <h4 class="side-title">Быстрее — позвонить</h4>
          <a :href="contacts.phoneHref" class="side-phone">{{ contacts.phone }}</a>
          <p class="side-note">{{ contacts.hours }}, {{ contacts.address }}</p>
        </div>
        <div class="card side-card">
          <h4 class="side-title">Что будет дальше</h4>
          <div class="steps-list">
            <span class="steps-item"><span class="steps-num">1</span>Уточним задачу и документы по телефону</span>
            <span class="steps-item"><span class="steps-num">2</span>Назовём срок и стоимость</span>
            <span class="steps-item"><span class="steps-num">3</span>Выедем на объект и подготовим документы</span>
            <span class="steps-item"><span class="steps-num">4</span>Передадим выписку из ЕГРН</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { contacts } from '~/data/team';
import { serviceCategories } from '~/data/services';

const route = useRoute();
const store = useRequestStore();

onMounted(() => {
  const serviceId = route.query.service as string | undefined;
  const subIndex = route.query.sub as string | undefined;

  if (serviceId && serviceCategories.some((c) => c.id === serviceId)) {
    store.setCategory(serviceId);
    if (subIndex !== undefined && !Number.isNaN(Number(subIndex))) {
      store.setSubService(Number(subIndex));
    }
  }
});

useHead({
  title: 'Оставить заявку | ПлесКад',
  meta: [{ name: 'description', content: 'Оставьте заявку на кадастровые работы в Плесецком районе — ответим в течение рабочего дня.' }],
});
</script>

<style scoped>
.request-page {
  padding-top: 56px;
  padding-bottom: 80px;
}
.request-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}
.request-title {
  font-size: clamp(30px, 4vw, 44px);
  line-height: 1.06;
  letter-spacing: -0.025em;
  margin: 0 0 12px;
  font-weight: 500;
  max-width: 620px;
  text-wrap: balance;
}
.request-lead {
  font-size: 16px;
  color: var(--pk-text-2);
  margin: 0;
  max-width: 520px;
}
.request-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: 14px;
  align-items: start;
}
.side-col {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.side-card {
  padding: 22px;
}
.side-title {
  font-size: 16px;
  margin: 0 0 12px;
  font-weight: 500;
}
.side-phone {
  font-size: 20px;
  font-weight: 500;
  color: var(--pk-link);
}
.side-note {
  font-size: 13px;
  color: var(--pk-text-3);
  margin: 10px 0 0;
}
.steps-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 13.5px;
  color: var(--pk-text-2);
}
.steps-item {
  display: flex;
  gap: 10px;
}
.steps-num {
  color: var(--pk-link);
}
</style>
