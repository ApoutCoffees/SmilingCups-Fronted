<script setup>
import { ref, onMounted, computed, inject } from 'vue';
import { useI18n } from 'vue-i18n';
import coffeeApi from '../../../services/coffe-api.js';
import ProfileSidebar from './profile-tabs/ProfileSidebar.vue';
import SubscriptionDetails from './profile-tabs/SubscriptionDetails.vue';
import Orders from './profile-tabs/Orders.vue'; // Corrected import path assuming Orders.vue is in this subfolder
import Rewards from './profile-tabs/Rewards.vue';
import PaymentMethods from './profile-tabs/PaymentMethods.vue';
import Configuration from './profile-tabs/Configuration.vue';
const { t } = useI18n();
const auth = inject('auth');
const profile = ref(null);
const loading = ref(true);
const error = ref(null);
const activeView = ref('subscriptions'); // Default view

const nextDeliveryDate = ref('25 OCT 2025'); // Placeholder

onMounted(async () => {
  const userId = auth.loggedInUserId.value;
  if (!userId) {
    error.value = t('profile.not_logged_in');
    loading.value = false;
    return;
  }
  try {
    profile.value = await coffeeApi.getProfile(userId);
  } catch (e) {
    console.error("Error loading profile data:", e);
    error.value = t('profile.error');
  } finally {
    loading.value = false;
  }
});

// Logic for Dev Cycle Button
const subscriptionPlans = ['basic', 'premium', 'vip'];
const cycleSubscription = async () => {
  const userId = auth.loggedInUserId.value;
  if (!profile.value || !userId) return;
  const currentPlan = profile.value.subscription.plan;
  let currentIndex = subscriptionPlans.indexOf(currentPlan);
  // If current plan is null or not found, start from basic
  if (currentIndex === -1) currentIndex = -1;
  let nextIndex = (currentIndex + 1) % subscriptionPlans.length;
  const nextPlan = subscriptionPlans[nextIndex];

  const updatedProfile = { ...profile.value };
  updatedProfile.subscription.plan = nextPlan;
  // Always set to active when cycling for testing purposes
  updatedProfile.subscription.status = "active";

  try {
    profile.value = await coffeeApi.updateProfile(userId, updatedProfile);
  } catch (error) {
    console.error("Error al actualizar plan:", error);
  }
};

// Logic for Cancel Button (from SubscriptionDetails event)
const cancelUserSubscription = async () => {
  const userId = auth.loggedInUserId.value;
  if (!profile.value || !userId) return;

  const updatedProfile = {
    ...profile.value,
    subscription: {
      status: 'inactive',
      plan: null // Set plan to null when inactive
    }
  };

  try {
    const response = await coffeeApi.updateProfile(userId, updatedProfile);
    profile.value = response;
    alert("Subscription cancelled successfully.");
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    alert("Failed to cancel subscription. Please try again.");
  }
};

// Handle navigation from sidebar
const handleNavigation = (view) => {
  activeView.value = view;
};
</script>

<template>
  <div class="profile-page-container">
    <h1>{{ t('profile.title') }}</h1>

    <div v-if="loading" class="state-message">{{ t('profile.loading') }}</div>
    <div v-else-if="error" class="state-message error">{{ error }}</div>

    <div v-else-if="profile" class="profile-layout">
      <ProfileSidebar
          :profile="profile"
          :active-item="activeView"
          @navigate="handleNavigation"
      />

      <main class="profile-main-content">
        <SubscriptionDetails
            v-if="activeView === 'subscriptions'"
            :profile="profile"
            :next-delivery-date="nextDeliveryDate"
            @cancel-subscription="cancelUserSubscription"
        />
        <Rewards v-else-if="activeView === 'rewards'" />
        <PaymentMethods v-else-if="activeView === 'payment_methods'" />
        <Configuration v-else-if="activeView === 'configuration'" />
        <Orders v-else-if="activeView === 'orders'" />

        <button @click="cycleSubscription" class="dev-button">{{ t('profile.dev_button_label') }}</button>
      </main>
    </div>

    <div v-else-if="!loading && !error && !profile" class="state-message">{{ t('profile.not_logged_in') }}</div>
  </div>
</template>

<style scoped>
/* --- Layout Styles (Restored) --- */
.profile-page-container {
  width: 100%;
  max-width: 1400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #FFFBEB;
  border-radius: 25px;
  border: 3px solid #EFE1C3;
}

.profile-page-container h1 {
  font-family: 'Amaranth', sans-serif;
  font-size: 2.5rem;
  color: #2C1810;
  margin-bottom: 2rem;
  text-align: left;
}

.profile-layout {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.profile-main-content {
  flex: 1;
  position: relative; /* Needed for absolute positioning of dev button */
  display: flex; /* Use flex to manage content flow */
  flex-direction: column; /* Stack content vertically */
  gap: 1.5rem; /* Space between components shown here */
}

/* --- Dev Button Style --- */
.dev-button {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background-color: #D32F2F;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  z-index: 10;
  font-family: 'Amaranth', sans-serif; /* Added font */
}

/* --- Loading/Error State Styles --- */
.state-message {
  font-family: 'Amaranth', sans-serif;
  font-size: 1.5rem;
  padding: 3rem;
  color: #5c4b44;
  text-align: center;
}
.error { color: #D32F2F; }

/* --- Responsive Styles --- */
@media (max-width: 992px) {
  .profile-layout { flex-direction: column; }
  .profile-main-content { width: 100%; }
}
</style>