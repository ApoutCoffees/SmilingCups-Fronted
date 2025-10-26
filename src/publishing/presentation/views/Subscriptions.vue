<script setup>
import { useI18n } from "vue-i18n";
import { useRouter } from 'vue-router';
import { inject } from 'vue'; // Ensure inject is imported

const { t, tm } = useI18n();
const router = useRouter();
const cart = inject('cart'); // Inject the cart service

const selectSubscription = (planKey) => {
  if (!cart) {
    console.error("Cart service not injected properly!");
    // Optionally show an error to the user
    return;
  }
  cart.clearCart();

  const planDetails = {
    id: planKey,
    name: t(`home.plans.${planKey}.title`),
    price: parseFloat(t(`home.plans.${planKey}.price`).replace(/[^0-9.]/g, '')),
    billing: t('profile.current_subscription.billing'),
    type: 'subscription'
  };
  cart.addSubscriptionPlan(planDetails);

  router.push('/checkout/cart');
};
</script>

<template>
  <section class="plans-section">
    <h2>{{ t('home.plans.title') }}</h2>
    <p>{{ t('home.plans.subtitle') }}</p>
    <div class="plans-container">
      <div class="plan-card">
        <div class="card-content">
          <h3>{{ t('home.plans.basic.title') }}</h3>
          <p class="price">{{ t('home.plans.basic.price') }}</p>
          <ul>
            <li v-for="item in tm('home.plans.basic.features')" :key="item">{{ item }}</li>
          </ul>
        </div>
        <button @click="selectSubscription('basic')" class="btn btn-secondary">{{ t('home.plans.subscribe_now') }}</button>
      </div>

      <div class="plan-card popular">
        <div class="popular-badge">{{ t('home.plans.most_popular') }}</div>
        <div class="card-content">
          <h3>{{ t('home.plans.premium.title') }}</h3>
          <p class="price">{{ t('home.plans.premium.price') }}</p>
          <ul>
            <li v-for="item in tm('home.plans.premium.features')" :key="item">{{ item }}</li>
          </ul>
        </div>
        <button @click="selectSubscription('premium')" class="btn btn-secondary">{{ t('home.plans.subscribe_now') }}</button>
      </div>

      <div class="plan-card">
        <div class="card-content">
          <h3>{{ t('home.plans.vip.title') }}</h3>
          <p class="price">{{ t('home.plans.vip.price') }}</p>
          <ul>
            <li v-for="item in tm('home.plans.vip.features')" :key="item">{{ item }}</li>
          </ul>
        </div>
        <button @click="selectSubscription('vip')" class="btn btn-secondary">{{ t('home.plans.subscribe_now') }}</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes shake{0%,100%{transform:translateX(0) rotate(0)}25%{transform:translateX(-1px) rotate(-.5deg)}50%{transform:translateX(1px) rotate(.5deg)}75%{transform:translateX(-1px) rotate(-.5deg)}}.plans-section{max-width:1200px;margin:auto;padding:4rem 2rem;text-align:center;border-bottom:2px solid #efe1c3}.plans-section h2{font-family:'Amaranth',sans-serif;font-size:2.5rem;color:#2c1810;margin-bottom:.5rem}.plans-section>p{font-family:'Amatic SC',cursive;font-size:1.8rem;color:#5c4b44;margin-top:0;margin-bottom:3rem}.plans-container{display:flex;justify-content:center;gap:2rem;align-items:stretch}.plan-card{flex:1;max-width:350px;background:#fff;border:2px solid #cdac77;border-radius:15px;padding:2rem;position:relative;display:flex;flex-direction:column;justify-content:space-between;transition:transform .2s ease-in-out}.plan-card:hover{animation:shake .3s ease-in-out infinite;transform:scale(1.02)}.plan-card.popular{border-width:3px;border-color:#2c1810;transform:scale(1.05)}.plan-card.popular:hover{transform:scale(1.07);animation:shake .3s ease-in-out infinite}.popular-badge{position:absolute;top:-15px;left:50%;transform:translateX(-50%);background-color:#cdac77;color:#fff;padding:.3rem 1rem;border-radius:10px;font-size:.9rem;font-weight:700;border:2px solid #a08056}.card-content{flex-grow:1}.plan-card h3,.plan-card .price,.plan-card li{color:#2c1810}.plan-card h3{font-family:'Amaranth',sans-serif;font-size:1.8rem;text-align:center}.plan-card .price{font-family:'Amatic SC',cursive;text-align:center;font-size:2rem;font-weight:700;margin-bottom:1.5rem}.plan-card ul{list-style:none;padding:0;margin:0 0 1.5rem}.plan-card li{font-family:'Amaranth',sans-serif;font-size:.9rem;margin-bottom:.7rem;display:flex;align-items:flex-start}.plan-card li::before{content:"✔";color:#4caf50;font-size:1.2rem;margin-right:10px;line-height:1;flex-shrink:0}.btn-secondary{background-color:#cdac77;color:#fff;padding:.8rem 1.5rem;border-radius:10px;font-size:1rem;font-weight:700;border:2px solid #a08056;cursor:pointer;width:100%;margin-top:auto;transition:background-color .2s}.btn-secondary:hover{background-color:#be9d6e;border-color:#8c704a}
</style>