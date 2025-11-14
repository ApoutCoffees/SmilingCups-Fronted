<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
  <div class="content-card card">
    <h2>{{ t('profile.sidebar.rewards') }}</h2>
    <p>Rewards program coming soon!</p>
  </div>
</template>

<style scoped>
.card { background-color: #FDFCF8; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border: 1px solid #EFE1C3; }
h2 { font-family: 'Amaranth', sans-serif; font-size: 1.5rem; color: #2C1810; margin-top: 0; margin-bottom: 1rem; border-bottom: 1px solid #EFE1C3; padding-bottom: 1rem; }
p { font-family: 'Amaranth', sans-serif; color: #5c4b44; }
</style>