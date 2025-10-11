<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <section class="why-us-section">
    <h2>{{ t('home.why_us.title') }}</h2>
    <p>{{ t('home.why_us.subtitle') }}</p>
    <div class="features-container">
      <div class="feature-card">
        <img src="../assets/CoffebuttonIcon.png" alt="Premium Quality Icon" />
        <h3>{{ t('home.why_us.quality_title') }}</h3>
        <p>{{ t('home.why_us.quality_desc') }}</p>
      </div>
      <div class="feature-card">
        <img src="../assets/HearthIcon.png" alt="Direct Impact Icon" />
        <h3>{{ t('home.why_us.impact_title') }}</h3>
        <p>{{ t('home.why_us.impact_desc') }}</p>
      </div>
      <div class="feature-card">
        <img src="../assets/webIcon.png" alt="Unique Origins Icon" />
        <h3>{{ t('home.why_us.origins_title') }}</h3>
        <p>{{ t('home.why_us.origins_desc') }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.why-us-section {
  max-width: 1200px;
  margin: auto;
  padding: 4rem 2rem;
  text-align: center;
  border-bottom: 2px solid #EFE1C3;
}
.why-us-section h2 {  font-size: 2.5rem; color: #2C1810; margin-bottom: 0.5rem; }
.why-us-section > p {font-size: 1.8rem; color: #5c4b44; margin-top: 0; margin-bottom: 3rem; }
.features-container { display: flex; justify-content: space-around; gap: 2rem; text-align: center; }
.feature-card { flex: 1; }
.feature-card img { height: 60px; margin-bottom: 1rem; }
.feature-card h3 { font-family: 'Amaranth', sans-serif; font-size: 1.5rem; margin-bottom: 0.5rem; color: #2C1810; }
.feature-card p { font-family: 'Amaranth', sans-serif; font-size: 1rem; color: #5c4b44; }
</style>