<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const handleDeleteAccount = () => {
  // Add confirmation logic later
  alert("Delete account functionality not implemented yet.");
}
</script>

<template>
  <div class="content-card card">
    <h2>{{ t('profile.sidebar.configuration') }}</h2>
    <p>Manage your account settings.</p>
    <button @click="handleDeleteAccount" class="btn btn-danger">Delete Account</button>
  </div>
</template>

<style scoped>
.card { background-color: #FDFCF8; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border: 1px solid #EFE1C3; }
h2 { font-family: 'Amaranth', sans-serif; font-size: 1.5rem; color: #2C1810; margin-top: 0; margin-bottom: 1rem; border-bottom: 1px solid #EFE1C3; padding-bottom: 1rem; }
p { font-family: 'Amaranth', sans-serif; color: #5c4b44; margin-bottom: 1.5rem; }
.btn { font-family: 'Amaranth', sans-serif; font-size: 0.9rem; font-weight: bold; padding: 0.6rem 1.2rem; border-radius: 8px; border: 1px solid; cursor: pointer; transition: all 0.2s; }
.btn-danger { background-color: #f8d7da; border-color: #f5c6cb; color: #721c24; }
.btn-danger:hover { background-color: #f5c6cb; }
</style>