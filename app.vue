<template>
  <UApp>
    <NuxtLayout>
      <div class="page-container">
        <NuxtPage />
      </div>
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
useHead({
  meta: [
    { name: 'application-name', content: 'ПлесКад' },
    { name: 'apple-mobile-web-app-title', content: 'ПлесКад' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'format-detection', content: 'telephone=no' },
  ],
})
</script>

<style>
.page-container {
  transition: opacity 0.4s, transform 0.4s;
}
</style>
