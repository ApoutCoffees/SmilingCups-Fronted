<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <section class="testimonials-section">
    <h2>{{ t('home.testimonials.title') }}</h2>
    <p>{{ t('home.testimonials.subtitle') }}</p>
    <div class="testimonials-container">
      <div class="testimonial-card">
        <p class="stars"># # # # #</p>
        <p class="quote">{{ t('home.testimonials.customer1_quote') }}</p>
        <div class="customer-info">
          <img src="../../../assets/imagen1.png" alt="1">
          <div>
            <strong>{{ t('home.testimonials.customer1_name') }}</strong>
            <span>{{ t('home.testimonials.customer1_level') }}</span>
          </div>
        </div>
      </div>
      <div class="testimonial-card">
        <p class="stars"># # # # #</p>
        <p class="quote">{{ t('home.testimonials.customer2_quote') }}</p>
        <div class="customer-info">
          <img src="../../../assets/imagen1.png" alt="2">
          <div>
            <strong>{{ t('home.testimonials.customer2_name') }}</strong>
            <span>{{ t('home.testimonials.customer2_level') }}</span>
          </div>
        </div>
      </div>
      <div class="testimonial-card">
        <p class="stars"># # # # #</p>
        <p class="quote">{{ t('home.testimonials.customer3_quote') }}</p>
        <div class="customer-info">
          <img src="../../../assets/imagen1.png" alt="3">
          <div>
            <strong>{{ t('home.testimonials.customer3_name') }}</strong>
            <span>{{ t('home.testimonials.customer3_level') }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonials-section {
  max-width: 1200px;
  margin: auto;
  padding: 4rem 2rem;
  text-align: center;
  border-bottom: 2px solid #EFE1C3;
}
.testimonials-section h2 {  font-size: 2.5rem; color: #2C1810; margin-bottom: 0.5rem; }
.testimonials-section > p { font-size: 1.8rem; color: #5c4b44; margin-top: 0; margin-bottom: 3rem; }
.testimonials-container { display: flex; gap: 2rem; justify-content: center; }
.testimonial-card { flex: 1; max-width: 350px; background-color: transparent; border: 2px solid #CDAC77; border-radius: 15px; padding: 2rem; }
.testimonial-card .stars { font-family: 'Amatic SC', cursive; font-size: 2rem; color: #CDAC77; font-weight: bold; margin: 0 0 1rem 0; }
.testimonial-card .quote { font-family: 'Amaranth', sans-serif; font-size: 1rem; font-style: italic; color: #5c4b44; min-height: 100px; }
.customer-info { display: flex; align-items: center; gap: 1rem; text-align: left; }
.customer-info img { height: 50px; width: 50px; border-radius: 50%; background: #CDAC77; }
.customer-info strong { font-family: 'Amaranth', sans-serif; display: block; }
.customer-info span { font-family: 'Amatic SC', cursive; font-size: 1.5rem; }
</style>