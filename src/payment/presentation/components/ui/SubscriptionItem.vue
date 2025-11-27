<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Subscription } from "../../../domain/model/Subscription.js";

const { t } = useI18n();

const props = defineProps({
  subscription: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['cancel', 'pause', 'change']);

const planName = computed(() => {
  return props.subscription.plan
      ? t(`home.plans.${props.subscription.plan}.title`)
      : t('profile.status.inactive');
});

const isActive = computed(() => props.subscription.isActive());

</script>

<template>
  <div class="subscription-item card" :class="{ active: isActive }">
    <div class="header">
      <h3>{{ t('profile.current_subscription.title') }}</h3>
      <span class="status-badge" :class="isActive ? 'active' : 'inactive'">
        {{ isActive ? t('profile.current_subscription.status_active') : t('profile.status.inactive') }}
      </span>
    </div>

    <div v-if="isActive" class="content">
      <div class="info-row">
        <span class="icon">📦</span>
        <div class="details">
          <span class="plan-name">{{ planName }}</span>
          <span class="billing-info">{{ t('profile.current_subscription.billing') }}</span>
        </div>
      </div>

      <div class="actions">
        <button class="btn btn-change" @click="$emit('change')">
          {{ t('profile.current_subscription.change_button') }}
        </button>
        <button class="btn btn-secondary" @click="$emit('pause')">
          <i class="pi pi-pause"></i> {{ t('profile.current_subscription.pause_button') }}
        </button>
        <button class="btn btn-danger" @click="$emit('cancel')">
          <i class="pi pi-times"></i> {{ t('profile.current_subscription.cancel_button') }}
        </button>
      </div>
    </div>

    <div v-else class="empty-state">
      <p>No plan active.</p>
      <router-link to="/subscriptions" class="btn btn-change">
        {{ t('home.plans.subscribe_now') }}
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.card { background-color: #FDFCF8; padding: 1.5rem; border-radius: 12px; border: 1px solid #EFE1C3; margin-bottom: 1rem; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.header h3 { font-family: 'Amaranth', sans-serif; font-size: 1.3rem; color: #2C1810; margin: 0; }
.status-badge { padding: 0.3rem 0.8rem; border-radius: 6px; font-size: 0.8rem; font-weight: bold; text-transform: uppercase; }
.status-badge.active { background-color: #d4edda; color: #155724; }
.status-badge.inactive { background-color: #e2e3e5; color: #383d41; }

.content { display: flex; flex-direction: column; gap: 1rem; }
.info-row { display: flex; align-items: center; gap: 1rem; background-color: #FFFBEB; padding: 1rem; border-radius: 8px; }
.icon { font-size: 1.5rem; }
.details { display: flex; flex-direction: column; }
.plan-name { font-weight: bold; color: #2C1810; font-family: 'Amaranth', sans-serif; }
.billing-info { font-size: 0.9rem; color: #5c4b44; }

.actions { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.btn { padding: 0.6rem 1rem; border-radius: 8px; font-weight: bold; cursor: pointer; border: 1px solid transparent; font-family: 'Amaranth', sans-serif; font-size: 0.9rem; text-decoration: none; display: inline-flex; align-items: center; gap: 0.3rem; }
.btn-change { background-color: #CDAC77; color: #2C1810; border-color: #A08056; }
.btn-secondary { background-color: #F5EFE6; color: #5c4b44; border-color: #CDAC77; }
.btn-danger { background-color: transparent; color: #D32F2F; border-color: #D32F2F; }
.btn:hover { opacity: 0.9; }
</style>