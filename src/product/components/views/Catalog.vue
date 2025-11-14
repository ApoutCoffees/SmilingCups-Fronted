<script setup>
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';


import { useProductStore } from '../../application/product.store.js';
import { usePaymentStore } from '../../../payment/application/payment.store.js';

const { t } = useI18n();
const router = useRouter();


const productStore = useProductStore();
const paymentStore = usePaymentStore();


const { allCafes, loading, error, originsOptions, flavorNotesOptions } = storeToRefs(productStore);


const searchTerm = ref('');
const selectedOrigins = ref([]);
const selectedRoasts = ref([]);
const selectedFlavorNotes = ref([]);
const selectedPlans = ref([]);
const sortBy = ref('name-asc');


const roastOptions = ['Light', 'Medium', 'Dark'];
const planOptions = ['basic', 'premium', 'vip'];


onMounted(() => {

  productStore.fetchCoffees();
});


const filteredCafes = computed(() => {

  let filtered = allCafes.value;

  if (searchTerm.value) {
    const searchLower = searchTerm.value.toLowerCase();
    filtered = filtered.filter(cafe =>
        (cafe.nombre?.toLowerCase().includes(searchLower)) ||
        (cafe.descripcion?.toLowerCase().includes(searchLower)) ||
        (cafe.productor?.toLowerCase().includes(searchLower))
    );
  }

  if (selectedPlans.value.length > 0) {
    filtered = filtered.filter(cafe =>
        selectedPlans.value.includes(cafe.minSubscription)
    );
  }

  if (selectedOrigins.value.length > 0) {

    filtered = filtered.filter(cafe =>
        selectedOrigins.value.includes(cafe.origen_key)
    );
  }

  if (selectedRoasts.value.length > 0) {
    filtered = filtered.filter(cafe =>
        selectedRoasts.value.includes(cafe.tostado)
    );
  }

  if (selectedFlavorNotes.value.length > 0) {

    filtered = filtered.filter(cafe =>
        Array.isArray(cafe.notas) && selectedFlavorNotes.value.some(note => cafe.notas.includes(note))
    );
  }

  filtered.sort((a, b) => {
    if (sortBy.value === 'name-asc') { return (a.nombre || '').localeCompare(b.nombre || ''); }
    else if (sortBy.value === 'name-desc') { return (b.nombre || '').localeCompare(a.nombre || ''); }
    else if (sortBy.value === 'price-asc') { return (a.precio || 0) - (b.precio || 0); }
    else if (sortBy.value === 'price-desc') { return (b.precio || 0) - (a.precio || 0); }
    return 0;
  });

  return filtered;
});


const getPlanName = (planKey) => {
  return planKey ? t(`home.plans.${planKey}.title`) : '';
};


const subscribeWithPlan = (planKey) => {
  if (!planKey) return;

  paymentStore.clearCart();
  const planDetails = {
    id: planKey,
    name: getPlanName(planKey),
    price: parseFloat(t(`home.plans.${planKey}.price`).replace(/[^0-9.]/g, '')),
    billing: t('profile.current_subscription.billing'),
    type: 'subscription'
  };

  paymentStore.addSubscriptionPlan(planDetails);
  router.push('/checkout/cart');
};

</script>

