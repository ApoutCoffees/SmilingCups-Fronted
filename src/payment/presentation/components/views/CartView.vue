<script setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { usePaymentStore } from '../../../application/payment.store.js';

const { t } = useI18n();
const router = useRouter();
const { selectedPlan, cartTotal } = usePaymentStore();

const goToShipping = () => {
  router.push('/checkout/shipping');
};
</script>

<template>
  <div class="checkout-container">
    <h1>{{ t('checkout.title') }}</h1>

    <div class="checkout-steps">
      <span class="step active">1 {{ t('checkout.step1') }}</span>
      <span class="connector active"></span>
      <span class="step">2 {{ t('checkout.step2') }}</span>
      <span class="connector"></span>
      <span class="step">3 {{ t('checkout.step3') }}</span>
    </div>

    <div class="checkout-content">
      <div class="cart-details card">
        <h2>
          <i class="pi pi-shopping-cart" style="margin-right: 0.5rem; color: #CDAC77;"></i>
          {{ t('checkout.your_cart') }}
        </h2>

        <div v-if="selectedPlan" class="cart-item">
          <div class="item-icon">📦</div>
          <div class="item-info">
            <h3>{{ selectedPlan.name }} Plan</h3>
            <p class="billing-text">{{ selectedPlan.billing }}</p>
          </div>
          <span class="item-price">${{ selectedPlan.price.toFixed(2) }}</span>
        </div>

        <div v-else class="empty-cart">
          <i class="pi pi-info-circle" style="font-size: 2rem; color: #a08056; margin-bottom: 1rem;"></i>
          <p>{{ t('checkout.empty_cart') }}</p>
          <router-link to="/subscriptions" class="btn btn-secondary">{{ t('checkout.go_to_subscriptions') }}</router-link>
        </div>
      </div>

      <div class="order-summary card" v-if="selectedPlan">
        <h2>{{ t('checkout.order_summary') }}</h2>

        <div class="summary-content">
          <div class="summary-item">
            <span>{{ t('checkout.subtotal') }}</span>
            <span class="price-val">${{ cartTotal.toFixed(2) }}</span>
          </div>
          <div class="summary-item">
            <span>{{ t('checkout.shipping') }}</span>
            <span class="free-tag">{{ t('checkout.free') }}</span>
          </div>

          <div class="divider"></div>

          <div class="summary-item total">
            <span>{{ t('checkout.total') }}</span>
            <span class="total-price">${{ cartTotal.toFixed(2) }}</span>
          </div>
        </div>

        <button @click="goToShipping" class="btn btn-primary btn-full">
          {{ t('checkout.continue_to_shipping') }} <i class="pi pi-arrow-right" style="margin-left: 0.5rem"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkout-container {
  max-width: 1100px; margin: 3rem auto; padding: 0 1.5rem;
}
.checkout-container h1 {
  font-family: 'Amaranth', sans-serif; text-align: center; color: #2C1810;
  font-size: 2.5rem; margin-bottom: 2rem;
}

.checkout-steps {
  display: flex; justify-content: center; align-items: center; gap: 0.5rem;
  margin-bottom: 3rem; font-family: 'Amaranth', sans-serif;
}
.step {
  padding: 0.6rem 1.2rem; border-radius: 30px; background-color: #EFE1C3;
  color: #5c4b44; font-weight: bold; transition: all 0.3s;
}
.step.active { background-color: #2C1810; color: #FFF; box-shadow: 0 4px 10px rgba(44, 24, 16, 0.2); }
.connector { width: 40px; height: 2px; background-color: #EFE1C3; }
.connector.active { background-color: #2C1810; }

.checkout-content { display: flex; gap: 2rem; align-items: flex-start; }
.cart-details { flex: 2; }
.order-summary { flex: 1; position: sticky; top: 2rem; }

.card {
  background-color: #FFFFFF;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(44, 24, 16, 0.06);
  border: 1px solid #F0E6D2;
}

h2 {
  font-family: 'Amaranth', sans-serif; font-size: 1.6rem; color: #2C1810;
  margin-top: 0; margin-bottom: 1.5rem; border-bottom: 2px solid #FFF8E7;
  padding-bottom: 0.8rem; display: flex; align-items: center;
}

.cart-item {
  display: flex; align-items: center; gap: 1.5rem;
  padding: 1.5rem; background-color: #FFFBEB; /* Beige suave para el item */
  border-radius: 12px; border: 1px solid #EFE1C3;
}
.item-icon { font-size: 2rem; }
.item-info { flex-grow: 1; }
.item-info h3 {
  font-family: 'Amaranth', sans-serif; margin: 0 0 0.3rem 0;
  font-size: 1.3rem; color: #2C1810;
}
.billing-text { font-size: 0.95rem; color: #5c4b44; margin: 0; }
.item-price {
  font-family: 'Amaranth', sans-serif; font-size: 1.4rem;
  font-weight: bold; color: #2C1810;
}

.empty-cart {
  display: flex; flex-direction: column; align-items: center;
  padding: 3rem; text-align: center; color: #5c4b44;
}
.empty-cart p { font-size: 1.1rem; margin-bottom: 1.5rem; font-family: 'Amaranth', sans-serif;}

.summary-content { background-color: #FFFBEB; padding: 1.5rem; border-radius: 10px; margin-bottom: 1.5rem; }
.summary-item { display: flex; justify-content: space-between; margin-bottom: 0.8rem; font-family: 'Amaranth', sans-serif; font-size: 1.05rem; color: #5c4b44; }
.price-val { font-weight: bold; color: #2C1810; }
.free-tag { color: #4CAF50; font-weight: bold; }
.divider { height: 1px; background-color: #EFE1C3; margin: 1rem 0; border-bottom: 1px dashed #CDAC77; }

.summary-item.total { margin-top: 0.5rem; color: #2C1810; align-items: center; }
.summary-item.total span:first-child { font-size: 1.2rem; }
.total-price { font-size: 1.8rem; font-weight: bold; }

.btn {
  display: inline-flex; justify-content: center; align-items: center;
  text-decoration: none; border: none; border-radius: 12px;
  padding: 1rem 2rem; font-family: 'Amaranth', sans-serif;
  font-size: 1.1rem; font-weight: bold; cursor: pointer;
  transition: all 0.2s ease-in-out; width: 100%; box-sizing: border-box;
}
.btn-primary { background-color: #2C1810; color: #F5EFE6; box-shadow: 0 4px 15px rgba(44, 24, 16, 0.3); }
.btn-primary:hover { background-color: #4a2c1d; transform: translateY(-2px); }

.btn-secondary { background-color: #F5EFE6; color: #2C1810; border: 2px solid #CDAC77; max-width: 250px; }
.btn-secondary:hover { background-color: #e0d8ce; }

@media (max-width: 850px) {
  .checkout-content { flex-direction: column; }
  .order-summary { position: static; width: 100%; }
}
</style>