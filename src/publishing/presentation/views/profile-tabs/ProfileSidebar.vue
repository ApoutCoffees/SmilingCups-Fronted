<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const props = defineProps({
  profile: Object,
  activeItem: String
});
const emit = defineEmits(['navigate']);

const membershipLevelText = computed(() => {
  if (props.profile?.subscription?.plan) {
    return t(`profile.membership_level.${props.profile.subscription.plan}`);
  }
  return '';
});
</script>

<template>
  <aside class="profile-sidebar">
    <div class="user-info card">
      <div class="avatar-placeholder">
        <i class="pi pi-user" style="font-size: 2rem"></i>
      </div>
      <h3>{{ profile.fullName }}</h3>
      <p>{{ profile.email }}</p>
      <span class="membership-badge">{{ membershipLevelText }}</span>
    </div>

    <nav class="sidebar-nav card">
      <button
          @click="emit('navigate', 'subscriptions')"
          :class="{ active: activeItem === 'subscriptions' }">
        <i class="pi pi-credit-card"></i> {{ t('profile.sidebar.subscriptions') }}
      </button>
      <button
          @click="emit('navigate', 'rewards')"
          :class="{ active: activeItem === 'rewards' }">
        <i class="pi pi-heart"></i> {{ t('profile.sidebar.rewards') }}
      </button>
      <button
          @click="emit('navigate', 'payment_methods')"
          :class="{ active: activeItem === 'payment_methods' }">
        <i class="pi pi-wallet"></i> {{ t('profile.sidebar.payment_methods') }}
      </button>
      <button
          @click="emit('navigate', 'configuration')"
          :class="{ active: activeItem === 'configuration' }">
        <i class="pi pi-cog"></i> {{ t('profile.sidebar.configuration') }}
      </button>
      <button
          @click="emit('navigate', 'orders')"
          :class="{ active: activeItem === 'orders' }">
        <i class="pi pi-shopping-cart"></i> {{ t('profile.sidebar.orders') }} </button>
    </nav>
  </aside>
</template>

<style scoped>
.profile-sidebar { flex: 0 0 300px; display: flex; flex-direction: column; gap: 1.5rem; }
.card { background-color: #FDFCF8; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border: 1px solid #EFE1C3; }
.user-info { text-align: center; }
.avatar-placeholder { width: 80px; height: 80px; border-radius: 50%; background-color: #EFE1C3; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto; color: #A08056; }
.user-info h3 { font-family: 'Amaranth', sans-serif; font-size: 1.4rem; color: #2C1810; margin: 0.5rem 0; }
.user-info p { font-family: 'Amaranth', sans-serif; font-size: 0.9rem; color: #5c4b44; margin: 0 0 1rem 0; }
.membership-badge { display: inline-block; background-color: #CDAC77; color: #2C1810; padding: 0.5rem 1.5rem; border-radius: 20px; font-family: 'Amaranth', sans-serif; font-weight: bold; font-size: 0.9rem; }
.sidebar-nav { padding: 0.5rem; }
.sidebar-nav button { display: flex; align-items: center; width: 100%; padding: 1rem 1.5rem; border: none; background-color: transparent; text-align: left; font-family: 'Amaranth', sans-serif; font-size: 1rem; color: #5c4b44; cursor: pointer; border-radius: 8px; transition: background-color 0.2s, color 0.2s; gap: 1rem; }
.sidebar-nav button i { color: #A08056; font-size: 1.2rem; }
.sidebar-nav button:hover { background-color: #FFF2D0; color: #2C1810; }
.sidebar-nav button.active { background-color: #CDAC77; color: #2C1810; font-weight: bold; }
.sidebar-nav button.active i { color: #2C1810; }
@media (max-width: 992px) {
  .profile-sidebar { width: 100%; flex: none; flex-direction: row; overflow-x: auto; }
  .user-info { display: none; }
  .sidebar-nav { display: flex; flex-direction: row; gap: 0.5rem; padding: 0.5rem; }
  .sidebar-nav button { white-space: nowrap; }
}
</style>