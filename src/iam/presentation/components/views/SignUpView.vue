<script setup>
import { ref, inject, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const route = useRoute();
const { t } = useI18n();
const auth = inject('auth');

const accountType = ref('customer');
const firstName = ref('');
const lastName = ref('');
const companyName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const terms = ref(false);
const registerError = ref(null);

onMounted(() => {
  if (route.query.role) {
    accountType.value = route.query.role;
  }
});

const handleRegister = async () => {
  registerError.value = null;

  if (password.value !== confirmPassword.value) {
    registerError.value = "Passwords do not match.";
    return;
  }
  if (!terms.value) {
    registerError.value = "You must accept the terms and conditions.";
    return;
  }

  const newUserData = {
    fullName: accountType.value === 'producer' ? companyName.value : `${firstName.value} ${lastName.value}`,
    email: email.value,
    password: password.value,
    phone: "",
    address: "",
    city: "",
    country: "",
    isVerified: false,
    subscriptionId: "",
    type: accountType.value,
    ...(accountType.value === 'producer' && { companyName: companyName.value })
  };

  const success = await auth.register(newUserData);

  if (success) {
    router.push({ path: '/login', query: { role: accountType.value } });
  } else {
    registerError.value = auth.errors.length > 0 ? auth.errors[0] : "Error creating user.";
  }
};
</script>

<template>
  <div class="auth-container">
    <form class="auth-form" @submit.prevent="handleRegister">
      <h3>{{ t('auth.create_account') }}</h3>

      <div v-if="registerError" class="error-message">{{ registerError }}</div>

      <div class="role-selector">
        <label class="role-option">
          <input type="radio" value="customer" v-model="accountType" name="accountType" />
          <span class="role-button">{{ t('auth.customer_account') }}</span>
        </label>
        <label class="role-option">
          <input type="radio" value="producer" v-model="accountType" name="accountType" />
          <span class="role-button">{{ t('auth.producer_account') }}</span>
        </label>
      </div>

      <div v-if="accountType === 'customer'" class="form-row">
        <div class="form-group">
          <label>{{ t('auth.first_name') }}</label>
          <input type="text" v-model="firstName" required />
        </div>
        <div class="form-group">
          <label>{{ t('auth.last_name') }}</label>
          <input type="text" v-model="lastName" required />
        </div>
      </div>

      <div v-if="accountType === 'producer'" class="form-group">
        <label>{{ t('auth.company_name') }}</label>
        <input type="text" v-model="companyName" required />
      </div>

      <div class="form-group">
        <label>{{ t('auth.email') }}</label>
        <input type="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label>{{ t('auth.password') }}</label>
        <input type="password" v-model="password" required />
      </div>
      <div class="form-group">
        <label>{{ t('auth.confirm_password') }}</label>
        <input type="password" v-model="confirmPassword" required />
      </div>

      <div class="form-options">
        <label><input type="checkbox" v-model="terms" /> {{ t('auth.terms') }}</label>
      </div>

      <button type="submit" class="btn-primary">{{ t('auth.create_account') }}</button>

      <p class="auth-switch">
        {{ t('auth.already_have_account') }}
        <router-link :to="{ path: '/login', query: { role: accountType } }">
          {{ t('auth.log_in') }}
        </router-link>
      </p>
    </form>
  </div>
</template>

<style scoped>
.auth-container { display: flex; flex-direction: column; align-items: center; padding: 2rem; }
.auth-form { width: 100%; max-width: 400px; padding: 2rem; border: 2px solid #CDAC77; border-radius: 15px; background: #fff; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
h3 { text-align: center; font-family: 'Amaranth', sans-serif; color: #2C1810; margin-top: 0; margin-bottom: 1.2rem; font-size: 1.6rem; }

.role-selector {
  display: flex;
  background-color: #FDFCF8;
  border: 2px solid #CDAC77;
  border-radius: 8px;
  overflow: hidden;
  margin: 0 auto 1.5rem auto;
  max-width: 80%;
}

.role-option {
  flex: 1;
  text-align: center;
  cursor: pointer;
}

.role-option input {
  display: none;
}

.role-button {
  display: block;
  padding: 0.5rem;
  font-family: 'Amaranth', sans-serif;
  font-size: 0.95rem;
  font-weight: bold;
  color: #5c4b44;
  transition: all 0.3s ease;
}
.form-options{
  color: #2C1810;
}
.role-option input:checked + .role-button {
  background-color: #CDAC77;
  color: #2C1810;
}

.role-option:hover .role-button {
  background-color: #f3eadd;
}
.form-group { margin-bottom: 1rem; }
.form-group label { display: block; font-family: 'Amaranth', sans-serif; font-weight: bold; margin-bottom: 0.4rem; color: #5c4b44; font-size: 0.9rem; }
.form-group input { width: 100%; padding: 0.7rem; border: 1px solid #EFE1C3; border-radius: 8px; box-sizing: border-box; font-family: 'Amaranth', sans-serif; font-size: 0.95rem; }
.form-group input:focus { outline: none; border-color: #CDAC77; box-shadow: 0 0 0 2px rgba(205, 172, 119, 0.2); }

.btn-primary { width: 100%; padding: 0.7rem; background: #2C1810; color: #fff; border-radius: 12px; cursor: pointer; margin-top: 0.8rem; font-weight: bold; border: none; font-family: 'Amaranth', sans-serif; font-size: 1rem; transition: background 0.2s; }
.btn-primary:hover { background-color: #4a2c1d; }

.error-message { color: #D32F2F; background: #fddede; padding: 0.8rem; border-radius: 8px; margin-bottom: 1rem; text-align: center; font-family: 'Amaranth', sans-serif; font-size: 0.9rem; }

.auth-switch { text-align: center; margin-top: 1.2rem; color: #5c4b44; font-family: 'Amaranth', sans-serif; font-size: 0.9rem; }
.auth-switch a { color: #CDAC77; font-weight: bold; text-decoration: none; }
.auth-switch a:hover { text-decoration: underline; }

.form-row { display: flex; gap: 0.8rem; }
.form-row .form-group { flex: 1; }
</style>