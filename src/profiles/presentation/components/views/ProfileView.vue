<script setup>
import { onMounted, inject } from 'vue';
import { useI18n } from 'vue-i18n';
import { usePaymentStore } from '@/payment/application/payment.store.js';
import { useProfilesStore } from '@/profiles/application/profiles.store.js';
import SubscriptionItem from '@/payment/presentation/components/ui/SubscriptionItem.vue';
import OrderItem from '@/payment/presentation/components/ui/OrderItem.vue';
import { Subscription } from "@/payment/domain/model/Subscription.js";
const { t } = useI18n();
const auth = inject('auth');
const paymentStore = usePaymentStore();
const profilesStore = useProfilesStore();

onMounted(async () => {
  const user = auth.currentUser;
  if (user) {
    await paymentStore.fetchOrders(user.id);

    await profilesStore.fetchFavorites(user.id);
  }
});

const userSubscription = new Subscription({
  plan: auth.currentUser?.subscriptionId || null,
  status: auth.currentUser?.subscriptionId ? 'active' : 'inactive'
});

</script>

<template>
  <div class="profile-container">
    <div class="profile-header card">
      <div class="user-info">
        <div class="avatar-placeholder">{{ auth.currentUser?.fullName?.charAt(0) }}</div>
        <div class="user-details">
          <h2>{{ auth.currentUser?.fullName }}</h2>
          <p class="user-email">{{ auth.currentUser?.email }}</p>
          <span class="role-badge">{{ t('auth.customer_account') }}</span>
        </div>
      </div>
    </div>

    <div class="profile-grid">
      <div class="left-col">
        <SubscriptionItem :subscription="userSubscription" />

        <div class="favorites-section card">
          <h3>
            <i class="pi pi-heart-fill" style="color: #D32F2F; margin-right: 0.5rem;"></i>
            {{ t('catalog.favorites_label') || 'Favorites' }}
          </h3>

          <div v-if="profilesStore.favorites.value.length === 0" class="empty-state">
            No favorites yet. Go explore!
          </div>

          <div v-else class="favorites-list">
            <div v-for="fav in profilesStore.favorites.value" :key="fav.id" class="favorite-tag">
              <i class="pi pi-coffee"></i>
              <span>{{ fav.coffee?.name || 'Coffee #' + fav.coffeeId }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="right-col">
        <div class="orders-section card">
          <h3>
            <i class="pi pi-shopping-bag" style="color: #CDAC77; margin-right: 0.5rem;"></i>
            {{ t('orders.title') }}
          </h3>

          <div v-if="paymentStore.loadingOrders.value" class="empty-state">Loading...</div>
          <div v-else-if="paymentStore.orders.value.length === 0" class="empty-state">No orders found.</div>

          <div v-else class="orders-list">
            <OrderItem
                v-for="order in paymentStore.orders.value"
                :key="order.id"
                :order="order"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-container { max-width: 1200px; margin: 2rem auto; padding: 0 1.5rem; }

.card {
  background-color: #FFFFFF;
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid #EFE1C3;
  box-shadow: 0 4px 20px rgba(44, 24, 16, 0.08);
  margin-bottom: 2rem;
}

.profile-header { display: flex; align-items: center; }
.user-info { display: flex; gap: 1.5rem; align-items: center; }

.avatar-placeholder {
  width: 90px; height: 90px;
  background-color: #2C1810;
  color: #FFF;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 3rem;
  font-family: 'Amaranth', sans-serif;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.user-details h2 {
  margin: 0 0 0.2rem 0;
  color: #2C1810;
  font-family: 'Amaranth', sans-serif;
  font-size: 2rem;
}
.user-email {
  margin: 0 0 0.8rem 0;
  color: #5c4b44;
  font-size: 1.1rem;
}
.role-badge {
  background-color: #CDAC77;
  color: #FFF;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.profile-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 2rem; align-items: start; }

.favorites-section h3, .orders-section h3 {
  font-family: 'Amaranth', sans-serif;
  color: #2C1810;
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  border-bottom: 2px solid #FFF8E7;
  padding-bottom: 0.5rem;
  display: flex; align-items: center;
}

.favorites-list { display: flex; flex-wrap: wrap; gap: 0.8rem; }
.favorite-tag {
  background-color: #FFF8E7;
  border: 1px solid #CDAC77;
  color: #2C1810;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: bold;
  font-size: 0.95rem;
  display: flex; align-items: center; gap: 0.5rem;
  transition: all 0.2s;
}
.subscription-item {
  color: #CDAC77;

}
.favorite-tag:hover { background-color: #FFEBC2; transform: translateY(-2px); }
.favorite-tag i { color: #CDAC77; }

.empty-state { color: #a08056; font-style: italic; text-align: center; padding: 1rem; }

.orders-list { display: flex; flex-direction: column; gap: 1rem; }

@media (max-width: 900px) { .profile-grid { grid-template-columns: 1fr; } }
</style>