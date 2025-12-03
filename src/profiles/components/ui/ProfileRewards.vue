<script setup>
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
// Importamos la API (Asegúrate de tener este método en tu archivo api, ver abajo)
import profileApi from '../../infrastructure/profilesApi.js';

const { t } = useI18n();

// Estado
const loading = ref(true);
const subscriptionMonths = ref(0); // Meses totales de suscripción
const rewardsHistory = ref([]);
const currentPlanName = ref('');

// Computed: Progreso del ciclo actual de 6 meses
const monthsInCurrentCycle = computed(() => subscriptionMonths.value % 6);
const progressPercentage = computed(() => (monthsInCurrentCycle.value / 6) * 100);
const monthsLeft = computed(() => 6 - monthsInCurrentCycle.value);

// Computed: Recompensas disponibles (Calculado matemáticamente: Total Meses / 6)
const totalEarnedRewards = computed(() => Math.floor(subscriptionMonths.value / 6));

// Cargar datos al montar
onMounted(async () => {
  try {
    // Simulamos obtener ID del usuario actual
    const userId = 1;
    const data = await profileApi.getRewardsStatus(userId);

    subscriptionMonths.value = data.totalMonthsActive;
    rewardsHistory.value = data.history;
    currentPlanName.value = data.planName;
  } catch (error) {
    console.error("Error loading rewards:", error);
  } finally {
    loading.value = false;
  }
});

// Función para canjear
const handleClaim = async (rewardIndex) => {
  // Aquí llamarías a profileApi.claimReward(...)
  alert(`¡Disfruta tu café ${currentPlanName.value}! Código generado: FREE-COFFEE-${Date.now()}`);

  // Actualizamos estado localmente para feedback inmediato
  if (rewardsHistory.value[rewardIndex]) {
    rewardsHistory.value[rewardIndex].status = 'redeemed';
    rewardsHistory.value[rewardIndex].redeemedDate = new Date().toISOString();
  }
};
</script>

<template>
  <div class="rewards-container card">
    <div class="header">
      <h2><i class="pi pi-gift"></i> {{ t('rewards.title') || 'Loyalty Rewards' }}</h2>
      <p>Get a free <strong>{{ currentPlanName }} Coffee</strong> every 6 months!</p>
    </div>

    <div v-if="loading" class="loading">Loading rewards...</div>

    <div v-else class="content">

      <div class="progress-section">
        <div class="progress-info">
          <span>Current Cycle</span>
          <span class="highlight">{{ monthsInCurrentCycle }} / 6 Months</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-fill" :style="{ width: `${progressPercentage}%` }"></div>
        </div>
        <p class="motivation-text" v-if="monthsLeft > 0">
          Only {{ monthsLeft }} more months until your next free coffee!
        </p>
        <p class="motivation-text ready" v-else>
          You've earned a new reward! Check below.
        </p>
      </div>

      <div class="rewards-list">
        <h3>Your Rewards</h3>

        <div v-if="rewardsHistory.length === 0" class="empty-state">
          No rewards earned yet. Keep your subscription active!
        </div>

        <div
            v-for="(reward, index) in rewardsHistory"
            :key="index"
            class="reward-item"
            :class="reward.status"
        >
          <div class="reward-icon">
            <i class="pi" :class="reward.status === 'redeemed' ? 'pi-check-circle' : 'pi-star-fill'"></i>
          </div>

          <div class="reward-details">
            <h4>6-Month Milestone Reward</h4>
            <p v-if="reward.status === 'available'">Ready to use!</p>
            <p v-else>Redeemed on {{ new Date(reward.redeemedDate).toLocaleDateString() }}</p>
          </div>

          <button
              v-if="reward.status === 'available'"
              @click="handleClaim(index)"
              class="btn-claim"
          >
            Claim Coffee
          </button>
          <span v-else class="status-text">Enjoyed</span>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.card {
  background: #FDFCF8;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #EFE1C3;
  font-family: 'Amaranth', sans-serif;
  max-width: 800px;
}

.header h2 {
  color: #2C1810;
  margin-top: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}
.header p { color: #5c4b44; }

/* Progress Bar */
.progress-section {
  background-color: #FFF9E6;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  border: 1px dashed #CDAC77;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #2C1810;
}

.progress-bar-bg {
  width: 100%;
  height: 14px;
  background-color: #EFE1C3;
  border-radius: 7px;
  overflow: hidden;
  margin-bottom: 0.8rem;
}

.progress-fill {
  height: 100%;
  background-color: #CDAC77; /* Oro */
  background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
  background-size: 1rem 1rem;
  transition: width 0.5s ease;
}

.motivation-text { font-size: 0.9rem; color: #5c4b44; margin: 0; text-align: center;}
.motivation-text.ready { color: #2E7D32; font-weight: bold; }

/* Lista de Rewards */
.rewards-list h3 { color: #2C1810; border-bottom: 1px solid #EFE1C3; padding-bottom: 0.5rem; }

.reward-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: white;
  border: 1px solid #EFE1C3;
  border-radius: 10px;
  margin-bottom: 1rem;
  transition: transform 0.2s;
}

.reward-item.available { border-left: 5px solid #CDAC77; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
.reward-item.redeemed { opacity: 0.7; background: #f9f9f9; border-left: 5px solid #ccc; }

.reward-icon {
  font-size: 1.5rem;
  margin-right: 1rem;
  color: #CDAC77;
}
.redeemed .reward-icon { color: #ccc; }

.reward-details { flex: 1; }
.reward-details h4 { margin: 0; color: #2C1810; }
.reward-details p { margin: 0.2rem 0 0; font-size: 0.9rem; color: #5c4b44; }

.btn-claim {
  background-color: #2C1810;
  color: #CDAC77;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  font-family: 'Amaranth', sans-serif;
  transition: background 0.2s;
}
.btn-claim:hover { background-color: #4a2c20; }

.status-text {
  font-weight: bold;
  color: #888;
  padding: 0 1rem;
}
</style>