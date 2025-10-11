<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import coffeeApi from '../services/coffe-api.js';

const { t } = useI18n();
const cafes = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    cafes.value = await coffeeApi.getCafes();
  } catch (e) {
    error.value = t('catalog.error_message');
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <section class="catalog-section">
    <h2>{{ t('catalog.title') }}</h2>
    <p>{{ t('catalog.subtitle') }}</p>

    <div v-if="loading" class="state-message">{{ t('catalog.loading_message') }}</div>
    <div v-else-if="error" class="state-message error">{{ error }}</div>

    <div v-else class="cards-container">
      <div v-for="cafe in cafes" :key="cafe.id" class="cafe-card">
        <img :src="cafe.imagenUrl" :alt="'Taza de café ' + cafe.nombre" class="card-image">
        <div class="card-content">
          <h3>{{ cafe.nombre }}</h3>
          <p class="origin">{{ cafe.productor }} - {{ cafe.lugar }}</p>
          <p class="description">{{ cafe.descripcion }}</p>
          <div class="notes">
            <strong>{{ t('catalog.notes_label') }}</strong>
            <span v-for="nota in cafe.notas" :key="nota" class="note-tag">{{ nota }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.catalog-section {
  max-width: 1200px;
  margin: auto;
  padding: 4rem 2rem;
  text-align: center;
}
.catalog-section h2 {
  font-family: 'Amaranth', sans-serif;
  font-size: 2.5rem;
  color: #2C1810;
}
.catalog-section > p {
  font-family: 'Amatic SC', cursive;
  font-size: 1.8rem;
  color: #5c4b44;
  margin-top: 0;
  margin-bottom: 3rem;
}
.state-message {
  font-family: 'Amaranth', sans-serif;
  font-size: 1.5rem;
  padding: 3rem;
  color: #5c4b44;
}
.error {
  color: #D32F2F;
}
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
.cafe-card {
  background-color: #fff;
  border: 2px solid #EFE1C3;
  border-radius: 15px;
  overflow: hidden;
  text-align: left;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
.cafe-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}
.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.card-content {
  padding: 1.5rem;
}
.card-content h3 {
  font-family: 'Amaranth', sans-serif;
  font-size: 1.5rem;
  color: #2C1810;
  margin: 0 0 0.5rem 0;
}
.origin {
  font-family: 'Amaranth', sans-serif;
  font-size: 0.9rem;
  color: #CDAC77;
  font-weight: bold;
  margin: 0 0 1rem 0;
}
.description {
  font-family: 'Amaranth', sans-serif;
  font-size: 1rem;
  color: #5c4b44;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}
.notes {
  font-family: 'Amaranth', sans-serif;
}
.note-tag {
  display: inline-block;
  background-color: #FFF2D0;
  color: #A08056;
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  font-size: 0.8rem;
  margin: 0.2rem;
}
</style>