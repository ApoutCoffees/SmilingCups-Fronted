<script setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import profilesApi from '../../infrastructure/profilesApi.js';

const { t } = useI18n();

// Estado Reactivo
const loading = ref(true);
const harvestAmount = ref(0);
const pricePerKg = ref(0);
const operationalCosts = ref(0);

// ID Temporal
const PRODUCER_ID = 1;

// Cargar datos reales al iniciar
onMounted(async () => {
  try {
    const stats = await profilesApi.getProducerStats(PRODUCER_ID);
    if (stats) {
      // Si la API trae datos, los usamos como base
      harvestAmount.value = stats.totalHarvest || 1000;
      pricePerKg.value = stats.averagePrice || 10;
      operationalCosts.value = stats.costs || 2000;
    } else {
      // Valores por defecto si es un productor nuevo
      harvestAmount.value = 1000;
      pricePerKg.value = 12.5;
      operationalCosts.value = 3500;
    }
  } catch (e) {
    console.error("Error loading producer stats", e);
  } finally {
    loading.value = false;
  }
});

// Cálculos automáticos (Computed)
const grossRevenue = computed(() => harvestAmount.value * pricePerKg.value);
const netIncome = computed(() => grossRevenue.value - operationalCosts.value);
const profitMargin = computed(() => {
  if (grossRevenue.value === 0) return 0;
  return ((netIncome.value / grossRevenue.value) * 100).toFixed(1);
});

const formatMoney = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
</script>

<template>
  <div class="producer-dashboard">
    <div class="header">
      <h1>Producer Dashboard</h1>
      <p>Analyze your production financial health</p>
    </div>

    <div v-if="loading" class="loading">Loading Data...</div>

    <div v-else class="grid-container">

      <div class="card input-panel">
        <h2><i class="pi pi-cog"></i> Production Data</h2>
        <p class="subtitle">Modify values to simulate scenarios</p>

        <div class="form-group">
          <label>Harvest Volume (kg)</label>
          <input type="number" v-model="harvestAmount" class="sc-input">
        </div>

        <div class="form-group">
          <label>Price per Kg ($)</label>
          <input type="number" v-model="pricePerKg" step="0.5" class="sc-input">
        </div>

        <div class="form-group">
          <label>Operational Costs ($)</label>
          <input type="number" v-model="operationalCosts" class="sc-input">
        </div>
      </div>

      <div class="stats-panel">

        <div class="stat-card">
          <div class="icon-circle revenue"><i class="pi pi-dollar"></i></div>
          <div class="info">
            <h3>Gross Revenue</h3>
            <span class="value">{{ formatMoney(grossRevenue) }}</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="icon-circle" :class="netIncome >= 0 ? 'profit' : 'loss'">
            <i class="pi" :class="netIncome >= 0 ? 'pi-chart-line' : 'pi-arrow-down'"></i>
          </div>
          <div class="info">
            <h3>Net Income</h3>
            <span class="value" :class="netIncome >= 0 ? 'text-green' : 'text-red'">
              {{ formatMoney(netIncome) }}
            </span>
          </div>
        </div>

        <div class="stat-card full-width">
          <div class="flex-row">
            <h3>Profit Margin</h3>
            <span class="percent-text">{{ profitMargin }}%</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill"
                 :style="{ width: Math.max(0, Math.min(100, profitMargin)) + '%' }"
                 :class="profitMargin > 20 ? 'high' : 'low'">
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.producer-dashboard { max-width: 1100px; margin: 3rem auto; padding: 0 1.5rem; font-family: 'Amaranth', sans-serif; }
.header { margin-bottom: 2rem; }
.header h1 { color: #2C1810; margin: 0; font-size: 2.2rem; }
.header p { color: #5c4b44; }

.grid-container { display: grid; grid-template-columns: 1fr 2fr; gap: 2rem; }
.card { background: #FDFCF8; padding: 2rem; border-radius: 12px; border: 1px solid #EFE1C3; }

/* Inputs */
.subtitle { font-size: 0.9rem; color: #A08056; margin-bottom: 1.5rem; }
.form-group { margin-bottom: 1.2rem; }
.form-group label { display: block; font-weight: bold; color: #5c4b44; margin-bottom: 0.5rem; }
.sc-input { width: 100%; padding: 0.8rem; border: 2px solid #EFE1C3; border-radius: 8px; font-family: inherit; font-size: 1.1rem; box-sizing: border-box; }
.sc-input:focus { border-color: #CDAC77; outline: none; }

/* Stats */
.stats-panel { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; align-content: start; }
.stat-card { background: #fff; padding: 1.5rem; border-radius: 12px; border: 1px solid #EFE1C3; display: flex; align-items: center; gap: 1rem; }
.full-width { grid-column: span 2; display: block; }

.icon-circle { width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
.revenue { background: #FFF2D0; color: #A08056; }
.profit { background: #d4edda; color: #155724; }
.loss { background: #f8d7da; color: #721c24; }

.info h3 { margin: 0; font-size: 0.9rem; color: #999; text-transform: uppercase; }
.value { font-size: 1.5rem; font-weight: bold; color: #2C1810; }
.text-green { color: #2E7D32; }
.text-red { color: #C62828; }

/* Progress */
.flex-row { display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-weight: bold; color: #2C1810; }
.progress-track { height: 12px; background: #EFE1C3; border-radius: 6px; overflow: hidden; }
.progress-fill { height: 100%; transition: width 0.5s ease; }
.high { background: #4CAF50; }
.low { background: #FF9800; }

@media (max-width: 800px) {
  .grid-container, .stats-panel { grid-template-columns: 1fr; }
  .full-width { grid-column: span 1; }
}
</style>