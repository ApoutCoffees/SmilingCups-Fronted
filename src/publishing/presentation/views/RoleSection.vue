<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
  <div class="role-selection-container">
    <div class="logo-header">
      <img src="../../../assets/Icon.png" alt="Smiling Cups Logo" />
      <h1>SmilingCups</h1>
    </div>
    <h2>{{ t('role_selection.welcome') }}</h2>
    <p class="prompt">{{ t('role_selection.prompt') }}</p>

    <div class="options-container">
      <div class="option-card">
        <div class="icon-placeholder">
          <img src="../../../assets/HearthIcon.png" alt="Coffee Lover Icon">
        </div>
        <h3>{{ t('role_selection.coffee_lover_title') }}</h3>
        <p>{{ t('role_selection.coffee_lover_desc') }}</p>
        <router-link to="/register?role=customer" class="start-link">{{ t('role_selection.start') }} &rarr;</router-link>
      </div>

      <div class="option-card">
        <div class="icon-placeholder">
          <img src="../../../assets/CoffebuttonIcon.png" alt="Producer Icon">
        </div>
        <h3>{{ t('role_selection.producer_title') }}</h3>
        <p>{{ t('role_selection.producer_desc') }}</p>
        <router-link to="/register?role=producer" class="start-link green">{{ t('role_selection.start') }} &rarr;</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.role-selection-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 2rem;
  background-color: #FFFBEB;
  border: 3px solid #EFE1C3;
  border-radius: 25px;
  max-width: 900px;
  margin: 3rem auto;
  text-align: center;
}
.logo-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 0.5rem;
}
.logo-header img {
  height: 50px;
}
.logo-header h1 {
  font-family: 'Amaranth', sans-serif;
  font-size: 2.5rem;
  color: #2C1810;
  margin: 0;
}
h2 {
  font-family: 'Amaranth', sans-serif;
  font-size: 2rem;
  color: #2C1810;
  margin-bottom: 0.5rem;
}
.prompt {
  font-family: 'Amatic SC', cursive;
  font-size: 1.8rem;
  color: #5c4b44;
  margin-bottom: 3rem;
}
.options-container {
  display: flex;
  justify-content: center;
  gap: 3rem;
  width: 100%;
}
.option-card {
  background-color: #fff;
  border: 1px solid #EFE1C3;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  flex: 1;
  max-width: 350px;
  text-align: left;
}
.icon-placeholder {
  margin-bottom: 1rem;
}
.icon-placeholder img {
  height: 50px;
  width: 50px;
  object-fit: contain;
}
.option-card h3 {
  font-family: 'Amaranth', sans-serif;
  font-size: 1.5rem;
  color: #2C1810;
  margin-top: 0;
  margin-bottom: 0.8rem;
}
.option-card p {
  font-family: 'Amaranth', sans-serif;
  font-size: 0.95rem;
  color: #5c4b44;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}
.start-link {
  font-family: 'Amaranth', sans-serif;
  font-weight: bold;
  text-decoration: none;
  color: #CDAC77;
  transition: color 0.2s;
}
.start-link:hover {
  color: #a08056;
}
.start-link.green {
  color: #4CAF50;
}
.start-link.green:hover {
  color: #388E3C;
}
@media (max-width: 768px) {
  .options-container {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
  .option-card {
    max-width: 400px;
    width: 90%;
  }
}
</style>