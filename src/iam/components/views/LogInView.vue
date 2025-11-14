<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';


import IamApi from '../../infrastructure/IamApi.js';


const auth = inject('auth');
const router = useRouter();
const { t } = useI18n();


const email = ref('');
const password = ref('');
const error = ref(null);

const handleLogin = async () => {
  error.value = null;
  try {

    const user = await IamApi.loginUser(email.value, password.value);

    if (user) {

      auth.setUser(user);


      if (user.type === 'producer') {
        await router.push({ name: 'producerDashboard' });
      } else {
        await router.push({ name: 'profile' });
      }
    } else {

      error.value = t('login.invalid_credentials');
    }
  } catch (err) {

    console.error('Login failed:', err);
    error.value = t('login.error');
  }
};
</script>
<template>
  <div class="auth-container">
    <div class="logo-container">
      <img src="../../../assets/Icon.png" alt="Smiling Cups Logo" />
      <p>SmilingCups</p>
    </div>

    <div class="toggle-buttons">
      <label>
        <input type="radio" value="customer" v-model="accountType" name="accountType" checked/>
        <span>{{ t('auth.customer_account') }}</span>
      </label>
      <label>
        <input type="radio" value="producer" v-model="accountType" name="accountType" />
        <span>{{ t('auth.producer_account') }}</span>
      </label>
    </div>
    <form class="auth-form" @submit.prevent="handleLogin">
      <h3>{{ t('auth.log_in') }}</h3>

      <div v-if="loginError" class="error-message">{{ loginError }}</div>

      <div class="form-group">
        <label for="email">{{ t('auth.email_username') }}</label>
        <input type="text" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">{{ t('auth.password') }}</label>
        <input type="password" id="password" v-model="password" required />
      </div>

      <div class="form-options">
        <label><input type="checkbox" v-model="rememberMe" /> {{ t('auth.remember_me') }}</label>
        <a href="#">{{ t('auth.forgot_password') }}</a>
      </div>

      <button type="submit" class="btn-primary">{{ t('auth.log_in') }}</button>

      <p class="auth-switch">
        {{ t('auth.no_account') }}
        <router-link :to="{ path: '/register', query: { role: accountType } }">
          {{ t('auth.sign_up_now') }}
        </router-link>
      </p>
    </form>
  </div>
</template>

<style scoped>
.auth-container { display: flex; flex-direction: column; align-items: center; padding: 2rem; }
.logo-container { display: flex; align-items: center; gap: 10px; margin-bottom: 2rem; }
.logo-container img { height: 60px; }
.logo-container p { font-family: 'Amaranth', sans-serif; font-size: 2rem; font-weight: bold; color: #2C1810; margin: 0; } /* Added margin: 0 */
.toggle-buttons { display: flex; margin-bottom: 1rem; border: 2px solid #CDAC77; border-radius: 12px; overflow: hidden; }
.toggle-buttons label { padding: 0.8rem 1.5rem; background-color: #FDFCF8; color: #5c4b44; cursor: pointer; }
.toggle-buttons input { display: none; }
.toggle-buttons input:checked + span { background-color: #CDAC77; color: #2C1810; font-weight: bold; }
.auth-form { width: 100%; max-width: 400px; padding: 2rem; border: 2px solid #CDAC77; border-radius: 15px; background: #fff; }
.auth-form h3 { text-align: center; font-family: 'Amaranth', sans-serif; font-size: 1.8rem; color: #2C1810; margin-top: 0; margin-bottom: 1.5rem;} /* Added margin-bottom */
.form-group { margin-bottom: 1.5rem; }
.form-group label { display: block; font-family: 'Amaranth', sans-serif; font-size: 0.9rem; font-weight: bold; color: #5c4b44; margin-bottom: 0.5rem; }
.form-group input { width: 100%; padding: 0.8rem 1rem; font-family: 'Amaranth', sans-serif; font-size: 1rem; border: 1px solid #EFE1C3; border-radius: 8px; box-sizing: border-box; }
.form-options { color: #5c4b44; display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; font-family: 'Amaranth', sans-serif; font-size: 0.9rem; } /* Changed color */
.form-options label { display: flex; align-items: center; gap: 5px; cursor: pointer;}
.form-options a { color: #a58046; text-decoration: none; }
.btn-primary { width: 100%; font-family: 'Amaranth', sans-serif; font-size: 1rem; font-weight: bold; padding: 0.8rem 2rem; border-radius: 12px; border: 2px solid #2C1810; background-color: #2C1810; color: #F5EFE6; cursor: pointer; transition: all 0.2s; }
.btn-primary:hover { background-color: #4a2c1d; }
.auth-switch { color: #5c4b44; font-family: 'Amaranth', sans-serif; text-align: center; margin-top: 1.5rem; font-size: 0.9rem; } /* Changed color */
.auth-switch a { color: #CDAC77; font-weight: bold; }
.error-message {
  color: #D32F2F;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 0.8rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
  font-family: 'Amaranth', sans-serif;
  font-size: 0.9rem;
}
</style>