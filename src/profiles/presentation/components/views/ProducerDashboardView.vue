<script setup>
import { onMounted, inject } from 'vue';
import { useProfilesStore } from '../../../application/profiles.store.js';

const auth = inject('auth');
const store = useProfilesStore();

onMounted(() => {
  if (auth.currentUser) {
    store.fetchProducerData(auth.currentUser.id);
  }
});
</script>

<template>
  <div class="dashboard-container">
    <h1>Producer Dashboard</h1>
    <p>Welcome back, {{ auth.currentUser?.fullName }}</p>

    <div v-if="store.loading.value">Loading metrics...</div>

    <div v-else-if="store.producerStats.value" class="stats-grid">
      <div class="stat-card">
        <h3>Total Sales</h3>
        <p class="value">${{ store.producerStats.value.totalSales }}</p>
      </div>
      <div class="stat-card">
        <h3>Monthly Sales</h3>
        <p class="value">${{ store.producerStats.value.currentMonthSales }}</p>
      </div>
      <div class="stat-card">
        <h3>Total Views</h3>
        <p class="value">{{ store.producerStats.value.totalViews }}</p>
      </div>
      <div class="stat-card">
        <h3>Rating</h3>
        <p class="value">⭐ {{ store.producerStats.value.rating }}</p>
      </div>
    </div>

    <div v-else>
      <p>No stats available yet.</p>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container { max-width: 1200px; margin: 2rem auto; padding: 1rem; }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 2rem; }
.stat-card { background: #FFF; border: 2px solid #CDAC77; border-radius: 12px; padding: 1.5rem; text-align: center; }
.stat-card h3 { margin: 0; color: #5c4b44; font-family: 'Amaranth', sans-serif; }
.stat-card .value { font-size: 2rem; font-weight: bold; color: #2C1810; margin: 0.5rem 0 0 0; }
</style>