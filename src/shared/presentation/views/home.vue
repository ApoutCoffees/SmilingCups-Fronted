<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <div class="hero-section">
    <div class="hero-text">
      <div class="logo">
        <img
            src="../../../assets/Icon.png"
            alt="Smiling Cups Logo"
            width="50"
            height="50"
        />
        <p class="logo-text">SMILING CUPS</p>
      </div>

      <h1>{{ t('home.title') }}</h1>
      <p class="subtitle">{{ t('home.content') }}</p>

      <div class="hero-buttons">
        <button class="btn btn-secondary">{{ t('home.browse_button') }}</button>
        <button class="btn btn-primary">{{ t('home.plans_button') }}</button>
      </div>
    </div>

    <div class="hero-image-container">
      <img
          class="coffee-beans-img"
          src="../../../assets/AppoutCoffees.png"
          alt="Granos de café tostados"
      />
      <div class="organic-badge">
        <span>&#127894;</span>
        <p>100% ORGANIC<br />CERTIFIED</p>
      </div>
    </div>
  </div>
</template>

<style scoped>


.hero-section {
  width: 100%;
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 4rem;
  padding: 4rem 2rem;
  max-width: 1200px;

}


.hero-text {
  flex: 1;
  max-width: 50%;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1rem;
}

.logo-text {
  font-weight: 700;
  font-size: 1.7rem;
  color: #2C1810;

}

h1 {
  font-family: 'Amaranth', sans-serif;
  font-size: 3.5rem;
  line-height: 1.1;
  color: #2C1810;
  margin: 0;
}

.subtitle {
  font-family: 'Amatic SC', cursive;
  font-size: 2rem;
  font-weight: 700;
  color: #5c4b44;
  margin: 1rem 0 2rem 0;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
}


.hero-image-container {
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.coffee-beans-img {
  width: 100%;
  max-width: 450px;

  border-radius: 60% 40% 30% 70% / 50% 60% 40% 50%;
  object-fit: cover;
}

.organic-badge {
  position: absolute;
  bottom: -20px;
  right: 10px;
  background-color: #F5EFE6;
  border: 2px solid #CDAC77;
  border-radius: 15px;
  padding: 0.5rem 1rem;
  text-align: center;
  font-family: 'Amaranth', sans-serif;
  font-weight: bold;
  color: #CDAC77;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.organic-badge span {
  font-size: 1.5rem;
}

.organic-badge p {
  font-size: 0.8rem;
  line-height: 1.2;
  margin: 0;
}



.btn {
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
</style>