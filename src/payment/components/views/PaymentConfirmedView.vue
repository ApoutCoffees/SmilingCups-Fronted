<script setup>
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const { t } = useI18n();
const orderId = route.query.orderId || 'N/A';
</script>

<template>
  <div class="confirmation-container card">
    <div class="icon success"><i class="pi pi-check-circle"></i></div>
    <h2>{{ t('checkout.order_confirmed_title') }}</h2>
    <p>{{ t('checkout.order_confirmed_message') }}</p>
    <div class="order-details">
      <p><strong>{{ t('checkout.order_number') }}</strong> {{ orderId }}</p>
    </div>
    <p class="thank-you">{{ t('checkout.thank_you_message') }}</p>
    <div class="actions">
      <router-link to="/catalog" class="btn btn-secondary">{{ t('checkout.back_to_shop') }}</router-link>
      <router-link :to="{ name: 'profile', query: { tab: 'orders' } }" class="btn btn-primary">{{ t('checkout.view_order_details') }}</router-link>
    </div>
  </div>
</template>

<style scoped>
.confirmation-container { max-width: 600px; margin: 4rem auto; text-align: center; }
.card { background-color: #FDFCF8; padding: 3rem; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border: 1px solid #EFE1C3; }
.icon { font-size: 4rem; margin-bottom: 1.5rem; }
.icon.success { color: #4CAF50; }
h2 { font-family: 'Amaranth', sans-serif; font-size: 2rem; color: #2C1810; margin-bottom: 1rem; }
p { font-family: 'Amaranth', sans-serif; font-size: 1.1rem; color: #5c4b44; line-height: 1.6; }
.order-details { background-color: #FFFBEB; padding: 1rem; border-radius: 8px; margin: 2rem 0; text-align: left; }
.order-details p { font-size: 1rem; margin: 0.5rem 0; }
.thank-you { font-weight: bold; margin-bottom: 2rem; }
.actions { display: flex; justify-content: center; gap: 1rem; }
.btn { text-decoration: none; border: 2px solid #2C1810; border-radius: 12px; padding: 0.8rem 1.8rem; font-family: 'Amaranth', sans-serif; font-size: 1rem; font-weight: bold; cursor: pointer; transition: all 0.2s ease-in-out; }
.btn-primary { background-color: #2C1810; color: #F5EFE6; }
.btn-primary:hover { background-color: #4a2c1d; }
.btn-secondary { background-color: #F5EFE6; color: #2C1810; }
.btn-secondary:hover { background-color: #e0d8ce; }
</style>