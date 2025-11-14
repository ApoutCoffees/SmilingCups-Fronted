<script setup>
import { ref, inject } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { usePaymentStore } from '../../application/payment.store.js';

const { t } = useI18n();
const router = useRouter();
const cart = usePaymentStore();
const auth = inject('auth');

const cardNumber = ref('');
const cardName = ref('');
const expiryDate = ref('');
const cvv = ref('');
const isProcessing = ref(false);

const placeOrder = async () => {
  if (!cart.selectedPlan || !auth.loggedInUserId.value) {
    router.push('/checkout/error');
    return;
  }

  if (!cardNumber.value || !cardName.value || !expiryDate.value || !cvv.value) {
    alert("Please fill in all payment details.");
    return;
  }

  isProcessing.value = true;
  try {
    const shippingInfoPlaceholder = { address: "123 Fake St", city: "Anytown" };
    const paymentInfo = { cardNumber: '**** **** **** ' + cardNumber.value.slice(-4) };

    const orderDetails = await cart.placeOrder(
        auth.loggedInUserId.value,
        shippingInfoPlaceholder,
        paymentInfo
    );

    router.push({ name: 'OrderConfirmed', query: { orderId: orderDetails.id } });

  } catch (error) {
    console.error("Error placing order:", error);
    router.push('/checkout/error');
  } finally {
    isProcessing.value = false;
  }
};
</script>

<template>
  <div class="checkout-container">
    <h1>{{ t('checkout.title') }}</h1>
    <div class="checkout-steps">
      <span class="step visited">1 {{ t('checkout.step1') }}</span> &rarr;
      <span class="step visited">2 {{ t('checkout.step2') }}</span> &rarr;
      <span class="step active">3 {{ t('checkout.step3') }}</span>
    </div>

    <div class="checkout-content">
      <form @submit.prevent="placeOrder" class="payment-form card">
        <h2>{{ t('checkout.payment_information') }}</h2>

        <div class="form-group">
          <label for="cardNumber">{{ t('checkout.card_number') }}</label>
          <input type="text" id="cardNumber" v-model="cardNumber" placeholder="**** **** **** ****" required>
        </div>
        <div class="form-group">
          <label for="cardName">{{ t('checkout.card_name') }}</label>
          <input type="text" id="cardName" v-model="cardName" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="expiryDate">{{ t('checkout.expiry_date') }}</label>
            <input type="text" id="expiryDate" v-model="expiryDate" placeholder="MM/YY" required>
          </div>
          <div class="form-group">
            <label for="cvv">{{ t('checkout.cvv') }}</label>
            <input type="text" id="cvv" v-model="cvv" placeholder="***" required>
          </div>
        </div>

        <button type="submit" class="btn btn-primary btn-full" :disabled="isProcessing">
          {{ isProcessing ? 'Processing...' : t('checkout.place_order') }}
        </button>
      </form>

      <div class="order-summary card" v-if="cart.selectedPlan">
        <h2>{{ t('checkout.order_summary') }}</h2>
        <div class="summary-item plan-item">
          <span>{{ cart.selectedPlan.name }} Plan</span>
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
        <router-link to="/checkout/shipping" class="edit-link">{{ t('checkout.edit_address') }}</router-link>
      </div>
      <div v-else class="order-summary card">
        <h2>{{ t('checkout.order_summary') }}</h2>
        <p>{{ t('checkout.empty_cart') }}</p>
        <router-link to="/subscriptions" class="btn btn-secondary">{{ t('checkout.go_to_subscriptions') }}</router-link>
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
.step.visited { background-color: #EFE1C3; color: #5c4b44; }
.checkout-content { display: flex; gap: 2rem; align-items: flex-start; }
.payment-form { flex: 2; }
.order-summary { flex: 1; position: sticky; top: 2rem; }
.card { background-color: #FDFCF8; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border: 1px solid #EFE1C3; }
.payment-form h2, .order-summary h2 { font-family: 'Amaranth', sans-serif; font-size: 1.5rem; color: #2C1810; margin-top: 0; margin-bottom: 1.5rem; border-bottom: 1px solid #EFE1C3; padding-bottom: 0.8rem; }
.form-group { margin-bottom: 1.5rem; }
.form-group label { display: block; font-family: 'Amaranth', sans-serif; font-size: 0.9rem; font-weight: bold; color: #5c4b44; margin-bottom: 0.5rem; }
.form-group input { width: 100%; padding: 0.8rem 1rem; font-family: 'Amaranth', sans-serif; font-size: 1rem; border: 1px solid #EFE1C3; border-radius: 8px; box-sizing: border-box; }
.form-row { display: flex; gap: 1.5rem; }
.form-row .form-group { flex: 1; }
.summary-item { display: flex; justify-content: space-between; margin-bottom: 1rem; font-family: 'Amaranth', sans-serif; font-size: 1rem; }
.summary-item span:first-child { color: #5c4b44; }
.summary-item span:last-child { font-weight: bold; }
.summary-item.total { font-size: 1.2rem; border-top: 1px solid #EFE1C3; padding-top: 1rem; margin-top: 1rem; color: #2C1810; }
.plan-item span:first-child { font-weight: bold; }
.edit-link { display: block; text-align: center; margin-top: 1rem; font-family: 'Amaranth', sans-serif; color: #CDAC77; font-size: 0.9rem; }
.btn { display: inline-block; text-decoration: none; border: 2px solid #2C1810; border-radius: 12px; padding: 0.8rem 1.8rem; font-family: 'Amaranth', sans-serif; font-size: 1rem; font-weight: bold; cursor: pointer; transition: all 0.2s ease-in-out; text-align: center; width: 100%; box-sizing: border-box; }
.btn-primary { background-color: #2C1810; color: #F5EFE6; margin-top: 1rem; }
.btn-primary:hover:not(:disabled) { background-color: #4a2c1d; }
.btn-primary:disabled { background-color: #a08056; cursor: not-allowed; }
.btn-secondary { background-color: #F5EFE6; color: #2C1810; }
.btn-secondary:hover { background-color: #e0d8ce; }
@media (max-width: 768px) { .checkout-content { flex-direction: column; } .order-summary { position: static; width: 100%; } }
</style>