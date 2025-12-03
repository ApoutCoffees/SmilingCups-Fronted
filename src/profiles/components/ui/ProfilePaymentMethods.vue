<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// Estado del método seleccionado (Por defecto el ID 1)
const selectedMethodId = ref(1);

// Mock Data: Métodos guardados
const savedMethods = ref([
  {
    id: 1,
    type: 'visa',
    brand: 'Visa',
    last4: '4242',
    expiry: '12/26',
    holder: 'Juan Pérez'
  },
  {
    id: 2,
    type: 'mastercard',
    brand: 'Mastercard',
    last4: '8899',
    expiry: '09/25',
    holder: 'Juan Pérez'
  },
  {
    id: 3,
    type: 'paypal',
    brand: 'PayPal',
    email: 'juan@example.com',
    holder: ''
  }
]);

// Función para cambiar el favorito
const setFavorite = (id) => {
  selectedMethodId.value = id;
  // Aquí llamarías a la API: await profileApi.setDefaultPaymentMethod(id);
};

// Helper para iconos según marca
const getIcon = (type) => {
  switch(type) {
    case 'visa': return 'pi pi-credit-card'; // O un SVG específico
    case 'mastercard': return 'pi pi-credit-card';
    case 'paypal': return 'pi pi-paypal';
    default: return 'pi pi-wallet';
  }
};
</script>

<template>
  <div class="payments-container card">
    <div class="header">
      <h2><i class="pi pi-wallet"></i> {{ t('payments.title') || 'Payment Methods' }}</h2>
      <p>Select your <strong>primary payment method</strong> for subscriptions and orders.</p>
    </div>

    <div class="methods-list">

      <div
          v-for="method in savedMethods"
          :key="method.id"
          class="payment-option"
          :class="{ 'active': selectedMethodId === method.id }"
          @click="setFavorite(method.id)"
      >
        <div class="radio-indicator">
          <div class="dot" v-if="selectedMethodId === method.id"></div>
        </div>

        <div class="card-icon" :class="method.type">
          <i :class="getIcon(method.type)"></i>
        </div>

        <div class="details">
          <div class="top-row">
            <h4>{{ method.brand }}</h4>
            <span v-if="selectedMethodId === method.id" class="default-badge">
              Default
            </span>
          </div>

          <p v-if="method.type !== 'paypal'" class="card-number">
            •••• •••• •••• {{ method.last4 }}
          </p>
          <p v-else class="card-number">{{ method.email }}</p>

          <small v-if="method.expiry">Expires: {{ method.expiry }}</small>
        </div>
      </div>

      <button class="btn-add-new">
        <i class="pi pi-plus"></i> Add New Method
      </button>

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
  max-width: 700px;
}

.header h2 { color: #2C1810; margin-top: 0; display: flex; align-items: center; gap: 10px; }
.header p { color: #5c4b44; margin-bottom: 2rem; }

/* Lista de opciones */
.methods-list { display: flex; flex-direction: column; gap: 1rem; }

.payment-option {
  display: flex;
  align-items: center;
  padding: 1.2rem;
  border: 2px solid #EFE1C3;
  border-radius: 12px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.payment-option:hover {
  border-color: #CDAC77;
  background-color: #FFFDF5;
}

/* ESTADO SELECCIONADO (FAVORITO) */
.payment-option.active {
  border-color: #CDAC77;
  background-color: #FFF9E6; /* Crema suave */
  box-shadow: 0 4px 12px rgba(205, 172, 119, 0.15);
}

/* Radio Button Custom */
.radio-indicator {
  width: 20px;
  height: 20px;
  border: 2px solid #CDAC77;
  border-radius: 50%;
  margin-right: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.payment-option.active .radio-indicator {
  background-color: #fff;
  border-color: #2C1810;
}

.dot {
  width: 10px;
  height: 10px;
  background-color: #2C1810;
  border-radius: 50%;
}

/* Iconos */
.card-icon {
  width: 50px;
  height: 35px;
  background-color: #eee;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
  font-size: 1.5rem;
  color: #555;
}
.card-icon.visa { background-color: #1a1f71; color: white; }
.card-icon.mastercard { background-color: #222; color: white; }
.card-icon.paypal { background-color: #003087; color: white; }

/* Detalles */
.details { flex: 1; }
.top-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.2rem; }

.details h4 { margin: 0; color: #2C1810; font-size: 1.1rem; }
.card-number { margin: 0; color: #5c4b44; font-family: monospace; font-size: 1rem; letter-spacing: 1px; }
.details small { color: #999; font-size: 0.85rem; }

/* Badge Default */
.default-badge {
  background-color: #CDAC77;
  color: #2C1810;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.2rem 0.6rem;
  border-radius: 10px;
  text-transform: uppercase;
}

/* Botón Añadir */
.btn-add-new {
  margin-top: 1rem;
  padding: 1rem;
  border: 2px dashed #EFE1C3;
  background: transparent;
  border-radius: 12px;
  color: #A08056;
  font-family: 'Amaranth', sans-serif;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}
.btn-add-new:hover {
  border-color: #CDAC77;
  color: #2C1810;
  background-color: #FFFDF5;
}
</style>