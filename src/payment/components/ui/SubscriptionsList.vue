<script setup>
import { useI18n } from "vue-i18n";
const { t , tm} = useI18n();
</script>
<template>
  <section class="plans-section">
    <h2>{{ t('home.plans.title') }}</h2>
    <p class="subtitle">{{ t('home.plans.subtitle') }}</p>
    <div class="plans-container">
      <div class="plan-card">
        <h3>{{ t('home.plans.basic.title') }}</h3>
        <p class="price">{{ t('home.plans.basic.price') }}</p>
        <ul>
          <li v-for="item in tm('home.plans.basic.features')" :key="item">{{ item }}</li>
        </ul>
        <button class="btn btn-secondary">{{ t('home.plans.subscribe_now') }}</button>
      </div>

      <div class="plan-card popular">
        <div class="popular-badge">{{ t('home.plans.most_popular') }}</div>
        <h3>{{ t('home.plans.premium.title') }}</h3>
        <p class="price">{{ t('home.plans.premium.price') }}</p>
        <ul>
          <li v-for="item in tm('home.plans.premium.features')" :key="item">{{ item }}</li>
        </ul>
        <button class="btn btn-secondary">{{ t('home.plans.subscribe_now') }}</button>
      </div>

      <div class="plan-card">
        <h3>{{ t('home.plans.vip.title') }}</h3>
        <p class="price">{{ t('home.plans.vip.price') }}</p>
        <ul>
          <li v-for="item in tm('home.plans.vip.features')" :key="item">{{ item }}</li>
        </ul>
        <button class="btn btn-secondary">{{ t('home.plans.subscribe_now') }}</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.plans-section {
  max-width: 1200px;
  margin: auto;
  padding: 4rem 2rem;
  text-align: center;
  border-bottom: 2px solid #EFE1C3;
}

.plans-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  align-items: flex-start;
}

.plan-card {
  flex: 1;
  max-width: 350px;
  background: #fff;
  border: 2px solid #CDAC77;
  border-radius: 15px;
  padding: 2rem;
  text-align: left;
  position: relative;
}

.plan-card.popular {
  border-width: 3px;
  border-color: #2C1810;
  transform: scale(1.05);
}

.popular-badge {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #CDAC77;
  color: white;
  padding: 0.3rem 1rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: bold;
  border-width: 3px;
  border-color: #A08056;
}

.plans-section h2 {

  font-size: 2.5rem;
  color: #2C1810;
  margin-bottom: 0.5rem;
}


/*Color*/
.plan-card h3,
.plan-card .price,
.plan-card li {
  color: #2C1810;
}

.plan-card h3 {
  font-size: 1.8rem;
  text-align: center;
}

.plan-card .price {

  text-align: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
}


.plan-card li {

  font-size: 1.2rem;
  margin-bottom: 0.7rem;
  display: flex;

}

.plan-card li::before {
  content: '✔';
  color: #4CAF50;

  font-size: 1.2rem;
}



.btn-secondary {
  position: relative;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #CDAC77;
  color: white;
  padding: 0.3rem 1rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: bold;
  border-width: 3px;
  border-color: #A08056;
}

.btn-secondary:hover {
  background-color: #e0d8ce;

}
.subtitle{
  color: #2C1810;
  font-weight: bold;
}
</style>