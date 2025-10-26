<script setup>
import { ref, inject } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const cart = inject('cart');
const router = useRouter();

// Form fields for shipping address
const fullName = ref('');
const address1 = ref('');
const address2 = ref('');
const city = ref('');
const state = ref('');
const zip = ref('');
const country = ref('Perú'); // Default or load from user profile later
const phone = ref('');

// --- TODO: Cargar dirección del usuario logueado si existe ---
// onMounted(async () => {
//   const profile = await coffeeApi.getProfile(auth.loggedInUserId.value);
//   if (profile) {
//      fullName.value = profile.fullName;
//      address1.value = profile.address;
//      city.value = profile.city;
//      country.value = profile.country;
//      phone.value = profile.phone;
//   }
// });

const goToPayment = () => {
  // --- TODO: Validar formulario antes de continuar ---
  if (!fullName.value || !address1.value || !city.value || !zip.value || !country.value) {
    alert("Please fill in all required shipping details.");
    return;
  }
  // Optional: Guardar dirección en localStorage o un estado temporal
  // const shippingInfo = { fullName: fullName.value, ... };
  router.push('/checkout/payment');
};
</script>

<template>
  <div class="checkout-container">
    <h1>{{ t('checkout.title') }}</h1>
    <div class="checkout-steps">
      <span class="step visited">1 {{ t('checkout.step1') }}</span> &rarr;
      <span class="step active">2 {{ t('checkout.step2') }}</span> &rarr;
      <span class="step">3 {{ t('checkout.step3') }}</span>
    </div>

    <div class="checkout-content">
      <form @submit.prevent="goToPayment" class="shipping-form card">
        <h2>{{ t('checkout.shipping_address') }}</h2>

        <div class="form-group">
          <label for="fullName">{{ t('checkout.full_name') }}</label>
          <input type="text" id="fullName" v-model="fullName" required>
        </div>
        <div class="form-group">
          <label for="address1">{{ t('checkout.address_line1') }}</label>
          <input type="text" id="address1" v-model="address1" required>
        </div>
        <div class="form-group">
          <label for="address2">{{ t('checkout.address_line2') }}</label>
          <input type="text" id="address2" v-model="address2">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="city">{{ t('checkout.city') }}</label>
            <input type="text" id="city" v-model="city" required>
          </div>
          <div class="form-group">
            <label for="state">{{ t('checkout.state_province') }}</label>
            <input type="text" id="state" v-model="state">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="zip">{{ t('checkout.zip_code') }}</label>
            <input type="text" id="zip" v-model="zip" required>
          </div>
          <div class="form-group">
            <label for="country">{{ t('checkout.country') }}</label>
            <input type="text" id="country" v-model="country" required>
          </div>
        </div>
        <div class="form-group">
          <label for="phone">{{ t('checkout.phone') }}</label>
          <input type="tel" id="phone" v-model="phone">
        </div>
        <button type="submit" class="btn btn-primary btn-full">{{ t('checkout.continue_to_payment') }}</button>
      </form>

      <div class="order-summary card" v-if="cart.selectedPlan.value">
        <h2>{{ t('checkout.order_summary') }}</h2>
        <div class="summary-item plan-item">
          <span>{{ cart.selectedPlan.value.name }} Plan</span>
          <span>${{ cart.cartTotal.value.toFixed(2) }}</span>
        </div>
        <div class="summary-item">
          <span>{{ t('checkout.shipping') }}</span>
          <span>{{ t('checkout.free') }}</span>
        </div>
        <div class="summary-item total">
          <span>{{ t('checkout.total') }}</span>
          <span>${{ cart.cartTotal.value.toFixed(2) }}</span>
        </div>
        <router-link to="/checkout/cart" class="edit-link">{{ t('checkout.edit_cart') }}</router-link>
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
/* Estilos similares a Cart.vue con ajustes */
.checkout-container { max-width: 1000px; margin: 2rem auto; padding: 2rem; background-color: #FFFBEB; border-radius: 15px; border: 2px solid #EFE1C3;}
.checkout-container h1 { font-family: 'Amaranth', sans-serif; text-align: center; color: #2C1810; margin-bottom: 1rem; }
.checkout-steps { display: flex; justify-content: center; gap: 1rem; margin-bottom: 2rem; font-family: 'Amaranth', sans-serif; color: #a08056; }
.step { padding: 0.5rem 1rem; border-radius: 20px; background-color: #F5EFE6; }
.step.active { background-color: #CDAC77; color: #2C1810; font-weight: bold; }
.step.visited { background-color: #EFE1C3; color: #5c4b44; } /* Estilo para pasos completados */
.checkout-content { display: flex; gap: 2rem; align-items: flex-start; }
.shipping-form { flex: 2; }
.order-summary { flex: 1; position: sticky; top: 2rem; }
.card { background-color: #FDFCF8; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border: 1px solid #EFE1C3; }
.shipping-form h2, .order-summary h2 { font-family: 'Amaranth', sans-serif; font-size: 1.5rem; color: #2C1810; margin-top: 0; margin-bottom: 1.5rem; border-bottom: 1px solid #EFE1C3; padding-bottom: 0.8rem; }
.form-group { margin-bottom: 1.5rem; }
.form-group label { display: block; font-family: 'Amaranth', sans-serif; font-size: 0.9rem; font-weight: bold; color: #5c4b44; margin-bottom: 0.5rem; }
.form-group input { width: 100%; padding: 0.8rem 1rem; font-family: 'Amaranth', sans-serif; font-size: 1rem; border: 1px solid #EFE1C3; border-radius: 8px; box-sizing: border-box; }
.form-row { display: flex; gap: 1.5rem; }
.form-row .form-group { flex: 1; }
.summary-item { display: flex; justify-content: space-between; margin-bottom: 1rem; font-family: 'Amaranth', sans-serif; font-size: 1rem; }
.summary-item span:first-child { color: #5c4b44; }
.summary-item span:last-child { font-weight: bold; }
.summary-item.total { font-size: 1.2rem; border-top: 1px solid #EFE1C3; padding-top: 1rem; margin-top: 1rem; color: #2C1810; }
.plan-item span:first-child { font-weight: bold; } /* Resaltar nombre del plan */
.edit-link { display: block; text-align: center; margin-top: 1rem; font-family: 'Amaranth', sans-serif; color: #CDAC77; font-size: 0.9rem; }
.btn { display: inline-block; text-decoration: none; border: 2px solid #2C1810; border-radius: 12px; padding: 0.8rem 1.8rem; font-family: 'Amaranth', sans-serif; font-size: 1rem; font-weight: bold; cursor: pointer; transition: all 0.2s ease-in-out; text-align: center; width: 100%; box-sizing: border-box; }
.btn-primary { background-color: #2C1810; color: #F5EFE6; margin-top: 1rem; } /* Added margin-top */
.btn-primary:hover { background-color: #4a2c1d; }
.btn-secondary { background-color: #F5EFE6; color: #2C1810; }
.btn-secondary:hover { background-color: #e0d8ce; }
@media (max-width: 768px) { .checkout-content { flex-direction: column; } .order-summary { position: static; width: 100%; } }
</style>