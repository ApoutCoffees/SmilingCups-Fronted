<script setup>
import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
defineProps({
  profile: Object
});
</script>

<template>
  <div class="account-status card">
    <h2>{{ t('profile.status.title') }}</h2>

    <div class="status-item">
      <strong>{{ t('profile.status.verification_label') }}</strong>
      <span v-if="profile.isVerified" class="status-badge verified">
        {{ t('profile.status.verified') }}
      </span>
      <span v-else class="status-badge not-verified">
        {{ t('profile.status.not_verified') }}
      </span>
    </div>

    <div class="status-item">
      <strong>{{ t('profile.status.subscription_label') }}</strong>
      <span :class="['status-badge', profile.subscription.status]">
        {{ t(`profile.status.${profile.subscription.status}`) }}
      </span>
    </div>

    <div class="status-item">
      <strong>{{ t('profile.status.plan_label') }}</strong>
      <span class="plan-badge">
        {{ t(`profile.status.plan_${profile.subscription.plan}`) }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: #FDFCF8;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  border: 1px solid #EFE1C3;
}
.account-status {
  flex: 1;
  position: sticky;
  top: 2rem;
}
h2 {
  font-family: 'Amaranth', sans-serif;
  font-size: 1.5rem;
  color: #2C1810;
  margin-top: 0;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #EFE1C3;
  padding-bottom: 1rem;
}
.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Amaranth', sans-serif;
  font-size: 1rem;
  margin-bottom: 1rem;
}
.status-badge, .plan-badge {
  font-size: 0.9rem;
  font-weight: bold;
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
}
.verified { background-color: #d4edda; color: #155724; }
.not-verified { background-color: #f8d7da; color: #721c24; }
.active { background-color: #d4edda; color: #155724; }
.inactive { background-color: #e2e3e5; color: #383d41; }
.plan-badge { background-color: #FFF2D0; color: #A08056; }
</style>