<template>
  <div class="catalog-page-container">
    <aside class="filters-sidebar">
      <div class="filter-group">
        <h3>{{ t('catalog.plan_filter_label') }}</h3>
        <div v-for="planKey in planOptions" :key="planKey" class="checkbox-item">
          <input type="checkbox" :id="`plan-${planKey}`" :value="planKey" v-model="selectedPlans">
          <label :for="`plan-${planKey}`">{{ t(`catalog.plan_${planKey}`) }}</label>
        </div>
      </div>

      <div class="filter-group">
        <h3>{{ t('catalog.origin_label') }}</h3>
        <div v-for="originKey in originsOptions" :key="originKey" class="checkbox-item">
          <input type="checkbox" :id="originKey" :value="originKey" v-model="selectedOrigins">
          <label :for="originKey">{{ t(`catalog.${originKey}`) }}</label>
        </div>
      </div>
      <div class="filter-group">
        <h3>{{ t('catalog.roast_profile_label') }}</h3>
        <div v-for="roast in roastOptions" :key="roast" class="checkbox-item">
          <input type="checkbox" :id="roast" :value="roast" v-model="selectedRoasts">
          <label :for="roast">{{ t(`catalog.${roast.toLowerCase()}_roast`) }}</label>
        </div>
      </div>
      <div class="filter-group">
        <h3>{{ t('catalog.flavor_notes_label') }}</h3>
        <div v-for="note in flavorNotesOptions" :key="note" class="checkbox-item">
          <input type="checkbox" :id="note" :value="note" v-model="selectedFlavorNotes">
          <label :for="note">{{ t(`catalog.${note.toLowerCase().replace('-','_')}_note`) }}</label>
        </div>
      </div>

    </aside>

    <main class="catalog-content">
      <div class="catalog-header">
        <div>
          <h2>{{ t('catalog.title') }}</h2>
          <p>{{ t('catalog.subtitle') }}</p>
        </div>
        <div class="search-sort-bar">
          <div class="search-box">
            <input type="text" :placeholder="t('catalog.search_placeholder')" v-model="searchTerm">
            <button class="btn btn-primary">{{ t('catalog.search_button') }}</button>
          </div>
          <div class="sort-box">
            <label for="sort">{{ t('catalog.sort_by_label') }}</label>
            <select id="sort" v-model="sortBy">
              <option value="name-asc">A-Z</option>
              <option value="name-desc">Z-A</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div v-if="loading" class="state-message">{{ t('catalog.loading_message') }}</div>
      <div v-else-if="error" class="state-message error">{{ error }}</div>
      <div v-else-if="filteredCafes.length === 0" class="state-message no-results">{{ t('catalog.no_products_found') }}</div>

      <div v-else class="cards-container">
        <div v-for="cafe in filteredCafes" :key="cafe.id" class="cafe-card">
          <img :src="cafe.imagenUrl" :alt="'Taza de café ' + cafe.nombre" class="card-image">
          <div class="card-content">
            <h3>{{ cafe.nombre }}</h3>
            <p class="origin">{{ cafe.productor }} - {{ cafe.lugar }}</p>
            <p class="description">{{ cafe.descripcion }}</p>
            <div class="notes">
              <strong>{{ t('catalog.notes_label') }}</strong>
              <span v-for="nota in cafe.notas" :key="nota" class="note-tag">{{ nota }}</span>
            </div>

            <div class="min-subscription">
              <strong>{{ t('catalog.min_subscription_label') }}</strong>
              <span>{{ getPlanName(cafe.minSubscription) }}</span>
            </div>

            <div v-if="cafe.contact" class="contact-info">
              <strong>{{ t('catalog.contact_label') }}</strong>
              <p v-if="cafe.contact.phone"> <i class="pi pi-phone"></i> {{ cafe.contact.phone }} </p>
              <p v-if="cafe.contact.website"> <i class="pi pi-globe"></i> <a :href="cafe.contact.website" target="_blank" rel="noopener noreferrer">{{ cafe.contact.website }}</a> </p>
            </div>

            <div class="view-plans-button">
              <button
                  @click="subscribeWithPlan(cafe.minSubscription)"
                  class="btn btn-secondary">
                {{ t('catalog.view_subscriptions_button', { planName: getPlanName(cafe.minSubscription) }) }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.catalog-page-container{display:flex;max-width:1400px;margin:0 auto;padding:2rem;background-color:#f8f5f1;gap:2rem}.filters-sidebar{flex:0 0 280px;background-color:#fdfcf8;padding:1.5rem;border-radius:12px;box-shadow:0 4px 10px #0000000d;border:1px solid #efe1c3;height:fit-content;position:sticky;top:2rem}.filter-group{margin-bottom:2rem;border-bottom:1px solid #efe1c3;padding-bottom:1.5rem}.filter-group:last-of-type{border-bottom:none;margin-bottom:0;padding-bottom:0}.filter-group h3{font-family:'Amaranth',sans-serif;font-size:1.3rem;color:#2c1810;margin-bottom:1rem;text-align:left}.checkbox-item{display:flex;align-items:center;margin-bottom:.7rem}.checkbox-item input[type=checkbox]{margin-right:.8rem;width:18px;height:18px;accent-color:#cdac77}.checkbox-item label{font-family:'Amaranth',sans-serif;font-size:.95rem;color:#5c4b44;cursor:pointer}.catalog-content{flex:1}.catalog-header{text-align:left;margin-bottom:2.5rem}.catalog-header h2{font-family:'Amaranth',sans-serif;font-size:2.8rem;color:#2c1810;margin-bottom:.5rem}.catalog-header p{font-family:'Amatic SC',cursive;font-size:1.8rem;color:#5c4b44;margin-top:0}.search-sort-bar{display:flex;justify-content:space-between;align-items:center;margin-top:2rem;gap:1.5rem}.search-box{display:flex;flex-grow:1;border:1px solid #efe1c3;border-radius:12px;overflow:hidden;background-color:#fff;box-shadow:0 2px 5px #00000008}.search-box input{border:none;padding:.8rem 1.2rem;font-size:1rem;flex-grow:1;outline:0;font-family:'Amaranth',sans-serif;color:#2c1810}.search-box input::placeholder{color:#a3928c}.search-box .btn{background-color:#cdac77;color:#2c1810;border:none;border-radius:0;padding:.8rem 1.5rem;font-weight:700;transition:background-color .2s}.search-box .btn:hover{background-color:#be9d6e}.sort-box{display:flex;align-items:center;gap:.8rem;font-family:'Amaranth',sans-serif;color:#5c4b44}.sort-box select{padding:.7rem 1rem;border:1px solid #efe1c3;border-radius:12px;background-color:#fff;font-family:'Amaranth',sans-serif;font-size:.95rem;color:#2c1810;cursor:pointer;outline:0;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%232C1810'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right .7rem center;background-size:1em;padding-right:2.5rem}.state-message{font-family:'Amaranth',sans-serif;font-size:1.5rem;padding:3rem;color:#5c4b44;text-align:center}.error{color:#d32f2f}.no-results{color:#a08056}.cards-container{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem;margin-top:2rem}.cafe-card{background-color:#fff;border:1px solid #efe1c3;border-radius:15px;overflow:hidden;text-align:left;box-shadow:0 4px 15px #0000000d;transition:transform .2s ease-in-out,box-shadow .2s ease-in-out;display:flex;flex-direction:column}.cafe-card:hover{transform:translateY(-5px);box-shadow:0 8px 25px #0000001a}.card-image{width:100%;height:180px;object-fit:cover}.card-content{padding:1.2rem;flex-grow:1;display:flex;flex-direction:column}.card-content h3{font-family:'Amaranth',sans-serif;font-size:1.4rem;color:#2c1810;margin:0 0 .4rem}.origin{font-family:'Amaranth',sans-serif;font-size:.85rem;color:#cdac77;font-weight:700;margin:0 0 .8rem}.description{font-family:'Amaranth',sans-serif;font-size:.95rem;color:#5c4b44;line-height:1.5;margin-bottom:1rem;flex-grow:1}.notes{font-family:'Amaranth',sans-serif;margin-bottom:.8rem}.notes strong{font-size:.9rem;color:#2c1810;display:block;margin-bottom:.4rem}.note-tag{display:inline-block;background-color:#fff2d0;color:#a08056;padding:.2rem .5rem;border-radius:6px;font-size:.75rem;margin:.15rem}.min-subscription{font-family:'Amaranth',sans-serif;font-size:.9rem;color:#5c4b44;margin-top:1rem;border-top:1px dashed #efe1c3;padding-top:.8rem}.min-subscription strong{color:#2c1810;margin-right:.5rem}.contact-info{font-family:'Amaranth',sans-serif;font-size:.9rem;color:#5c4b44;margin-top:.8rem;border-top:1px dashed #efe1c3;padding-top:.8rem}.contact-info strong{color:#2c1810;display:block;margin-bottom:.3rem}.contact-info p{margin:.2rem 0;display:flex;align-items:center;gap:.5rem}.contact-info i{color:#cdac77}.contact-info a{color:#a08056;text-decoration:none}.contact-info a:hover{text-decoration:underline}.view-plans-button{text-align:center;margin-top:auto;padding-top:1rem;border-top:1px solid #efe1c3}.btn{border:2px solid #2c1810;border-radius:12px;padding:.8rem 1.8rem;font-family:'Amaranth',sans-serif;font-size:1rem;font-weight:700;cursor:pointer;transition:all .2s ease-in-out;text-decoration:none;display:inline-block}.btn-primary{background-color:#2c1810;color:#f5efe6;width:100%;max-width:200px}.btn-primary:hover{background-color:#4a2c1d}.btn-secondary{background-color:#f5efe6;color:#2c1810;border-color:#a08056;width:100%;max-width:250px}.btn-secondary:hover{background-color:#e0d8ce}@media (max-width:992px){.catalog-page-container{flex-direction:column;padding:1rem}.filters-sidebar{width:100%;flex:none;position:static;top:auto;margin-bottom:2rem}.search-sort-bar{flex-direction:column;align-items:stretch;gap:1rem}.search-box{width:100%}.sort-box{width:100%;justify-content:center}.catalog-header h2{font-size:2.2rem}.catalog-header p{font-size:1.5rem}}@media (max-width:768px){.cards-container{grid-template-columns:repeat(auto-fit,minmax(250px,1fr))}}@media (max-width:480px){.catalog-header h2{font-size:1.8rem}.catalog-header p{font-size:1.2rem}}
</style>