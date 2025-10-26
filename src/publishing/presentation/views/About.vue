<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
  <div class="about-container">
    <section class="about-header">
      <h1>{{ t('about.title') }}</h1>
      <p>{{ t('about.subtitle') }}</p>
    </section>

    <section class="mission-section">
      <div class="mission-text">
        <h2>{{ t('about.mission_title') }}</h2>
        <p v-html="t('about.mission_text').replace(/\n/g, '<br><br>')"></p>
      </div>
      <div class="mission-image">
        <img src="" alt="Coffee plantation">
      </div>
    </section>

    <section class="values-section">
      <h2>{{ t('about.values_title') }}</h2>
      <div class="values-grid">
        <div class="value-card">
          <h3>{{ t('about.value_quality_title') }}</h3>
          <p>{{ t('about.value_quality_text') }}</p>
        </div>
        <div class="value-card">
          <h3>{{ t('about.value_transparency_title') }}</h3>
          <p>{{ t('about.value_transparency_text') }}</p>
        </div>
        <div class="value-card">
          <h3>{{ t('about.value_sustainability_title') }}</h3>
          <p>{{ t('about.value_sustainability_text') }}</p>
        </div>
      </div>
    </section>

    <section class="community-section">
      <h2>{{ t('about.community_title') }}</h2>
      <p>{{ t('about.community_text') }}</p>
      <div class="community-buttons">
        <router-link to="/" class="btn btn-secondary">{{ t('about.explore_coffees_button') }}</router-link>
        <router-link to="/" class="btn btn-primary">{{ t('about.become_producer_button') }}</router-link>
      </div>
    </section>

  </div>
</template>

<style scoped>
.about-container {
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #FFFBEB; /* Crema background */
  border-radius: 20px;
  border: 3px solid #EFE1C3; /* Borde suave */
  color: #2C1810; /* Color principal de texto */
  font-family: 'Amaranth', sans-serif;
}

section {
  margin-bottom: 4rem;
  text-align: center;
}
section:last-of-type {
  margin-bottom: 2rem; /* Menos espacio al final */
}

/* Header */
.about-header h1 {
  font-size: 2.8rem;
  margin-bottom: 0.5rem;
}
.about-header p {
  font-family: 'Amatic SC', cursive;
  font-size: 1.8rem;
  color: #5c4b44;
  margin-top: 0;
}

/* Mission */
.mission-section {
  display: flex;
  align-items: center;
  gap: 3rem;
  text-align: left;
}
.mission-text {
  flex: 1;
}
.mission-text h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.mission-text p {
  font-size: 1rem;
  line-height: 1.7;
  color: #5c4b44;
}
.mission-image {
  flex: 1;
  max-width: 50%;
}
.mission-image img {
  width: 100%;
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
}

/* Values */
.values-section h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
}
.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}
.value-card {
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #EFE1C3;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  text-align: left;
}
.value-card h3 {
  font-size: 1.3rem;
  margin-top: 0;
  margin-bottom: 0.8rem;
}
.value-card p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #5c4b44;
  margin: 0;
}

/* Community */
.community-section h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.community-section p {
  font-size: 1.1rem;
  color: #5c4b44;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
.community-buttons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

/* Reusing Button Styles (Ensure these classes exist globally or define them) */
.btn {
  display: inline-block;
  text-decoration: none;
  border: 2px solid #2C1810;
  border-radius: 12px;
  padding: 0.8rem 1.8rem;
  font-family: 'Amaranth', sans-serif;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.btn-primary {
  background-color: #2C1810;
  color: #F5EFE6;
}
.btn-primary:hover {
  background-color: #4a2c1d;
}
.btn-secondary {
  background-color: #F5EFE6;
  color: #2C1810;
}
.btn-secondary:hover {
  background-color: #e0d8ce;
}

/* Responsive */
@media (max-width: 768px) {
  .mission-section {
    flex-direction: column;
  }
  .mission-image {
    max-width: 100%;
  }
  .mission-text {
    text-align: center;
  }
  .values-grid {
    grid-template-columns: 1fr; /* Stack cards on small screens */
  }
}
</style>