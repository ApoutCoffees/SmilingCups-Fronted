<script setup>
import { ref, onMounted, inject } from 'vue'; // Inject added
import { useI18n } from 'vue-i18n';
import coffeeApi from '../../../services/coffe-api.js';

const { t } = useI18n();
const auth = inject('auth');
const stats = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  const userId = auth.loggedInUserId.value;
  if (!userId || auth.loggedInUserType.value !== 'producer') {
    error.value = "Access denied or user not logged in."; // Puedes traducir esto también
    loading.value = false;
    return;
  }
  try {
    stats.value = await coffeeApi.getProducerStats(userId);
  } catch (e) {
    console.error("Error cargando stats:", e); // Log del error
    error.value = t('producer_dashboard.error_loading'); // Usa clave de traducción para error
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="dashboard-container">
    <h1>{{ t('producer_dashboard.title') }}</h1>

    <div v-if="loading" class="state-message">Cargando estadísticas...</div>
    <div v-else-if="error" class="error state-message">{{ error }}</div>
    <div v-else-if="stats" class="stats-grid">
      <div class="stat-card">
        <h3>{{ t('producer_dashboard.total_sales') }}</h3>
        <p>${{ stats.totalSales.toFixed(2) }}</p>
      </div>
      <div class="stat-card">
        <h3>{{ t('producer_dashboard.units_sold') }}</h3>
        <p>{{ stats.unitsSold }}</p>
      </div>
      <div class="stat-card large">
        <h3>{{ t('producer_dashboard.top_product') }}</h3>
        <p>{{ stats.topProduct.nombre }} ({{ stats.topProduct.unitsSold }} unidades)</p>
      </div>
      <div class="stat-card large">
        <h3>{{ t('producer_dashboard.monthly_sales') }}</h3>
        <ul>
          <li v-for="month in stats.monthlySales" :key="month.month">
            {{ month.month }}: ${{ month.sales.toFixed(2) }}
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="state-message">{{ t('producer_dashboard.no_stats') }}</div>
  </div>
</template>

<style scoped>
.dashboard-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
}
.dashboard-container h1 {
  font-family: 'Amaranth', sans-serif;
  font-size: 2.5rem;
  color: #2C1810;
  margin-bottom: 2rem;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}
.stat-card {
  background-color: #FDFCF8;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  border: 1px solid #EFE1C3;
}
.stat-card h3 {
  font-family: 'Amaranth', sans-serif;
  font-size: 1.2rem;
  color: #5c4b44;
  margin-top: 0;
  margin-bottom: 0.8rem;
}
.stat-card p, .stat-card li {
  font-family: 'Amaranth', sans-serif;
  font-size: 1.5rem;
  color: #2C1810;
  font-weight: bold;
  margin: 0;
}
.stat-card ul {
  list-style: none;
  padding: 0;
  margin-top: 0.5rem;
}
.stat-card li {
  font-size: 1rem;
  font-weight: normal;
  margin-bottom: 0.3rem;
}
.stat-card.large {
  grid-column: span 2;
}
.error { color: #D32F2F;}
.state-message { font-family: 'Amaranth', sans-serif; font-size: 1.5rem; padding: 3rem; color: #5c4b44; text-align: center; }

@media (max-width: 600px) {
  .stat-card.large {
    grid-column: span 1;
  }
}
</style>