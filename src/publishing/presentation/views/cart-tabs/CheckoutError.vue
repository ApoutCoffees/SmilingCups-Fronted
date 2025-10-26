<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
  <div class="error-container card">
    <div class="icon error"><i class="pi pi-times-circle"></i></div>
    <h2>{{ t('checkout.problem_title') }}</h2>
    <p>{{ t('checkout.problem_message') }}</p>
    <div class="actions">
      <router-link to="/checkout/payment" class="btn btn-primary">{{ t('checkout.try_again') }}</router-link>
    </div>
  </div>
</template>

<style scoped>
.error-container { max-width: 600px; margin: 4rem auto; text-align: center; }
.card { background-color: #FDFCF8; padding: 3rem; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border: 1px solid #EFE1C3; }
.icon { font-size: 4rem; margin-bottom: 1.5rem; }
.icon.error { color: #D32F2F; }
h2 { font-family: 'Amaranth', sans-serif; font-size: 2rem; color: #2C1810; margin-bottom: 1rem; }
p { font-family: 'Amaranth', sans-serif; font-size: 1.1rem; color: #5c4b44; line-height: 1.6; margin-bottom: 2rem; }
.actions { display: flex; justify-content: center; gap: 1rem; }
.btn { text-decoration: none; border: 2px solid #2C1810; border-radius: 12px; padding: 0.8rem 1.8rem; font-family: 'Amaranth', sans-serif; font-size: 1rem; font-weight: bold; cursor: pointer; transition: all 0.2s ease-in-out; }
.btn-primary { background-color: #2C1810; color: #F5EFE6; }
.btn-primary:hover { background-color: #4a2c1d; }
</style>