<script setup>
import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import { Order } from "../../../domain/model/Order.js";

const { t } = useI18n();

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="order-item card">
    <div class="order-main">
      <div class="order-header">
        <span class="order-id">#{{ order.orderNumber }}</span>
        <span class="order-date">{{ order.formattedDate }}</span>
      </div>
      <div class="order-status" :class="order.status.toLowerCase()">
        {{ order.status }}
      </div>
    </div>

    <div class="order-details">
      <p class="product-desc">{{ t('profile.next_delivery.product_placeholder') }}</p>
      <div class="price-action">
        <span class="total">{{ order.formattedTotal }}</span>
        <a href="#" class="link">{{ t('profile.order_history.see_details') }}</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card { background-color: #FFFBEB; padding: 1rem 1.5rem; border-radius: 8px; border: 1px solid #EFE1C3; margin-bottom: 0.8rem; display: flex; justify-content: space-between; align-items: center; }

.order-main { display: flex; flex-direction: column; gap: 0.3rem; }
.order-header { display: flex; gap: 0.5rem; align-items: baseline; }
.order-id { font-family: 'Amaranth', sans-serif; font-weight: bold; color: #2C1810; }
.order-date { font-size: 0.85rem; color: #5c4b44; }

.order-status { font-size: 0.75rem; font-weight: bold; text-transform: uppercase; padding: 0.2rem 0.5rem; border-radius: 4px; width: fit-content; }
.order-status.completed { background-color: #d4edda; color: #155724; }
.order-status.pending { background-color: #fff3cd; color: #856404; }
.order-status.cancelled { background-color: #f8d7da; color: #721c24; }

.order-details { text-align: right; }
.product-desc { margin: 0 0 0.4rem 0; font-size: 0.9rem; color: #5c4b44; font-family: 'Amaranth', sans-serif; }
.price-action { display: flex; flex-direction: column; align-items: flex-end; }
.total { font-weight: bold; font-size: 1.1rem; color: #2C1810; font-family: 'Amaranth', sans-serif; }
.link { font-size: 0.8rem; color: #CDAC77; text-decoration: none; font-weight: bold; font-family: 'Amaranth', sans-serif; }
.link:hover { text-decoration: underline; }

@media (max-width: 600px) {
  .card { flex-direction: column; align-items: flex-start; gap: 1rem; }
  .order-details { text-align: left; width: 100%; display: flex; justify-content: space-between; align-items: center; }
  .price-action { align-items: flex-start; }
}
</style>