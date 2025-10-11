<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <section class="cta-section">
    <h2>{{ t('home.cta.title') }}</h2>
    <p>{{ t('home.cta.subtitle') }}</p>
  </section>
</template>

<style scoped>
.cta-section {

  background-color: #CDAC77;

}
.cta-section h2 {  font-size: 2.5rem; color: #2C1810; margin-bottom: 0.5rem; }
.cta-section p {  font-size: 1.8rem; color: #4a2c1d; margin-top: 0; margin-bottom: 0; }
</style>