<template>
  <div class="site">
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />

    <GlossaryModal />
    <FaqModal />
    <LawsModal />
    <PrivacyModal />
  </div>
</template>

<style scoped>
.site {
  min-height: 100vh;
  font-size: 15px;
  line-height: 1.55;
}
</style>
