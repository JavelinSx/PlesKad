<template>
  <PopupBase :model-value="activePopup === 'privacy'" title="Политика конфиденциальности" :width="600" @update:model-value="close">
    <p class="privacy-text">
      Оставляя заявку, вы даёте согласие на обработку персональных данных: имени, телефона, адреса электронной почты и
      сведений об объекте недвижимости.
    </p>
    <p class="privacy-text">
      Данные используются только для связи с вами и выполнения кадастровых работ, не передаются третьим лицам, кроме
      случаев, предусмотренных законом.
    </p>
    <p class="privacy-text privacy-text--last">
      Отозвать согласие можно письмом на {{ contacts.email }}.
    </p>
  </PopupBase>
</template>

<script setup lang="ts">
import { contacts } from '~/data/team';

const { activePopup, close } = usePopups();
</script>

<style scoped>
.privacy-text {
  font-size: 13.5px;
  color: var(--pk-text-2);
  margin: 0 0 12px;
}
.privacy-text--last {
  margin-bottom: 0;
}
</style>
