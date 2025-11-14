<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const props = defineProps({
  profile: Object,
  nextDeliveryDate: String
});
const emit = defineEmits(['cancel-subscription']);

const currentPlanText = computed(() => {
  if (props.profile?.subscription?.plan) {
    return t(`home.plans.${props.profile.subscription.plan}.title`);
  }
  return '';
});

const currentPlanPrice = computed(() => {
  if (props.profile?.subscription?.plan) {
    return t(`home.plans.${props.profile.subscription.plan}.price`);
  }
  return '';
});


const handleCancelSubscription = () => {

  if (confirm("Are you sure you want to cancel your subscription? This cannot be undone immediately.")) {
    emit('cancel-subscription');
  }
};
</script>

<template>
  <div>
    <div class="subscription-details card">
      <div class="subscription-header">
        <h2>{{ t('profile.current_subscription.title') }}</h2>
        <span v-if="profile.subscription.status === 'active'" class="status-badge active">
          {{ t('profile.current_subscription.status_active') }}
        </span>
        <span v-else-if="profile.subscription.status === 'inactive'" class="status-badge inactive">
          {{ t('profile.status.inactive') }} </span>
      </div>
      <div v-if="profile.subscription.status === 'active'">
        <div class="plan-info">
          <div class="plan-icon-placeholder">📦</div>
          <div>
            <h3>{{ currentPlanText }} Plan</h3>
            <p>{{ currentPlanPrice }} / {{ t('profile.current_subscription.billing') }}</p>
          </div>
        </div>
        <div class="plan-actions">
          <button class="btn btn-change">{{ t('profile.current_subscription.change_button') }}</button>
          <button class="btn btn-secondary"><i class="pi pi-pause"></i> {{ t('profile.current_subscription.pause_button') }}</button>
          <button @click="handleCancelSubscription" class="btn btn-danger"><i class="pi pi-times"></i> {{ t('profile.current_subscription.cancel_button') }}</button>
        </div>
      </div>
      <div v-else>
        <p>Your subscription is currently inactive.</p>
        <router-link to="/subscriptions" class="btn btn-change">View Plans</router-link> </div>
    </div>

    <div v-if="profile.subscription.status === 'active'" class="next-delivery card">
      <div class="delivery-icon-placeholder">🗓️</div>
      <div>
        <h3>{{ t('profile.next_delivery.title') }}</h3>
        <p>{{ nextDeliveryDate }}</p>
        <span>{{ t('profile.next_delivery.product_placeholder') }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card { background-color: #FDFCF8; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border: 1px solid #EFE1C3; margin-bottom: 1.5rem; }
.subscription-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.subscription-header h2 { font-family: 'Amaranth', sans-serif; font-size: 1.5rem; color: #2C1810; margin: 0; }
.status-badge { font-size: 0.8rem; font-weight: bold; padding: 0.3rem 0.8rem; border-radius: 6px; text-transform: uppercase; }
.status-badge.active { background-color: #d4edda; color: #155724; }
.status-badge.inactive { background-color: #e2e3e5; color: #383d41; } /* Style for inactive */
.plan-info { display: flex; align-items: center; gap: 1.5rem; background-color: #FFFBEB; padding: 1rem; border-radius: 10px; margin-bottom: 1.5rem; }
.plan-icon-placeholder { font-size: 2rem; }
.plan-info h3 { font-family: 'Amaranth', sans-serif; font-size: 1.2rem; margin: 0 0 0.3rem 0; color: #2C1810; }
.plan-info p { font-family: 'Amaranth', sans-serif; font-size: 0.9rem; color: #5c4b44; margin: 0; }
.plan-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
.btn { font-family: 'Amaranth', sans-serif; font-size: 0.9rem; font-weight: bold; padding: 0.6rem 1.2rem; border-radius: 8px; border: 1px solid; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.5rem; }
.btn i { font-size: 1rem; }
.btn-change { background-color: #CDAC77; border-color: #A08056; color: #2C1810; text-decoration: none; /* For router-link */ }
.btn-change:hover { background-color: #be9d6e; }
.btn-secondary { background-color: #F5EFE6; border-color: #CDAC77; color: #5c4b44; }
.btn-secondary:hover { background-color: #e0d8ce; }
.btn-danger { background-color: transparent; border-color: #D32F2F; color: #D32F2F; }
.btn-danger:hover { background-color: #f8d7da; }
.next-delivery { display: flex; align-items: center; gap: 1.5rem; }
.delivery-icon-placeholder { font-size: 2rem; }
.next-delivery h3 { font-family: 'Amaranth', sans-serif; font-size: 1.2rem; margin: 0 0 0.3rem 0; color: #2C1810; }
.next-delivery p { font-family: 'Amaranth', sans-serif; font-size: 1.1rem; color: #2C1810; font-weight: bold; margin: 0 0 0.3rem 0; }
.next-delivery span { font-family: 'Amaranth', sans-serif; font-size: 0.9rem; color: #5c4b44; }
</style>