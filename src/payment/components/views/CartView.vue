<script setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { usePaymentStore } from '../../application/payment.store.js';

const { t } = useI18n();
const cart = usePaymentStore();
const router = useRouter();

const goToShipping = () => {
  router.push('/checkout/shipping');
};
</script>

<template>
  <div class="checkout-container">
    <h1>{{ t('checkout.title') }}</h1>
    <div class="checkout-steps">
      <span class="step active">1 {{ t('checkout.step1') }}</span> &rarr;
      <span class="step">2 {{ t('checkout.step2') }}</span> &rarr;
      <span class="step">3 {{ t('checkout.step3') }}</span>
    </div>

    <div class="checkout-content">
      <div class="cart-details">
        <h2>{{ t('checkout.your_cart') }}</h2>
        <div v-if="cart.selectedPlan" class="cart-item">
          <div class="item-info">
            <h3>{{ cart.selectedPlan.name }} Plan</h3>
            <p>{{ cart.selectedPlan.billing }}</p>
          </div>
          <span class="item-price">${{ cart.selectedPlan.price.toFixed(2) }}</span>
        </div>
        <div v-else class="empty-cart">
          <p>{{ t('checkout.empty_cart') }}</p>
          <router-link to="/subscriptions" class="btn btn-secondary">{{ t('checkout.go_to_subscriptions') }}</router-link>
        </div>
      </div>

      <div class="order-summary card" v-if="cart.selectedPlan">
        <h2>{{ t('checkout.order_summary') }}</h2>
        <div class="summary-item">
          <span>{{ t('checkout.subtotal') }}</span>
          <span>${{ cart.cartTotal.toFixed(2) }}</span>
        </div>
        <div class="summary-item">
          <span>{{ t('checkout.shipping') }}</span>
          <span>{{ t('checkout.free') }}</span>
        </div>
        <div class="summary-item total">
          <span>{{ t('checkout.total') }}</span>
          <span>${{ cart.cartTotal.toFixed(2) }}</span>
        </div>
        <button @click="goToShipping" class="btn btn-primary">{{ t('checkout.continue_to_shipping') }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkout-container { max-width: 1000px; margin: 2rem auto; padding: 2rem; background-color: #FFFBEB; border-radius: 15px; border: 2px solid #EFE1C3;}
.checkout-container h1 { font-family: 'Amaranth', sans-serif; text-align: center; color: #2C1810; margin-bottom: 1rem; }
.checkout-steps { display: flex; justify-content: center; gap: 1rem; margin-bottom: 2rem; font-family: 'Amaranth', sans-serif; color: #a08056; }
.step { padding: 0.5rem 1rem; border-radius: 20px; background-color: #F5EFE6; }
.step.active { background-color: #CDAC77; color: #2C1810; font-weight: bold; }
.checkout-content { display: flex; gap: 2rem; align-items: flex-start; }
.cart-details { flex: 2; }
.cart-details h2, .order-summary h2 { font-family: 'Amaranth', sans-serif; font-size: 1.5rem; color: #2C1810; margin-bottom: 1.5rem; border-bottom: 1px solid #EFE1C3; padding-bottom: 0.8rem; }
.cart-item { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid #EFE1C3; }
.item-info h3 { font-family: 'Amaranth', sans-serif; margin: 0 0 0.3rem 0; font-size: 1.1rem; }
.item-info p { font-family: 'Amaranth', sans-serif; font-size: 0.9rem; color: #5c4b44; margin: 0; }
.item-price { font-family: 'Amaranth', sans-serif; font-size: 1.1rem; font-weight: bold; }
.empty-cart { text-align: center; padding: 2rem; font-family: 'Amaranth', sans-serif; color: #5c4b44; }
.order-summary { flex: 1; background-color: #FDFCF8; padding: 1.5rem; border-radius: 12px; border: 1px solid #EFE1C3; position: sticky; top: 2rem; }
.summary-item { display: flex; justify-content: space-between; margin-bottom: 1rem; font-family: 'Amaranth', sans-serif; font-size: 1rem; }
.summary-item span:first-child { color: #5c4b44; }
.summary-item span:last-child { font-weight: bold; }
.summary-item.total { font-size: 1.2rem; border-top: 1px solid #EFE1C3; padding-top: 1rem; margin-top: 1rem; color: #2C1810; }
.btn { display: inline-block; text-decoration: none; border: 2px solid #2C1810; border-radius: 12px; padding: 0.8rem 1.8rem; font-family: 'Amaranth', sans-serif; font-size: 1rem; font-weight: bold; cursor: pointer; transition: all 0.2s ease-in-out; text-align: center; width: 100%; box-sizing: border-box; }
.btn-primary { background-color: #2C1810; color: #F5EFE6; }
.btn-primary:hover { background-color: #4a2c1d; }
.btn-secondary { background-color: #F5EFE6; color: #2C1810; }
.btn-secondary:hover { background-color: #e0d8ce; }

@media (max-width: 768px) { .checkout-content { flex-direction: column; } .order-summary { position: static; width: 100%; } }
</style>