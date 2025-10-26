<script setup>
// ... (imports remain the same) ...
import { ref, onMounted, inject } from 'vue';
import { useI18n } from 'vue-i18n';
import coffeeApi from '../../../services/coffe-api.js'; // Correct path
import { useRouter, useRoute } from 'vue-router';

// ... (t, router, route, refs for form fields remain the same) ...

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

  try {
    const newUserData = {
      fullName: accountType.value === 'producer' ? companyName.value : `${firstName.value} ${lastName.value}`,
      email: email.value,
      password: password.value, // Remember: Insecure for production!
      phone: "",
      address: "",
      city: "",
      country: "",
      isVerified: false,
      // --- CORRECTED SUBSCRIPTION ---
      subscription: {
        status: "inactive", // Start as inactive
        plan: null // No plan selected initially
      },
      // -----------------------------
      type: accountType.value,
      companyName: accountType.value === 'producer' ? companyName.value : undefined
    };
    const createdUser = await coffeeApi.createUser(newUserData);
    console.log("Usuario creado:", createdUser);
    router.push({ path: '/login', query: { role: accountType.value } });

  } catch (error) {
    console.error("Error en el registro:", error);
    registerError.value = "Error creating user. The email might already be taken.";
  }
};
</script>

<template>
  <div class="auth-container">
    <form class="auth-form" @submit.prevent="handleRegister">
      <h3>
        {{ accountType === 'customer' ? t('auth.customer_account') : t('auth.producer_account') }} - {{ t('auth.create_account') }}
      </h3>

      <div v-if="registerError" class="error-message">{{ registerError }}</div>

      <div v-if="accountType === 'customer'" class="form-row">
        <div class="form-group"> <label for="firstName">{{ t('auth.first_name') }}</label> <input type="text" id="firstName" v-model="firstName" required /> </div>
        <div class="form-group"> <label for="lastName">{{ t('auth.last_name') }}</label> <input type="text" id="lastName" v-model="lastName" required /> </div>
      </div>
      <div v-if="accountType === 'producer'" class="form-group"> <label for="companyName">{{ t('auth.company_name') }}</label> <input type="text" id="companyName" v-model="companyName" required /> </div>
      <div class="form-group"> <label for="email">{{ t('auth.email') }}</label> <input type="email" id="email" v-model="email" required /> </div>
      <div class="form-group"> <label for="password">{{ t('auth.password') }}</label> <input type="password" id="password" v-model="password" required /> </div>
      <div class="form-group"> <label for="confirmPassword">{{ t('auth.confirm_password') }}</label> <input type="password" id="confirmPassword" v-model="confirmPassword" required /> </div>


      <div class="form-options"> <label><input type="checkbox" v-model="terms" /> {{ t('auth.terms') }}</label> </div>
      <button type="submit" class="btn-primary">{{ t('auth.create_account') }}</button>
      <p class="auth-switch"> {{ t('auth.already_have_account') }} <router-link to="/login">{{ t('auth.log_in') }}</router-link> </p>
    </form>
  </div>
</template>

<style scoped>
.auth-container { display: flex; flex-direction: column; align-items: center; padding: 2rem; }
.logo-container { display: flex; align-items: center; gap: 10px; margin-bottom: 2rem; }
.logo-container img { height: 60px; }
.logo-container p { font-family: 'Amaranth', sans-serif; font-size: 2rem; font-weight: bold; color: #2C1810; }
.auth-form { width: 100%; max-width: 400px; padding: 2rem; border: 2px solid #CDAC77; border-radius: 15px; background: #fff; }
.auth-form h3 { text-align: center; font-family: 'Amaranth', sans-serif; font-size: 1.8rem; color: #2C1810; margin-top: 0; margin-bottom: 2rem; }
.form-group { margin-bottom: 1.5rem; }
.form-group label { display: block; font-family: 'Amaranth', sans-serif; font-size: 0.9rem; font-weight: bold; color: #5c4b44; margin-bottom: 0.5rem; }
.form-group input { width: 100%; padding: 0.8rem 1rem; font-family: 'Amaranth', sans-serif; font-size: 1rem; border: 1px solid #EFE1C3; border-radius: 8px; box-sizing: border-box; }
.form-row { display: flex; gap: 1rem; }
.form-row .form-group { flex: 1; }
.form-options {color: #CDAC77; display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; font-family: 'Amaranth', sans-serif; font-size: 0.9rem; }
.form-options label { display: flex; align-items: center; gap: 5px; cursor: pointer; }
.btn-primary { width: 100%; font-family: 'Amaranth', sans-serif; font-size: 1rem; font-weight: bold; padding: 0.8rem 2rem; border-radius: 12px; border: 2px solid #2C1810; background-color: #2C1810; color: #F5EFE6; cursor: pointer; transition: all 0.2s; }
.btn-primary:hover { background-color: #4a2c1d; }
.auth-switch {color: #CDAC77; font-family: 'Amaranth', sans-serif; text-align: center; margin-top: 1.5rem; font-size: 0.9rem; }
.auth-switch a { color: #CDAC77; font-weight: bold; }
</style>