<script setup>
import { ref, onMounted, inject } from 'vue';
import { useI18n } from 'vue-i18n';


import profileApi from '../../infrastructure/profilesApi.js';

import ProfileSidebar from '../ui/ProfileSidebar.vue';
import Rewards from '../ui/ProfileRewards.vue';
import PaymentMethods from '../ui/ProfilePaymentMethods.vue';
import Configuration from '../ui/ProfileConfiguration.vue';


import SubscriptionDetails from '../../../payment/components/ui/SubscriptionDetails.vue';
import Orders from '../../../payment/components/ui/OrdersList.vue';

const { t } = useI18n();
const auth = inject('auth');
const profile = ref(null);
const loading = ref(true);
const error = ref(null);
const activeView = ref('subscriptions');

const nextDeliveryDate = ref('25 OCT 2025');

onMounted(async () => {
  const userId = auth.loggedInUserId.value;
  if (!userId) {
    error.value = t('profile.not_logged_in');
    loading.value = false;
    return;
  }
  try {

    profile.value = await profileApi.getUserById(userId);
  } catch (e) {
    console.error("Error loading profile data:", e);
    error.value = t('profile.error');
  } finally {
    loading.value = false;
  }
});

const subscriptionPlans = ['basic', 'premium', 'vip'];
const cycleSubscription = async () => {
  const userId = auth.loggedInUserId.value;
  if (!profile.value || !userId) return;

  let currentIndex = subscriptionPlans.indexOf(profile.value.subscription.plan);
  if (currentIndex === -1) currentIndex = -1;
  let nextIndex = (currentIndex + 1) % subscriptionPlans.length;
  const nextPlan = subscriptionPlans[nextIndex];

  const updatedProfile = { ...profile.value };
  updatedProfile.subscription.plan = nextPlan;
  updatedProfile.subscription.status = "active";

  try {

    profile.value = await profileApi.updateProfile(userId, updatedProfile);
  } catch (error) {
    console.error("Error al actualizar plan:", error);
  }
};

const cancelUserSubscription = async () => {
  const userId = auth.loggedInUserId.value;
  if (!profile.value || !userId) return;

  const updatedProfile = {
    ...profile.value,
    subscription: {
      status: 'inactive',
      plan: null
    }
  };

  try {

    const response = await profileApi.updateProfile(userId, updatedProfile);
    profile.value = response;
    alert("Subscription cancelled successfully.");
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    alert("Failed to cancel subscription. Please try again.");
  }
};

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
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
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
  font-family: 'Amaranth', sans-serif;
}
.state-message {
  font-family: 'Amaranth', sans-serif;
  font-size: 1.5rem;
  padding: 3rem;
  color: #5c4b44;
  text-align: center;
}
.error { color: #D32F2F; }
@media (max-width: 992px) {
  .profile-layout { flex-direction: column; }
  .profile-main-content { width: 100%; }
}
</style>