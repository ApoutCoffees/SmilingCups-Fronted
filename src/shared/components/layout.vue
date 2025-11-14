<script setup>
import LanguageSwitcher from "./language-switcher.vue";
import { ref, inject } from "vue"; // Import inject
import { useI18n } from "vue-i18n";
import FooterContent from "./footer-content.vue";

const { t } = useI18n();
const auth = inject('auth');

const items = [
  { label: "option.catalog", to: "/catalog" },
  { label: "option.about", to: "/about" },
  { label: "option.subscriptions", to: "/subscriptions" },
];
</script>

<template>
  <div class="page-container">
    <pv-toast />
    <pv-confirm-dialog />

    <header class="header">
      <pv-toolbar class="bg-primary">
        <template #start>
          <router-link to="/welcome" class="logo-link">
            <img src="../../assets/Icon.png" alt="Smiling Cups Logo" width="60" height="60" />
          </router-link>
          <router-link to="/welcome" class="logo-link">
            <p class="brand-text" >SMILING CUPS</p>
          </router-link>

          <div class="navigation-links">
            <pv-button
                v-for="item in items"
                :key="item.label"
                as-child
                v-slot="slotProps"
            >
              <router-link :to="item.to" :class="slotProps['class']">
                {{ t(item.label) }}
              </router-link>
            </pv-button>
          </div>
        </template>

        <template #end>

          <div v-if="auth.loggedInUserId.value" class="profile-button-container">
            <router-link to="/profile">
              <pv-button class="profile-button p-button-secondary">
                <i class="pi pi-user" style="margin-right: 0.5rem;"></i>
                {{ t('option.my_profile') }}
              </pv-button>
            </router-link>
          </div>
          <div v-else class="login-button-container">
            <router-link to="/login">
              <pv-button class="login-button p-button-primary">
                {{ t('option.login_signup') }}
              </pv-button>
            </router-link>
          </div>

          <language-switcher />
        </template>
      </pv-toolbar>
    </header>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="footer">
      <footer-content />
    </footer>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #FFFBEB;
}

.header {
  width: 100%;
}

.main-content {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer {
  width: 100%;
  background-color: #2C1810;
  color: #ffffff;
}

.header :deep(.p-toolbar) {
  background-color: #cdac77 !important;
  color: #ffffff !important;
  padding: 0.5rem 2rem;
}

.brand-text {

  font-weight: bold;
  font-size: 1.5rem;
  color: #2C1810;
  margin: 0 1.5rem 0 10px;
}

.navigation-links {
  display: flex;
  gap: 0.5rem;
}


.header :deep(.navigation-links .p-button) {
  color: #2c1810 !important;
  background-color: transparent !important;
  border: none !important;
  font-size: 1.1rem;
  font-family: 'Amaranth', sans-serif;
  padding: 0.5rem 1rem !important;
  border-radius: 8px;
}

.header :deep(.navigation-links .p-button:hover) {
  background-color: #2c1810 !important;
  color: #ffffff !important;
}


.profile-button-container, .login-button-container {
  margin-right: 1rem;
}


.profile-button {
  background-color: #F5EFE6 !important;
  color: #2C1810 !important;
  border: 1px solid #A08056 !important;

  font-weight: bold;
  padding: 0.6rem 1.2rem !important;
  border-radius: 12px;
  transition: all 0.2s;
}
.profile-button:hover {
  background-color: #e0d8ce !important;
  border-color: #2C1810 !important;
}


.login-button {
  background-color: #2C1810 !important;
  color: #F5EFE6 !important;
  border: 1px solid #2C1810 !important;
  font-family: 'Amaranth', sans-serif;
  font-weight: bold;
  padding: 0.6rem 1.2rem !important;
  border-radius: 12px;
  transition: all 0.2s;
}
.login-button:hover {
  background-color: #4a2c1d !important;
  border-color: #4a2c1d !important;
}


.header :deep(a) {
  text-decoration: none;
}
</style>