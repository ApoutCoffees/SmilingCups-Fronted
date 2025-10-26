<script setup>
import { ref, onMounted, inject } from 'vue';
import { useI18n } from 'vue-i18n';
import coffeeApi from '../../../../services/coffe-api.js';

const { t } = useI18n();
const auth = inject('auth');
const orders = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  const userId = auth.loggedInUserId.value;
  if (!userId) {
    error.value = t('profile.not_logged_in'); // Reusing translation key
    loading.value = false;
    return;
  }
  try {
    orders.value = await coffeeApi.getOrders(userId);
  } catch(e) {
    console.error("Error fetching orders:", e);
    error.value = t('orders.error_loading'); // Add this key to i18n files
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="content-card card">
    <h2>{{ t('orders.title') }}</h2>
    <div v-if="loading" class="state-message">Loading orders...</div>
    <div v-else-if="error" class="state-message error">{{ error }}</div>
    <div v-else-if="orders.length === 0" class="state-message">{{ t('orders.no_orders') }}</div>
    <div v-else class="order-list">
      <div v-for="order in orders" :key="order.id" class="order-item card">
        <div class="order-info">
          <span class="order-number">{{ order.orderNumber }}</span>
          <span class="order-status delivered">{{ t('profile.order_history.status_delivered') }}</span> {/* This needs dynamic status handling later */}
          <p>{{ t('profile.next_delivery.product_placeholder') }}</p> {/* Placeholder, ideally get product name */}
        </div>
        <div class="order-details">
          <span class="order-price">${{ order.total.toFixed(2) }}</span>
          <a href="#" class="details-link">{{ t('profile.order_history.see_details') }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card { background-color: #FDFCF8; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border: 1px solid #EFE1C3; }
h2 { font-family: 'Amaranth', sans-serif; font-size: 1.5rem; color: #2C1810; margin-top: 0; margin-bottom: 1.5rem; border-bottom: 1px solid #EFE1C3; padding-bottom: 1rem; }
.state-message { font-family: 'Amaranth', sans-serif; font-size: 1.1rem; padding: 2rem; color: #5c4b44; text-align: center; }
.error { color: #D32F2F; }
.order-list { display: flex; flex-direction: column; gap: 1rem; }
.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: #FFFBEB; /* Slightly different background for items */
}
.order-info .order-number { font-family: 'Amaranth', sans-serif; font-weight: bold; color: #2C1810; display: block; margin-bottom: 0.3rem; }
.order-info .order-status {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  margin-bottom: 0.3rem;
  text-transform: uppercase;
}
.order-status.delivered { background-color: #d4edda; color: #155724; }
/* Add more statuses like .processing, .shipped etc. later */
.order-info p { font-family: 'Amaranth', sans-serif; font-size: 0.9rem; color: #5c4b44; margin: 0; }
.order-details { text-align: right; }
.order-details .order-price { font-family: 'Amaranth', sans-serif; font-size: 1.1rem; font-weight: bold; color: #2C1810; display: block; margin-bottom: 0.3rem; }
.order-details .details-link { font-family: 'Amaranth', sans-serif; font-size: 0.9rem; color: #CDAC77; text-decoration: none; font-weight: bold; }
.order-details .details-link:hover { color: #A08056; }

@media (max-width: 768px) {
  .order-item { flex-direction: column; align-items: flex-start; gap: 0.5rem;}
  .order-details { text-align: left; margin-top: 0.5rem; }
}
</style>